/// <reference types="cypress" />

describe("Vérification du titre de la page", () => {
  beforeEach(() => {
    // Charge la page (grâce au baseUrl défini dans cypress.config.js)
    cy.visit("http://127.0.0.1:3000/adwa/index.html");
  });

  it("Le titre doit être 'Formulaire Landing Page'", () => {
    cy.title().should("eq", "Formulaire Landing Page");
  });
});

describe("Formulaire -> Enregistrement dans data.json", () => {
  beforeEach(() => {
    // Vide le fichier data.json avant chaque test
    cy.request("POST", "http://localhost:3000/reset");
    cy.visit("/index.html");
  });

  it("Ajoute un utilisateur dans data.json", () => {
    cy.get("#name").type("Alice Martin");
    cy.get("#email").type("alice.martin@example.com");
    cy.get("#message").type("Ceci est un message test.");
    cy.get("button[type='submit']").click();

    // Vérifie la popup de succès
    cy.on("window:alert", (text) => {
      expect(text).to.contains("Inscription réussie 🎉");
    });

    // Vérifie que data.json contient bien l'utilisateur sous forme de tableau
    cy.readFile("data.json").then((data) => {
      expect(data).to.be.an("array");           // Vérifie que c'est un tableau
      expect(data).to.have.length(1);           // Doit contenir 1 entrée
      expect(data[0]).to.have.property("name", "Alice Martin");
      expect(data[0]).to.have.property("email", "alice.martin@example.com");
      expect(data[0]).to.have.property("message", "Ceci est un message test.");
    });
  });
});
