const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../config/dbConfig"); // Assurez-vous d'importer votre configuration de base de données

// Endpoint pour l'inscription
router.post("/register", async (req, res) => {
  const {
    nom,
    prenom,
    email,
    motdepasse,
    situationFamiliale,
    nbrEnfants,
    dateNaissance,
    genre,
    ville,
  } = req.body;

  // Vérification de l'email unique
  const checkEmailSql = "SELECT * FROM utilisateur WHERE email = ?";
  db.query(checkEmailSql, [email], async (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erreur lors de la vérification de l'email");
    }
    if (results.length > 0) {
      return res.status(400).send("Email déjà utilisé");
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(motdepasse, 10);

    const sql =
      "INSERT INTO utilisateur (nom, prenom, email, motdepasse, situationFamiliale, nbrEnfants, dateNaissance, genre, ville) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(
      sql,
      [
        nom,
        prenom,
        email,
        hashedPassword,
        situationFamiliale,
        nbrEnfants,
        dateNaissance,
        genre,
        ville,
      ],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Erreur lors de l'inscription");
        }
        res.send("Utilisateur inscrit avec succès");
      }
    );
  });
});

// Endpoint pour la connexion
router.post("/login", async (req, res) => {
  const { email, motdepasse } = req.body;

  // Vérifier si l'email existe
  const sql = "SELECT * FROM utilisateur WHERE email = ?";
  db.query(sql, [email], async (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erreur lors de la connexion");
    }

    // Si aucun utilisateur n'est trouvé avec cet email
    if (results.length === 0) {
      return res.status(404).send("Email non trouvé");
    }

    // Comparer le mot de passe
    const isValidPassword = await bcrypt.compare(
      motdepasse,
      results[0].motdepasse
    );
    if (isValidPassword) {
      res.send("Connexion réussie");
    } else {
      res.status(401).send("Mot de passe incorrect");
    }
  });
});

module.exports = router;
