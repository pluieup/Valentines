import { Hono } from 'hono';
import apiRoutes from '../api/index';

export type Env = {
  GEMINI_API_KEY: string;
  ASSETS: {
    fetch: (req: Request) => Promise<Response>;
  };
};

const app = new Hono<{ Bindings: Env }>();

// Mount API routes
app.route('/api', apiRoutes);

// SPA fallback for client-side routing and static assets
app.get('*', async (c) => {
  // Don't fallback for missing API routes
  if (c.req.path.startsWith('/api')) {
    return c.json({ error: 'Not Found' }, 404);
  }

  // Try to fetch the static asset
  let res = await c.env.ASSETS.fetch(c.req.raw);

  // If asset not found, serve index.html (SPA routing support)
  if (res.status === 404) {
    const url = new URL(c.req.url);
    url.pathname = '/index.html';
    const indexRequest = new Request(url.toString(), {
      headers: c.req.raw.headers,
      method: 'GET',
    });
    res = await c.env.ASSETS.fetch(indexRequest);
  }

  return res;
});

export default app;