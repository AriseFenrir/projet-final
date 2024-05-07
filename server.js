const express = require("express");
const fs = require("fs").promises;
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());

// Endpoint pour gérer les inscriptions
app.post("/register", async (req, res) => {
  try {
    const { name: name, password: password } = req.body; // Nom d'utilisateur envoyé depuis le client
    // Charge les données actuelles depuis le fichier JSON
    const data = JSON.parse(await fs.readFile("./DB.json", "utf8"));
    // Vérifie si le nom d'utilisateur est déjà utilisé
    const existingUser = data.find((user) => user.name === name);
    if (existingUser) {
      res.status(400).send("Nom d'utilisateur déjà utilisé.");
      return;
    }
    // Ajoute le nouvel utilisateur aux données
    data.push({ name: name, password: password, score: 0 });
    // Enregistre les données mises à jour dans le fichier JSON
    await fs.writeFile("./DB.json", JSON.stringify(data, null, 2));
    res.sendStatus(200); // Répond avec un statut 200 pour indiquer que l'inscription a réussi
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    res.sendStatus(500); // Répond avec un statut 500 en cas d'erreur
  }
});
app.post("/update-score", async (req, res) => {
  try {
    const { name, score } = req.body;
    const data = JSON.parse(await fs.readFile("./DB.json", "utf8"));
    const userIndex = data.findIndex((user) => user.name === name);
    if (userIndex !== -1) {
      data[userIndex].score = score;
      await fs.writeFile("./DB.json", JSON.stringify(data, null, 2));
      res.sendStatus(200);
    } else {
      res.status(404).send("Utilisateur non trouvé.");
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour du score:", error);
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
