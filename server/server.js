const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes"); // Importer les routes des utilisateurs

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Utiliser les routes
app.use("/api/users", userRoutes); // Préfixer les routes avec /api/users

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
