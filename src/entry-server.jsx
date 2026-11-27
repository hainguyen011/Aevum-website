import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { App } from './App.jsx';
import { Docs } from './components/Docs.jsx';
import { EraExploration } from './components/EraExploration.jsx';
import { Pricing } from './components/Pricing.jsx';
import { About } from './components/About.jsx';
import { Changelog } from './components/Changelog.jsx';
import { Privacy } from './components/Privacy.jsx';
import { Terms } from './components/Terms.jsx';
import { AuthLockGate } from './components/ui/AuthLockGate.jsx';
import { Footer } from './components/Footer.jsx';

const SSR_COMPONENTS = {
  Docs,
  EraExploration,
  Pricing,
  About,
  Changelog,
  Privacy,
  Terms,
  AuthLockGate,
  Footer,
};

export function render(page = 'landing', lang = 'vi', initialDocId = null, initialLessonId = null) {
  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <App
        initialPage={page}
        initialLang={lang}
        initialDocId={initialDocId}
        initialLessonId={initialLessonId}
        ssrComponents={SSR_COMPONENTS}
      />
    </React.StrictMode>
  );
  return { html };
}
