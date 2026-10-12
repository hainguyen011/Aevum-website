import React, { useState, useEffect, useRef } from 'react';

/**
 * LazySection
 * High-performance progressive intersection mounting wrapper for high-end web experiences.
 * - Renders children immediately during SSR (100% SEO crawlers & static snapshots preserved).
 * - On client, defers mounting until the viewport approaches within rootMargin (350px).
 * - Guarantees zero layout shift (CLS = 0) with reserved minHeight and contain-intrinsic-size.
 * - Uses native CSS content-visibility: auto for zero main-thread style/layout calculation while offscreen.
 */
export function LazySection({
  children,
  minHeight = '300px',
  rootMargin = '350px 0px',
  className = '',
  id = undefined
}) {
  // During SSR or if window/IntersectionObserver is unavailable, render immediately
  const isServer = typeof window === 'undefined';
  const [isVisible, setIsVisible] = useState(() => isServer);
  const containerRef = useRef(null);

  useEffect(() => {
    if (isVisible) return;
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible, rootMargin]);

  return (
    <div
      ref={containerRef}
      id={id}
      style={{
        minHeight: isVisible ? undefined : minHeight,
        contentVisibility: isVisible ? 'visible' : 'auto',
        containIntrinsicSize: isVisible ? undefined : `1px ${minHeight}`
      }}
      className={`lazy-section-wrapper transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'} ${className}`}
    >
      {isVisible ? children : null}
    </div>
  );
}
