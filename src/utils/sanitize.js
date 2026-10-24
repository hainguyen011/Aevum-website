/**
 * Security & Sanitization Utilities for Aevum Client
 */

/**
 * Escapes unsafe characters for HTML entity encoding.
 * Prevents HTML/XSS injection into templates and DOM.
 * @param {string} str 
 * @returns {string}
 */
export function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Validates and sanitizes URLs for safe href and src attributes.
 * Blocks javascript:, vbscript:, and malicious data: URLs.
 * @param {string} url 
 * @returns {string}
 */
export function sanitizeUrl(url) {
  if (!url || typeof url !== 'string') return '#';
  const trimmed = url.trim();
  // Safe protocols: https://, http://, mailto:, relative URLs (/ or #)
  if (/^(?:https?:\/\/|mailto:|\/|#)/i.test(trimmed)) {
    // Escape double quotes to avoid attribute breakout
    return trimmed.replace(/"/g, '%22');
  }
  // Block any dangerous scheme like javascript:
  return '#';
}

/**
 * Sanitizes markdown-generated HTML strings by stripping dangerous tags and inline event handlers.
 * @param {string} html 
 * @returns {string}
 */
export function sanitizeHtml(html) {
  if (!html || typeof html !== 'string') return '';
  return html
    // Remove script tags and contents
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // Remove iframe, object, embed tags
    .replace(/<\/?(?:iframe|object|embed|frame|frameset|base)\b[^>]*>/gi, '')
    // Remove inline event handlers like onerror=, onload=, onclick=
    .replace(/\s+on\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    // Remove javascript: pseudo-protocol in href/src
    .replace(/(?:href|src)\s*=\s*(?:"javascript:[^"]*"|'javascript:[^']*'|javascript:[^\s>]+)/gi, 'href="#"');
}
