describe('Test de la page d’accueil', () => {
  it('devrait afficher le contenu de la page', () => {
    cy.visit('http://127.0.0.1:5500/adwa/index.html'); // utilise automatiquement baseUrl
  });
});

/// <reference types="cypress" />

describe("Formulaire Landing Page", () => {
  beforeEach(() => {
    // Charge ton index.html local
    cy.visit("index.html");
  });

  it("Affiche bien le formulaire", () => {
    cy.get("h2").should("contain.text", "Inscrivez-vous");
    cy.get("form").should("be.visible");
    cy.get("input#name").should("exist");
    cy.get("input#email").should("exist");
    cy.get("textarea#message").should("exist");
    cy.get("button[type='submit']").should("exist");
  });

  it("Valide que les champs obligatoires sont requis", () => {
    cy.get("button[type='submit']").click();
    // Vérifie qu’il y a bien une erreur de validation native HTML
    cy.get("input#name:invalid").should("exist");
    cy.get("input#email:invalid").should("exist");
  });

  it("Accepte un email valide", () => {
    cy.get("input#name").type("Jean Dupont");
    cy.get("input#email").type("jean.dupont@example.com");
    cy.get("textarea#message").type("Ceci est un test.");
    cy.get("button[type='submit']").click();
    
    // Si tu ajoutes le JS de confirmation (comme proposé avant) :
    cy.contains("Merci pour votre inscription").should("be.visible");
  });

  it("Refuse un email invalide", () => {
    cy.get("input#name").type("Jean Dupont");
    cy.get("input#email").type("jean.dupont@invalide");
    cy.get("button[type='submit']").click();

    // Vérifie que l’email est invalide selon la validation native
    cy.get("input#email:invalid").should("exist");
  });
});
