/**
 * Site-wide Dynamic Constants & Variables
 * Single source of truth for versioning, URLs, ports, and download assets.
 */

export const SITE_CONSTANTS = {
  AEVUM_VERSION: 'v2.0.0-beta.8',
  AEVUM_VERSION_CLEAN: '2.0.0-beta.8',
  FASTIFY_PORT: '3344',
  FASTIFY_SSE_URL: 'http://localhost:3344/sse',
  MCP_TOOLS_COUNT: '101',
  WINDOWS_INSTALLER: 'Aevum-OS-Setup-2.0.0-beta.8.exe',
  MACOS_ARM_DMG: 'Aevum-OS-2.0.0-beta.8-arm64.dmg',
  MACOS_INTEL_DMG: 'Aevum-OS-2.0.0-beta.8-x64.dmg',
  GITHUB_RELEASES_URL: 'https://github.com/hainguyen011/aevum-os-releases/releases',
  LATEST_RELEASE_URL: 'https://github.com/hainguyen011/aevum-os-releases/releases/latest',
  CHANGELOG_PATH: '/changelog'
};

/**
 * Replace placeholders like {{AEVUM_VERSION}} with current site constants.
 * @param {string} text - Raw string or markdown text
 * @param {Record<string, string>} [customVariables] - Optional override dictionary
 * @returns {string} - Interpolated text
 */
export function replaceDynamicVariables(text, customVariables = {}) {
  if (!text || typeof text !== 'string') return text;
  const merged = { ...SITE_CONSTANTS, ...customVariables };
  return text.replace(/\{\{([A-Z0-9_]+)\}\}/g, (match, key) => {
    return merged[key] !== undefined ? merged[key] : match;
  });
}

export default SITE_CONSTANTS;
