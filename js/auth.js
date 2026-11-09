// js/auth.js
// Inscription, connexion, jauge de robustesse et blocage après 3 échecs.

// 1. Récupération des éléments HTML qu'on va manipuler
const inputMotDePasse = document.getElementById("password");
const jaugeBarre = document.getElementById("strength-bar");
const jaugeTexte = document.getElementById("strength-label");
const boiteJauge = document.getElementById("password-strength-container");

// Les 4 puces HTML des règles
const regleLongueur = document.getElementById("rule-length");
const regleMajuscule = document.getElementById("rule-uppercase");
const regleChiffre = document.getElementById("rule-number");
const regleSpecial = document.getElementById("rule-special");

// Formulaire et boutons
const formAuth = document.getElementById("auth-form");
const inputIdentifiant = document.getElementById("username");
const inputConfirmMotDePasse = document.getElementById("confirm-password");
const divConfirmGroup = document.getElementById("confirm-group");
const btnSubmitAuth = document.getElementById("auth-submit-btn");
const btnToggleAuth = document.getElementById("toggle-auth-mode");
const titreAuth = document.getElementById("auth-title");
const msgAuth = document.getElementById("auth-message");
const textSwitch = document.getElementById("switch-text");

// Sections principales
const sectionAuth = document.getElementById("auth-section");
const sectionApp = document.getElementById("app-section");
const btnLogout = document.getElementById("logout-btn");

// Variables d'état
let modeInscription = true; // true = écran d'inscription, false = écran de connexion
let motDePasseFort = false; // true quand les 4 règles sont respectées
let minuteurBlocage = null; // sert à faire tourner le compte à rebours

// ==========================================
// JAUGE DE ROBUSTESSE (US7)
// ==========================================

if (inputMotDePasse) {
  inputMotDePasse.addEventListener("input", testerRobustesseMotDePasse);
}

function testerRobustesseMotDePasse() {
  const motDePasse = inputMotDePasse.value;
  let score = 0; // Nombre de règles respectées

  // Règle 1 : Au moins 8 caractères
  const aAssezDeCaracteres = motDePasse.length >= 8;
  if (aAssezDeCaracteres) score++;
  validerRegle(regleLongueur, aAssezDeCaracteres);

  // Règle 2 : Au moins une majuscule
  const aUneMajuscule = /[A-Z]/.test(motDePasse);
  if (aUneMajuscule) score++;
  validerRegle(regleMajuscule, aUneMajuscule);

  // Règle 3 : Au moins un chiffre
  const aUnChiffre = /[0-9]/.test(motDePasse);
  if (aUnChiffre) score++;
  validerRegle(regleChiffre, aUnChiffre);

  // Règle 4 : Au moins un caractère spécial
  const aUnSpecial = /[^a-zA-Z0-9]/.test(motDePasse);
  if (aUnSpecial) score++;
  validerRegle(regleSpecial, aUnSpecial);

  mettreAJourJaugeVisuelle(score, motDePasse.length);
  motDePasseFort = score === 4;
  mettreAJourBouton();
}

// Change l'icône d'une règle (❌ -> ✅)
function validerRegle(elementHTML, estValide) {
  if (estValide) {
    elementHTML.classList.add("valid");
    elementHTML.textContent = elementHTML.textContent.replace("❌", "✅");
  } else {
    elementHTML.classList.remove("valid");
    elementHTML.textContent = elementHTML.textContent.replace("✅", "❌");
  }
}

// Adapte la jauge : 0 à 2 règles = faible, 3 = moyen, 4 = fort (les couleurs sont dans le CSS)
function mettreAJourJaugeVisuelle(score, longueur) {
  if (longueur === 0) {
    jaugeTexte.textContent = "Faible";
    jaugeBarre.style.width = "0%";
  } else if (score <= 2) {
    jaugeTexte.textContent = "Faible";
    jaugeBarre.style.width = "33%";
    jaugeBarre.className = "faible";
  } else if (score === 3) {
    jaugeTexte.textContent = "Moyen";
    jaugeBarre.style.width = "66%";
    jaugeBarre.className = "moyen";
  } else {
    jaugeTexte.textContent = "Fort";
    jaugeBarre.style.width = "100%";
    jaugeBarre.className = "fort";
  }
}

// ==========================================
// OUTILS
// ==========================================

// Affiche un message sous le formulaire (rouge par défaut, vert si c'est une réussite)
function afficherMessage(texte, reussite) {
  msgAuth.textContent = texte;
  if (reussite) {
    msgAuth.classList.add("ok");
  } else {
    msgAuth.classList.remove("ok");
  }
}

