import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { App } from './App.jsx';

export function render(page = 'landing', lang = 'vi') {
  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <App initialPage={page} initialLang={lang} />
    </React.StrictMode>
  );
  return { html };
}
