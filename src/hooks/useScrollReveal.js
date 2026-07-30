import { useEffect } from 'react';

/**
 * Lightweight, Performant IntersectionObserver Hook for Scroll Reveal Animations
 * Automatically observes elements with [data-reveal] attribute and adds 'is-visible' class when in viewport.
 */
export const useScrollReveal = (dependency = []) => {
  useEffect(() => {
    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Unobserve once revealed for max performance
          observer.unobserve(entry.target);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.15
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const revealElements = document.querySelectorAll('[data-reveal]');

    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, dependency);
};

export default useScrollReveal;
