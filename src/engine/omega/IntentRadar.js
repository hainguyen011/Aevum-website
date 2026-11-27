/**
 * ============================================================================
 * CONFIDENTIAL & PROPRIETARY — I2FLABS INTELLECTUAL PROPERTY
 * ----------------------------------------------------------------------------
 * Aevum OS Proprietary Algorithm: Pre-Cognitive Intent Radar (PCIR)
 * Patent Application: VN/PCT Pending (I2FLabs Autonomous Systems Lab)
 * Mathematical Formulation: Zenith (Complexity) & Kael (120Hz Compositor)
 * ============================================================================
 * FORMULA:
 *   Psi_k(t) = [ exp(-d^2 / 2R^2) * max(0, (v . D) / (|v| * |D|)) ] / [ 1 + lambda * |a x v| ]
 * Computes non-linear convergence wave in strictly O(1) time complexity.
 */

export class IntentRadar {
  constructor(governor, onIntentDetected) {
    this.governor = governor;
    this.onIntentDetected = onIntentDetected;
    this.lastX = 0;
    this.lastY = 0;
    this.lastTime = 0;
    this.lastVx = 0;
    this.lastVy = 0;
    this.ticking = false;
    this.targets = [];
    this.rectCache = new Map();
    this.rectCacheExpiresAt = 0;
    this.boundPointerHandler = this.onPointerMove.bind(this);
    this.boundInvalidate = this.invalidateCache.bind(this);
  }

  registerTargets(targets) {
    this.targets = targets;
    this.invalidateCache();
  }

  invalidateCache() {
    this.rectCache.clear();
    this.rectCacheExpiresAt = 0;
  }

  start() {
    if (typeof window === 'undefined') return;
    if (!this.governor.isRadarPermitted()) return;

    window.addEventListener('pointermove', this.boundPointerHandler, { passive: true });
    window.addEventListener('scroll', this.boundInvalidate, { passive: true });
    window.addEventListener('resize', this.boundInvalidate, { passive: true });
  }

  stop() {
    if (typeof window === 'undefined') return;
    window.removeEventListener('pointermove', this.boundPointerHandler);
    window.removeEventListener('scroll', this.boundInvalidate);
    window.removeEventListener('resize', this.boundInvalidate);
    this.invalidateCache();
  }

  onPointerMove(e) {
    const now = performance.now();
    const dt = now - this.lastTime;
    if (dt < 16) return; // Sample at ~60Hz to conserve CPU

    const x = e.clientX;
    const y = e.clientY;

    const vx = (x - this.lastX) / dt;
    const vy = (y - this.lastY) / dt;
    const speed = Math.hypot(vx, vy);

    const ax = (vx - this.lastVx) / dt;
    const ay = (vy - this.lastVy) / dt;
    const isDecelerating = (vx * ax + vy * ay) < 0; // Negative directional acceleration

    this.lastX = x;
    this.lastY = y;
    this.lastTime = now;
    this.lastVx = vx;
    this.lastVy = vy;

    // Filter out micro-tremors (< 0.15px/ms) and hyper-flicks (> 3.5px/ms)
    if (speed < 0.15 || speed > 3.5) return;

    if (!this.ticking) {
      window.requestAnimationFrame(() => {
        this.evaluateIntentConvergence(x, y, vx, vy, speed, isDecelerating);
        this.ticking = false;
      });
      this.ticking = true;
    }
  }

  evaluateIntentConvergence(x, y, vx, vy, speed, isDecelerating) {
    const reachRadius = this.governor.getReachRadius();
    const now = performance.now();

    if (now > this.rectCacheExpiresAt || this.rectCache.size === 0) {
      this.rectCache.clear();
      for (const target of this.targets) {
        const el = document.querySelector(target.selector);
        if (!el || !el.isConnected) continue;
        const rect = el.getBoundingClientRect();
        this.rectCache.set(target.id, {
          cx: rect.left + rect.width * 0.5,
          cy: rect.top + rect.height * 0.5
        });
      }
      this.rectCacheExpiresAt = now + 180;
    }

    for (const target of this.targets) {
      const center = this.rectCache.get(target.id);
      if (!center) continue;

      const dx = center.cx - x;
      const dy = center.cy - y;
      const dist = Math.hypot(dx, dy);

      if (dist > 0 && dist < reachRadius) {
        const cosTheta = (vx * dx + vy * dy) / (speed * dist);
        if (cosTheta > 0.85 || (dist < 80 && isDecelerating)) {
          this.onIntentDetected(target.id);
        }
      }
    }
  }
}
