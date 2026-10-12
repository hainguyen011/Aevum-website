/**
 * ============================================================================
 * AEVUM OS APPLICATION ADAPTER — SPECULATIVE PREFETCH BRIDGE
 * ----------------------------------------------------------------------------
 * Bridges Application Navigation Layer with the Proprietary Aevum Omega Engine.
 * Patent Protected by I2FLabs Consortium.
 * ============================================================================
 */

import { omegaEngine } from '../engine/omega';

// Application Module Mapping
omegaEngine.registerLoaders({
  docs: () => import('../components/Docs'),
  explore: () => import('../components/EraExploration'),
  pricing: () => import('../components/Pricing'),
  about: () => import('../components/About'),
  changelog: () => import('../components/Changelog'),
  discussions: () => import('../components/Discussions'),
  profile: () => import('../components/Profile')
});

// Primary Hitbox Selectors
omegaEngine.registerTargets([
  { id: 'pricing', selector: 'button[data-nav="pricing"], a[href*="pricing"]' },
  { id: 'docs', selector: 'button[data-nav="docs"], a[href*="docs"]' },
  { id: 'explore', selector: 'button[data-nav="explore"], a[href*="explore"]' },
  { id: 'about', selector: 'button[data-nav="about"], a[href*="about"]' },
  { id: 'changelog', selector: 'button[data-nav="changelog"], a[href*="changelog"]' }
]);

// Auto-boot Omega Engine in idle background
omegaEngine.boot();

/**
 * Public Bridge Method used across components (Navbar, SubNavTabs, Buttons)
 */
export function prefetchPage(page) {
  omegaEngine.speculativePrewarm(page);
}

export default prefetchPage;
