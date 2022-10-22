class AgentBootHook {
  constructor(agent) {
    this.agent = agent;
  }

  async serverDidReady() {
    this.agent.logger.info('[agent sendMessage] %s', 'init-redis-apiItems');
    this.agent.messenger.sendRandom('init-redis-apiItems');
  }
}

module.exports = AgentBootHook;
