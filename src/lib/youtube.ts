export function extractYouTubeId(input: string): string | null {
  try {
    const url = new URL(input.trim());
    const host = url.hostname.replace(/^www\./, '').toLowerCase();
    if (host === 'youtu.be') return url.pathname.split('/').filter(Boolean)[0] ?? null;
    if (host.endsWith('youtube.com') || host === 'youtube-nocookie.com') {
      if (url.pathname === '/watch') return url.searchParams.get('v');
      const parts = url.pathname.split('/').filter(Boolean);
      if (['embed', 'shorts', 'live'].includes(parts[0] ?? '')) return parts[1] ?? null;
    }
    return null;
  } catch { return null; }
}
