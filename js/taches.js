// js/taches.js
// Créer, modifier, terminer et supprimer des tâches.
// (L'affichage de la liste est dans organisation.js : afficherListeTaches())

// 1. Sélection des éléments HTML
const accordeonTache = document.getElementById("task-accordion");
const formTache = document.getElementById("task-form");
const titreFormulaireTache = document.getElementById("task-form-title");
const inputTitre = document.getElementById("task-title");
const selectPriorite = document.getElementById("task-stars");
const selectCategorieTache = document.getElementById("task-category");
const inputEcheance = document.getElementById("task-due-date");
const msgErreurTitre = document.getElementById("task-title-error");
const btnValiderTache = document.getElementById("add-task-btn");
const btnAnnulerModif = document.getElementById("cancel-edit-btn");
const listeTachesHTML = document.getElementById("task-list");

// 2. Données : on charge les tâches enregistrées
let listeTaches = lireTaches(); // Fonction issue de stockage.js

// Id de la tâche qu'on est en train de modifier (null = on crée une nouvelle tâche)
let idTacheEnModification = null;

// 3. Soumission du formulaire (créer - US1, ou modifier - US2)
if (formTache) {
  formTache.addEventListener("submit", (e) => {
    e.preventDefault();

    const titre = inputTitre.value.trim();

    // Règle US1 : Titre vide refusé (même règle pour la modification)
    if (titre === "") {
      msgErreurTitre.classList.remove("hidden");
      return;
    }
    msgErreurTitre.classList.add("hidden");

    // La catégorie choisie : "" veut dire "aucune", sinon on garde son id (en nombre)
    const categorieId = selectCategorieTache.value === "" ? null : Number(selectCategorieTache.value);

    if (idTacheEnModification !== null) {
      // --- MODIFICATION d'une tâche existante ---
      const tache = listeTaches.find((t) => t.id === idTacheEnModification);
      if (tache) {
        tache.titre = titre;
        tache.priorite = selectPriorite.value;
        tache.echeance = inputEcheance.value || "";
        tache.categorieId = categorieId;
      }
    } else {
      // --- CRÉATION d'une nouvelle tâche (modèle de données du README) ---
      const nouvelleTache = {
        id: Date.now(), // Identifiant unique basé sur le temps
        titre: titre,
        description: "",
        priorite: selectPriorite.value, // "*", "**", ou "***"
        echeance: inputEcheance.value || "", // Date AAAA-MM-JJ ou vide
        dateFin: "", // Date de fin (remplie quand la tâche est terminée, facultative)
        statut: "a_commencer", // Statut par défaut
        categorieId: categorieId
      };
      listeTaches.push(nouvelleTache);
    }

    sauvegarderTaches(listeTaches);
    afficherListeTaches();
    quitterModeModification(); // Remet le formulaire à zéro
  });
}

// Bouton "Annuler" du mode modification
if (btnAnnulerModif) {
  btnAnnulerModif.addEventListener("click", quitterModeModification);
}

// 4. Passer en mode modification : on remplit le formulaire avec la tâche choisie (US2)
function modifierTache(id) {
  const tache = listeTaches.find((t) => t.id === id);
  if (!tache) return;

  idTacheEnModification = id;

  inputTitre.value = tache.titre;
  selectPriorite.value = tache.priorite;
  selectCategorieTache.value = tache.categorieId === null ? "" : tache.categorieId;
  inputEcheance.value = tache.echeance;

  titreFormulaireTache.textContent = "Modifier la tâche";
  btnValiderTache.textContent = "Enregistrer les modifications";
  btnAnnulerModif.classList.remove("hidden");

  accordeonTache.open = true; // On ouvre l'accordéon au cas où il serait fermé
  accordeonTache.scrollIntoView({ behavior: "smooth" });
  inputTitre.focus();
}

