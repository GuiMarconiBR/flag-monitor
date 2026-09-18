// Verifica o core periodicamente e guarda apenas as MUDANÇAS de estado.
class Monitor {
  constructor({ check, intervalMs = 300, maxHistory = 100, now = () => new Date() }) {
    Object.assign(this, { check, intervalMs, maxHistory, now });
    this.status = null; // 'online' | 'offline' | null (ainda sem verificação)
    this.lastCheck = null;
    this.history = [];
    this.busy = false;
    this.timer = null;
  }

  start() { this.timer = setInterval(() => this.tick(), this.intervalMs); }
  stop() { clearInterval(this.timer); }

  async tick() {
    if (this.busy) return; // não acumula verificações se uma demorar
    this.busy = true;
    let online = false;
    try { online = Boolean(await this.check()); } catch { online = false; } finally { this.busy = false; }
    this.record(online ? 'online' : 'offline');
  }

  record(status) {
    this.lastCheck = this.now().toISOString();
    if (status === this.status) return;
    this.status = status;
    this.history.unshift({ status, timestamp: this.lastCheck });
    if (this.history.length > this.maxHistory) this.history.pop();
    console.log(`[monitor] ${this.lastCheck} -> ${status}`);
  }

  snapshot() { return { status: this.status, lastCheck: this.lastCheck, history: this.history }; }
}

module.exports = { Monitor };
