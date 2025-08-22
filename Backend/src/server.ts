// src/server.ts
import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import authRoutes from './routes.auth.js';
import ordersRoutes from './routes.orders.js';
import addressRoutes from './scripts/routes.addresses.js';

const app = express();

const rawOrigins = process.env.CORS_ORIGIN;
const allowlist = rawOrigins
  ? rawOrigins.split(',').map(s => s.trim()).filter(Boolean)
  : null;

app.use(cors({
  origin: allowlist && allowlist.length ? allowlist : true,
  credentials: true,
}));
app.use(express.json({ limit: '1mb' }));

app.get(['/', '/healthz'], (_req, res) => res.json({ ok: true }));

app.use('/auth', authRoutes);
app.use('/orders', ordersRoutes);
app.use('/addresses', addressRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`API on http://localhost:${port}`));
