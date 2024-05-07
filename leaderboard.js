// Chargement des données du leaderboard depuis le fichier JSON
fetch("./DB.json")
  .then((response) => response.json())
  .then((data) => {
    // Triez les données par score décroissant
    data.sort((a, b) => b.score - a.score);

    // Sélectionnez le tbody où insérer les données
    const leaderboardBody = document.getElementById("leaderboardBody");

    // Bouclez à travers les données pour les afficher dans le tableau
    data.forEach((user, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${user.name}</td>
        <td>${user.score}</td>
      `;
      leaderboardBody.appendChild(row);
    });
  })
  .catch((error) => {
    console.error("Erreur lors du chargement du leaderboard:", error);
  });
