import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, Bug, Lightbulb, MessageCircle, Filter, Search, Plus, X,
  Send, ShieldCheck, CheckCircle2, Clock, ThumbsUp, User, Sparkles, AlertCircle, ChevronUp, Trash2, MoreVertical, Languages, Globe
} from 'lucide-react';
import { DiscussionService } from '../services/DiscussionService';
import { ReleaseService } from '../services/ReleaseService';
import { TranslationService } from '../services/TranslationService';
import { CustomSelect } from './ui/CustomSelect';

import anHi from '../../assets/stickers/An_Collection/An_Hi.webp';

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
          .catch(() => {});
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
          .catch(() => {});
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
              .catch(() => {});
          }
        });
      }
    });
  }, [discussions, activeLang]);
  
  // Create Discussion Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newVersion, setNewVersion] = useState('v2.1.0');
  const [newType, setNewType] = useState('bug');
  // Reply state per discussion
  const [replyInputs, setReplyInputs] = useState({});
  const [replySubmitting, setReplySubmitting] = useState({});

  // Active 3-dots dropdown menu state
  const [activeMenuId, setActiveMenuId] = useState(null);

  useEffect(() => {
    const handleOutsideClick = () => setActiveMenuId(null);
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, []);

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

    const isCurrentlyUpvoted = !!upvotedPosts[discussionId];
    const newUpvotedState = !isCurrentlyUpvoted;

    const updatedUpvotedMap = {
      ...upvotedPosts,
      [discussionId]: newUpvotedState
    };
    setUpvotedPosts(updatedUpvotedMap);
    try {
      localStorage.setItem('aevum_upvoted_discussions', JSON.stringify(updatedUpvotedMap));
    } catch {}

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
  }, []);

  // Lock body scroll and Lenis smooth scroll when modal is active
  useEffect(() => {
    if (isCreateModalOpen) {
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
  }, [isCreateModalOpen]);

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
    if (!newTitle.trim() || !newContent.trim()) return;

    const userAvatar = user?.user_metadata?.avatar_url || user?.user_metadata?.picture || userProfile?.avatar_url || userProfile?.avatar;

    setSubmitting(true);
    const created = await DiscussionService.createDiscussion({
      userId: user.id,
      userEmail: user.email,
      userName: user.user_metadata?.full_name || user.user_metadata?.name || user.email.split('@')[0],
      userAvatar: userAvatar,
      releaseVersion: newVersion,
      type: newType,
      title: newTitle,
      content: newContent
    });

    setDiscussions(prev => [created, ...prev]);
    setNewTitle('');
    setNewContent('');
    setSubmitting(false);
    setIsCreateModalOpen(false);
  };

  const handleAddReply = async (discussionId) => {
    const text = replyInputs[discussionId];
    if (!user) {
      onOpenAuthModal();
      return;
    }
    if (!text || !text.trim()) return;

    const userAvatar = user?.user_metadata?.avatar_url || user?.user_metadata?.picture || userProfile?.avatar_url || userProfile?.avatar;

    setReplySubmitting(prev => ({ ...prev, [discussionId]: true }));
    const createdReply = await DiscussionService.createReply({
      discussionId,
      userId: user.id,
      userEmail: user.email,
      userName: user.user_metadata?.full_name || user.user_metadata?.name || user.email.split('@')[0],
      userAvatar: userAvatar,
      content: text,
      isAdminReply: isAdmin
    });

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
    setReplySubmitting(prev => ({ ...prev, [discussionId]: false }));
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
        return <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/30 font-mono"><Bug size={12} /> {isVi ? 'Báo lỗi' : 'Bug Report'}</span>;
      case 'feature':
        return <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-mono"><Lightbulb size={12} /> {isVi ? 'Ý tưởng' : 'Feature'}</span>;
      case 'feedback':
        return <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono"><MessageCircle size={12} /> {isVi ? 'Phản hồi' : 'Feedback'}</span>;
      default:
        return <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-mono"><MessageSquare size={12} /> {isVi ? 'Thảo luận' : 'Discussion'}</span>;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'resolved':
        return <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono font-bold"><CheckCircle2 size={11} /> {isVi ? 'Đã giải quyết' : 'Resolved'}</span>;
      case 'in_progress':
        return <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono font-bold"><Clock size={11} /> {isVi ? 'Đang xử lý' : 'In Progress'}</span>;
      default:
        return null;
    }
  };

  return (
    <div id="discussions" className="w-full bg-[#0B0B11] text-slate-100 min-h-[calc(100vh-73px)] font-mono text-left relative flex flex-col">
      
      {/* Full-width Terminal Header Bar */}
      <div className="w-full border-b border-white/5 py-5 px-6 lg:px-10 bg-[#0B0B11] relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-3">
            <span className="text-white font-bold tracking-wider uppercase">AEVUM TTY DISCUSSIONS SHELL v1.0.0</span>
          </div>
          <div className="flex items-center text-[11px] text-slate-500 font-mono">
            <span>{isVi ? 'Sử dụng bộ lọc hoặc click chọn bài thảo luận' : 'Use filter options or click discussion posts'}</span>
          </div>
        </div>
      </div>

      {/* Main Terminal Shell Body Container - 2-Column Grid (Full-height Vertical Border Divider & Bottom Border) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch relative z-10 w-full text-left font-mono flex-1 min-h-[500px] border-b border-white/5">
        
        {/* ── LEFT COLUMN: Discussions Feed & Controls (7 cols with right vertical border) ── */}
        <div className="lg:col-span-7 space-y-6 font-mono lg:border-r border-b lg:border-b-0 border-white/5 px-6 lg:px-10 py-8 h-full">
          
          {/* Feed Header & Control Bar */}
          <div className="space-y-4">
            {/* LOCATION Breadcrumb & New Discussion Button */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-[11px] text-white font-mono font-bold tracking-wide uppercase">
                <span className="text-slate-400">LOCATION:</span>
                <span className="text-slate-300">~/DISCUSSIONS</span>
              </div>
              
              {/* New Discussion Button */}
              <button
                onClick={handleOpenCreateModal}
                className="h-8 px-3.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:border-cyan-500/70 rounded flex items-center gap-1.5 text-xs font-bold font-mono transition-all cursor-pointer whitespace-nowrap"
              >
                <Plus size={13} />
                <span>{isVi ? 'Tạo Thảo Luận' : 'New Discussion'}</span>
              </button>
            </div>

              {/* Mini Compact Filter Bar (Uniform h-8 Height) */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                
                {/* Left Group: Search Input + Mini Category Pills */}
                <div className="flex items-center gap-2.5 flex-wrap flex-1">
                  {/* Search Input */}
                  <div className="relative min-w-[200px] flex-1 sm:flex-none sm:w-64 h-8 flex items-center">
                    <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={isVi ? 'Tìm kiếm bài viết...' : 'Search discussions...'}
                      className="w-full h-8 bg-[#07080e] border border-white/10 focus:border-cyan-500/60 rounded pl-7 pr-2.5 text-xs text-slate-200 placeholder-slate-600 outline-none font-mono transition-all flex items-center"
                    />
                  </div>

                  {/* Mini Category Filter Tabs */}
                  <div className="flex items-center gap-1 bg-[#07080e] border border-white/10 rounded p-0.5 font-mono text-[11px] h-8 box-border">
                    {[
                      { id: 'all', label: isVi ? 'Tất cả' : 'All' },
                      { id: 'bug', label: isVi ? 'Lỗi' : 'Bugs' },
                      { id: 'feature', label: isVi ? 'Ý tưởng' : 'Ideas' },
                      { id: 'feedback', label: isVi ? 'Góp ý' : 'Feedback' }
                    ].map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setSelectedType(tab.id)}
                        className={`h-full px-2.5 rounded flex items-center justify-center text-center whitespace-nowrap transition-all cursor-pointer font-bold border ${
                          selectedType === tab.id
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
                            : 'border-transparent text-slate-400 hover:text-white hover:border-white/10'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right Group: Mini Version Select Dropdown */}
                <div className="min-w-[150px] sm:min-w-[180px]">
                  <CustomSelect
                    options={versionFilterOptions}
                    value={selectedVersion}
                    onChange={(val) => setSelectedVersion(val)}
                    className="h-8 text-[11px]"
                    buttonClassName="h-8 py-0 px-2.5 text-[11px] text-slate-300 hover:text-white font-mono flex items-center justify-between"
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
                    className="bg-[#07080e] border border-white/10 rounded-md p-5 font-mono space-y-4 animate-pulse relative overflow-hidden"
                  >
                    {/* Top Shimmer Meta Header */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-14 bg-white/10 rounded" />
                        <div className="h-5 w-16 bg-white/10 rounded" />
                        <div className="h-5 w-20 bg-white/5 rounded" />
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-white/10 rounded-full" />
                        <div className="h-3.5 w-24 bg-white/10 rounded" />
                      </div>
                    </div>

                    {/* Skeleton Title */}
                    <div className="space-y-2 pt-1">
                      <div className="h-5 w-3/4 bg-white/10 rounded" />
                    </div>

                    {/* Skeleton Content Paragraph */}
                    <div className="space-y-2">
                      <div className="h-3.5 w-full bg-white/5 rounded" />
                      <div className="h-3.5 w-5/6 bg-white/5 rounded" />
                    </div>

                    {/* Skeleton Reply Box */}
                    <div className="p-3 rounded bg-[#0B0B11] border border-white/5 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-white/10 rounded-full" />
                          <div className="h-3 w-28 bg-white/10 rounded" />
                        </div>
                        <div className="h-3 w-12 bg-white/5 rounded" />
                      </div>
                      <div className="h-3 w-4/5 bg-white/5 rounded" />
                    </div>

                    {/* Skeleton Chat Container */}
                    <div className="bg-[#0B0B11] border border-white/10 rounded-md p-3 space-y-3">
                      <div className="h-6 w-full bg-white/5 rounded" />
                      <div className="flex items-center justify-between pt-1">
                        <div className="h-4 w-36 bg-white/5 rounded" />
                        <div className="h-7 w-16 bg-cyan-500/10 border border-cyan-500/20 rounded" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredDiscussions.length === 0 ? (
              <div className="py-16 text-center bg-[#07080e] border border-white/10 rounded-md p-8 font-mono">
                <AlertCircle size={28} className="mx-auto text-slate-600 mb-3" />
                <p className="text-xs font-bold text-slate-300">
                  {isVi ? '[EMPTY] Chưa có bài thảo luận nào phù hợp' : '[EMPTY] No discussions match your filter'}
                </p>
                <p className="text-xs text-slate-500 mt-1">
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
                      className="bg-[#07080e] border border-white/10 rounded-md p-5 transition-all duration-200 relative font-mono group"
                    >
                      {/* Top Meta Header */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        {/* Left: Version & Type Badges + Translate Badge */}
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10">
                            {item.release_version}
                          </span>
                          {getTypeBadge(item.type)}
                          {getStatusBadge(item.status)}

                          {/* Quick Card Translate Toggle Button */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setManualTranslate(prev => ({ ...prev, [item.id]: !prev[item.id] }));
                            }}
                            className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold flex items-center gap-1 border transition-all cursor-pointer ${
                              shouldTranslate
                                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-sm shadow-cyan-500/20'
                                : 'bg-white/5 text-slate-400 hover:text-white border-transparent hover:border-white/10'
                            }`}
                            title={shouldTranslate ? (isVi ? 'Xem bản gốc' : 'Show original') : (isVi ? 'Xem bản dịch' : 'Translate post')}
                          >
                            <Languages size={11} />
                            <span>{shouldTranslate ? (isVi ? 'Đã dịch' : 'Translated') : (isVi ? 'Dịch' : 'Translate')}</span>
                          </button>
                        </div>

                        {/* Right: Author Info & 3-Dots Admin Menu */}
                        <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                          <div className="flex items-center gap-2">
                            {item.user_avatar || item.avatar_url || (user && item.user_id === user.id && (user.user_metadata?.avatar_url || user.user_metadata?.picture)) ? (
                              <img 
                                src={item.user_avatar || item.avatar_url || user.user_metadata?.avatar_url || user.user_metadata?.picture} 
                                alt={item.user_name || 'User'} 
                                className="w-5 h-5 rounded-full object-cover border border-white/20 shrink-0"
                                onError={(e) => { e.target.style.display = 'none'; }}
                              />
                            ) : (
                              <User size={12} className="text-slate-500 shrink-0" />
                            )}
                            <span className="text-slate-300 font-bold">{item.user_name || item.user_email?.split('@')[0]}</span>
                            <span className="text-slate-600">•</span>
                            <span>{new Date(item.created_at).toLocaleDateString()}</span>
                          </div>

                          {/* 3-Dots Menu Button (Top Right) */}
                          {isAdmin && (
                            <div className="relative">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveMenuId(prev => prev === item.id ? null : item.id);
                                }}
                                className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer flex items-center justify-center"
                                title={isVi ? 'Tùy chọn bài viết' : 'Options'}
                              >
                                <MoreVertical size={14} />
                              </button>

                              {/* Floating Dropdown Menu */}
                              {activeMenuId === item.id && (
                                <div 
                                  onClick={(e) => e.stopPropagation()}
                                  className="absolute right-0 top-7 w-48 bg-[#0B0B11] border border-white/10 rounded-md p-1.5 shadow-2xl z-30 font-mono text-xs space-y-1 text-left"
                                >
                                  <div className="px-2 py-1 text-[10px] text-slate-500 font-bold uppercase tracking-wider border-b border-white/5 mb-1">
                                    {isVi ? 'Thao tác Admin' : 'Admin Actions'}
                                  </div>

                                  {/* Status Options */}
                                  <div className="space-y-0.5">
                                    <button
                                      onClick={() => { handleUpdateStatus(item.id, 'open'); setActiveMenuId(null); }}
                                      className={`w-full text-left px-2 py-1 rounded text-[11px] flex items-center justify-between transition-colors ${
                                        (item.status || 'open') === 'open' ? 'text-cyan-300 font-bold bg-cyan-500/10' : 'text-slate-300 hover:bg-white/5'
                                      }`}
                                    >
                                      <span>{isVi ? 'Đánh dấu: Mở' : 'Mark: Open'}</span>
                                      {(item.status || 'open') === 'open' && <CheckCircle2 size={11} className="text-cyan-300" />}
                                    </button>

                                    <button
                                      onClick={() => { handleUpdateStatus(item.id, 'in_progress'); setActiveMenuId(null); }}
                                      className={`w-full text-left px-2 py-1 rounded text-[11px] flex items-center justify-between transition-colors ${
                                        item.status === 'in_progress' ? 'text-amber-300 font-bold bg-amber-500/10' : 'text-slate-300 hover:bg-white/5'
                                      }`}
                                    >
                                      <span>{isVi ? 'Đánh dấu: Đang xử lý' : 'Mark: In Progress'}</span>
                                      {item.status === 'in_progress' && <CheckCircle2 size={11} className="text-amber-300" />}
                                    </button>

                                    <button
                                      onClick={() => { handleUpdateStatus(item.id, 'resolved'); setActiveMenuId(null); }}
                                      className={`w-full text-left px-2 py-1 rounded text-[11px] flex items-center justify-between transition-colors ${
                                        item.status === 'resolved' ? 'text-emerald-300 font-bold bg-emerald-500/10' : 'text-slate-300 hover:bg-white/5'
                                      }`}
                                    >
                                      <span>{isVi ? 'Đánh dấu: Đã giải quyết' : 'Mark: Resolved'}</span>
                                      {item.status === 'resolved' && <CheckCircle2 size={11} className="text-emerald-300" />}
                                    </button>
                                  </div>

                                  <div className="border-t border-white/10 my-1" />

                                  {/* Delete Option */}
                                  <button
                                    onClick={() => { setActiveMenuId(null); handleDeleteDiscussion(item.id); }}
                                    className="w-full text-left px-2 py-1.5 rounded text-[11px] text-red-400 hover:bg-red-500/15 flex items-center gap-2 transition-colors font-bold"
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
                      <h3 className="text-base font-bold text-white mb-2 font-mono">
                        {displayTitle}
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed mb-4 whitespace-pre-line font-mono">
                        {displayContent}
                      </p>

                      {/* Unified Action & Reply Container */}
                      <div className="pt-1 space-y-3 font-mono">
                        
                        {/* List Replies */}
                        {item.replies && item.replies.map((reply) => {
                          const isAdminRep = Boolean(reply.is_admin_reply || reply.user_email?.includes('admin'));
                          const displayReplyContent = (shouldTranslate && translatedCache[`${reply.id}_reply_${targetLang}`]) || reply.content;
                          return (
                            <div 
                              key={reply.id}
                              className={`p-2.5 rounded text-[11px] font-mono space-y-1 transition-all ${
                                isAdminRep
                                  ? 'bg-[#0e111a] border border-blue-900/30 text-slate-200'
                                  : 'bg-[#0B0B11] border border-white/5 text-slate-300'
                              }`}
                            >
                              <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-1.5">
                                  {!isAdminRep && (
                                    (reply.user_avatar || reply.avatar_url || (user && reply.user_id === user.id && (user.user_metadata?.avatar_url || user.user_metadata?.picture))) ? (
                                      <img 
                                        src={reply.user_avatar || reply.avatar_url || user.user_metadata?.avatar_url || user.user_metadata?.picture} 
                                        alt={reply.user_name || 'User'} 
                                        className="w-3.5 h-3.5 rounded-full object-cover border border-white/20 shrink-0"
                                        onError={(e) => { e.target.style.display = 'none'; }}
                                      />
                                    ) : (
                                      <User size={10} className="text-slate-500 shrink-0" />
                                    )
                                  )}
                                  <span className="font-bold text-white text-[11px] flex items-center gap-1">
                                    {isAdminRep && <ShieldCheck size={12} className="text-cyan-400 inline" />}
                                    {reply.user_name || reply.user_email?.split('@')[0]}
                                  </span>
                                  {isAdminRep && (
                                    <span className="text-[8px] font-mono px-1 py-0.2 rounded bg-blue-950/40 text-blue-300 border border-blue-900/30 uppercase">
                                      Admin
                                    </span>
                                  )}
                                </div>
                                <span className="text-[9px] text-slate-500 font-mono">
                                  {new Date(reply.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>

                              <p className="text-[11px] text-slate-300 leading-relaxed font-mono">{displayReplyContent}</p>
                            </div>
                          );
                        })}

                      {/* Single Unified Container (Textarea + Upvote + Counter + Send) */}
                      <div className="bg-[#0B0B11] border border-white/10 focus-within:border-cyan-500/60 rounded-md p-3 space-y-2.5 transition-all">
                        
                        {/* Multi-line Auto-growing Textarea (No Resize Handle) */}
                        <textarea
                          rows={1}
                          maxLength={500}
                          value={replyInputs[item.id] || ''}
                          onChange={(e) => {
                            setReplyInputs({ ...replyInputs, [item.id]: e.target.value });
                            e.target.style.height = 'auto';
                            e.target.style.height = `${Math.min(180, Math.max(32, e.target.scrollHeight))}px`;
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleAddReply(item.id);
                              e.target.style.height = 'auto';
                            }
                          }}
                          placeholder={
                            !user 
                              ? (isVi ? 'Đăng nhập để viết phản hồi...' : 'Sign in to leave a reply...') 
                              : isAdmin
                                ? (isVi ? 'Phản hồi với vai trò Admin...' : 'Post response as Admin...')
                                : (isVi ? 'Viết phản hồi...' : 'Write a reply...')
                          }
                          className="w-full bg-transparent border-0 outline-none p-0 text-xs text-slate-200 placeholder-slate-600 font-mono resize-none min-h-[32px] max-h-[180px] overflow-y-auto focus:ring-0 leading-relaxed"
                        />

                        {/* Integrated Bottom Toolbar */}
                        <div className="flex items-center justify-between pt-1">
                          
                          {/* Left: Upvote + Replies Count + Char Counter */}
                          <div className="flex items-center gap-3">
                            {/* Minimal Upvote Button */}
                            <button
                              type="button"
                              onClick={() => handleToggleUpvote(item.id)}
                              className="inline-flex items-center gap-1.5 bg-transparent border-0 p-0 text-xs font-mono font-bold transition-all cursor-pointer group"
                              title={upvotedPosts[item.id] ? (isVi ? 'Đã Upvote' : 'Upvoted') : (isVi ? 'Upvote bài viết' : 'Upvote discussion')}
                            >
                              <span className={`p-1 rounded transition-all flex items-center justify-center ${
                                upvotedPosts[item.id]
                                  ? 'bg-cyan-500/25 text-cyan-300 shadow-sm shadow-cyan-500/25 ring-1 ring-cyan-500/40'
                                  : 'bg-white/5 text-slate-400 group-hover:bg-white/15 group-hover:text-white'
                              }`}>
                                <ChevronUp size={13} className={upvotedPosts[item.id] ? 'stroke-[2.5]' : ''} />
                              </span>
                              <span className={upvotedPosts[item.id] ? 'text-cyan-300 font-bold' : 'text-slate-400 group-hover:text-slate-200'}>
                                {item.upvotes ?? 0}
                              </span>
                            </button>

                            <span className="text-slate-600 text-xs">•</span>

                            {/* Replies Count */}
                            <div className="flex items-center gap-1.5 text-xs text-slate-400">
                              <MessageSquare size={12} />
                              <span>{item.replies?.length || 0}</span>
                            </div>

                            <span className="text-slate-600 text-xs">•</span>

                            {/* Char Counter */}
                            <span className="text-[10px] text-slate-500">
                              {(replyInputs[item.id] || '').length}/500
                            </span>
                          </div>

                          {/* Right: Integrated Send Button */}
                          <button
                            onClick={() => handleAddReply(item.id)}
                            disabled={replySubmitting[item.id]}
                            className="bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:border-cyan-500/70 px-3 py-1 rounded text-xs font-bold font-mono flex items-center gap-1.5 cursor-pointer transition-all disabled:opacity-50"
                            title={isVi ? 'Gửi phản hồi' : 'Send reply'}
                          >
                            <Send size={12} />
                            <span>{replySubmitting[item.id] ? (isVi ? 'Đang gửi...' : 'Sending...') : (isVi ? 'Gửi' : 'Send')}</span>
                          </button>

                        </div>

                      </div>
                    </div>

                  </div>
                );
              })}
              </div>
            )}

          </div>

        {/* ── RIGHT COLUMN: Reserved Sidebar Container (5 cols) ── */}
        <div className="lg:col-span-5 space-y-5 px-6 lg:px-10 py-8 h-full">
          <div className="bg-transparent border border-white/10 rounded-none p-6 font-mono space-y-5 sticky top-24 shadow-none">

            {/* An Mascot Sticker */}
            <div className="flex justify-center py-2 select-none">
              <img 
                src={anHi} 
                alt="An Mascot Sticker" 
                className="w-32 h-32 object-contain"
              />
            </div>

            {/* Notification / Description */}
            <div className="space-y-3 text-xs leading-relaxed text-slate-400 text-center font-mono">
              <p className="font-bold text-slate-200">
                {isVi ? 'Cột Phải Dành Riêng cho Widget' : 'Reserved Widget Column'}
              </p>
              <p>
                {isVi 
                  ? 'Không gian này được thiết kế để tích hợp các Widget điều khiển, danh sách phiên bản và các tiện ích tương tác trong tương lai.' 
                  : 'This column is reserved for modular widgets, release logs, and future interactive utilities.'}
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* ── CREATE DISCUSSION POPUP MODAL ── */}
      {isCreateModalOpen && (
        <div 
          className="fixed inset-0 top-0 left-0 w-full h-full max-h-[100vh] bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 overflow-hidden"
          data-lenis-prevent
          onClick={() => setIsCreateModalOpen(false)}
        >
          <div 
            className="bg-[#07080e] border border-white/10 rounded-lg max-w-lg w-full p-6 font-mono space-y-4 shadow-2xl relative text-left max-h-[90vh] box-border"
            data-lenis-prevent
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm sm:text-base font-bold text-white tracking-wide">
                {isVi ? 'Tạo Thảo Luận Mới' : 'Create New Discussion'}
              </h3>
              <button 
                onClick={() => setIsCreateModalOpen(false)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer p-1 rounded hover:bg-white/10"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleCreateDiscussion} className="space-y-3.5 pt-0.5">
              
              {/* Row 1: Release Version (5 cols) + Category (7 cols) */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                {/* Release Version Select using system CustomSelect UI */}
                <div className="sm:col-span-5">
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    Release Version:
                  </label>
                  <CustomSelect
                    options={versionCreateOptions}
                    value={newVersion}
                    onChange={(val) => setNewVersion(val)}
                    className="h-8 text-xs"
                    buttonClassName="h-8 py-0 px-2.5 text-xs text-slate-300 hover:text-white font-mono flex items-center justify-between"
                  />
                </div>

                {/* Category Select Buttons */}
                <div className="sm:col-span-7">
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    Category:
                  </label>
                  <div className="grid grid-cols-3 gap-1 bg-[#0B0B11] border border-white/10 rounded p-0.5 h-8 items-center">
                    {[
                      { id: 'bug', label: isVi ? 'Báo Lỗi' : 'Bug' },
                      { id: 'feature', label: isVi ? 'Ý Tưởng' : 'Feature' },
                      { id: 'feedback', label: isVi ? 'Phản Hồi' : 'Feedback' }
                    ].map(cat => (
                      <button
                        type="button"
                        key={cat.id}
                        onClick={() => setNewType(cat.id)}
                        className={`h-full px-1.5 rounded text-xs font-mono font-bold transition-all cursor-pointer border flex items-center justify-center ${
                          newType === cat.id
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                            : 'border-transparent text-slate-400 hover:text-white'
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
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-mono text-slate-400">
                    Title:
                  </label>
                  <span className="text-[10px] font-mono text-slate-500">
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
                  className="w-full bg-[#0B0B11] border border-white/10 focus:border-cyan-500/60 rounded px-3 text-xs text-slate-200 placeholder-slate-600 outline-none font-mono h-8"
                />
              </div>

              {/* Row 3: Content Textarea (1000 chars limit) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-mono text-slate-400">
                    Details:
                  </label>
                  <span className="text-[10px] font-mono text-slate-500">
                    {newContent.length}/1000
                  </span>
                </div>
                <textarea
                  required
                  rows={3}
                  maxLength={1000}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder={isVi ? 'Mô tả chi tiết các bước tái hiện hoặc góp ý...' : 'Describe steps to reproduce or details...'}
                  className="w-full bg-[#0B0B11] border border-white/10 focus:border-cyan-500/60 rounded p-2.5 text-xs text-slate-200 placeholder-slate-600 outline-none font-mono resize-none h-20 overflow-y-auto leading-relaxed"
                />
              </div>

              {/* Row 4: Modal Footer Action Buttons */}
              <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-1.5 rounded text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer border border-transparent hover:border-white/10"
                >
                  {isVi ? 'Hủy' : 'Cancel'}
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-cyan-300 hover:text-cyan-200 transition-all font-mono cursor-pointer border border-cyan-500/40 hover:border-cyan-500/70 bg-cyan-500/10 hover:bg-cyan-500/25 px-4.5 py-1.5 rounded"
                >
                  <Plus size={13} />
                  <span>{submitting ? (isVi ? 'Đang gửi...' : 'Sending...') : (isVi ? 'Gửi Thảo Luận' : 'Submit Discussion')}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
