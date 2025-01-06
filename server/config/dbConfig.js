const mysql = require("mysql2");

// Configurer la connexion à la base de données
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ABC@def123",
  database: "budgetapp",
  port: 3306,
});

// Connecter à la base de données
db.connect((err) => {
  if (err) {
    console.error("Erreur lors de la connexion à la base de données :", err);
    process.exit(1); // Quitte l'application proprement
  }
  console.log("Connecté à la base de données MySQL");
});

module.exports = db; // Exporter la connexion pour l'utiliser dans d'autres fichiers
