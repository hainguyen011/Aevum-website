export const ReleaseService = {
  /**
   * Fetches release list from GitHub releases API.
   * Always fetches real data — no mock fallback.
   */
  async getReleases() {
    const token = import.meta.env.VITE_GITHUB_TOKEN;
    const headers = {};

    if (token && token !== 'your_read_only_token_here') {
      headers['Authorization'] = `Bearer ${token}`;
      headers['Accept'] = 'application/vnd.github+json';
    }

    const res = await fetch('https://api.github.com/repos/hainguyen011/aevum-os-releases/releases', { headers });
    if (!res.ok) {
      throw new Error(`GitHub API error: ${res.status}`);
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  }
};