// Transforme un texte en empreinte SHA-256 (le mot de passe n'est jamais stocké en clair)
async function hacherTexte(texte) {
  const encodeur = new TextEncoder();
  const donnees = encodeur.encode(texte);
  const hashBuffer = await crypto.subtle.digest("SHA-256", donnees);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  // Convertit chaque octet en hexadécimal
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

// Crée un "sel" : une suite aléatoire ajoutée au mot de passe avant le hachage.
// Deux utilisateurs avec le même mot de passe n'auront donc pas la même empreinte.
function genererSel() {
  const octets = new Uint8Array(16);
  crypto.getRandomValues(octets);
  return Array.from(octets).map((b) => b.toString(16).padStart(2, "0")).join("");
}

// ==========================================
// BASCULE INSCRIPTION / CONNEXION
// ==========================================

function afficherMode(inscription) {
  modeInscription = inscription;

  if (inscription) {
    titreAuth.textContent = "Inscription";
    btnSubmitAuth.textContent = "Créer un compte";
    textSwitch.textContent = "Déjà un compte ?";
    btnToggleAuth.textContent = "Se connecter";
    divConfirmGroup.classList.remove("hidden");
    boiteJauge.classList.remove("hidden");
    inputConfirmMotDePasse.required = true;
    inputMotDePasse.autocomplete = "new-password";
  } else {
    titreAuth.textContent = "Connexion";
    btnSubmitAuth.textContent = "Se connecter";
    textSwitch.textContent = "Pas encore de compte ?";
    btnToggleAuth.textContent = "Créer un compte";
    divConfirmGroup.classList.add("hidden");
    boiteJauge.classList.add("hidden");
    inputConfirmMotDePasse.required = false; // Champ caché : il ne doit pas bloquer le formulaire
    inputMotDePasse.autocomplete = "current-password";
  }

  afficherMessage("", false); // Réinitialise les messages
  mettreAJourBouton();
  verifierBlocage();
}

if (btnToggleAuth) {
  btnToggleAuth.addEventListener("click", () => {
    afficherMode(!modeInscription);
  });
}

// En inscription, le bouton reste inactif tant que le mot de passe n'est pas "Fort" (US7).
// Il est aussi inactif pendant un blocage de connexion (US8).
function mettreAJourBouton() {
  const bloque = !modeInscription && estBloque();
  const inscriptionImpossible = modeInscription && !motDePasseFort;
  btnSubmitAuth.disabled = bloque || inscriptionImpossible;
}

// ==========================================
// BLOCAGE APRÈS 3 ÉCHECS (US8)
// ==========================================

// Renvoie true si le compte est bloqué en ce moment
function estBloque() {
  const utilisateur = lireUtilisateur();
  return utilisateur !== null && utilisateur.tempsBlocage && Date.now() < utilisateur.tempsBlocage;
}

// Lance (ou arrête) le compte à rebours selon l'état du compte.
// Comme l'heure de fin est dans le localStorage, le blocage reste actif après un rechargement.
function verifierBlocage() {
  clearInterval(minuteurBlocage); // On arrête l'ancien compte à rebours s'il y en a un

  if (modeInscription || !estBloque()) {
    inputIdentifiant.disabled = false;
    inputMotDePasse.disabled = false;
    mettreAJourBouton();
    return;
  }

  inputIdentifiant.disabled = true;
  inputMotDePasse.disabled = true;
  mettreAJourBouton();
  mettreAJourCompteARebours();
  minuteurBlocage = setInterval(mettreAJourCompteARebours, 1000); // Toutes les secondes
}

function mettreAJourCompteARebours() {
  const utilisateur = lireUtilisateur();
  const secondesRestantes = Math.ceil((utilisateur.tempsBlocage - Date.now()) / 1000);

  if (secondesRestantes <= 0) {
    // Fin du blocage : on réactive tout
    utilisateur.tempsBlocage = null;
    sauvegarderUtilisateur(utilisateur);
    afficherMessage("Tu peux réessayer.", true);
    verifierBlocage();
    return;
  }

  afficherMessage(`Compte bloqué. Réessaie dans ${secondesRestantes} seconde(s).`, false);
}

// ==========================================
// SOUMISSION DU FORMULAIRE
// ==========================================

if (formAuth) {
  formAuth.addEventListener("submit", async (e) => {
    e.preventDefault(); // Empêche la page de se recharger

    const identifiant = inputIdentifiant.value.trim();
    const motDePasse = inputMotDePasse.value;

    // --- CAS 1 : INSCRIPTION ---
    if (modeInscription) {
      // Un seul compte par navigateur : on refuse d'écraser un compte existant
      const compteExistant = lireUtilisateur();
      if (compteExistant !== null) {
        // Même identifiant : on le dit clairement. Sinon, c'est la limite d'un compte par navigateur.
        if (compteExistant.identifiant.toLowerCase() === identifiant.toLowerCase()) {
          afficherMessage("Cet identifiant existe déjà. Connecte-toi.", false);
        } else {
          afficherMessage("Un compte existe déjà sur ce navigateur (un seul utilisateur par navigateur). Connecte-toi.", false);
        }
        return;
      }

      // Vérification 1 : mot de passe identique dans les deux champs (US7)
      if (motDePasse !== inputConfirmMotDePasse.value) {
        afficherMessage("Les deux mots de passe ne sont pas identiques.", false);
        return;
      }

      // Vérification 2 : le mot de passe doit être FORT (US7)
      if (!motDePasseFort) {
        afficherMessage("Le mot de passe doit respecter les 4 règles (niveau Fort).", false);
        return;
      }

      // Hachage du mot de passe avec un sel
      const sel = genererSel();
      const passHache = await hacherTexte(sel + motDePasse);

      // Création de l'objet utilisateur
      const nouvelUtilisateur = {
        identifiant: identifiant,
        motDePasseHache: passHache,
        sel: sel,
        echecsConnexion: 0,
        tempsBlocage: null // Heure de fin du blocage (null = pas bloqué)
      };

      sauvegarderUtilisateur(nouvelUtilisateur);

      // On vide les champs et on passe sur l'écran de connexion
      formAuth.reset();
      testerRobustesseMotDePasse();
      afficherMode(false);
      afficherMessage("Compte créé avec succès ! Tu peux maintenant te connecter.", true);
    }

    // --- CAS 2 : CONNEXION ---
    else {
      const utilisateurEnregistre = lireUtilisateur();

      if (!utilisateurEnregistre) {
        afficherMessage("Aucun compte trouvé. Veuillez vous inscrire.", false);
        return;
      }

      // Si le compte est bloqué, on ne teste même pas le mot de passe
      if (estBloque()) {
        verifierBlocage();
        return;
      }

      const passSaisiHache = await hacherTexte((utilisateurEnregistre.sel || "") + motDePasse);

      if (
        identifiant === utilisateurEnregistre.identifiant &&
        passSaisiHache === utilisateurEnregistre.motDePasseHache
      ) {
        // SUCCÈS : on remet les échecs à zéro et on garde la connexion pour cet onglet
        utilisateurEnregistre.echecsConnexion = 0;
        utilisateurEnregistre.tempsBlocage = null;
        sauvegarderUtilisateur(utilisateurEnregistre);
        sessionStorage.setItem(CLE_SESSION, "oui");

        afficherMessage("", false);
        afficherApplication();
      } else {
        // ÉCHEC : on augmente le compteur
        utilisateurEnregistre.echecsConnexion = (utilisateurEnregistre.echecsConnexion || 0) + 1;

        if (utilisateurEnregistre.echecsConnexion >= 3) {
          // Après 3 échecs, blocage pendant 1 minute (60 000 ms)
          utilisateurEnregistre.tempsBlocage = Date.now() + 60000;
          utilisateurEnregistre.echecsConnexion = 0; // Le compteur repart à zéro
          sauvegarderUtilisateur(utilisateurEnregistre);
          verifierBlocage(); // Désactive les champs et lance le compte à rebours
        } else {
          sauvegarderUtilisateur(utilisateurEnregistre);
          const essaisRestants = 3 - utilisateurEnregistre.echecsConnexion;
          // On distingue un identifiant inconnu d'un mauvais mot de passe.
          // Dans les deux cas, l'essai compte dans les 3 échecs.
          const cause = identifiant === utilisateurEnregistre.identifiant
            ? "Mot de passe incorrect."
            : "Cet identifiant n'existe pas.";
          afficherMessage(`${cause} ${essaisRestants} essai(s) restant(s).`, false);
        }
      }
    }
  });
}

// ==========================================
// AFFICHAGE DE L'APPLICATION / DÉCONNEXION
// ==========================================

function afficherApplication() {
  sectionAuth.classList.add("hidden");
  sectionApp.classList.remove("hidden");
}

if (btnLogout) {
  btnLogout.addEventListener("click", () => {
    sessionStorage.removeItem(CLE_SESSION);
    sectionApp.classList.add("hidden");
    sectionAuth.classList.remove("hidden");
    formAuth.reset();
    testerRobustesseMotDePasse();
    afficherMode(false); // Après une déconnexion, on revient sur l'écran de connexion
  });
}

// ==========================================
// DÉMARRAGE DE LA PAGE
// ==========================================

if (sessionStorage.getItem(CLE_SESSION) === "oui" && lireUtilisateur() !== null) {
  // Déjà connecté dans cet onglet (rechargement de la page) : on affiche directement l'application
  afficherApplication();
} else {
  // Sinon : inscription si aucun compte n'existe, connexion dans le cas contraire
  afficherMode(lireUtilisateur() === null);
}
