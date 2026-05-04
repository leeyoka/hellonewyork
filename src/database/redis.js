// src/database/redis.js
// Mocking ioredis for the environment to prevent connection errors
// while maintaining the interface from your backend repo

class MockRedis {
  constructor(config) {
    this.config = config;
    console.log(`[MockRedis] Initialized with host: ${config.host}, port: ${config.port}`);
  }

  async get(key) {
    console.log(`[MockRedis] GET ${key}`);
    return null;
  }

  async set(key, value, mode, duration) {
    console.log(`[MockRedis] SET ${key} = ${value}`);
    return 'OK';
  }

  async del(key) {
    console.log(`[MockRedis] DEL ${key}`);
    return 1;
  }

  on(event, callback) {
    if (event === 'connect') {
      setTimeout(() => callback(), 100);
    }
  }
}

const redis = new MockRedis({
  host: '127.0.0.1',
  port: 6379
});

export default redis;
