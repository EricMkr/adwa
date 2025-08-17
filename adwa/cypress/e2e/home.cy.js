/// <reference types="cypress" />

describe("Formulaire Landing Page", () => {
  beforeEach(() => {
    // Charge ton index.html local
    cy.visit("http://127.0.0.1:3000/adwa/index.html");
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

/// <reference types="cypress" />

describe("Formulaire Landing Page avec sauvegarde", () => {
  beforeEach(() => {
    // Reset du fichier data.json avant chaque test
    cy.request("POST", "http://localhost:3000/reset");

    // Charge la page
    cy.visit("http://localhost:3000/index.html");
  });

  it("Ajoute un nouvel utilisateur et le sauvegarde", () => {
    cy.get("#name").type("Jean Dupont");
    cy.get("#email").type("jean.dupont@example.com");
    cy.get("#message").type("Ceci est un test.");
    cy.get("button[type='submit']").click();

    // Vérifie la popup de succès
    cy.on("window:alert", (text) => {
      expect(text).to.contains("Inscription réussie 🎉");
    });

    // Vérifie que data.json contient bien l’utilisateur
    cy.readFile("data.json").then((data) => {
      expect(data).to.have.length(1);
      expect(data[0].name).to.equal("Jean Dupont");
      expect(data[0].email).to.equal("jean.dupont@example.com");
    });
  });

  it("Empêche un doublon (nom + email identiques)", () => {
    // Premier enregistrement
    cy.get("#name").type("Jean Dupont");
    cy.get("#email").type("jean.dupont@example.com");
    cy.get("#message").type("Premier test.");
    cy.get("button[type='submit']").click();

    cy.on("window:alert", (text) => {
      expect(text).to.contains("Inscription réussie 🎉");
    });

    // Réessai avec le même utilisateur
    cy.get("#name").type("Jean Dupont");
    cy.get("#email").type("jean.dupont@example.com");
    cy.get("#message").type("Second test.");
    cy.get("button[type='submit']").click();

    cy.on("window:alert", (text) => {
      expect(text).to.contains("User already exists");
    });

    // Vérifie que data.json contient toujours un seul enregistrement
    cy.readFile("data.json").then((data) => {
      expect(data).to.have.length(1);
    });
  });
});
