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
        res.json({ userId: result.insertId });
      }
    );
  });
});

// Endpoint pour la connexion
router.post("/login", async (req, res) => {
  const { email, motdepasse } = req.body;

  // Récupérer l'utilisateur par email
  const sql = "SELECT * FROM utilisateur WHERE email = ?";
  db.query(sql, [email], (err, results) => {
    if (err) {
      return res.status(500).send("Erreur lors de la connexion");
    }
    if (results.length > 0) {
      const user = results[0];
      // Vérifier le mot de passe haché
      bcrypt.compare(motdepasse, user.motdepasse, (err, isMatch) => {
        if (err) {
          return res
            .status(500)
            .send("Erreur lors de la vérification du mot de passe");
        }
        if (isMatch) {
          // Renvoyer l'ID de l'utilisateur et un message de succès
          res.json({ userId: user.id, message: "Connexion réussie" });
        } else {
          res.status(401).send("Identifiants incorrects");
        }
      });
    } else {
      res.status(401).send("Identifiants incorrects");
    }
  });
});

// Endpoint pour ajouter des données à la table Argent
router.post("/argent", (req, res) => {
  const { idutilisateur, totalargent, salaire, budget, epargne } = req.body;

  const sql =
    "INSERT INTO argent (idutilisateur, totalargent, salaire, budget, epargne) VALUES (?, ?, ?, ?, ?)";
  db.query(
    sql,
    [idutilisateur, totalargent, salaire, budget, epargne],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Erreur lors de l'ajout des données");
      }
      res.send("Données ajoutées avec succès");
    }
  );
});

module.exports = router;
