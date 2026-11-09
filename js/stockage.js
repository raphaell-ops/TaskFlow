// js/stockage.js

// 1. Clés d'accès au localStorage (exactement comme dans le README)
const CLE_TACHES = "taskflow_taches";
const CLE_CATEGORIES = "taskflow_categories";
const CLE_UTILISATEUR = "taskflow_utilisateur";

// Clé de session : elle disparaît quand on ferme l'onglet (sert à rester connecté après un rechargement)
const CLE_SESSION = "taskflow_connecte";

// --- GESTION DES TÂCHES ---

// Lit la liste des tâches enregistrées, ou renvoie un tableau vide [] si aucune tâche n'existe encore
function lireTaches() {
  const donneesTexte = localStorage.getItem(CLE_TACHES);
  if (donneesTexte) {
    const taches = JSON.parse(donneesTexte); // On reconvertit le texte en vrai tableau JS
    // Le statut "en_attente" n'existe plus : ces anciennes tâches repassent à "a_commencer"
    taches.forEach((t) => {
      if (t.statut === "en_attente") {
        t.statut = "a_commencer";
      }
    });
    return taches;
  }
  return []; // Défaut : tableau vide
}

// Enregistre le tableau complet de tâches dans le localStorage
function sauvegarderTaches(tableauTaches) {
  const donneesTexte = JSON.stringify(tableauTaches); // On convertit le tableau JS en texte
  localStorage.setItem(CLE_TACHES, donneesTexte);
}

// --- GESTION DES CATEGORIES ---

function lireCategories() {
  const donneesTexte = localStorage.getItem(CLE_CATEGORIES);
  if (donneesTexte) {
    return JSON.parse(donneesTexte);
  }
  // Catégories par défaut si rien n'est encore créé
  return [
    { id: 1, nom: "Travail", couleur: "#EF4444" },
    { id: 2, nom: "Étude", couleur: "#3B82F6" },
    { id: 3, nom: "Perso", couleur: "#F59E0B" }
  ];
}

function sauvegarderCategories(tableauCategories) {
  localStorage.setItem(CLE_CATEGORIES, JSON.stringify(tableauCategories));
}

// --- GESTION DE L'UTILISATEUR ---

function lireUtilisateur() {
  const donneesTexte = localStorage.getItem(CLE_UTILISATEUR);
  if (donneesTexte) {
    return JSON.parse(donneesTexte);
  }
  return null; // Aucun utilisateur n'est inscrit pour le moment
}

function sauvegarderUtilisateur(objetUtilisateur) {
  localStorage.setItem(CLE_UTILISATEUR, JSON.stringify(objetUtilisateur));
}

// --- OUTILS DE SÉCURITÉ POUR L'AFFICHAGE ---

// Transforme un texte pour qu'il soit affiché tel quel dans la page.
// Sans ça, un titre comme <img src=x onerror=alert(1)> exécuterait du code (faille XSS).
function echapperHTML(texte) {
  const div = document.createElement("div");
  div.textContent = texte; // textContent n'interprète jamais le HTML
  return div.innerHTML; // innerHTML renvoie alors le texte "protégé" (< devient &lt;)
}

// Vérifie qu'une couleur est bien de la forme #a1b2c3, sinon renvoie une couleur grise
function couleurValide(couleur) {
  if (/^#[0-9a-fA-F]{6}$/.test(couleur)) {
    return couleur;
  }
  return "#888888";
}
