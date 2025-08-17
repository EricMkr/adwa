const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://127.0.0.1:5500/adwa/index.html',
    viewportWidth: 1280,
    viewportHeight: 720
  }
});

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000", // Ton serveur Express
    supportFile: false,               // Pas de fichier support inutile
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}", // Dossier des tests
    video: true,                      // Enregistre les vidéos des tests (utile en CI)
    screenshotsFolder: "cypress/screenshots",
    videosFolder: "cypress/videos",
    setupNodeEvents(on, config) {
      // Ici tu peux ajouter des plugins si nécessaire
      return config;
    },
  },

  reporter: "spec",                   // Reporter par défaut
  reporterOptions: {
    mochaFile: "cypress/results/test-results.xml",
    toConsole: true,
  },

  retries: {
    runMode: 2,   // Réessaie 2 fois en mode "cypress run"
    openMode: 0,  // Pas de retries en mode "cypress open"
  },

  viewportWidth: 1200,                // Taille de la fenêtre par défaut
  viewportHeight: 800,

  chromeWebSecurity: false,           // Pour éviter certains blocages CORS
});
