import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare, Bug, Lightbulb, MessageCircle, Filter, Search, Plus, X,
  Send, ShieldCheck, CheckCircle2, Clock, ThumbsUp, User, Sparkles, AlertCircle, AlertTriangle, ChevronUp, Trash2, MoreVertical, Languages, Globe, ArrowRight
} from 'lucide-react';
import { DiscussionService } from '../services/DiscussionService';
import { ReleaseService } from '../services/ReleaseService';
import { TranslationService } from '../services/TranslationService';
import { CustomSelect } from './ui/CustomSelect';
import { Modal } from './ui/Modal';
import { DiscussionCardAtmosphere } from './DiscussionCardAtmosphere';
import { TesterLeaderboard } from './TesterLeaderboard';

export function Discussions({ activeLang, user, userProfile, onOpenAuthModal, initialVersionFilter = 'all' }) {
  const [discussions, setDiscussions] = useState([]);
  const [releases, setReleases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVersion, setSelectedVersion] = useState(initialVersionFilter);
  const [selectedType, setSelectedType] = useState('all');

  // Per-card manual translation override state
  const [manualTranslate, setManualTranslate] = useState({});
  const [translatedCache, setTranslatedCache] = useState({});

  // Dynamic Translation Service Integration (Zero Hardcoding)
  useEffect(() => {
    if (!discussions || discussions.length === 0) return;

    const targetLang = activeLang === 'en' ? 'en' : 'vi';

    discussions.forEach(async (item) => {
      // 1. Translate Discussion Title
      const titleKey = `${item.id}_title_${targetLang}`;
      if (item.title && !translatedCache[titleKey]) {
        TranslationService.translateText(item.title, targetLang)
          .then(translated => {
            if (translated && translated !== item.title) {
              setTranslatedCache(prev => ({ ...prev, [titleKey]: translated }));
            }
          })
          .catch(() => { });
      }

      // 2. Translate Discussion Content
      const contentKey = `${item.id}_content_${targetLang}`;
      if (item.content && !translatedCache[contentKey]) {
        TranslationService.translateText(item.content, targetLang)
          .then(translated => {
            if (translated && translated !== item.content) {
              setTranslatedCache(prev => ({ ...prev, [contentKey]: translated }));
            }
          })
          .catch(() => { });
      }

      // 3. Translate Discussion Replies
      if (item.replies && Array.isArray(item.replies)) {
        item.replies.forEach(rep => {
          const replyKey = `${rep.id}_reply_${targetLang}`;
          if (rep.content && !translatedCache[replyKey]) {
            TranslationService.translateText(rep.content, targetLang)
              .then(translated => {
                if (translated && translated !== rep.content) {
                  setTranslatedCache(prev => ({ ...prev, [replyKey]: translated }));
                }
              })
              .catch(() => { });
          }
        });
      }
    });
  }, [discussions, activeLang]);

  // Create & Detail Discussion Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [detailDiscussionId, setDetailDiscussionId] = useState(null);
  const activeDiscussion = discussions.find(d => d.id === detailDiscussionId);
  const [submitting, setSubmitting] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newVersion, setNewVersion] = useState('v2.1.0');
  const [newType, setNewType] = useState('bug');
  // Reply state per discussion
  const [replyInputs, setReplyInputs] = useState({});
  const [replySubmitting, setReplySubmitting] = useState({});

  // ── Anti-Spam & Rate-Limiting State & Refs ──
  const [chatBlockedSeconds, setChatBlockedSeconds] = useState(0);
  const [upvoteBlockedSeconds, setUpvoteBlockedSeconds] = useState(0);
  const [spamToast, setSpamToast] = useState({ show: false, message: '' });

  const upvoteInFlightRef = useRef({});
  const lastUpvoteTimeRef = useRef({});
  const recentUpvoteClicksRef = useRef([]);
  const lastReplySendTimeRef = useRef(0);
  const lastReplyTextRef = useRef('');

  // Active 3-dots dropdown menu state
  const [activeMenuId, setActiveMenuId] = useState(null);

  useEffect(() => {
    const handleOutsideClick = () => setActiveMenuId(null);
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, []);

  // Initialize and track 40s chat block countdown
  useEffect(() => {
    const initialBlocked = DiscussionService.getRemainingBlockSeconds(user?.id);
    if (initialBlocked > 0) {
      setChatBlockedSeconds(initialBlocked);
    }
  }, [user?.id]);

  useEffect(() => {
    if (chatBlockedSeconds <= 0) return;
    const timer = setInterval(() => {
      setChatBlockedSeconds(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [chatBlockedSeconds]);

  // Upvote cooldown countdown timer
  useEffect(() => {
    if (upvoteBlockedSeconds <= 0) return;
    const timer = setInterval(() => {
      setUpvoteBlockedSeconds(prev => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [upvoteBlockedSeconds]);

  // Auto-dismiss floating spam toast after 4s
  useEffect(() => {
    if (!spamToast.show) return;
    const timer = setTimeout(() => {
      setSpamToast({ show: false, message: '' });
    }, 4000);
    return () => clearTimeout(timer);
  }, [spamToast.show]);

  // Upvoted posts local state with localStorage persistence
  const [upvotedPosts, setUpvotedPosts] = useState(() => {
    try {
      const saved = localStorage.getItem('aevum_upvoted_discussions');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const isVi = activeLang === 'vi';
  const isAdmin = userProfile?.role === 'admin' || user?.email?.includes('admin') || user?.email === 'hainguyen011@gmail.com';

  const handleToggleUpvote = async (discussionId) => {
    if (!user) {
      onOpenAuthModal();
      return;
    }

    const now = Date.now();

    // 1. Check if temporary upvote pause is active
    if (upvoteBlockedSeconds > 0) {
      setSpamToast({
        show: true,
        message: isVi
          ? `Thao tác quá nhanh! Vui lòng chờ ${upvoteBlockedSeconds}s.`
          : `Upvoting too fast! Please wait ${upvoteBlockedSeconds}s.`
      });
      return;
    }

    // 2. Mutex Lock - Prevent concurrent click requests on the same item
    if (upvoteInFlightRef.current[discussionId]) {
      return;
    }

    // 3. Fast-click throttling on the same post (minimum 600ms gap)
    const lastTime = lastUpvoteTimeRef.current[discussionId] || 0;
    if (now - lastTime < 600) {
      return;
    }
    lastUpvoteTimeRef.current[discussionId] = now;

    // 4. Burst click detection across entire feed (> 5 clicks in 3 seconds)
    recentUpvoteClicksRef.current = [...recentUpvoteClicksRef.current.filter(t => now - t < 3000), now];
    if (recentUpvoteClicksRef.current.length > 5) {
      setUpvoteBlockedSeconds(5);
      setSpamToast({
        show: true,
        message: isVi
          ? 'Phát hiện click upvote liên tục! Tạm khóa upvote 5 giây.'
          : 'Rapid upvoting detected! Upvoting paused for 5 seconds.'
      });
      return;
    }

    upvoteInFlightRef.current[discussionId] = true;

    try {
      const isCurrentlyUpvoted = !!upvotedPosts[discussionId];
      const newUpvotedState = !isCurrentlyUpvoted;

      const updatedUpvotedMap = {
        ...upvotedPosts,
        [discussionId]: newUpvotedState
      };
      setUpvotedPosts(updatedUpvotedMap);
      try {
        localStorage.setItem('aevum_upvoted_discussions', JSON.stringify(updatedUpvotedMap));
      } catch { }

      // Calculate newCount synchronously from current discussions state
      const targetDisc = discussions.find(d => d.id === discussionId);
      const currentCount = targetDisc ? (typeof targetDisc.upvotes === 'number' ? targetDisc.upvotes : (targetDisc.upvotes ? parseInt(targetDisc.upvotes, 10) : 0)) : 0;
      const newCount = isCurrentlyUpvoted ? Math.max(0, currentCount - 1) : currentCount + 1;

      setDiscussions(prev => prev.map(disc => {
        if (disc.id === discussionId) {
          return { ...disc, upvotes: newCount };
        }
        return disc;
      }));

      await DiscussionService.toggleUpvote(discussionId, newCount);
    } catch (err) {
      console.warn('[Discussions] Upvote sync fallback:', err);
    } finally {
      upvoteInFlightRef.current[discussionId] = false;
    }
  };

  const handleDeleteDiscussion = async (discussionId) => {
    if (!isAdmin) return;
    const confirmMsg = isVi
      ? 'Bạn có chắc chắn muốn xóa bài thảo luận này không?'
      : 'Are you sure you want to delete this discussion?';

    if (window.confirm(confirmMsg)) {
      setDiscussions(prev => prev.filter(d => d.id !== discussionId));
      await DiscussionService.deleteDiscussion(discussionId);
    }
  };

  const handleUpdateStatus = async (discussionId, newStatus) => {
    if (!isAdmin) return;
    setDiscussions(prev => prev.map(d => d.id === discussionId ? { ...d, status: newStatus } : d));
    await DiscussionService.updateStatus(discussionId, newStatus);
  };

  useEffect(() => {
    loadDiscussions();
    loadReleases();

    // Setup Supabase Realtime channel for live discussions & replies
    const channel = DiscussionService.subscribeToRealtime({
      onNewReply: (newReply) => {
        setDiscussions(prev => prev.map(disc => {
          if (String(disc.id) === String(newReply.discussion_id)) {
            const currentReplies = disc.replies || [];
            // Deduplicate if already added locally
            if (currentReplies.some(r => String(r.id) === String(newReply.id))) {
              return disc;
            }
            return {
              ...disc,
              replies: [...currentReplies, newReply]
            };
          }
          return disc;
        }));
      },
      onDeleteReply: (oldReply) => {
        setDiscussions(prev => prev.map(disc => ({
          ...disc,
          replies: (disc.replies || []).filter(r => String(r.id) !== String(oldReply.id))
        })));
      },
      onNewDiscussion: (newDisc) => {
        setDiscussions(prev => {
          if (prev.some(d => String(d.id) === String(newDisc.id))) {
            return prev;
          }
          return [{ ...newDisc, replies: [] }, ...prev];
        });
      },
      onUpdateDiscussion: (updatedDisc) => {
        setDiscussions(prev => prev.map(disc => {
          if (String(disc.id) === String(updatedDisc.id)) {
            return {
              ...disc,
              ...updatedDisc,
              replies: disc.replies // Preserve current replies state
            };
          }
          return disc;
        }));
      },
      onDeleteDiscussion: (oldDisc) => {
        setDiscussions(prev => prev.filter(d => String(d.id) !== String(oldDisc.id)));
      }
    });

    return () => {
      DiscussionService.unsubscribeRealtime(channel);
    };
  }, []);

  // Lock body scroll and Lenis smooth scroll when modal is active
  useEffect(() => {
    if (isCreateModalOpen || detailDiscussionId) {
      document.body.style.overflow = 'hidden';
      if (window.lenis) window.lenis.stop();
    } else {
      document.body.style.overflow = '';
      if (window.lenis) window.lenis.start();
    }
    return () => {
      document.body.style.overflow = '';
      if (window.lenis) window.lenis.start();
    };
  }, [isCreateModalOpen, detailDiscussionId]);

  const loadReleases = async () => {
    const data = await ReleaseService.getReleases();
    setReleases(data);
    if (data && data.length > 0 && data[0].tag_name) {
      setNewVersion(data[0].tag_name);
    }
  };

  const loadDiscussions = async () => {
    setLoading(true);
    const data = await DiscussionService.getDiscussions();
    setDiscussions(data);
    setLoading(false);
  };

  // Build Options for CustomSelect components
  const versionFilterOptions = [
    { value: 'all', label: isVi ? 'Tất cả phiên bản' : 'All Versions' },
    ...(releases.length > 0
      ? releases.map((rel, idx) => ({
        value: rel.tag_name || rel.name || 'release',
        label: `${rel.tag_name ? `Aevum OS ${rel.tag_name}` : (rel.name || 'Release')} ${rel.is_mockup ? '(Mockup)' : (idx === 0 ? '(Latest)' : '')}`
      }))
      : [{ value: 'v2.1.0', label: 'Aevum OS v2.1.0 (Mockup)' }])
  ];

  const versionCreateOptions = (releases.length > 0
    ? releases.map((rel, idx) => ({
      value: rel.tag_name || rel.name || 'release',
      label: `${rel.tag_name ? `Aevum OS ${rel.tag_name}` : (rel.name || 'Release')} ${rel.is_mockup ? '(Mockup)' : (idx === 0 ? '(Latest)' : '')}`
    }))
    : [{ value: 'v2.1.0', label: 'Aevum OS v2.1.0 (Mockup)' }]);

  const handleOpenCreateModal = () => {
    if (!user) {
      onOpenAuthModal();
      return;
    }
    setIsCreateModalOpen(true);
  };

  const handleCreateDiscussion = async (e) => {
    e.preventDefault();
    if (!user) {
      onOpenAuthModal();
      return;
    }
    if (submitting) return;

    const trimmedTitle = newTitle.trim();
    const trimmedContent = newContent.trim();
    if (!trimmedTitle || !trimmedContent) return;

    // Pattern spam check on discussion creation
    if (/(.)\1{6,}/u.test(trimmedTitle) || /(.)\1{6,}/u.test(trimmedContent)) {
      setSpamToast({
        show: true,
        message: isVi ? 'Tiêu đề hoặc nội dung có dấu hiệu lặp ký tự spam.' : 'Title or content contains spam characters.'
      });
      return;
    }

    const userAvatar = user?.user_metadata?.avatar_url || user?.user_metadata?.picture || userProfile?.avatar_url || userProfile?.avatar;

    setSubmitting(true);
    try {
      const created = await DiscussionService.createDiscussion({
        userId: user.id,
        userEmail: user.email,
        userName: user.user_metadata?.full_name || user.user_metadata?.name || user.email.split('@')[0],
        userAvatar: userAvatar,
        releaseVersion: newVersion,
        type: newType,
        title: trimmedTitle,
        content: trimmedContent
      });

      setDiscussions(prev => [created, ...prev]);
      setNewTitle('');
      setNewContent('');
      setIsCreateModalOpen(false);
    } catch (err) {
      console.error('[Discussions] Create discussion error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddReply = async (discussionId) => {
    if (!user) {
      onOpenAuthModal();
      return;
    }

    // 1. Check if user is currently blocked by 40s server/client block
    if (chatBlockedSeconds > 0) {
      setSpamToast({
        show: true,
        message: isVi
          ? `Bạn đang bị tạm khóa gửi tin! Vui lòng chờ ${chatBlockedSeconds}s.`
          : `Chat is temporarily blocked! Please wait ${chatBlockedSeconds}s.`
      });
      return;
    }

    // 2. Prevent concurrent reply submissions for the same discussion
    if (replySubmitting[discussionId]) return;

    const rawText = replyInputs[discussionId] || '';
    const trimmedText = rawText.trim();
    if (!trimmedText) return;

    if (trimmedText.length < 2) {
      setSpamToast({
        show: true,
        message: isVi ? 'Nội dung phản hồi quá ngắn (tối thiểu 2 ký tự).' : 'Reply is too short (min 2 characters).'
      });
      return;
    }

    const now = Date.now();

    // 3. Client heuristic spam checks:
    // a. Gửi liên tiếp quá nhanh (< 3 giây từ tin trước)
    if (now - lastReplySendTimeRef.current < 3000) {
      DiscussionService.setBlockUser(user.id, 40);
      setChatBlockedSeconds(40);
      setSpamToast({
        show: true,
        message: isVi
          ? 'Gửi tin quá nhanh! Hệ thống khóa gửi tin 40 giây.'
          : 'Posting too fast! Chat blocked for 40 seconds.'
      });
      return;
    }

    // b. Lặp lại ký tự spam (aaaaaa, ........., !!!!!!!)
    const hasCharSpam = /(.)\1{5,}/u.test(trimmedText);
    // c. Lặp từ spam (ví dụ lặp cùng một từ 4 lần trở lên)
    const words = trimmedText.split(/\s+/);
    const hasWordSpam = words.length >= 4 && words.slice(1).every(w => w.toLowerCase() === words[0].toLowerCase());
    // d. Trùng lặp nội dung với tin vừa gửi trong vòng 60s
    const isDuplicate = lastReplyTextRef.current.toLowerCase() === trimmedText.toLowerCase() && (now - lastReplySendTimeRef.current < 60000);

    if (hasCharSpam || hasWordSpam || isDuplicate) {
      DiscussionService.setBlockUser(user.id, 40);
      setChatBlockedSeconds(40);
      setSpamToast({
        show: true,
        message: isVi
          ? (isDuplicate
            ? 'Trùng lặp nội dung tin nhắn trước! Bị khóa gửi tin 40 giây.'
            : 'Phát hiện nội dung có dấu hiệu spam! Bị khóa gửi tin 40 giây.')
          : 'Spam pattern or duplicate message detected! Blocked for 40 seconds.'
      });
      return;
    }

    const userAvatar = user?.user_metadata?.avatar_url || user?.user_metadata?.picture || userProfile?.avatar_url || userProfile?.avatar;

    setReplySubmitting(prev => ({ ...prev, [discussionId]: true }));

    try {
      const createdReply = await DiscussionService.createReply({
        discussionId,
        userId: user.id,
        userEmail: user.email,
        userName: userProfile?.display_name || user.user_metadata?.full_name || user.user_metadata?.name || user.email.split('@')[0],
        userAvatar: userAvatar,
        content: trimmedText,
        isAdminReply: isAdmin
      });

      lastReplySendTimeRef.current = Date.now();
      lastReplyTextRef.current = trimmedText;

      setDiscussions(prev => prev.map(disc => {
        if (disc.id === discussionId) {
          return {
            ...disc,
            replies: [...(disc.replies || []), createdReply]
          };
        }
        return disc;
      }));

      setReplyInputs(prev => ({ ...prev, [discussionId]: '' }));
    } catch (err) {
      if (err.isSpamBlock || err.message === 'SPAM_BLOCKED_40S') {
        const seconds = err.blockedSeconds || 40;
        DiscussionService.setBlockUser(user.id, seconds);
        setChatBlockedSeconds(seconds);
        setSpamToast({
          show: true,
          message: isVi
            ? `Server đã kích hoạt khóa 40 giây do gửi quá nhanh hoặc spam.`
            : `Server triggered a 40s block due to rapid chatting or spam.`
        });
      } else {
        console.error('[Discussions] Create reply error:', err);
        setSpamToast({
          show: true,
          message: err.message || (isVi ? 'Không thể gửi phản hồi.' : 'Failed to send reply.')
        });
      }
    } finally {
      setReplySubmitting(prev => ({ ...prev, [discussionId]: false }));
    }
  };

  // Filter logic
  const filteredDiscussions = discussions.filter(item => {
    const matchesVersion = selectedVersion === 'all' || item.release_version.toLowerCase() === selectedVersion.toLowerCase();
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const matchesSearch = !searchQuery.trim() ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesVersion && matchesType && matchesSearch;
  });

  const getTypeBadge = (type) => {
    switch (type) {
      case 'bug':
        return <span className="inline-flex items-center gap-1.5 text-xs px-3 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/30 font-sans font-medium"><Bug size={13} /> {isVi ? 'Báo lỗi' : 'Bug Report'}</span>;
      case 'feature':
        return <span className="inline-flex items-center gap-1.5 text-xs px-3 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/30 font-sans font-medium"><Lightbulb size={13} /> {isVi ? 'Ý tưởng' : 'Feature'}</span>;
      case 'feedback':
        return <span className="inline-flex items-center gap-1.5 text-xs px-3 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-sans font-medium"><MessageCircle size={13} /> {isVi ? 'Phản hồi' : 'Feedback'}</span>;
      default:
        return <span className="inline-flex items-center gap-1.5 text-xs px-3 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-sans font-medium"><MessageSquare size={13} /> {isVi ? 'Thảo luận' : 'Discussion'}</span>;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'resolved':
        return <span className="inline-flex items-center gap-1.5 text-xs px-3 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-sans font-semibold"><CheckCircle2 size={12} /> {isVi ? 'Đã giải quyết' : 'Resolved'}</span>;
      case 'in_progress':
        return <span className="inline-flex items-center gap-1.5 text-xs px-3 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 font-sans font-semibold"><Clock size={12} /> {isVi ? 'Đang xử lý' : 'In Progress'}</span>;
      default:
        return null;
    }
  };

  return (
    <div id="discussions" className="w-full bg-[#07090D] [html[data-theme='light']_&]:bg-[#F8FAFC] text-slate-100 [html[data-theme='light']_&]:text-slate-800 min-h-[calc(100vh-73px)] font-sans text-left relative flex flex-col">

      {/* Full-width Terminal Header Bar */}
      <div className="w-full border-b border-white/5 [html[data-theme='light']_&]:border-slate-200/80 py-4 px-6 lg:px-10 bg-[#07090D] [html[data-theme='light']_&]:bg-white relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400 [html[data-theme='light']_&]:text-slate-500 font-sans">
          <div className="flex items-center gap-3">
            <span className="text-white [html[data-theme='light']_&]:text-slate-900 font-mono font-bold tracking-wider uppercase text-xs">AEVUM TTY DISCUSSIONS SHELL v1.0.0</span>
          </div>
          <div className="flex items-center text-xs text-slate-400 [html[data-theme='light']_&]:text-slate-500 font-sans">
            <span>{isVi ? 'Sử dụng bộ lọc hoặc click chọn bài thảo luận' : 'Use filter options or click discussion posts'}</span>
          </div>
        </div>
      </div>

      {/* Main Terminal Shell Body Container - 2-Column Grid (Full-height Vertical Border Divider & Bottom Border) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch relative z-10 w-full text-left font-sans flex-1 min-h-[500px] border-b border-white/5 [html[data-theme='light']_&]:border-slate-200/80">

        {/* ── LEFT COLUMN: Discussions Feed & Controls (7 cols with right vertical border) ── */}
        <div className="lg:col-span-7 space-y-6 font-sans lg:border-r border-b lg:border-b-0 border-white/5 [html[data-theme='light']_&]:border-slate-200/80 px-6 lg:px-10 py-8 h-full">

          {/* Feed Header & Control Bar */}
          <div className="space-y-4">
            {/* LOCATION Breadcrumb & New Discussion Button */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-sans font-semibold tracking-wide uppercase">
                <span className="text-slate-400 [html[data-theme='light']_&]:text-slate-500">LOCATION:</span>
                <span className="text-slate-200 [html[data-theme='light']_&]:text-slate-800">~/DISCUSSIONS</span>
              </div>

              {/* New Discussion Button - Flat Pill */}
              <button
                onClick={handleOpenCreateModal}
                className="h-9 px-5 bg-white text-black hover:bg-slate-100 [html[data-theme='light']_&]:bg-[#0F172A] [html[data-theme='light']_&]:text-white [html[data-theme='light']_&]:hover:bg-[#1E293B] rounded-full flex items-center gap-2 text-xs sm:text-sm font-medium font-sans transition-all duration-200 cursor-pointer whitespace-nowrap active:scale-[0.98] select-none shadow-sm"
              >
                <Plus size={15} />
                <span>{isVi ? 'Tạo Thảo Luận' : 'New Discussion'}</span>
              </button>
            </div>

            {/* Mini Compact Filter Bar (Flat Pill Uniform Height) */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">

              {/* Left Group: Search Input + Category Pills */}
              <div className="flex items-center gap-2.5 flex-wrap flex-1">
                {/* Search Input - Pill */}
                <div className="relative min-w-[200px] flex-1 sm:flex-none sm:w-64 h-9 flex items-center">
                  <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={isVi ? 'Tìm kiếm bài viết...' : 'Search discussions...'}
                    className="w-full h-9 bg-[#07080e] [html[data-theme='light']_&]:bg-white border border-white/10 [html[data-theme='light']_&]:border-slate-200 focus:border-white/30 [html[data-theme='light']_&]:focus:border-slate-400 rounded-full pl-9 pr-3 text-sm text-slate-200 [html[data-theme='light']_&]:text-slate-800 placeholder-slate-500 [html[data-theme='light']_&]:placeholder-slate-400 outline-none font-sans transition-all flex items-center"
                  />
                </div>

                {/* Category Filter Tabs - Flat Pill */}
                <div className="flex items-center gap-1 bg-[#07080e] [html[data-theme='light']_&]:bg-slate-100/80 border border-white/10 [html[data-theme='light']_&]:border-slate-200 rounded-full p-1 font-sans text-xs sm:text-sm h-9 box-border">
                  {[
                    { id: 'all', label: isVi ? 'Tất cả' : 'All' },
                    { id: 'bug', label: isVi ? 'Lỗi' : 'Bugs' },
                    { id: 'feature', label: isVi ? 'Ý tưởng' : 'Ideas' },
                    { id: 'feedback', label: isVi ? 'Góp ý' : 'Feedback' }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedType(tab.id)}
                      className={`h-full px-3.5 rounded-full flex items-center justify-center text-center whitespace-nowrap transition-all duration-200 cursor-pointer font-medium ${selectedType === tab.id
                        ? 'bg-white text-black [html[data-theme=\'light\']_&]:bg-[#0F172A] [html[data-theme=\'light\']_&]:text-white font-semibold shadow-xs'
                        : 'text-slate-400 hover:text-white [html[data-theme=\'light\']_&]:text-slate-600 [html[data-theme=\'light\']_&]:hover:text-slate-900'
                        }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Group: Version Select Dropdown */}
              <div className="min-w-[150px] sm:min-w-[180px]">
                <CustomSelect
                  options={versionFilterOptions}
                  value={selectedVersion}
                  onChange={(val) => setSelectedVersion(val)}
                  className="h-9 text-xs sm:text-sm"
                  buttonClassName="h-9 py-0 px-3.5 text-xs sm:text-sm text-slate-300 hover:text-white [html[data-theme='light']_&]:text-slate-700 [html[data-theme='light']_&]:hover:text-slate-900 font-sans flex items-center justify-between rounded-full"
                />
              </div>

            </div>
          </div>

          {/* Discussions Feed List (Skeleton Loading or Real Cards) */}
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="bg-[#07080e] [html[data-theme='light']_&]:bg-white border border-white/10 [html[data-theme='light']_&]:border-slate-200 rounded-md p-5 font-mono space-y-4 animate-pulse relative overflow-hidden"
                >
                  {/* Top Shimmer Meta Header */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-14 bg-white/10 [html[data-theme='light']_&]:bg-slate-200 rounded" />
                      <div className="h-5 w-16 bg-white/10 [html[data-theme='light']_&]:bg-slate-200 rounded" />
                      <div className="h-5 w-20 bg-white/5 [html[data-theme='light']_&]:bg-slate-100 rounded" />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-white/10 [html[data-theme='light']_&]:bg-slate-200 rounded-full" />
                      <div className="h-3.5 w-24 bg-white/10 [html[data-theme='light']_&]:bg-slate-200 rounded" />
                    </div>
                  </div>

                  {/* Skeleton Title */}
                  <div className="space-y-2 pt-1">
                    <div className="h-5 w-3/4 bg-white/10 [html[data-theme='light']_&]:bg-slate-200 rounded" />
                  </div>

                  {/* Skeleton Content Paragraph */}
                  <div className="space-y-2">
                    <div className="h-3.5 w-full bg-white/5 [html[data-theme='light']_&]:bg-slate-100 rounded" />
                    <div className="h-3.5 w-5/6 bg-white/5 [html[data-theme='light']_&]:bg-slate-100 rounded" />
                  </div>

                  {/* Skeleton Reply Box */}
                  <div className="p-3 rounded bg-[#07090D] [html[data-theme='light']_&]:bg-slate-50 border border-white/5 [html[data-theme='light']_&]:border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-white/10 [html[data-theme='light']_&]:bg-slate-200 rounded-full" />
                        <div className="h-3 w-28 bg-white/10 [html[data-theme='light']_&]:bg-slate-200 rounded" />
                      </div>
                      <div className="h-3 w-12 bg-white/5 [html[data-theme='light']_&]:bg-slate-100 rounded" />
                    </div>
                    <div className="h-3 w-4/5 bg-white/5 [html[data-theme='light']_&]:bg-slate-100 rounded" />
                  </div>

                  {/* Skeleton Chat Container */}
                  <div className="bg-[#07090D] [html[data-theme='light']_&]:bg-slate-50 border border-white/10 [html[data-theme='light']_&]:border-slate-200 rounded-md p-3 space-y-3">
                    <div className="h-6 w-full bg-white/5 [html[data-theme='light']_&]:bg-slate-100 rounded" />
                    <div className="flex items-center justify-between pt-1">
                      <div className="h-4 w-36 bg-white/5 [html[data-theme='light']_&]:bg-slate-100 rounded" />
                      <div className="h-7 w-16 bg-cyan-500/10 border border-cyan-500/20 rounded" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredDiscussions.length === 0 ? (
            <div className="py-16 text-center bg-[#07080e] [html[data-theme='light']_&]:bg-white border border-white/10 [html[data-theme='light']_&]:border-slate-200 rounded-md p-8 font-mono">
              <AlertCircle size={28} className="mx-auto text-slate-600 [html[data-theme='light']_&]:text-slate-400 mb-3" />
              <p className="text-xs font-bold text-slate-300 [html[data-theme='light']_&]:text-slate-800">
                {isVi ? '[EMPTY] Chưa có bài thảo luận nào phù hợp' : '[EMPTY] No discussions match your filter'}
              </p>
              <p className="text-xs text-slate-500 [html[data-theme='light']_&]:text-slate-600 mt-1">
                {isVi ? 'Nhấn "+ Tạo Thảo Luận" phía trên để đăng bài đầu tiên!' : 'Click "+ New Discussion" above to post the first discussion!'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredDiscussions.map((item) => {
                const shouldTranslate = activeLang === 'en' ? !manualTranslate[item.id] : manualTranslate[item.id];
                const targetLang = activeLang === 'en' ? 'en' : 'vi';
                const displayTitle = (shouldTranslate && translatedCache[`${item.id}_title_${targetLang}`]) || item.title;
                const displayContent = (shouldTranslate && translatedCache[`${item.id}_content_${targetLang}`]) || item.content;

                return (
                  <div
                    key={item.id}
                    className={`discussion-card bg-[#07080e]/40 [html[data-theme='light']_&]:bg-white/60 rounded-2xl p-5 sm:p-6 transition-all duration-300 relative font-sans group ${
                      activeMenuId === item.id ? 'z-30' : 'z-0'
                    }`}
                  >
                    {/* Starfield / Floating Particles + Aurora Radial Glow Background */}
                    <DiscussionCardAtmosphere type={item.type} />

                    {/* Top Meta Header */}
                    <div className={`relative flex flex-wrap items-center justify-between gap-2 mb-3 ${
                      activeMenuId === item.id ? 'z-40' : 'z-10'
                    }`}>
                      {/* Left: Version & Type Badges + Translate Badge */}
                      <div className="flex items-center gap-2 flex-wrap font-sans">
                        <span className="text-xs font-sans font-medium px-3 py-0.5 rounded-full bg-white/5 [html[data-theme='light']_&]:bg-slate-100 text-slate-300 [html[data-theme='light']_&]:text-slate-700 border border-white/10 [html[data-theme='light']_&]:border-slate-200">
                          {item.release_version}
                        </span>
                        {getTypeBadge(item.type)}
                        {getStatusBadge(item.status)}

                        {/* Quick Card Translate Toggle Button - Flat Pill */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setManualTranslate(prev => ({ ...prev, [item.id]: !prev[item.id] }));
                          }}
                          className={`px-3 py-1 rounded-full text-xs font-sans font-medium flex items-center gap-1.5 transition-all duration-200 cursor-pointer ${shouldTranslate
                            ? 'bg-white text-black [html[data-theme=\'light\']_&]:bg-[#0F172A] [html[data-theme=\'light\']_&]:text-white font-semibold shadow-xs'
                            : 'bg-white/5 text-slate-300 hover:text-white border border-white/10 hover:border-white/20 [html[data-theme=\'light\']_&]:bg-slate-100 [html[data-theme=\'light\']_&]:text-slate-700 [html[data-theme=\'light\']_&]:border-slate-200'
                            }`}
                          title={shouldTranslate ? (isVi ? 'Xem bản gốc' : 'Show original') : (isVi ? 'Xem bản dịch' : 'Translate post')}
                        >
                          <Languages size={13} />
                          <span>{shouldTranslate ? (isVi ? 'Đã dịch' : 'Translated') : (isVi ? 'Dịch' : 'Translate')}</span>
                        </button>
                      </div>

                      {/* Right: Author Info & 3-Dots Admin Menu */}
                      <div className="flex items-center gap-3 text-xs sm:text-[13px] font-sans text-slate-400 [html[data-theme='light']_&]:text-slate-500">
                        <div className="flex items-center gap-2">
                          {item.user_avatar || item.avatar_url || (user && item.user_id === user.id && (user.user_metadata?.avatar_url || user.user_metadata?.picture)) ? (
                            <img
                              src={item.user_avatar || item.avatar_url || user.user_metadata?.avatar_url || user.user_metadata?.picture}
                              alt={item.user_name || 'User'}
                              className="w-5 h-5 rounded-full object-cover border border-white/20 [html[data-theme='light']_&]:border-slate-300 shrink-0"
                              onError={(e) => { e.target.style.display = 'none'; }}
                            />
                          ) : (
                            <User size={13} className="text-slate-500 shrink-0" />
                          )}
                          <span className="text-slate-200 [html[data-theme='light']_&]:text-slate-800 font-semibold">{item.user_name || item.user_email?.split('@')[0]}</span>
                          <span className="text-slate-600 [html[data-theme='light']_&]:text-slate-300">•</span>
                          <span>{new Date(item.created_at).toLocaleDateString()}</span>
                        </div>

                        {/* 3-Dots Menu Button (Top Right) */}
                        {isAdmin && (
                          <div className="relative z-50">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveMenuId(prev => prev === item.id ? null : item.id);
                              }}
                              className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/10 [html[data-theme='light']_&]:text-slate-500 [html[data-theme='light']_&]:hover:text-slate-900 [html[data-theme='light']_&]:hover:bg-slate-100 transition-colors cursor-pointer flex items-center justify-center"
                              title={isVi ? 'Tùy chọn bài viết' : 'Options'}
                            >
                              <MoreVertical size={14} />
                            </button>

                            {/* Floating Dropdown Menu */}
                            {activeMenuId === item.id && (
                              <div
                                onClick={(e) => e.stopPropagation()}
                                className="absolute right-0 top-8 w-52 bg-[#0d1017] [html[data-theme='light']_&]:bg-white border border-white/15 [html[data-theme='light']_&]:border-slate-200/90 rounded-xl p-1.5 shadow-[0_14px_45px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.08)] [html[data-theme='light']_&]:shadow-2xl z-50 font-sans text-xs space-y-1 text-left backdrop-blur-2xl"
                              >
                                <div className="px-2 py-1 text-[10px] text-slate-400 [html[data-theme='light']_&]:text-slate-500 font-bold uppercase tracking-wider border-b border-white/5 [html[data-theme='light']_&]:border-slate-100 mb-1">
                                  {isVi ? 'Thao tác Admin' : 'Admin Actions'}
                                </div>

                                {/* Status Options */}
                                <div className="space-y-0.5">
                                  <button
                                    onClick={() => { handleUpdateStatus(item.id, 'open'); setActiveMenuId(null); }}
                                    className={`w-full text-left px-2 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${(item.status || 'open') === 'open' ? 'text-cyan-300 [html[data-theme=\'light\']_&]:text-cyan-700 font-bold bg-cyan-500/15 [html[data-theme=\'light\']_&]:bg-cyan-50' : 'text-slate-300 [html[data-theme=\'light\']_&]:text-slate-700 hover:bg-white/5 [html[data-theme=\'light\']_&]:hover:bg-slate-100'
                                      }`}
                                  >
                                    <span>{isVi ? 'Đánh dấu: Mở' : 'Mark: Open'}</span>
                                    {(item.status || 'open') === 'open' && <CheckCircle2 size={12} className="text-cyan-300 [html[data-theme='light']_&]:text-cyan-700" />}
                                  </button>

                                  <button
                                    onClick={() => { handleUpdateStatus(item.id, 'in_progress'); setActiveMenuId(null); }}
                                    className={`w-full text-left px-2 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${item.status === 'in_progress' ? 'text-amber-300 [html[data-theme=\'light\']_&]:text-amber-700 font-bold bg-amber-500/15 [html[data-theme=\'light\']_&]:bg-amber-50' : 'text-slate-300 [html[data-theme=\'light\']_&]:text-slate-700 hover:bg-white/5 [html[data-theme=\'light\']_&]:hover:bg-slate-100'
                                      }`}
                                  >
                                    <span>{isVi ? 'Đánh dấu: Đang xử lý' : 'Mark: In Progress'}</span>
                                    {item.status === 'in_progress' && <CheckCircle2 size={12} className="text-amber-300 [html[data-theme='light']_&]:text-amber-700" />}
                                  </button>

                                  <button
                                    onClick={() => { handleUpdateStatus(item.id, 'resolved'); setActiveMenuId(null); }}
                                    className={`w-full text-left px-2 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${item.status === 'resolved' ? 'text-emerald-300 [html[data-theme=\'light\']_&]:text-emerald-700 font-bold bg-emerald-500/15 [html[data-theme=\'light\']_&]:bg-emerald-50' : 'text-slate-300 [html[data-theme=\'light\']_&]:text-slate-700 hover:bg-white/5 [html[data-theme=\'light\']_&]:hover:bg-slate-100'
                                      }`}
                                  >
                                    <span>{isVi ? 'Đánh dấu: Đã giải quyết' : 'Mark: Resolved'}</span>
                                    {item.status === 'resolved' && <CheckCircle2 size={12} className="text-emerald-300 [html[data-theme='light']_&]:text-emerald-700" />}
                                  </button>
                                </div>

                                <div className="border-t border-white/10 [html[data-theme='light']_&]:border-slate-100 my-1" />

                                {/* Delete Option */}
                                <button
                                  onClick={() => { setActiveMenuId(null); handleDeleteDiscussion(item.id); }}
                                  className="w-full text-left px-2 py-1.5 rounded-lg text-xs text-red-400 [html[data-theme='light']_&]:text-red-600 hover:bg-red-500/15 [html[data-theme='light']_&]:hover:bg-red-50 flex items-center gap-2 transition-colors font-semibold"
                                >
                                  <Trash2 size={12} />
                                  <span>{isVi ? 'Xóa bài thảo luận' : 'Delete Discussion'}</span>
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Discussion Title & Content */}
                    <h3
                      onClick={() => setDetailDiscussionId(item.id)}
                      className="relative z-[2] text-lg sm:text-xl font-bold text-white [html[data-theme='light']_&]:text-slate-900 mb-2 font-sans tracking-tight leading-snug cursor-pointer hover:opacity-75 transition-opacity duration-200"
                    >
                      {displayTitle}
                    </h3>
                    <p
                      onClick={() => setDetailDiscussionId(item.id)}
                      className="relative z-[2] text-[14px] sm:text-[14.5px] font-light text-slate-300 [html[data-theme='light']_&]:text-slate-600 leading-relaxed mb-4 whitespace-pre-line font-sans line-clamp-3 cursor-pointer"
                    >
                      {displayContent}
                    </p>

                    {/* Compact Card Action Toolbar */}
                    <div className="relative z-[2] flex items-center justify-between pt-1 font-sans text-xs">
                      {/* Left: Upvote Pill + Comment Count Pill */}
                      <div className="flex items-center gap-2.5">
                        {/* Flat Pill Upvote Button */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleUpvote(item.id);
                          }}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-sans font-medium transition-all duration-200 cursor-pointer ${
                            upvotedPosts[item.id]
                              ? 'bg-white text-black [html[data-theme=\'light\']_&]:bg-[#0F172A] [html[data-theme=\'light\']_&]:text-white font-semibold shadow-xs'
                              : 'bg-white/5 text-slate-300 hover:text-white border border-white/10 hover:border-white/20 [html[data-theme=\'light\']_&]:bg-slate-100 [html[data-theme=\'light\']_&]:text-slate-700 [html[data-theme=\'light\']_&]:border-slate-200'
                          }`}
                          title={upvotedPosts[item.id] ? (isVi ? 'Đã Upvote' : 'Upvoted') : (isVi ? 'Upvote bài viết' : 'Upvote discussion')}
                        >
                          <ChevronUp size={13} className={upvotedPosts[item.id] ? 'stroke-[2.5]' : ''} />
                          <span>{item.upvotes ?? 0}</span>
                        </button>

                        {/* Comments Count Button - Click opens Detail Modal */}
                        <button
                          type="button"
                          onClick={() => setDetailDiscussionId(item.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-sans font-medium bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10 hover:border-white/20 [html[data-theme=\'light\']_&]:bg-slate-100 [html[data-theme=\'light\']_&]:text-slate-700 [html[data-theme=\'light\']_&]:border-slate-200 [html[data-theme=\'light\']_&]:hover:bg-slate-200/80 transition-all cursor-pointer"
                          title={isVi ? 'Xem bình luận' : 'View comments'}
                        >
                          <MessageSquare size={13} />
                          <span>{item.replies?.length || 0} {isVi ? 'bình luận' : 'comments'}</span>
                        </button>
                      </div>

                      {/* Right: "Xem chi tiết" CTA Button */}
                      <button
                        type="button"
                        onClick={() => setDetailDiscussionId(item.id)}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white [html[data-theme='light']_&]:text-slate-500 [html[data-theme='light']_&]:hover:text-slate-900 transition-colors cursor-pointer group/btn"
                      >
                        <span>{isVi ? 'Xem chi tiết' : 'View details'}</span>
                        <ArrowRight size={13} className="group-hover/btn:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ── RIGHT COLUMN: Tester Leaderboard Widget (5 cols) ── */}
        <div className="lg:col-span-5 px-4 lg:px-8 py-8 h-full">
          <TesterLeaderboard
            discussions={discussions}
            activeLang={activeLang}
            user={user}
            onOpenAuthModal={onOpenAuthModal}
          />
        </div>
      </div>

      {/* ── CREATE DISCUSSION POPUP MODAL (Using reusable UI Modal) ── */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title={isVi ? 'Tạo Thảo Luận Mới' : 'Create New Discussion'}
        maxWidth="lg"
      >
        <form onSubmit={handleCreateDiscussion} className="space-y-4 pt-0.5">

          {/* Row 1: Release Version (5 cols) + Category (7 cols) */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            {/* Release Version Select using system CustomSelect UI */}
            <div className="sm:col-span-5">
              <label className="block text-xs sm:text-sm font-semibold text-slate-300 [html[data-theme='light']_&]:text-slate-700 mb-1.5 font-sans">
                Release Version:
              </label>
              <CustomSelect
                options={versionCreateOptions}
                value={newVersion}
                onChange={(val) => setNewVersion(val)}
                className="h-9 text-xs sm:text-sm"
                buttonClassName="h-9 py-0 px-3 text-xs sm:text-sm text-slate-300 hover:text-white [html[data-theme='light']_&]:text-slate-700 [html[data-theme='light']_&]:hover:text-slate-900 font-sans flex items-center justify-between"
              />
            </div>

            {/* Category Select Buttons */}
            <div className="sm:col-span-7">
              <label className="block text-xs sm:text-sm font-semibold text-slate-300 [html[data-theme='light']_&]:text-slate-700 mb-1.5 font-sans">
                Category:
              </label>
              <div className="grid grid-cols-3 gap-1 bg-[#07090D] [html[data-theme='light']_&]:bg-slate-100 border border-white/10 [html[data-theme='light']_&]:border-slate-200 rounded-md p-0.5 h-9 items-center">
                {[
                  { id: 'bug', label: isVi ? 'Báo Lỗi' : 'Bug' },
                  { id: 'feature', label: isVi ? 'Ý Tưởng' : 'Feature' },
                  { id: 'feedback', label: isVi ? 'Phản Hồi' : 'Feedback' }
                ].map(cat => (
                  <button
                    type="button"
                    key={cat.id}
                    onClick={() => setNewType(cat.id)}
                    className={`h-full px-3 rounded-full text-xs sm:text-sm font-sans font-medium transition-all duration-200 cursor-pointer flex items-center justify-center ${
                      newType === cat.id
                        ? 'bg-white text-black [html[data-theme=\'light\']_&]:bg-[#0F172A] [html[data-theme=\'light\']_&]:text-white font-semibold shadow-xs'
                        : 'text-slate-400 hover:text-white [html[data-theme=\'light\']_&]:text-slate-600 [html[data-theme=\'light\']_&]:hover:text-slate-900'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Row 2: Title Input (120 chars limit) */}
          <div>
            <div className="flex items-center justify-between mb-1.5 font-sans">
              <label className="block text-xs sm:text-sm font-semibold text-slate-300 [html[data-theme='light']_&]:text-slate-700">
                Title:
              </label>
              <span className="text-xs text-slate-500 [html[data-theme='light']_&]:text-slate-400">
                {newTitle.length}/120
              </span>
            </div>
            <input
              type="text"
              required
              maxLength={120}
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder={isVi ? 'Tóm tắt nội dung thảo luận hoặc báo lỗi...' : 'Brief summary of discussion or bug...'}
              className="w-full bg-[#07090D] [html[data-theme='light']_&]:bg-slate-50 border border-white/10 [html[data-theme='light']_&]:border-slate-200 focus:border-white/30 [html[data-theme='light']_&]:focus:border-slate-400 rounded-full px-4 text-sm text-slate-200 [html[data-theme='light']_&]:text-slate-800 placeholder-slate-500 [html[data-theme='light']_&]:placeholder-slate-400 outline-none font-sans h-9"
            />
          </div>

          {/* Row 3: Content Textarea (1000 chars limit) */}
          <div>
            <div className="flex items-center justify-between mb-1.5 font-sans">
              <label className="block text-xs sm:text-sm font-semibold text-slate-300 [html[data-theme='light']_&]:text-slate-700">
                Details:
              </label>
              <span className="text-xs text-slate-500 [html[data-theme='light']_&]:text-slate-400">
                {newContent.length}/1000
              </span>
            </div>
            <textarea
              required
              rows={4}
              maxLength={1000}
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder={isVi ? 'Mô tả chi tiết các bước tái hiện hoặc góp ý...' : 'Describe steps to reproduce or details...'}
              className="w-full bg-[#07090D] [html[data-theme='light']_&]:bg-slate-50 border border-white/10 [html[data-theme='light']_&]:border-slate-200 focus:border-white/30 [html[data-theme='light']_&]:focus:border-slate-400 rounded-xl p-3.5 text-sm text-slate-200 [html[data-theme='light']_&]:text-slate-800 placeholder-slate-500 [html[data-theme='light']_&]:placeholder-slate-400 outline-none font-sans resize-none h-24 overflow-y-auto leading-relaxed"
            />
          </div>

          {/* Row 4: Modal Footer Action Buttons - Flat Pill Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10 [html[data-theme='light']_&]:border-slate-200">
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(false)}
              className="px-5 py-2 rounded-full text-sm font-sans text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 [html[data-theme='light']_&]:bg-slate-100 [html[data-theme='light']_&]:text-slate-700 [html[data-theme='light']_&]:border-slate-200 transition-all cursor-pointer select-none"
            >
              {isVi ? 'Hủy' : 'Cancel'}
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center gap-1.5 text-sm font-medium text-black bg-white hover:bg-slate-100 [html[data-theme='light']_&]:bg-[#0F172A] [html[data-theme='light']_&]:text-white [html[data-theme='light']_&]:hover:bg-[#1E293B] transition-all duration-200 font-sans cursor-pointer px-6 py-2 rounded-full shadow-sm active:scale-[0.98] select-none"
            >
              <Plus size={15} />
              <span>{submitting ? (isVi ? 'Đang gửi...' : 'Sending...') : (isVi ? 'Gửi Thảo Luận' : 'Submit Discussion')}</span>
            </button>
          </div>

        </form>
      </Modal>
      {/* ── DISCUSSION DETAIL & REPLIES MODAL (Using reusable UI Modal - Landscape 2-Column like PaymentModal) ── */}
      {activeDiscussion && (
        <Modal
          isOpen={Boolean(detailDiscussionId && activeDiscussion)}
          onClose={() => setDetailDiscussionId(null)}
          maxWidth="4xl"
          hideHeaderBorder={true}
          grainy={true}
          className="h-[84vh] min-h-[580px] max-h-[88vh]"
          title={
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="text-sm font-bold uppercase tracking-wider text-white [html[data-theme='light']_&]:text-slate-900 font-sans">
                {isVi ? 'Chi Tiết Thảo Luận' : 'Discussion Details'}
              </span>
              <span className="text-xs font-mono font-medium px-2.5 py-0.5 rounded-full bg-white/5 [html[data-theme='light']_&]:bg-slate-100 text-slate-300 [html[data-theme='light']_&]:text-slate-700 border border-white/10 [html[data-theme='light']_&]:border-slate-200">
                {activeDiscussion.release_version}
              </span>
              {getTypeBadge(activeDiscussion.type)}
              {getStatusBadge(activeDiscussion.status)}
            </div>
          }
          subtitle={
            <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap text-xs text-slate-400 [html[data-theme='light']_&]:text-slate-500 font-normal">
              <span>
                {isVi ? `Phiên bản ${activeDiscussion.release_version}` : `Version ${activeDiscussion.release_version}`}
              </span>
              <span>
                {isVi
                  ? `Đăng bởi ${activeDiscussion.user_name || activeDiscussion.user_email?.split('@')[0]}`
                  : `Posted by ${activeDiscussion.user_name || activeDiscussion.user_email?.split('@')[0]}`}
              </span>
              <span>
                {new Date(activeDiscussion.created_at).toLocaleDateString()}
              </span>
            </div>
          }
        >
          {/* ── TOP AUTHOR INFO STRIP (Full width above 2 columns) ── */}
          <div className="flex flex-col h-full space-y-3.5 font-sans text-left">
            <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-white/[0.02] [html[data-theme='light']_&]:bg-slate-50 shrink-0">
              <div className="flex items-center gap-2.5">
                {activeDiscussion.user_avatar || activeDiscussion.avatar_url || (user && activeDiscussion.user_id === user.id && (user.user_metadata?.avatar_url || user.user_metadata?.picture)) ? (
                  <img
                    src={activeDiscussion.user_avatar || activeDiscussion.avatar_url || user.user_metadata?.avatar_url || user.user_metadata?.picture}
                    alt={activeDiscussion.user_name || 'User'}
                    className="w-8 h-8 rounded-full object-cover border border-white/20 [html[data-theme='light']_&]:border-slate-300 shrink-0 shadow-2xs"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-white/10 [html[data-theme='light']_&]:bg-slate-200 flex items-center justify-center shrink-0 border border-white/10 [html[data-theme='light']_&]:border-slate-300">
                    <User size={15} className="text-slate-400 [html[data-theme='light']_&]:text-slate-600" />
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-semibold text-white [html[data-theme='light']_&]:text-slate-900 leading-none">
                      {activeDiscussion.user_name || activeDiscussion.user_email?.split('@')[0]}
                    </span>
                    {(activeDiscussion.user_email === 'hainguyen011@gmail.com' || activeDiscussion.user_email?.includes('admin')) && (
                      <span title={isVi ? 'Quản trị viên' : 'Admin'} className="inline-flex items-center text-cyan-400 [html[data-theme='light']_&]:text-blue-600">
                        <ShieldCheck size={14} className="shrink-0" />
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500 [html[data-theme='light']_&]:text-slate-400 mt-1 font-mono">
                    {new Date(activeDiscussion.created_at).toLocaleDateString()} {new Date(activeDiscussion.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>

              {/* Translate button */}
              <button
                type="button"
                onClick={() => setManualTranslate(prev => ({ ...prev, [activeDiscussion.id]: !prev[activeDiscussion.id] }))}
                className={`px-3 py-1 rounded-full text-xs font-sans font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                  (activeLang === 'en' ? !manualTranslate[activeDiscussion.id] : manualTranslate[activeDiscussion.id])
                    ? 'bg-white text-black [html[data-theme=\'light\']_&]:bg-[#0F172A] [html[data-theme=\'light\']_&]:text-white font-semibold shadow-xs'
                    : 'bg-white/5 text-slate-300 hover:text-white border border-white/10 [html[data-theme=\'light\']_&]:bg-slate-100 [html[data-theme=\'light\']_&]:text-slate-700'
                }`}
              >
                <Languages size={13} />
                <span>{(activeLang === 'en' ? !manualTranslate[activeDiscussion.id] : manualTranslate[activeDiscussion.id]) ? (isVi ? 'Đã dịch' : 'Translated') : (isVi ? 'Dịch' : 'Translate')}</span>
              </button>
            </div>

            {/* ── 2-COLUMN HORIZONTAL GRID: Title (Left) and Chat Area (Right) Perfectly Aligned at Same Height ── */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-stretch font-sans text-left flex-1 min-h-0">

              {/* ── LEFT COLUMN (7 cols): Post Content & Stats ── */}
              <div className="md:col-span-7 flex flex-col justify-between h-full space-y-3">
                <div className="space-y-2 flex-1 flex flex-col">
                  {/* Title of the Post (Aligned horizontally with Chat Area Header) */}
                  <h2 className="text-base sm:text-lg font-semibold text-white [html[data-theme='light']_&]:text-slate-900 tracking-tight leading-snug shrink-0 min-h-[28px] sm:min-h-[32px] flex items-center">
                    {((activeLang === 'en' ? !manualTranslate[activeDiscussion.id] : manualTranslate[activeDiscussion.id]) && translatedCache[`${activeDiscussion.id}_title_${activeLang === 'en' ? 'en' : 'vi'}`]) || activeDiscussion.title}
                  </h2>
                  <div className="flex-1 min-h-[160px] overflow-hidden flex flex-col pt-1">
                    <p className="text-[13.5px] sm:text-sm font-normal text-slate-300 [html[data-theme='light']_&]:text-slate-700 leading-relaxed whitespace-pre-line font-sans flex-1 overflow-y-auto pr-2 scrollbar-thin">
                      {((activeLang === 'en' ? !manualTranslate[activeDiscussion.id] : manualTranslate[activeDiscussion.id]) && translatedCache[`${activeDiscussion.id}_content_${activeLang === 'en' ? 'en' : 'vi'}`]) || activeDiscussion.content}
                    </p>
                  </div>
                </div>

                {/* Bottom Action Toolbar (No divider line) */}
                <div className="flex items-center justify-between pt-1 shrink-0">
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => handleToggleUpvote(activeDiscussion.id)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-sans font-medium transition-all duration-200 cursor-pointer ${
                        upvotedPosts[activeDiscussion.id]
                          ? 'bg-white text-black [html[data-theme=\'light\']_&]:bg-[#0F172A] [html[data-theme=\'light\']_&]:text-white font-semibold shadow-xs'
                          : 'bg-white/5 text-slate-300 hover:text-white border border-white/10 [html[data-theme=\'light\']_&]:bg-slate-100 [html[data-theme=\'light\']_&]:text-slate-700'
                      }`}
                    >
                      <ChevronUp size={14} className={upvotedPosts[activeDiscussion.id] ? 'stroke-[2.5]' : ''} />
                      <span>{activeDiscussion.upvotes ?? 0} Upvotes</span>
                    </button>

                    <div className="flex items-center gap-1.5 text-xs text-slate-400 [html[data-theme='light']_&]:text-slate-600 font-sans font-medium px-2 py-1">
                      <MessageSquare size={14} />
                      <span>{activeDiscussion.replies?.length || 0} {isVi ? 'Bình luận' : 'Comments'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── RIGHT COLUMN (5 cols): Comments Panel (No outer border or lines, height aligned with Title, no padding right) ── */}
              <div className="md:col-span-5 bg-transparent flex flex-col justify-between h-full space-y-3 p-0 pr-0">
                {/* Header of Right Panel (Height perfectly aligned with Title) */}
                <div className="flex items-center justify-between shrink-0 min-h-[28px] sm:min-h-[32px] pr-0">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300 [html[data-theme='light']_&]:text-slate-700 font-mono">
                    {isVi ? 'Danh Sách Bình Luận' : 'Comments List'}
                  </span>
                  <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-white/10 [html[data-theme='light']_&]:bg-slate-200 text-slate-300 [html[data-theme='light']_&]:text-slate-700">
                    {activeDiscussion.replies?.length || 0}
                  </span>
                </div>

                {/* Comments Thread Scroll Area (pr-0: No padding right) */}
                <div className="flex-1 overflow-y-auto space-y-3 pr-0 scrollbar-thin min-h-[160px] max-h-[350px]">
                {activeDiscussion.replies && activeDiscussion.replies.length > 0 ? (
                  activeDiscussion.replies.map((reply) => {
                    const isAdminRep = Boolean(reply.is_admin_reply || reply.user_email?.includes('admin') || reply.user_email === 'hainguyen011@gmail.com');
                    const targetLang = activeLang === 'en' ? 'en' : 'vi';
                    const shouldTrans = activeLang === 'en' ? !manualTranslate[activeDiscussion.id] : manualTranslate[activeDiscussion.id];
                    const displayReplyContent = (shouldTrans && translatedCache[`${reply.id}_reply_${targetLang}`]) || reply.content;
                    const avatarSrc = reply.user_avatar || reply.avatar_url || (user && reply.user_id === user.id ? (user.user_metadata?.avatar_url || user.user_metadata?.picture) : null);
                    const commenterName = reply.user_name || reply.user_email?.split('@')[0] || (isVi ? 'Người dùng' : 'User');

                    return (
                      <div
                        key={reply.id}
                        className="discussion-comment-item flex items-start gap-2.5 py-1 text-xs sm:text-sm font-sans"
                      >
                        {avatarSrc ? (
                          <img
                            src={avatarSrc}
                            alt={commenterName}
                            className="w-7 h-7 rounded-full object-cover border border-white/20 [html[data-theme='light']_&]:border-slate-300 shrink-0 mt-0.5 shadow-2xs"
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                        ) : (
                          <div className="w-7 h-7 rounded-full bg-white/10 [html[data-theme='light']_&]:bg-slate-200 flex items-center justify-center shrink-0 mt-0.5 border border-white/10 [html[data-theme='light']_&]:border-slate-300">
                            <User size={12} className="text-slate-400 [html[data-theme='light']_&]:text-slate-600" />
                          </div>
                        )}

                        <div className="flex-1 min-w-0 space-y-0.5">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="comment-author font-semibold text-xs text-slate-300 [html[data-theme='light']_&]:text-slate-800 leading-none">
                              {commenterName}
                            </span>
                            {isAdminRep && (
                              <span title={isVi ? 'Quản trị viên' : 'Admin'} className="inline-flex items-center text-cyan-400 [html[data-theme='light']_&]:text-blue-600">
                                <ShieldCheck size={12} className="shrink-0" />
                              </span>
                            )}
                            <span className="text-[10px] text-slate-500 [html[data-theme='light']_&]:text-slate-400 font-sans leading-none">
                              {new Date(reply.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>

                          <p className="comment-body text-xs text-slate-200 [html[data-theme='light']_&]:text-slate-700 font-normal leading-relaxed font-sans break-words whitespace-pre-wrap">
                            {displayReplyContent}
                          </p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="py-6 text-center flex flex-col items-center justify-center">
                    <MessageCircle size={20} className="text-slate-600 [html[data-theme='light']_&]:text-slate-400 mb-1.5" />
                    <p className="text-xs text-slate-400 [html[data-theme='light']_&]:text-slate-600 font-medium max-w-[200px]">
                      {isVi ? 'Chưa có bình luận nào. Hãy gửi phản hồi đầu tiên!' : 'No comments yet. Be the first to reply!'}
                    </p>
                  </div>
                )}
              </div>

              {/* Reply Box at Bottom of Right Panel (Only chatbox has border) */}
              <div className="pt-2 pr-0">
                <div className="discussion-reply-box bg-transparent border border-white/10 [html[data-theme='light']_&]:border-slate-200 focus-within:border-cyan-500/60 [html[data-theme='light']_&]:focus-within:border-cyan-500 rounded-xl p-2.5 space-y-2 transition-all shadow-none">
                  {/* Anti-spam countdown warning badge if blocked */}
                  {chatBlockedSeconds > 0 && (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-[11px] font-sans">
                      <Clock size={12} className="shrink-0 animate-spin text-red-400" />
                      <span>
                        {isVi
                          ? `Khóa tạm thời do spam. Mở lại sau ${chatBlockedSeconds}s.`
                          : `Temporarily locked. Wait ${chatBlockedSeconds}s.`}
                      </span>
                    </div>
                  )}

                  <textarea
                    rows={2}
                    maxLength={500}
                    disabled={chatBlockedSeconds > 0}
                    value={replyInputs[activeDiscussion.id] || ''}
                    onChange={(e) => {
                      setReplyInputs({ ...replyInputs, [activeDiscussion.id]: e.target.value });
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        if (chatBlockedSeconds > 0 || replySubmitting[activeDiscussion.id]) return;
                        handleAddReply(activeDiscussion.id);
                      }
                    }}
                    placeholder={
                      chatBlockedSeconds > 0
                        ? (isVi ? `Chờ ${chatBlockedSeconds}s...` : `Wait ${chatBlockedSeconds}s...`)
                        : !user
                          ? (isVi ? 'Đăng nhập để phản hồi...' : 'Sign in to reply...')
                          : isAdmin
                            ? (isVi ? 'Phản hồi với vai trò Admin...' : 'Reply as Admin...')
                            : (isVi ? 'Viết phản hồi (Enter để gửi)...' : 'Write reply (Enter to send)...')
                    }
                    className={`w-full bg-transparent border-0 outline-none p-0 text-xs sm:text-sm text-slate-200 [html[data-theme='light']_&]:text-slate-800 placeholder-slate-500 [html[data-theme='light']_&]:placeholder-slate-400 font-sans resize-none min-h-[44px] max-h-[90px] overflow-y-auto focus:ring-0 leading-relaxed ${
                      chatBlockedSeconds > 0 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  />

                  <div className="flex items-center justify-between pt-1 font-sans text-xs">
                    <span className="text-[11px] text-slate-500 [html[data-theme='light']_&]:text-slate-400">
                      {(replyInputs[activeDiscussion.id] || '').length}/500
                    </span>

                    {chatBlockedSeconds > 0 ? (
                      <button
                        type="button"
                        disabled
                        className="bg-red-500/10 text-red-400 border border-red-500/30 px-3 py-1 rounded-full text-xs font-medium font-sans flex items-center justify-center gap-1.5 cursor-not-allowed select-none shadow-sm shrink-0 whitespace-nowrap"
                        title={isVi ? `Đang bị chặn (${chatBlockedSeconds}s)` : `Blocked (${chatBlockedSeconds}s)`}
                      >
                        <Clock size={12} className="shrink-0 animate-spin text-red-400" />
                        <span>{isVi ? `Chặn (${chatBlockedSeconds}s)` : `Locked (${chatBlockedSeconds}s)`}</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAddReply(activeDiscussion.id)}
                        disabled={replySubmitting[activeDiscussion.id] || !(replyInputs[activeDiscussion.id] || '').trim()}
                        className="bg-white text-black hover:bg-slate-100 [html[data-theme='light']_&]:bg-[#0F172A] [html[data-theme='light']_&]:text-white [html[data-theme='light']_&]:hover:bg-[#1E293B] px-4 py-1 rounded-full text-xs font-semibold font-sans flex items-center justify-center gap-1.5 cursor-pointer transition-all duration-200 disabled:opacity-40 active:scale-[0.98] select-none shadow-sm shrink-0 whitespace-nowrap"
                        title={isVi ? 'Gửi phản hồi' : 'Send reply'}
                      >
                        <Send size={12} className="shrink-0" />
                        <span>{replySubmitting[activeDiscussion.id] ? (isVi ? 'Đang gửi...' : 'Sending...') : (isVi ? 'Gửi' : 'Send')}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    )}

      {/* ── ANTI-SPAM FLOATING NOTIFICATION TOAST ── */}
      {spamToast.show && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-[#0b0d14]/95 [html[data-theme='light']_&]:bg-white/95 backdrop-blur-md border border-red-500/30 text-white [html[data-theme='light']_&]:text-slate-900 shadow-2xl font-sans text-xs sm:text-sm animate-in fade-in slide-in-from-bottom-2 duration-200">
          <AlertCircle size={16} className="text-red-400 shrink-0" />
          <span className="font-medium text-slate-200 [html[data-theme='light']_&]:text-slate-800">{spamToast.message}</span>
          <button
            type="button"
            onClick={() => setSpamToast({ show: false, message: '' })}
            className="ml-2 text-slate-400 hover:text-white [html[data-theme='light']_&]:hover:text-slate-900 cursor-pointer p-0.5 rounded"
          >
            <X size={14} />
          </button>
        </div>
      )}

    </div>
  );
}
