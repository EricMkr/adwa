describe('Test de la page d’accueil', () => {
  it('devrait afficher le contenu de la page', () => {
    cy.visit('http://127.0.0.1:5500/adwa/index.html'); // utilise automatiquement baseUrl
  });
});
