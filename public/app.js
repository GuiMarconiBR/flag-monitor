const flag = document.getElementById('flag');
const label = document.getElementById('label');
const list = document.getElementById('history');
const TEXTO = { online: 'Servidor ONLINE', offline: 'Servidor OFFLINE' };
let ultimoHistorico = '';

function desenharHistorico(historico) {
  const chave = JSON.stringify(historico);
  if (chave === ultimoHistorico) return; // só redesenha quando algo mudou
  ultimoHistorico = chave;
  list.replaceChildren(...historico.map(({ status, timestamp }) => {
    const li = document.createElement('li');
    const dot = document.createElement('span');
    dot.className = `dot ${status}`;
    const texto = document.createElement('span');
    texto.textContent = `${new Date(timestamp).toLocaleString('pt-BR')} — ${status}`;
    li.append(dot, texto);
    return li;
  }));
}

async function atualizar() {
  try {
    const dados = await (await fetch('/api/status', { cache: 'no-store' })).json();
    flag.className = dados.status || 'unknown';
    label.textContent = TEXTO[dados.status] || 'Verificando…';
    if (dados.history.length) desenharHistorico(dados.history);
  } catch {
    flag.className = 'offline'; // se o próprio backend caiu, a bandeira fica vermelha
    label.textContent = 'Monitor inacessível';
  }
  setTimeout(atualizar, 300);
}
atualizar();