// Revenir au mode "ajout" et vider le formulaire
function quitterModeModification() {
  idTacheEnModification = null;
  formTache.reset();
  msgErreurTitre.classList.add("hidden");
  titreFormulaireTache.textContent = "Ajouter une nouvelle tâche";
  btnValiderTache.textContent = "Valider la tâche";
  btnAnnulerModif.classList.add("hidden");
}

// 5. Règle de cohérence entre la case à cocher et le statut (US3 ↔ US5)
// Clic sur la case d'une tâche : À faire -> En cours -> Terminée -> (retour) À faire.
// Une tâche abandonnée repasse à "À faire".
const STATUTS_SUIVANTS = {
  a_commencer: "en_cours",
  en_cours: "termine",
  termine: "a_commencer",
  abandonne: "a_commencer"
};

function avancerStatut(id) {
  const tache = listeTaches.find((t) => t.id === id);
  if (!tache) return;

  changerStatut(id, STATUTS_SUIVANTS[tache.statut]);
}

function changerStatut(id, nouveauStatut) {
  const tache = listeTaches.find((t) => t.id === id);
  if (!tache) return;

  const statutChange = tache.statut !== nouveauStatut;
  tache.statut = nouveauStatut;

  // Quand le statut change, l'ancienne date de fin n'a plus de sens : on l'efface
  if (statutChange) {
    tache.dateFin = "";
  }

  sauvegarderTaches(listeTaches);
  afficherListeTaches();

  // La tâche vient d'être terminée ou abandonnée : on propose (sans obliger) une date
  if (statutChange && (nouveauStatut === "termine" || nouveauStatut === "abandonne")) {
    proposerDateFin(id, nouveauStatut);
  }
}

// 5 bis. Fenêtre qui propose une date (facultative) pour une tâche terminée ou abandonnée
const fenetreDateFin = document.getElementById("end-date-dialog");
const titreDateFin = document.getElementById("end-date-title");
const labelDateFin = document.getElementById("end-date-label");
const formDateFin = document.getElementById("end-date-form");
const inputDateFin = document.getElementById("end-date-input");
const btnPasserDateFin = document.getElementById("end-date-skip");

// Id de la tâche pour laquelle on demande la date de fin
let idTacheDateFin = null;

function proposerDateFin(id, statut) {
  idTacheDateFin = id;

  // Les textes de la fenêtre changent selon le statut
  if (statut === "abandonne") {
    titreDateFin.textContent = "Tâche abandonnée";
    labelDateFin.textContent = "Date d'abandon";
  } else {
    titreDateFin.textContent = "Tâche terminée !";
    labelDateFin.textContent = "Date de fin";
  }

  inputDateFin.value = new Date().toLocaleDateString("fr-CA"); // Aujourd'hui par défaut (AAAA-MM-JJ)
  fenetreDateFin.showModal();
}

if (formDateFin) {
  // Bouton "Enregistrer" : on note la date de fin choisie (si le champ est vide, on ne note rien)
  formDateFin.addEventListener("submit", (e) => {
    e.preventDefault();
    const tache = listeTaches.find((t) => t.id === idTacheDateFin);
    if (tache && inputDateFin.value !== "") {
      tache.dateFin = inputDateFin.value;
      sauvegarderTaches(listeTaches);
      afficherListeTaches();
    }
    fenetreDateFin.close();
  });
}

// Bouton "Passer" : la date de fin est facultative, on ferme simplement la fenêtre
if (btnPasserDateFin) {
  btnPasserDateFin.addEventListener("click", () => fenetreDateFin.close());
}

// 6. Supprimer une tâche avec confirmation (US2)
function supprimerTache(id) {
  const confirmation = confirm("Veux-tu vraiment supprimer cette tâche ?");
  if (confirmation) {
    // On conserve toutes les tâches SAUF celle qui a cet id
    listeTaches = listeTaches.filter((t) => t.id !== id);
    sauvegarderTaches(listeTaches);

    // Si on supprime la tâche qu'on était en train de modifier, on quitte le mode modification
    if (id === idTacheEnModification) {
      quitterModeModification();
    }
    afficherListeTaches();
  }
}
