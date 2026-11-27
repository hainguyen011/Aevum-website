import { useEffect } from 'react';

/**
 * Lightweight, Resilient IntersectionObserver Hook for Scroll Reveal Animations
 * - Skips redundant querySelectorAll scans when MutationObserver reports non-element changes
 * - Auto-detaches DOM MutationObserver after settle fallback so scrolling runs with zero overhead
 */
export const useScrollReveal = (dependency = []) => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('[data-reveal]').forEach((el) => {
        el.classList.add('is-visible');
      });
      return;
    }

    const observedSet = new WeakSet();

    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '50px 0px 50px 0px',
      threshold: 0.05
    });

    const scanAndObserve = () => {
      const elements = document.querySelectorAll('[data-reveal]:not(.is-visible)');
      elements.forEach((el) => {
        if (!observedSet.has(el)) {
          observedSet.add(el);
          observer.observe(el);
        }
      });
    };

    scanAndObserve();

    let rafScanId = null;
    const debouncedScan = (mutations) => {
      if (Array.isArray(mutations)) {
        const hasElementAddition = mutations.some((m) => m.addedNodes && m.addedNodes.length > 0);
        if (!hasElementAddition) return;
      }
      if (rafScanId) return;
      rafScanId = requestAnimationFrame(() => {
        rafScanId = null;
        scanAndObserve();
      });
    };

    const mutationObserver = new MutationObserver(debouncedScan);

    if (document.body) {
      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true
      });
    }

    const fallbackTimer = setTimeout(() => {
      document.querySelectorAll('[data-reveal]:not(.is-visible)').forEach((el) => {
        el.classList.add('is-visible');
      });
      mutationObserver.disconnect();
    }, 1200);

    return () => {
      if (rafScanId) cancelAnimationFrame(rafScanId);
      clearTimeout(fallbackTimer);
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, dependency);
};

export default useScrollReveal;
