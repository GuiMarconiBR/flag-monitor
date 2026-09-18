# Guia: rodar, subir ao GitHub e apresentar

## 1. Rodar sem Docker (Codespaces)
```bash
npm install
npm run core     # terminal 1: liga o core (servidor online)
npm start        # terminal 2 (botão +): liga backend + página
```
Aba **PORTS** -> porta 3000 -> ícone de globo abre a página.
- Derrubar: `Ctrl+C` no terminal do core. Ligar de novo: `npm run core`.

## 2. Rodar com Docker
```bash
docker compose up --build -d   # sobe core + backend
docker compose stop core       # derruba o core -> bandeira vermelha
docker compose start core      # volta -> bandeira verde
docker compose ps              # status e healthcheck
docker compose logs -f backend # logs ao vivo
docker compose down            # desliga tudo
```

## 3. Subir ao GitHub (um Pull Request por etapa)
Depois de descompactar o zip na raiz do repositório (Codespaces):
```bash
# PR 1 - planejamento (você já está em docs/planejamento)
git add docs README.md
git commit -m "docs: planejamento e guia"
git push -u origin docs/planejamento
# GitHub: Compare & pull request -> Merge

# PR 2 - aplicação
git checkout main && git pull
git checkout -b feat/app
npm install && npm test
git add package.json package-lock.json src public test
git commit -m "feat: monitor, core e frontend"
git push -u origin feat/app        # PR -> Merge

# PR 3 - Docker
git checkout main && git pull
git checkout -b feat/docker
git add Dockerfile docker-compose.yml .dockerignore
git commit -m "build: dockerfile e compose"
git push -u origin feat/docker     # PR -> Merge

# PR 4 - GitHub Actions
git checkout main && git pull
git checkout -b ci/github-actions
git add .github
git commit -m "ci: testes e release"
git push -u origin ci/github-actions   # PR -> veja a aba Actions -> Merge

# Release (publica a imagem no GHCR)
git checkout main && git pull
git tag v1.0.0 && git push origin v1.0.0
```
`package-lock.json` precisa ser commitado: o Docker e o CI usam `npm ci`, que exige esse arquivo.

## 4. Roteiro de apresentação (~10 min)
1. **Problema e objetivo** (1 min): mostre `docs/planejamento.md` (requisitos e diagrama).
2. **Processo** (2 min): no GitHub, mostre o histórico de Pull Requests e os commits.
3. **Demonstração** (4 min): `docker compose up --build -d`, abra a página (bandeira verde), rode `docker compose stop core` (vermelha + novo item no histórico), depois `docker compose start core` (verde de novo).
4. **CI/CD** (2 min): aba Actions com os checks verdes; o CI repete o teste online -> offline automaticamente.
5. **Monitoramento** (1 min): `docker compose ps` (healthcheck) e `docker compose logs -f backend`.

Dicas: deixe o Codespace aberto e o Docker testado antes de apresentar (ele hiberna por inatividade); tenha o repositório aberto em outra aba.
