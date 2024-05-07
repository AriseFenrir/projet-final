async function register() {
  const name = document.getElementById("name").value;
  const password = document.getElementById("password").value;
  try {
    // Envoie les données d'inscription au serveur pour enregistrement
    const response = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name, password: password }),
    });

    // Vérifie si la requête a réussi
    if (response.ok) {
      alert("Inscription réussie. Vous pouvez maintenant vous connecter.");
      window.location.href = `display.html?name=${encodeURIComponent(name)}`;
    } else {
      alert("Erreur lors de l'inscription.");
    }
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    alert("Une erreur s'est produite lors de l'inscription.");
  }
}
