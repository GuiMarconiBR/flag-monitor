const test = require('node:test');
const assert = require('node:assert');
const { Monitor } = require('../src/backend/monitor');

test('registra apenas mudanças de estado', async () => {
  const respostas = [true, true, false, false, true];
  const m = new Monitor({ check: async () => respostas.shift() });
  for (let i = 0; i < 5; i++) await m.tick();
  const { status, history } = m.snapshot();
  assert.equal(status, 'online');
  assert.deepEqual(history.map((h) => h.status), ['online', 'offline', 'online']);
});

test('erro na verificação conta como offline', async () => {
  const m = new Monitor({ check: async () => { throw new Error('falhou'); } });
  await m.tick();
  assert.equal(m.snapshot().status, 'offline');
});

test('histórico respeita o limite', async () => {
  let ligado = false;
  const m = new Monitor({ check: async () => (ligado = !ligado), maxHistory: 3 });
  for (let i = 0; i < 10; i++) await m.tick();
  assert.equal(m.snapshot().history.length, 3);
});
