import '@fontsource/google-sans-flex/index.css';
import '@fontsource/google-sans-flex/vietnamese.css';
import '@fontsource/google-sans-flex/400.css';
import '@fontsource/google-sans-flex/500.css';
import '@fontsource/google-sans-flex/600.css';
import '@fontsource/google-sans-flex/700.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

const container = document.getElementById('root');

if (container) {
  ReactDOM.createRoot(container).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
