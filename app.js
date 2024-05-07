let blocCouleur = document.getElementById("couleur");
let scoreDisplay = document.getElementById("score");
let reponses = [...document.getElementsByClassName("reponse")];

let compteurScore = 0;
let rgbADeviner;

const genererEntierPourRgb = () => {
  return Math.floor(Math.random() * 256); // 0 et 255
};

const genererRgb = () => {
  let r = genererEntierPourRgb();
  let g = genererEntierPourRgb();
  let b = genererEntierPourRgb();

  return `rgb(${r},${g},${b})`;
};

const initialiser = () => {
  scoreDisplay.textContent = compteurScore;
  let reponseCorrecte = Math.floor(Math.random() * 4); // 0 et 3

  reponses.forEach((rep) => (rep.textContent = genererRgb()));
  rgbADeviner = reponses[reponseCorrecte].textContent;

  blocCouleur.style.backgroundColor = rgbADeviner;
};

const enregistrerScore = async (name, score) => {
  try {
    const response = await fetch("/update-score", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, score }),
    });
    if (!response.ok) {
      throw new Error("Erreur lors de l'enregistrement du score.");
    }
  } catch (error) {
    console.error("Erreur lors de l'enregistrement du score:", error);
  }
};

const verifierReponse = (e) => {
  let valeurCliquee = e.target.textContent;

  if (valeurCliquee != rgbADeviner) {
    window.alert(`Vous avez perdu ! La réponse était ${rgbADeviner}`);
    // Enregistre le score lorsque le joueur perd
    enregistrerScore(username, compteurScore);
    compteurScore = 0;
    return initialiser();
  }

  compteurScore++;
  initialiser();
};

reponses.forEach((rep) => {
  rep.addEventListener("click", verifierReponse);
});

initialiser();
