// Core: servidor mínimo. Ligar = servidor online. Derrubar = servidor offline.
const http = require('http');
const PORT = process.env.CORE_PORT || 4000;

http
  .createServer((_req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok' }));
  })
  .listen(PORT, () => console.log(`[core] no ar na porta ${PORT}`));

process.on('SIGTERM', () => process.exit(0)); // permite "docker stop" rápido
