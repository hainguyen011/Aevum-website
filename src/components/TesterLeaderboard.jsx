import React, { useState, useEffect, useMemo } from 'react';
import {
  Trophy, Medal, Crown, Flame, Bug, Sparkles, ShieldCheck,
  ChevronRight, User, Award, Zap, TrendingUp, HelpCircle
} from 'lucide-react';
import { supabase } from '../services/supabaseClient';

export function TesterLeaderboard({
  discussions = [],
  activeLang = 'vi',
  user = null,
  onOpenAuthModal
}) {
  const isVi = activeLang === 'vi';
  const [filterMode, setFilterMode] = useState('points'); // 'points' | 'bugs'
  const [realProfiles, setRealProfiles] = useState([]);

  // Fetch real registered user profiles from Supabase
  useEffect(() => {
    let isMounted = true;
    async function loadProfiles() {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('id, display_name, email, avatar_url, role');
        if (data && !error && isMounted) {
          setRealProfiles(data);
        }
      } catch (err) {
        console.warn('[TesterLeaderboard] Fetch real profiles fallback:', err);
      }
    }
    loadProfiles();
    return () => { isMounted = false; };
  }, []);

  // Dynamic ranking calculation based strictly on REAL users & real activity
  const leaderboardData = useMemo(() => {
    const userStats = new Map();

    const getOrCreateUser = (id, name, email, avatar) => {
      const cleanEmail = (email || '').toLowerCase().trim();
      const cleanName = (name || '').trim();
      const key = cleanEmail || id || cleanName.toLowerCase() || 'unknown';

      if (!userStats.has(key)) {
        const isAdmin = Boolean(
          cleanEmail === 'hainguyen011@gmail.com' ||
          cleanEmail.includes('admin') ||
          id === 'admin'
        );

        userStats.set(key, {
          id: id || `usr-${key}`,
          name: cleanName || (cleanEmail ? cleanEmail.split('@')[0] : 'Tester'),
          email: cleanEmail,
          avatar: avatar || null,
          bugs: 0,
          features: 0,
          replies: 0,
          upvotes: 0,
          points: 50, // 50 base EXP for registered beta testers
          isAdmin,
          role: isAdmin
            ? (isVi ? 'Lead Architect & Pioneer' : 'Lead Architect & Pioneer')
            : (isVi ? 'Thử Nghiệm Viên Beta' : 'Beta Tester')
        });
      }

      const existing = userStats.get(key);
      if (avatar && !existing.avatar) existing.avatar = avatar;
      if (cleanName && (!existing.name || existing.name === 'Tester')) existing.name = cleanName;
      if (cleanEmail && !existing.email) existing.email = cleanEmail;
      return existing;
    };

    // 1. Populate from real Supabase user profiles
    if (Array.isArray(realProfiles)) {
      realProfiles.forEach((prof) => {
        if (!prof) return;
        const u = getOrCreateUser(
          prof.id,
          prof.display_name || prof.full_name || prof.name,
          prof.email,
          prof.avatar_url || prof.picture
        );
        if (prof.role === 'admin' || prof.is_admin) {
          u.isAdmin = true;
          u.role = isVi ? 'Lead Architect & Pioneer' : 'Lead Architect & Pioneer';
        }
      });
    }

    // 2. Include current logged-in user in ranking
    if (user) {
      const u = getOrCreateUser(
        user.id,
        user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0],
        user.email,
        user.user_metadata?.avatar_url || user.user_metadata?.picture
      );
      if (user.email === 'hainguyen011@gmail.com') {
        u.isAdmin = true;
        u.role = isVi ? 'Lead Architect & Pioneer' : 'Lead Architect & Pioneer';
      }
    }

    // 3. Aggregate real activities from live discussions and replies
    if (Array.isArray(discussions)) {
      discussions.forEach((disc) => {
        if (!disc) return;
        const authorId = disc.user_id;
        const authorEmail = disc.user_email;
        const authorName = disc.user_name;
        const authorAvatar = disc.user_avatar || disc.avatar_url;

        const u = getOrCreateUser(authorId, authorName, authorEmail, authorAvatar);

        // Real points calculation
        if (disc.type === 'bug') {
          u.bugs += 1;
          u.points += 50; // 50 pts per reported bug
        } else if (disc.type === 'feature') {
          u.features += 1;
          u.points += 30; // 30 pts per feature suggestion
        } else {
          u.points += 20; // 20 pts per feedback
        }

        const up = typeof disc.upvotes === 'number' ? disc.upvotes : (parseInt(disc.upvotes, 10) || 0);
        u.upvotes += up;
        u.points += up * 5; // 5 pts per upvote received

        // Real replies
        const reps = disc.discussion_replies || disc.replies || [];
        if (Array.isArray(reps)) {
          reps.forEach((rep) => {
            if (!rep) return;
            const rUser = getOrCreateUser(
              rep.user_id,
              rep.user_name,
              rep.user_email,
              rep.user_avatar
            );
            rUser.replies += 1;
            rUser.points += 15; // 15 pts per comment
          });
        }
      });
    }

    // Convert to list, assign dynamic roles, and color gradients
    const gradients = [
      'from-cyan-400 to-blue-500',
      'from-sky-400 to-blue-600',
      'from-emerald-400 to-teal-600',
      'from-purple-400 to-indigo-500',
      'from-blue-400 to-indigo-600'
    ];

    const realUsers = Array.from(userStats.values()).map((u, idx) => {
      const hashStr = u.email || u.name || String(idx);
      const colorIdx = Math.abs(hashStr.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)) % gradients.length;

      let dynamicRole = u.role;
      if (!u.isAdmin) {
        if (u.bugs >= 5) {
          dynamicRole = isVi ? 'Thợ Săn Lỗi Kỳ Cựu' : 'Elite Bug Sentinel';
        } else if (u.bugs >= 1) {
          dynamicRole = isVi ? 'Thợ Săn Lỗi Beta' : 'Bug Sentinel';
        } else if (u.replies >= 3) {
          dynamicRole = isVi ? 'Thành Viên Tích Cực' : 'Active Contributor';
        } else if (u.points > 50) {
          dynamicRole = isVi ? 'Thử Nghiệm Viên Tích Cực' : 'Active Tester';
        } else {
          dynamicRole = isVi ? 'Thử Nghiệm Viên Beta' : 'Beta Tester';
        }
      }

      return {
        ...u,
        role: dynamicRole,
        avatarColor: gradients[colorIdx]
      };
    });

    // 4. Sort based on active filter
    if (filterMode === 'bugs') {
      realUsers.sort((a, b) => b.bugs - a.bugs || b.points - a.points);
    } else {
      realUsers.sort((a, b) => b.points - a.points || b.bugs - a.bugs);
    }

    return realUsers;
  }, [discussions, realProfiles, user, isVi, filterMode]);

  // Current logged in user position
  const currentUserRank = useMemo(() => {
    if (!user) return null;
    const userEmail = (user.email || '').toLowerCase().trim();
    const userId = user.id;
    const userName = (user.user_metadata?.full_name || user.email?.split('@')[0] || '').toLowerCase().trim();

    const index = leaderboardData.findIndex(
      t => (t.id && t.id === userId) ||
           (t.email && t.email === userEmail) ||
           (t.name && t.name.toLowerCase() === userName)
    );

    if (index >= 0) {
      return {
        rank: index + 1,
        ...leaderboardData[index]
      };
    }

    // Fallback if current user hasn't appeared yet
    return {
      rank: leaderboardData.length + 1,
      name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Tester',
      points: 50,
      bugs: 0,
      role: isVi ? 'Thử Nghiệm Viên Beta' : 'Beta Tester'
  }, [user, leaderboardData, isVi]);

  // Total system stats summary
  const summaryStats = useMemo(() => {
    const totalBugs = leaderboardData.reduce((acc, cur) => acc + (cur.bugs || 0), 0);
    const totalPoints = leaderboardData.reduce((acc, cur) => acc + (cur.points || 0), 0);
    return {
      totalBugs,
      totalPoints,
      totalTesters: leaderboardData.length
    };
  }, [leaderboardData]);

  return (
    <div className="tester-leaderboard-container space-y-3.5 font-sans sticky top-24 select-none">
      {/* ── MAIN LEADERBOARD CARD (Transparent, Cyan-Blue Grainy Gradient like Banner, Soft Top Rounded Corners) ── */}
      <div className="relative rounded-t-2xl sm:rounded-t-3xl bg-transparent border-0 p-4 sm:p-5 overflow-hidden">
        
        {/* ── GRAINY GRADIENT ATMOSPHERE (Top to bottom Cyan-Blue like Banner, fading into background) ── */}
        <div
          className="pointer-events-none absolute inset-0 w-full h-full rounded-t-2xl sm:rounded-t-3xl overflow-hidden z-0 select-none"
          aria-hidden="true"
        >
          {/* 1. Soft Vertical Linear Flow (Cyan-Blue like Banner, fading into background) */}
          <div
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, rgba(14, 165, 233, 0.25) 0%, rgba(14, 165, 233, 0.10) 22%, rgba(14, 165, 233, 0.02) 48%, transparent 74%)',
            }}
          />

          {/* 2. Top Aura Glow Wash (Cyan/Sky ambient radial glow anchored at top center) */}
          <div
            className="absolute -top-14 left-1/2 -translate-x-1/2 w-[120%] h-48 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 75% 65% at 50% 0%, rgba(56, 189, 248, 0.32) 0%, rgba(14, 165, 233, 0.08) 55%, transparent 100%)',
              filter: 'blur(36px)',
            }}
          />

          {/* 3. Authentic Grainy Noise Texture Layer (Fades vertically from Top to Bottom) */}
          <div
            className="absolute inset-0 select-none opacity-[0.13] [html[data-theme='light']_&]:opacity-[0.05] mix-blend-overlay pointer-events-none z-[1]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilterLeaderboard'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilterLeaderboard)'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
              backgroundSize: '140px 140px',
              WebkitMaskImage: 'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 24%, rgba(0,0,0,0.12) 50%, transparent 78%)',
              maskImage: 'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 24%, rgba(0,0,0,0.12) 50%, transparent 78%)',
            }}
          />
        </div>

        {/* ── HEADER (No border) ── */}
        <div className="relative z-10 flex items-center justify-between pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 flex items-center justify-center text-cyan-400">
              <Trophy size={17} className="animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white [html[data-theme='light']_&]:text-slate-900 tracking-tight leading-none uppercase">
                  {isVi ? 'Bảng Xếp Hạng Tester' : 'Tester Leaderboard'}
                </h3>
              </div>
              <p className="text-[11px] text-slate-400 [html[data-theme='light']_&]:text-slate-500 font-sans mt-1">
                {isVi ? 'Top cống hiến & săn lỗi Aevum OS' : 'Top bug hunters & active contributors'}
              </p>
            </div>
          </div>

          {/* Season Pill - Soft small rounded corners */}
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-cyan-500/15 text-cyan-300 font-semibold">
            Beta S1
          </span>
        </div>

        {/* ── QUICK SUMMARY STATS BAR (No border, no bg) ── */}
        <div className="relative z-10 grid grid-cols-3 gap-2 py-2 text-center font-sans">
          <div className="p-2">
            <span className="text-[10px] text-slate-400 [html[data-theme='light']_&]:text-slate-500 block uppercase font-mono tracking-wider">
              {isVi ? 'Lỗi Báo' : 'Bugs'}
            </span>
            <span className="text-sm font-bold text-cyan-400 [html[data-theme='light']_&]:text-blue-600 font-mono">
              {summaryStats.totalBugs}
            </span>
          </div>

          <div className="p-2">
            <span className="text-[10px] text-slate-400 [html[data-theme='light']_&]:text-slate-500 block uppercase font-mono tracking-wider">
              {isVi ? 'Tổng EXP' : 'EXP'}
            </span>
            <span className="text-sm font-bold text-cyan-400 [html[data-theme='light']_&]:text-blue-600 font-mono">
              {summaryStats.totalPoints >= 1000 ? `${(summaryStats.totalPoints / 1000).toFixed(1)}k` : summaryStats.totalPoints}
            </span>
          </div>

          <div className="p-2">
            <span className="text-[10px] text-slate-400 [html[data-theme='light']_&]:text-slate-500 block uppercase font-mono tracking-wider">
              {isVi ? 'Testers' : 'Testers'}
            </span>
            <span className="text-sm font-bold text-emerald-400 [html[data-theme='light']_&]:text-emerald-600 font-mono">
              {summaryStats.totalTesters}
            </span>
          </div>
        </div>

        {/* ── FILTER TABS (No border) ── */}
        <div className="relative z-10 flex items-center justify-between pt-2 pb-1.5 text-xs">
          <span className="text-[11px] font-mono font-medium text-slate-400 [html[data-theme='light']_&]:text-slate-500 uppercase tracking-wider">
            {isVi ? 'Danh Sách Cao Thủ' : 'Rankings'}
          </span>

          <div className="flex items-center gap-1 bg-white/5 [html[data-theme='light']_&]:bg-slate-100 p-0.5 rounded-lg text-[11px]">
            <button
              type="button"
              onClick={() => setFilterMode('points')}
              className={`px-2.5 py-0.5 rounded-md font-medium transition-all cursor-pointer ${
                filterMode === 'points'
                  ? 'bg-white/15 text-white font-semibold [html[data-theme=\'light\']_&]:bg-white [html[data-theme=\'light\']_&]:text-slate-900'
                  : 'text-slate-400 hover:text-white [html[data-theme=\'light\']_&]:text-slate-600'
              }`}
            >
              EXP
            </button>
            <button
              type="button"
              onClick={() => setFilterMode('bugs')}
              className={`px-2.5 py-0.5 rounded-md font-medium transition-all cursor-pointer flex items-center gap-1 ${
                filterMode === 'bugs'
                  ? 'bg-white/15 text-white font-semibold [html[data-theme=\'light\']_&]:bg-white [html[data-theme=\'light\']_&]:text-slate-900'
                  : 'text-slate-400 hover:text-white [html[data-theme=\'light\']_&]:text-slate-600'
              }`}
            >
              <Bug size={10} />
              <span>{isVi ? 'Báo Lỗi' : 'Bugs'}</span>
            </button>
          </div>
        </div>

        {/* ── LEADERBOARD LIST (TOP 6 - No border, No bg, Clean floating items) ── */}
        <div className="relative z-10 space-y-1 mt-1">
          {leaderboardData.length === 0 ? (
            <div className="py-6 text-center text-xs text-slate-500 font-sans">
              {isVi ? 'Chưa có tester nào tham gia.' : 'No active testers yet.'}
            </div>
          ) : (
            leaderboardData.slice(0, 6).map((item, index) => {
              const rank = index + 1;

              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-2 px-1.5 rounded-lg transition-all duration-200 bg-transparent border-0 hover:bg-white/[0.03] [html[data-theme='light']_&]:hover:bg-slate-100/60"
                >
                  {/* Left: Rank Badge + Avatar + User Info */}
                  <div className="flex items-center gap-2.5 min-w-0">
                    {/* Rank Position: #1, #2, #3... Clean Monospace Text, Softly Dimmed */}
                    <div className="shrink-0 flex items-center justify-center w-6 h-6">
                      <span className="text-xs font-mono font-medium text-white/55 [html[data-theme='light']_&]:text-slate-500">
                        #{rank}
                      </span>
                    </div>

                    {/* Avatar */}
                    <div className="relative shrink-0">
                      {item.avatar ? (
                        <img
                          src={item.avatar}
                          alt={item.name}
                          className="w-8 h-8 rounded-full object-cover border border-white/10 shrink-0 select-none"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      ) : (
                        <div
                          className={`w-8 h-8 rounded-full bg-gradient-to-tr ${item.avatarColor || 'from-cyan-400 to-blue-500'} flex items-center justify-center text-white font-bold text-xs select-none`}
                        >
                          {item.name ? item.name.charAt(0).toUpperCase() : 'T'}
                        </div>
                      )}
                      {item.isAdmin && (
                        <div
                          className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-cyan-500 text-black flex items-center justify-center"
                          title={isVi ? 'Quản trị viên' : 'Admin'}
                        >
                          <ShieldCheck size={9} className="stroke-[3]" />
                        </div>
                      )}
                    </div>

                  {/* Name & Role Title */}
                  <div className="min-w-0 pr-1">
                    <div className="flex items-center gap-1.5 leading-none">
                      <span className="font-semibold text-xs sm:text-[13px] text-slate-200 [html[data-theme='light']_&]:text-slate-800 truncate">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-[10.5px] text-slate-400 [html[data-theme='light']_&]:text-slate-500 truncate block mt-0.5 font-sans">
                      {item.role}
                    </span>
                  </div>
                </div>

                {/* Right: Points EXP Only */}
                <div className="shrink-0 text-right pl-2">
                  <div className="flex items-center justify-end gap-1 font-mono font-bold text-xs">
                    <span className="text-white [html[data-theme='light']_&]:text-slate-900">
                      {item.points.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-500 [html[data-theme='light']_&]:text-slate-400 font-normal">
                      EXP
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── CURRENT USER RANK FOOTER / BANNER (No border, no bg) ── */}
        <div className="relative z-10 mt-3 pt-2 font-sans">
          {user ? (
            <div className="bg-transparent rounded-lg py-2 px-1.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-6 h-6 flex items-center justify-center shrink-0">
                  <span className="text-xs font-mono font-bold text-cyan-400 [html[data-theme='light']_&]:text-blue-600">
                    #{currentUserRank?.rank || 1}
                  </span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white [html[data-theme='light']_&]:text-slate-900 truncate">
                      {isVi ? 'Thứ hạng của bạn' : 'Your Rank'}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-md bg-cyan-500/20 text-cyan-300 font-medium">
                      #{currentUserRank?.rank || '—'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 [html[data-theme='light']_&]:text-slate-600 truncate mt-0.5 font-mono">
                    {currentUserRank?.points || 0} EXP
                  </p>
                </div>
              </div>

              <span className="text-[11px] text-cyan-400 [html[data-theme='light']_&]:text-blue-600 font-semibold shrink-0 font-mono flex items-center gap-0.5">
                <TrendingUp size={12} />
                <span>+EXP</span>
              </span>
            </div>
          ) : (
            <div className="bg-transparent py-2 px-1 text-center space-y-2">
              <p className="text-xs text-slate-300 [html[data-theme='light']_&]:text-slate-600 leading-snug">
                {isVi
                  ? 'Đăng nhập để xem vị trí của bạn và ghi danh vào Bảng vàng Tester!'
                  : 'Log in to view your standing and join the Beta Tester Hall of Fame!'}
              </p>
              <button
                type="button"
                onClick={onOpenAuthModal}
                className="w-full py-1.5 px-3 rounded-lg bg-white text-black hover:bg-slate-200 [html[data-theme='light']_&]:bg-[#0F172A] [html[data-theme='light']_&]:text-white [html[data-theme='light']_&]:hover:bg-slate-800 text-xs font-bold font-sans transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Zap size={13} className="text-cyan-400 fill-cyan-400" />
                <span>{isVi ? 'Đăng nhập Tham gia' : 'Log In & Participate'}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── BETA REWARD NOTE (Centered, Constrained Width) ── */}
      <div className="max-w-[300px] sm:max-w-[320px] mx-auto rounded-xl bg-transparent p-2 text-center select-none">
        <p className="font-bold text-cyan-300 [html[data-theme='light']_&]:text-cyan-800 leading-tight text-xs">
          {isVi ? 'Phần thưởng Mùa Beta' : 'Beta Season Rewards'}
        </p>
        <p className="text-[11px] text-slate-400 [html[data-theme='light']_&]:text-slate-600 leading-snug mt-1 font-sans">
          {isVi
            ? 'Top 3 Tester xuất sắc nhất sẽ được khắc tên vào Release Note chính thức & trao danh hiệu Vĩnh viễn!'
            : 'Top 3 testers will be immortalized in official Release Notes & awarded Permanent Badges!'}
        </p>
      </div>
    </div>
  );
}
