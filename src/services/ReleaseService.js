export const ReleaseService = {
  /**
   * Fetches release list from GitHub releases API.
   * Gracefully falls back to public unauthenticated request if token is invalid or expired.
   */
  async getReleases() {
    const token = import.meta.env.VITE_GITHUB_TOKEN;
    const headers = {
      'Accept': 'application/vnd.github+json'
    };

    if (token && token !== 'your_read_only_token_here' && !token.startsWith('github_pat_your')) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    let res = await fetch('https://api.github.com/repos/hainguyen011/aevum-os-releases/releases', { headers });

    // If token returned 401 (expired/revoked), retry unauthenticated since repository is public
    if (res.status === 401 && headers['Authorization']) {
      delete headers['Authorization'];
      res = await fetch('https://api.github.com/repos/hainguyen011/aevum-os-releases/releases', { headers });
    }

    if (!res.ok) {
      throw new Error(`GitHub API error: ${res.status}`);
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  }
};
