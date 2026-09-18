import { useEffect } from 'react';

/**
 * Lightweight, Resilient IntersectionObserver Hook for Scroll Reveal Animations
 * Automatically observes elements with [data-reveal] attribute, including dynamically
 * mounted or lazy-loaded components, and adds 'is-visible' class when in viewport.
 */
export const useScrollReveal = (dependency = []) => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Fallback if browser does not support IntersectionObserver
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

    const observerOptions = {
      root: null,
      rootMargin: '50px 0px 50px 0px',
      threshold: 0.05
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const scanAndObserve = () => {
      const elements = document.querySelectorAll('[data-reveal]:not(.is-visible)');
      elements.forEach((el) => {
        if (!observedSet.has(el)) {
          observedSet.add(el);
          observer.observe(el);
        }
      });
    };

    // Initial scan
    scanAndObserve();

    // Re-scan dynamically when lazy-loaded chunks mount into DOM
    const mutationObserver = new MutationObserver(() => {
      scanAndObserve();
    });

    if (document.body) {
      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true
      });
    }

    // Safety fallback: ensure all reveal elements become visible after timeout
    const fallbackTimer = setTimeout(() => {
      document.querySelectorAll('[data-reveal]:not(.is-visible)').forEach((el) => {
        el.classList.add('is-visible');
      });
    }, 1200);

    return () => {
      clearTimeout(fallbackTimer);
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, dependency);
};

export default useScrollReveal;
