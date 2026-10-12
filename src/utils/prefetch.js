/**
 * AEVUM MEIP (Markov-Edge Intent Prediction) & Speculative Prefetch Engine
 * Designed by Zenith (Complexity & Algorithm Guard) & Kael (120Hz Runtime Engineer)
 * 
 * Predicts user navigation intent based on cursor velocity vector, angle of convergence,
 * and deceleration patterns. Pre-warms module cache and DOM slices 100-250ms BEFORE click.
 */

const prefetchMap = {
  docs: () => import('../components/Docs'),
  explore: () => import('../components/EraExploration'),
  pricing: () => import('../components/Pricing'),
  about: () => import('../components/About'),
  changelog: () => import('../components/Changelog'),
  discussions: () => import('../components/Discussions'),
  profile: () => import('../components/Profile')
};

const prefetchedPages = new Set();
const prefetchedUrls = new Set();

/**
 * Pre-warms dynamic component chunks and static HTML snapshots into browser HTTP cache
 */
export function prefetchPage(page) {
  if (typeof window === 'undefined') return;
  if (!page || prefetchedPages.has(page)) return;

  const loader = prefetchMap[page];
  if (typeof loader === 'function') {
    prefetchedPages.add(page);
    try {
      loader();
    } catch (_) {
      // Ignore background prefetch errors
    }
  }

  // Also pre-warm static HTML document snapshot into HTTP cache
  const url = page === 'landing' ? '/' : `/${page}`;
  if (!prefetchedUrls.has(url) && typeof document !== 'undefined' && document.createElement) {
    prefetchedUrls.add(url);
    try {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = url;
      link.as = 'document';
      document.head.appendChild(link);
    } catch (_) {}
  }
}

/**
 * Vector-based MEIP Cursor Intent Tracker
 * Computes dot product convergence angle: cos(theta) = (v . D) / (|v| * |D|)
 * Runs strictly within 1 frame budget (O(1) execution time)
 */
let isMeipInitialized = false;
let lastX = 0;
let lastY = 0;
let lastTime = 0;
let lastVx = 0;
let lastVy = 0;
let ticking = false;

export function initMeipEngine() {
  if (typeof window === 'undefined' || isMeipInitialized) return;
  if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return;

  isMeipInitialized = true;

  const interactiveTargets = [
    { page: 'pricing', selector: 'button[data-nav="pricing"], a[href*="pricing"]' },
    { page: 'docs', selector: 'button[data-nav="docs"], a[href*="docs"]' },
    { page: 'explore', selector: 'button[data-nav="explore"], a[href*="explore"]' },
    { page: 'about', selector: 'button[data-nav="about"], a[href*="about"]' },
    { page: 'changelog', selector: 'button[data-nav="changelog"], a[href*="changelog"]' }
  ];

  const onPointerMove = (e) => {
    const now = performance.now();
    const dt = now - lastTime;
    if (dt < 16) return;

    const x = e.clientX;
    const y = e.clientY;

    const vx = (x - lastX) / dt;
    const vy = (y - lastY) / dt;
    const speed = Math.hypot(vx, vy);

    const ax = (vx - lastVx) / dt;
    const ay = (vy - lastVy) / dt;
    const isDecelerating = (vx * ax + vy * ay) < 0;

    lastX = x;
    lastY = y;
    lastTime = now;
    lastVx = vx;
    lastVy = vy;

    if (speed < 0.15 || speed > 3.0) return;

    if (!ticking) {
      window.requestAnimationFrame(() => {
        interactiveTargets.forEach((item) => {
          if (prefetchedPages.has(item.page)) return;

          const el = document.querySelector(item.selector);
          if (!el) return;

          const rect = el.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;

          const dx = cx - x;
          const dy = cy - y;
          const dist = Math.hypot(dx, dy);

          if (dist < 180) {
            const cosTheta = (vx * dx + vy * dy) / (speed * dist);
            if (cosTheta > 0.85 || (dist < 80 && isDecelerating)) {
              prefetchPage(item.page);
            }
          }
        });
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('pointermove', onPointerMove, { passive: true });
}

// Auto-boot MEIP engine on client idle
if (typeof window !== 'undefined') {
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => initMeipEngine(), { timeout: 2000 });
  } else {
    setTimeout(() => initMeipEngine(), 500);
  }
}
