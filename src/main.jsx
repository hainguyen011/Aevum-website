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

const container = document.getElementById('root');

if (container) {
  ReactDOM.createRoot(container).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
