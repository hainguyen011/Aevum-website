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
    if (!Array.isArray(data)) return [];

    // Sort descending by published_at / created_at (newest release first)
    return data.sort((a, b) => {
      const timeA = new Date(a.published_at || a.created_at || 0).getTime();
      const timeB = new Date(b.published_at || b.created_at || 0).getTime();
      if (timeB !== timeA) {
        return timeB - timeA;
      }
      return (b.tag_name || b.name || '').localeCompare(a.tag_name || a.name || '', undefined, { numeric: true });
    });
  }
};
