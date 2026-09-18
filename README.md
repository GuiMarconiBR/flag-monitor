# DevOps Flag Monitor

Página que mostra uma bandeira verde (servidor online) ou vermelha (offline) e o histórico de mudanças. O backend (Node + Express) verifica o `core` a cada 0,3 s.

```
public/        frontend (HTML, CSS, JS)
src/backend/   Express + monitor
src/core/      servidor simples que você liga e derruba
test/          testes (node --test)
docs/          planejamento e guia (rodar, GitHub, apresentar)
```

Início rápido: `npm install`, `npm run core`, `npm start` e abra a porta 3000. Com Docker: `docker compose up --build -d`.
Detalhes em [docs/guia.md](docs/guia.md).
