const path = require('path');
const express = require('express');
const { Monitor } = require('./monitor');

const PORT = process.env.PORT || 3000;
const CORE_URL = process.env.CORE_URL || 'http://localhost:4000/health';

const monitor = new Monitor({
  check: async () => (await fetch(CORE_URL, { signal: AbortSignal.timeout(250) })).ok,
});

const app = express();
app.use(express.static(path.join(__dirname, '..', '..', 'public')));
app.get('/api/status', (_req, res) => res.json(monitor.snapshot()));
app.get('/health', (_req, res) => res.json({ ok: true })); // usado pelo Docker

app.listen(PORT, () => {
  monitor.start();
  console.log(`[backend] http://localhost:${PORT} monitorando ${CORE_URL}`);
});

process.on('SIGTERM', () => process.exit(0));
