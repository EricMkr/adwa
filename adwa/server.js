const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;
const dataFile = path.join(__dirname, "data.json");

// Middleware
app.use(bodyParser.json());
app.use(express.static(__dirname)); // sert index.html et CSS/JS

// API POST pour enregistrer un utilisateur
app.post("/save", (req, res) => {
  const { name, email, message } = req.body;

  // Charge les données existantes
  let data = [];
  if (fs.existsSync(dataFile)) {
    data = JSON.parse(fs.readFileSync(dataFile, "utf8"));
  }

  // Vérifie si l’utilisateur existe déjà (nom ET email identiques)
  const exists = data.some(
    (u) => u.name.toLowerCase() === name.toLowerCase() && u.email === email
  );

  if (exists) {
    return res.status(400).json({ success: false, message: "User already exists" });
  }

  // Ajoute le nouvel utilisateur
  data.push({ name, email, message });

  // Sauvegarde dans le fichier
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));

  res.json({ success: true, message: "User saved successfully" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

// Ajoute cette route dans server.js
app.post("/reset", (req, res) => {
  fs.writeFileSync(dataFile, JSON.stringify([], null, 2));
  res.json({ success: true });
});
