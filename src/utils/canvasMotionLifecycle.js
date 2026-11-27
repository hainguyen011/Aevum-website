/**
 * Kael 120Hz Hardware-Aware Canvas Lifecycle Manager
 * - Caps canvas DPR at <= 2 to slash mobile GPU fragment fillrate
 * - Automatically suspends requestAnimationFrame when off-screen or tab is hidden (0% idle CPU/GPU)
 * - Respects prefers-reduced-motion: reduce (renders one sharp static frame without looping)
 * - Uses ResizeObserver (with window resize fallback) and ctx.setTransform for clean HiDPI resets
 */
export function attachCanvasMotionLifecycle({
  canvas,
  getHeight = (width) => (width < 640 ? 320 : 440),
  onDraw,
  threshold = 0.05,
  pauseWhenHidden = true,
  initialStaticRender = true
}) {
  if (!canvas || typeof window === 'undefined') return () => {};
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};

  let width = canvas.parentElement?.clientWidth || 640;
  let height = getHeight(width);
  let animFrameId = null;
  let isInView = true;
  let isDestroyed = false;

  const reducedMotionQuery =
    typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-reduced-motion: reduce)')
      : null;

  const isMotionDisabled = () => Boolean(reducedMotionQuery && reducedMotionQuery.matches);

  const renderOnce = () => {
    if (isDestroyed) return;
    onDraw(ctx, width, height, { advanceTick: false });
  };

  const resize = () => {
    if (!canvas.parentElement || isDestroyed) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const nextWidth = canvas.parentElement.clientWidth || width;
    const nextHeight = getHeight(nextWidth);
    width = nextWidth;
    height = nextHeight;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    if (!animFrameId) {
      renderOnce();
    }
  };

  const stop = () => {
    if (animFrameId !== null) {
      cancelAnimationFrame(animFrameId);
      animFrameId = null;
    }
  };

  const loop = () => {
    if (isDestroyed || !isInView || (pauseWhenHidden && document.hidden) || isMotionDisabled()) {
      animFrameId = null;
      return;
    }
    onDraw(ctx, width, height, { advanceTick: true });
    animFrameId = requestAnimationFrame(loop);
  };

  const start = () => {
    if (isDestroyed || !isInView || (pauseWhenHidden && document.hidden)) return;
    if (isMotionDisabled()) {
      renderOnce();
      return;
    }
    if (animFrameId === null) {
      animFrameId = requestAnimationFrame(loop);
    }
  };

  resize();

  let resizeObserver = null;
  if (typeof ResizeObserver !== 'undefined' && canvas.parentElement) {
    resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(canvas.parentElement);
  }
  window.addEventListener('resize', resize, { passive: true });

  let intersectionObserver = null;
  if (typeof IntersectionObserver !== 'undefined') {
    intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isInView = Boolean(entry?.isIntersecting);
        if (isInView) {
          start();
        } else {
          stop();
        }
      },
      { threshold }
    );
    intersectionObserver.observe(canvas);
  }

  const handleVisibilityChange = () => {
    if (document.hidden) {
      stop();
    } else if (isInView) {
      start();
    }
  };
  document.addEventListener('visibilitychange', handleVisibilityChange);

  const handleMotionChange = () => {
    if (isMotionDisabled()) {
      stop();
      renderOnce();
    } else if (isInView && !document.hidden) {
      start();
    }
  };
  if (reducedMotionQuery?.addEventListener) {
    reducedMotionQuery.addEventListener('change', handleMotionChange);
  }

  if (initialStaticRender) {
    renderOnce();
  }
  start();

  return () => {
    isDestroyed = true;
    stop();
    if (resizeObserver) resizeObserver.disconnect();
    if (intersectionObserver) intersectionObserver.disconnect();
    window.removeEventListener('resize', resize);
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    if (reducedMotionQuery?.removeEventListener) {
      reducedMotionQuery.removeEventListener('change', handleMotionChange);
    }
  };
}
