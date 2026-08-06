import { supabase } from './supabaseClient';



export const DiscussionService = {
  // 1. Get User Profile with Role
  async getUserProfile(userId) {
    if (!userId) return null;
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        console.warn('[DiscussionService] Fetch profile warning:', error.message);
        return { id: userId, role: 'user' };
      }
      return data || { id: userId, role: 'user' };
    } catch (err) {
      console.warn('[DiscussionService] Profile fetch fallback:', err);
      return { id: userId, role: 'user' };
    }
  },

  // Helper for local replies map persistence
  getLocalRepliesMap() {
    try {
      const saved = localStorage.getItem('aevum_replies_map');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  },

  saveLocalReply(discussionId, reply) {
    try {
      const map = this.getLocalRepliesMap();
      const existing = map[discussionId] || [];
      // Deduplicate reply by id
      if (!existing.some(r => r.id === reply.id)) {
        map[discussionId] = [...existing, reply];
        localStorage.setItem('aevum_replies_map', JSON.stringify(map));
      }
    } catch {}
  },

  // Helper for local upvotes map persistence
  getLocalUpvotesMap() {
    try {
      const saved = localStorage.getItem('aevum_upvotes_map');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  },

  setLocalUpvotesMap(map) {
    try {
      localStorage.setItem('aevum_upvotes_map', JSON.stringify(map));
    } catch {}
  },

  // Helper for local created discussions persistence
  getLocalDiscussions() {
    try {
      const saved = localStorage.getItem('aevum_local_discussions');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  },

  saveLocalDiscussion(disc) {
    try {
      const list = this.getLocalDiscussions();
      const existingIdx = list.findIndex(item => item.id === disc.id);
      if (existingIdx >= 0) {
        list[existingIdx] = disc;
      } else {
        list.unshift(disc);
      }
      localStorage.setItem('aevum_local_discussions', JSON.stringify(list));
    } catch {}
  },

  // Helper for deleted discussions persistence (Local + Remote Supabase sync)
  getDeletedDiscussionsSet() {
    try {
      const saved = localStorage.getItem('aevum_deleted_discussions');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  },

  async getRemoteDeletedDiscussionsSet() {
    try {
      const { data, error } = await supabase.from('deleted_discussions').select('discussion_id');
      if (data && !error) {
        return new Set(data.map(d => d.discussion_id));
      }
    } catch {}
    return new Set();
  },

  addDeletedDiscussion(discussionId) {
    try {
      const list = Array.from(this.getDeletedDiscussionsSet());
      if (!list.includes(discussionId)) {
        list.push(discussionId);
        localStorage.setItem('aevum_deleted_discussions', JSON.stringify(list));
      }
    } catch {}
  },

  // 2. Fetch Discussions List (Supabase with Local Fallback)
  async getDiscussions() {
    const localUpvotesMap = this.getLocalUpvotesMap();
    const localDiscussions = this.getLocalDiscussions();
    const localRepliesMap = this.getLocalRepliesMap();
    const localDeletedSet = this.getDeletedDiscussionsSet();
    const remoteDeletedSet = await this.getRemoteDeletedDiscussionsSet();
    
    // Combine local + remote deleted sets for 100% global deletion sync
    const deletedSet = new Set([...localDeletedSet, ...remoteDeletedSet]);

    let fetchedData = [];
    let supabaseOk = false;

    try {
      const { data, error } = await supabase
        .from('release_discussions')
        .select(`
          *,
          discussion_replies (*)
        `)
        .order('created_at', { ascending: false });

      if (error || !data) {
        console.warn('[DiscussionService] Supabase fetch error, using local discussions only:', error?.message);
        fetchedData = [...localDiscussions];
      } else {
        // Only real Supabase data + locally created (pending sync) posts
        fetchedData = [...data, ...localDiscussions];
      }
    } catch (err) {
      console.warn('[DiscussionService] Fetch error, using local discussions only:', err);
      fetchedData = [...localDiscussions];
    }

    // Deduplicate by ID and merge replies & upvotes
    const seen = new Set();
    const uniqueList = [];
    for (const item of fetchedData) {
      if (!seen.has(item.id) && !deletedSet.has(item.id)) {
        seen.add(item.id);
        const upvotesOverride = localUpvotesMap[item.id];
        const rawUpvotes = typeof item.upvotes === 'number' ? item.upvotes : (item.upvotes ? parseInt(item.upvotes, 10) : 0);

        // Combine Supabase replies + local cached replies
        const baseReplies = item.discussion_replies || item.replies || [];
        const localReplies = localRepliesMap[item.id] || [];
        
        const replySeen = new Set();
        const mergedReplies = [];
        for (const rep of [...baseReplies, ...localReplies]) {
          if (rep && rep.id && !replySeen.has(rep.id)) {
            replySeen.add(rep.id);
            mergedReplies.push(rep);
          }
        }

        // Sort replies chronologically
        mergedReplies.sort((a, b) => new Date(a.created_at || 0) - new Date(b.created_at || 0));

        uniqueList.push({
          ...item,
          upvotes: typeof upvotesOverride === 'number' ? upvotesOverride : rawUpvotes,
          replies: mergedReplies
        });
      }
    }

    return uniqueList;
  },

  // 3. Create Discussion
  async createDiscussion({ userId, userEmail, userName, userAvatar, releaseVersion, type, title, content }) {
    const newDiscussion = {
      user_id: userId,
      user_email: userEmail,
      user_name: userName || userEmail?.split('@')[0],
      user_avatar: userAvatar || null,
      release_version: releaseVersion,
      type,
      title,
      content,
      status: 'open',
      upvotes: 0,
      created_at: new Date().toISOString()
    };

    try {
      const { data, error } = await supabase
        .from('release_discussions')
        .insert([newDiscussion])
        .select()
        .single();

      if (error || !data) {
        // Supabase failed — log full error so we can diagnose RLS/schema issues
        console.error('[DiscussionService] Supabase insert FAILED:', error);
        // Fallback: save locally only (visible to current user only)
        const localItem = {
          id: `disc-${Date.now()}`,
          ...newDiscussion,
          replies: []
        };
        this.saveLocalDiscussion(localItem);
        return localItem;
      }

      // Supabase success → do NOT save to localStorage (all users will see it via DB fetch)
      const createdItem = {
        ...data,
        user_name: userName || userEmail?.split('@')[0],
        user_avatar: userAvatar || data.user_avatar,
        replies: []
      };
      return createdItem;

    } catch (err) {
      console.error('[DiscussionService] Supabase insert exception:', err);
      const localItem = {
        id: `disc-${Date.now()}`,
        ...newDiscussion,
        replies: []
      };
      this.saveLocalDiscussion(localItem);
      return localItem;
    }
  },

  // 4. Create Reply (Supports Admin Reply)
  async createReply({ discussionId, userId, userEmail, userName, userAvatar, content, isAdminReply }) {
    const newReply = {
      discussion_id: discussionId,
      user_id: userId,
      user_email: userEmail,
      user_avatar: userAvatar || null,
      content,
      is_admin_reply: isAdminReply || false,
      created_at: new Date().toISOString()
    };

    let createdReply = null;

    try {
      const { data, error } = await supabase
        .from('discussion_replies')
        .insert([newReply])
        .select()
        .single();

      if (error || !data) {
        console.warn('[DiscussionService] Insert reply fallback:', error?.message);
        createdReply = {
          id: `rep-${Date.now()}`,
          ...newReply,
          user_name: userName || userEmail.split('@')[0],
          user_avatar: userAvatar
        };
      } else {
        createdReply = {
          ...data,
          user_name: userName || userEmail.split('@')[0],
          user_avatar: userAvatar || data.user_avatar
        };
      }
    } catch (err) {
      createdReply = {
        id: `rep-${Date.now()}`,
        ...newReply,
        user_name: userName || userEmail.split('@')[0],
        user_avatar: userAvatar
      };
    }

    // 1. Save reply to local replies map in localStorage
    this.saveLocalReply(discussionId, createdReply);

    // 2. Save reply to local discussion cache if present
    const localList = this.getLocalDiscussions();
    const targetDisc = localList.find(d => d.id === discussionId);
    if (targetDisc) {
      targetDisc.replies = [...(targetDisc.replies || []), createdReply];
      this.saveLocalDiscussion(targetDisc);
    }

    return createdReply;
  },

  // 5. Toggle Upvote
  async toggleUpvote(discussionId, newUpvotesCount) {
    // 1. Update local upvotes map in localStorage
    const localMap = this.getLocalUpvotesMap();
    localMap[discussionId] = newUpvotesCount;
    this.setLocalUpvotesMap(localMap);

    // 2. Update local discussion cache if stored
    const localList = this.getLocalDiscussions();
    const targetDisc = localList.find(d => d.id === discussionId);
    if (targetDisc) {
      targetDisc.upvotes = newUpvotesCount;
      this.saveLocalDiscussion(targetDisc);
    }

    // 3. Sync to Supabase
    try {
      const { error } = await supabase
        .from('release_discussions')
        .update({ upvotes: newUpvotesCount })
        .eq('id', discussionId);

      if (error) console.warn('[DiscussionService] Upvote update fallback:', error.message);
    } catch (err) {
      console.warn('[DiscussionService] Upvote error:', err);
    }
  },

  // 6. Delete Discussion (Admin action)
  async deleteDiscussion(discussionId) {
    // 1. Mark as deleted in local persistent set (immediate client-side hide)
    this.addDeletedDiscussion(discussionId);

    // 2. Remove from local discussions cache
    try {
      const localList = this.getLocalDiscussions().filter(d => d.id !== discussionId);
      localStorage.setItem('aevum_local_discussions', JSON.stringify(localList));

      const upvotesMap = this.getLocalUpvotesMap();
      delete upvotesMap[discussionId];
      this.setLocalUpvotesMap(upvotesMap);

      const repliesMap = this.getLocalRepliesMap();
      delete repliesMap[discussionId];
      localStorage.setItem('aevum_replies_map', JSON.stringify(repliesMap));
    } catch {}

    // 3. Write to Supabase deleted_discussions table for GLOBAL cross-user sync
    // All other users/devices will see this deletion on next fetch
    try {
      await supabase
        .from('deleted_discussions')
        .upsert({ discussion_id: discussionId }, { onConflict: 'discussion_id' });
    } catch (err) {
      console.warn('[DiscussionService] Remote deleted_discussions sync error:', err);
    }

    // 4. Remove from Supabase release_discussions table (hard delete)
    try {
      const { error } = await supabase
        .from('release_discussions')
        .delete()
        .eq('id', discussionId);

      if (error) console.warn('[DiscussionService] Delete discussion error:', error.message);
    } catch (err) {
      console.warn('[DiscussionService] Delete discussion error:', err);
    }
  },

  // 7. Update Status (Admin action: open / in_progress / resolved)
  async updateStatus(discussionId, newStatus) {
    // 1. Update local cache
    try {
      const localList = this.getLocalDiscussions();
      const target = localList.find(d => d.id === discussionId);
      if (target) {
        target.status = newStatus;
        this.saveLocalDiscussion(target);
      }
    } catch {}

    // 2. Update Supabase
    try {
      const { error } = await supabase
        .from('release_discussions')
        .update({ status: newStatus })
        .eq('id', discussionId);

      if (error) console.warn('[DiscussionService] Update status error:', error.message);
    } catch (err) {
      console.warn('[DiscussionService] Update status error:', err);
    }
  }
};
