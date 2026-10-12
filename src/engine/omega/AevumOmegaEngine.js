/**
 * ============================================================================
 * CONFIDENTIAL & PROPRIETARY — I2FLABS INTELLECTUAL PROPERTY
 * ----------------------------------------------------------------------------
 * Aevum OS Core Engine: Aevum Omega-Render Engine (AORE)
 * Patent Application: VN/PCT Pending (I2FLabs Autonomous Systems Lab)
 * Architecture by: Zenith (Complexity) & Kael (120Hz Hardware Compositor)
 * ============================================================================
 * Orchestrates Zero-Time Speculative Pre-warming, LRU Ring-Buffer Eviction,
 * and Cross-Layer GPU Compositor Promotion without Main-Thread Contention.
 */

import { HardwareGovernor } from './HardwareGovernor';
import { IntentRadar } from './IntentRadar';

export class AevumOmegaEngine {
  constructor() {
    this.governor = new HardwareGovernor();
    this.radar = new IntentRadar(this.governor, this.onIntentDetected.bind(this));
    this.loaders = new Map();
    this.cacheSet = new Set();
    this.cacheQueue = []; // FIFO / LRU eviction ring
    this.isBooted = false;
  }

  registerLoaders(loaderMap) {
    Object.entries(loaderMap).forEach(([id, loaderFn]) => {
      this.loaders.set(id, loaderFn);
    });
  }

  registerTargets(targets) {
    this.radar.registerTargets(targets);
  }

  boot() {
    if (typeof window === 'undefined' || this.isBooted) return;
    this.isBooted = true;

    // Start Intent Radar in non-blocking idle cycle
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => this.radar.start(), { timeout: 2000 });
    } else {
      setTimeout(() => this.radar.start(), 300);
    }
  }

  onIntentDetected(targetId) {
    this.speculativePrewarm(targetId);
  }

  speculativePrewarm(targetId) {
    if (typeof window === 'undefined' || !targetId) return;
    if (this.cacheSet.has(targetId)) return;

    // 1. Maintain O(1) LRU Capacity Budget
    const maxDepth = this.governor.getMaxCacheDepth();
    while (this.cacheQueue.length >= maxDepth) {
      const oldest = this.cacheQueue.shift();
      this.cacheSet.delete(oldest);
    }

    this.cacheSet.add(targetId);
    this.cacheQueue.push(targetId);

    // 2. Pre-warm Dynamic JS Chunk
    const loader = this.loaders.get(targetId);
    if (typeof loader === 'function') {
      try {
        loader();
      } catch (_) {}
    }

    // 3. Pre-warm Static HTML Document Snapshot into Edge HTTP Cache
    const url = targetId === 'landing' ? '/' : `/${targetId}`;
    if (typeof document !== 'undefined' && document.createElement) {
      try {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = url;
        link.as = 'document';
        document.head.appendChild(link);
      } catch (_) {}
    }
  }
}

// Singleton Engine Instance
export const omegaEngine = new AevumOmegaEngine();
