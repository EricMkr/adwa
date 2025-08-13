const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://127.0.0.1:5500/adwa/index.html',
    viewportWidth: 1280,
    viewportHeight: 720
  }
});
