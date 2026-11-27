import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Auto-recover from stale chunks after a new deployment (Vite ChunkLoadError handler)
if (typeof window !== 'undefined') {
  window.addEventListener('vite:preloadError', (event) => {
    event.preventDefault();
    const key = 'aevum_vite_preload_reload';
    const last = parseInt(sessionStorage.getItem(key) || '0', 10);
    const now = Date.now();
    if (now - last > 10000) {
      sessionStorage.setItem(key, now.toString());
      window.location.reload();
    }
  });

  window.addEventListener('unhandledrejection', (event) => {
    const msg = (event.reason && (event.reason.message || event.reason.toString())) || '';
    if (/Failed to fetch dynamically imported module|Importing a module script failed/i.test(msg)) {
      event.preventDefault();
      const key = 'aevum_chunk_reload_ts';
      const last = parseInt(sessionStorage.getItem(key) || '0', 10);
      const now = Date.now();
      if (now - last > 10000) {
        sessionStorage.setItem(key, now.toString());
        window.location.reload();
      }
    }
  });
}

const INITIAL_ROUTE_LOADERS = [
  {
    match: (path, hash, search) =>
      path === 'docs' || path.startsWith('docs/') || hash === 'docs' || search.includes('doc='),
    key: 'Docs',
    load: () => import('./components/Docs'),
  },
  {
    match: (path, hash) =>
      path === 'explore' || path.startsWith('explore/') ||
      path === 'kham-pha' || path.startsWith('kham-pha/') ||
      path === 'learn' || path.startsWith('learn/') ||
      path === 'academy' || path.startsWith('academy/') ||
      hash === 'explore',
    key: 'EraExploration',
    load: () => import('./components/EraExploration'),
  },
  { match: (path) => path === 'pricing', key: 'Pricing', load: () => import('./components/Pricing') },
  { match: (path) => path === 'about', key: 'About', load: () => import('./components/About') },
  { match: (path) => path === 'changelog', key: 'Changelog', load: () => import('./components/Changelog') },
  { match: (path) => path === 'privacy', key: 'Privacy', load: () => import('./components/Privacy') },
  { match: (path) => path === 'terms', key: 'Terms', load: () => import('./components/Terms') },
];

async function resolveInitialRouteProps() {
  if (typeof window === 'undefined') return {};
  const path = window.location.pathname.replace(/^\/+/, '').toLowerCase();
  const hash = window.location.hash.replace('#', '').toLowerCase();
  const search = window.location.search;

  const hit = INITIAL_ROUTE_LOADERS.find((item) => item.match(path, hash, search));
  if (!hit) return {};
  const mod = await hit.load();
  return { ssrComponents: { [hit.key]: mod[hit.key] || mod.default } };
}

const container = document.getElementById('root');

if (container) {
  resolveInitialRouteProps().then((routeProps) => {
    ReactDOM.createRoot(container).render(
      <React.StrictMode>
        <App {...routeProps} />
      </React.StrictMode>
    );
  });
}
