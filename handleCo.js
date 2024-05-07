function test() {
  const name = document.getElementById("name").value;
  const password = document.getElementById("password").value;
  // Charge le fichier JSON contenant les données d'authentification
  fetch("./DB.json")
    .then((response) => response.json())
    .then((data) => {
      const user = data.find((user) => user.name === name);
      const userPass = data.find((userPass) => userPass.password === password);
      if (user) {
        if (userPass) {
          alert("Connexion réussie");
          // Redirige l'utilisateur vers la page index.html avec le nom de la personne connectée
          window.location.href = `display.html?name=${encodeURIComponent(name)}`;
        } else {
          alert("Mot de passe incorrect");
        }
      } else {
        alert("Nom d'utilisateur incorrect");
      }
    })
    .catch((error) => {
      console.error("Erreur lors du chargement du fichier JSON:", error);
    });
}
