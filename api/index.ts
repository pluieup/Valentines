import { Hono } from 'hono';
import { aiRouter } from './ai';

const app = new Hono();

app.route('/ai', aiRouter);

export default app;