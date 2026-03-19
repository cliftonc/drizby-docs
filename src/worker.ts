export interface Env {
  ASSETS: Fetcher;
}

const BASE = '/docs';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // 301 redirect /docs/ to /docs/getting-started/ for SEO
    if (url.pathname === '/docs' || url.pathname === '/docs/') {
      return Response.redirect(new URL('/docs/getting-started/', url.origin).toString(), 301);
    }

    // Strip the /docs prefix so asset lookups match the dist/ structure
    let pathname = url.pathname;
    if (pathname.startsWith(BASE)) {
      pathname = pathname.slice(BASE.length) || '/';
    }

    const assetUrl = new URL(pathname, request.url);

    try {
      // Try exact file match (CSS, JS, images, etc.)
      if (pathname.includes('.')) {
        const response = await env.ASSETS.fetch(assetUrl.toString());
        if (response.status < 400) return response;
      }

      // Try index.html for directory paths
      const indexPath = pathname.endsWith('/')
        ? `${pathname}index.html`
        : `${pathname}/index.html`;
      const indexResponse = await env.ASSETS.fetch(
        new URL(indexPath, request.url).toString()
      );
      if (indexResponse.status < 400) return indexResponse;

      // Fallback to root index.html
      return env.ASSETS.fetch(new URL('/index.html', request.url).toString());
    } catch {
      return env.ASSETS.fetch(new URL('/index.html', request.url).toString());
    }
  },
};
