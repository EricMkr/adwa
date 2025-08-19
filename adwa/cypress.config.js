const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://127.0.0.1:3000/adwa/index.html',
    viewportWidth: 1280,
    viewportHeight: 720,
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
})
