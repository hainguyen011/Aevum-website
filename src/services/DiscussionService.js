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

  // ── Anti-Spam & 40s Rate-Limiting Engine ──
  setBlockUser(userId, seconds = 40) {
    const blockedUntil = Date.now() + seconds * 1000;
    try {
      localStorage.setItem('aevum_chat_blocked_until', String(blockedUntil));
      if (userId) {
        localStorage.setItem(`aevum_chat_blocked_${userId}`, String(blockedUntil));
      }
    } catch {}
    return blockedUntil;
  },

  getRemainingBlockSeconds(userId) {
    try {
      const globalUntil = parseInt(localStorage.getItem('aevum_chat_blocked_until') || '0', 10);
      const userUntil = userId ? parseInt(localStorage.getItem(`aevum_chat_blocked_${userId}`) || '0', 10) : 0;
      const maxUntil = Math.max(globalUntil, userUntil);
      const diff = Math.ceil((maxUntil - Date.now()) / 1000);
      return diff > 0 ? diff : 0;
    } catch {
      return 0;
    }
  },

  async validateReplyAntiSpam({ userId, content }) {
    // 1. Check if user is already under active 40s cooldown block
    const remainingSeconds = this.getRemainingBlockSeconds(userId);
    if (remainingSeconds > 0) {
      const err = new Error('SPAM_BLOCKED_40S');
      err.isSpamBlock = true;
      err.blockedSeconds = remainingSeconds;
      throw err;
    }

    const trimmed = (content || '').trim();
    if (trimmed.length < 2) {
      const err = new Error('Nội dung phản hồi quá ngắn.');
      err.isSpamBlock = false;
      throw err;
    }

    // 2. Pattern Analysis for Spam Behavior
    // Rule A: Flood repeating characters (e.g., "aaaaaaa", ".........", "!!!!!!")
    const hasCharSpam = /(.)\1{5,}/u.test(trimmed);
    // Rule B: Flood repeating words (e.g., "alo alo alo alo", "spam spam spam")
    const words = trimmed.split(/\s+/);
    const hasWordSpam = words.length >= 4 && words.slice(1).every(w => w.toLowerCase() === words[0].toLowerCase());

    if (hasCharSpam || hasWordSpam) {
      this.setBlockUser(userId, 40);
      const err = new Error('SPAM_BLOCKED_40S');
      err.isSpamBlock = true;
      err.blockedSeconds = 40;
      err.reason = 'SPAM_PATTERN';
      throw err;
    }

    // 3. Server / Supabase Rate Limit check against recent replies
    if (userId) {
      try {
        const { data: recentReplies, error } = await supabase
          .from('discussion_replies')
          .select('created_at, content')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
          .limit(4);

        if (!error && recentReplies && recentReplies.length > 0) {
          const now = Date.now();
          const lastTime = new Date(recentReplies[0].created_at).getTime();

          // Rule 1: Chatting too fast (< 3 seconds between consecutive replies)
          if (now - lastTime < 3000) {
            this.setBlockUser(userId, 40);
            const err = new Error('SPAM_BLOCKED_40S');
            err.isSpamBlock = true;
            err.blockedSeconds = 40;
            err.reason = 'CHAT_TOO_FAST';
            throw err;
          }

          // Rule 2: Chatting too much (>= 3 replies within 15 seconds)
          const in15s = recentReplies.filter(r => now - new Date(r.created_at).getTime() < 15000);
          if (in15s.length >= 3) {
            this.setBlockUser(userId, 40);
            const err = new Error('SPAM_BLOCKED_40S');
            err.isSpamBlock = true;
            err.blockedSeconds = 40;
            err.reason = 'CHAT_BURST_FLOOD';
            throw err;
          }

          // Rule 3: Duplicate content spam (exact same reply within 60 seconds)
          if (recentReplies[0].content && recentReplies[0].content.trim().toLowerCase() === trimmed.toLowerCase() && (now - lastTime < 60000)) {
            this.setBlockUser(userId, 40);
            const err = new Error('SPAM_BLOCKED_40S');
            err.isSpamBlock = true;
            err.blockedSeconds = 40;
            err.reason = 'DUPLICATE_MESSAGE';
            throw err;
          }
        }
      } catch (checkErr) {
        if (checkErr.isSpamBlock) throw checkErr;
        console.warn('[DiscussionService] Spam check query fallback:', checkErr);
      }
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

    try {
      // 1. Fetch release discussions
      const { data: discussionsData, error: discError } = await supabase
        .from('release_discussions')
        .select('*')
        .order('created_at', { ascending: false });

      if (discError) {
        console.warn('[DiscussionService] Supabase fetch discussions warning:', discError.message);
        fetchedData = [...localDiscussions];
      } else if (discussionsData) {
        // 2. Fetch all replies in a separate decoupled query (avoids PostgREST schema cache / foreign key join errors)
        const { data: repliesData, error: repError } = await supabase
          .from('discussion_replies')
          .select('*')
          .order('created_at', { ascending: true });

        if (repError) {
          console.warn('[DiscussionService] Supabase fetch replies warning:', repError.message);
        }

        let profilesMap = new Map();
        try {
          const { data: profs } = await supabase.from('profiles').select('id, display_name, avatar_url');
          if (profs && profs.length > 0) {
            profilesMap = new Map(profs.map(p => [p.id, p]));
          }
        } catch {}

        const remoteReplies = (repliesData || []).map(r => {
          const prof = r.user_id ? profilesMap.get(r.user_id) : null;
          return {
            ...r,
            user_name: r.user_name || prof?.display_name || r.user_email?.split('@')[0],
            user_avatar: r.user_avatar || prof?.avatar_url || null
          };
        });

        // Enrich discussions with remote replies
        const enriched = discussionsData.map(disc => {
          const matchingReplies = remoteReplies.filter(r => String(r.discussion_id) === String(disc.id));
          return {
            ...disc,
            discussion_replies: matchingReplies
          };
        });

        fetchedData = [...enriched, ...localDiscussions];
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
        console.error('[DiscussionService] Supabase insert FAILED:', error);
        const localItem = {
          id: `disc-${Date.now()}`,
          ...newDiscussion,
          replies: []
        };
        this.saveLocalDiscussion(localItem);
        return localItem;
      }

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

  // 4. Create Reply (Supports Admin Reply with Auto Core-Fallback)
  async createReply({ discussionId, userId, userEmail, userName, userAvatar, content, isAdminReply }) {
    // 0. Strict Anti-Spam & Rate-Limit Gatekeeper (Blocks 40s on violations)
    await this.validateReplyAntiSpam({ userId, content });

    // Core payload strictly matching original Supabase table columns
    const corePayload = {
      discussion_id: discussionId,
      user_id: userId || null,
      user_email: userEmail || null,
      content,
      is_admin_reply: Boolean(isAdminReply),
      created_at: new Date().toISOString()
    };

    // Extended payload with extra user metadata (if columns exist in table)
    const extendedPayload = {
      ...corePayload,
      user_name: userName || userEmail?.split('@')[0] || 'User',
      user_avatar: userAvatar || null
    };

    let createdReply = null;
    let isDbSuccess = false;

    try {
      // 1. First attempt: Insert with extended payload
      const { data, error } = await supabase
        .from('discussion_replies')
        .insert([extendedPayload])
        .select()
        .single();

      if (!error && data) {
        createdReply = {
          ...data,
          user_name: data.user_name || userName || userEmail?.split('@')[0],
          user_avatar: data.user_avatar || userAvatar
        };
        isDbSuccess = true;
      } else {
        // 2. Fallback attempt: If table doesn't have user_name or user_avatar columns yet, insert core payload
        console.warn('[DiscussionService] Extended insert failed, retrying with core columns:', error?.message);
        const { data: coreData, error: coreError } = await supabase
          .from('discussion_replies')
          .insert([corePayload])
          .select()
          .single();

        if (!coreError && coreData) {
          createdReply = {
            ...coreData,
            user_name: userName || userEmail?.split('@')[0],
            user_avatar: userAvatar
          };
          isDbSuccess = true;
        } else {
          console.error('[DiscussionService] Supabase insert reply failed:', coreError?.message || coreError);
        }
      }
    } catch (err) {
      console.error('[DiscussionService] Supabase insert reply exception:', err);
    }

    // 3. Fallback: only save locally if database insert completely failed (offline/error)
    if (!isDbSuccess) {
      createdReply = {
        id: `rep-${Date.now()}`,
        ...extendedPayload
      };
      this.saveLocalReply(discussionId, createdReply);
    }

    // 4. Update local discussion cache if present
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
  },

  // 8. Realtime Subscriptions (Live Discussion Room)
  subscribeToRealtime({ onNewReply, onDeleteReply, onNewDiscussion, onUpdateDiscussion, onDeleteDiscussion }) {
    try {
      const channel = supabase
        .channel('aevum-discussions-live-channel')
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'discussion_replies' },
          (payload) => {
            if (onNewReply && payload.new) onNewReply(payload.new);
          }
        )
        .on(
          'postgres_changes',
          { event: 'DELETE', schema: 'public', table: 'discussion_replies' },
          (payload) => {
            if (onDeleteReply && payload.old) onDeleteReply(payload.old);
          }
        )
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'release_discussions' },
          (payload) => {
            if (onNewDiscussion && payload.new) onNewDiscussion(payload.new);
          }
        )
        .on(
          'postgres_changes',
          { event: 'UPDATE', schema: 'public', table: 'release_discussions' },
          (payload) => {
            if (onUpdateDiscussion && payload.new) onUpdateDiscussion(payload.new);
          }
        )
        .on(
          'postgres_changes',
          { event: 'DELETE', schema: 'public', table: 'release_discussions' },
          (payload) => {
            if (onDeleteDiscussion && payload.old) onDeleteDiscussion(payload.old);
          }
        )
        .subscribe((status) => {
          console.log('[DiscussionService] Realtime channel status:', status);
        });

      return channel;
    } catch (err) {
      console.warn('[DiscussionService] Realtime subscription init error:', err);
      return null;
    }
  },

  unsubscribeRealtime(channel) {
    if (channel) {
      try {
        supabase.removeChannel(channel);
      } catch (err) {
        console.warn('[DiscussionService] Unsubscribe realtime error:', err);
      }
    }
  }
};
