import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { App } from './App.jsx';

export function render(page = 'landing', lang = 'vi', initialDocId = null, initialLessonId = null) {
  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <App initialPage={page} initialLang={lang} initialDocId={initialDocId} initialLessonId={initialLessonId} />
    </React.StrictMode>
  );
  return { html };
}
