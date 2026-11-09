// js/organisation.js
// Catégories, filtre, tri et affichage de la liste des tâches.

let listeCategories = lireCategories();

const boutonsFiltreStatut = document.querySelectorAll("#status-filter .btn-status");
const selectTriOption = document.getElementById("sort-option");
const inputRecherche = document.getElementById("search-input");
const selectCategorieForm = document.getElementById("task-category");

const formCategorie = document.getElementById("category-form");
const inputNomCat = document.getElementById("category-name");
const inputCouleurCat = document.getElementById("category-color");
const msgErreurCategorie = document.getElementById("category-error");

// --- CATÉGORIES ---

// Remplit le menu déroulant des catégories dans le formulaire de tâche
function chargerCategoriesFormulaire() {
  if (!selectCategorieForm) return;

  selectCategorieForm.innerHTML = '<option value="">Aucune catégorie</option>';

  listeCategories.forEach((cat) => {
    const option = document.createElement("option");
    option.value = cat.id;
    option.textContent = cat.nom; // textContent : pas de risque d'injection de HTML
    selectCategorieForm.appendChild(option);
  });
}

if (formCategorie) {
  formCategorie.addEventListener("submit", (e) => {
    e.preventDefault();

    const nom = inputNomCat.value.trim();
    const couleur = inputCouleurCat.value;

    // Nom vide refusé
    if (nom === "") {
      msgErreurCategorie.textContent = "Le nom de la catégorie est obligatoire.";
      msgErreurCategorie.classList.remove("hidden");
      return;
    }

    // Nom déjà utilisé refusé (on ignore les majuscules)
    const existeDeja = listeCategories.some(
      (c) => c.nom.toLowerCase() === nom.toLowerCase()
    );
    if (existeDeja) {
      msgErreurCategorie.textContent = "Une catégorie avec ce nom existe déjà.";
      msgErreurCategorie.classList.remove("hidden");
      return;
    }
    msgErreurCategorie.classList.add("hidden");

    const nouvelleCategorie = {
      id: Date.now(),
      nom: nom,
      couleur: couleur
    };

    listeCategories.push(nouvelleCategorie);
    sauvegarderCategories(listeCategories);
    chargerCategoriesFormulaire();
    afficherListeTaches();

    formCategorie.reset();
  });
}

// --- FILTRE ET TRI (US5) ---

// Met un texte en minuscules et sans accents, pour que "etude" trouve "Étude"
function simplifierTexte(texte) {
  return texte.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

// Statut actuellement choisi dans la ligne de boutons ("tous" = pas de filtre)
let filtreStatut = "tous";

// Clic sur un bouton de filtre : on retient son statut et on met en avant ce bouton
boutonsFiltreStatut.forEach((bouton) => {
  bouton.addEventListener("click", () => {
    filtreStatut = bouton.dataset.status;
    boutonsFiltreStatut.forEach((b) => b.classList.remove("active"));
    bouton.classList.add("active");
    afficherListeTaches();
  });
});

function obtenirTachesFiltreesEtTriees() {
  let resultats = [...listeTaches]; // On copie le tableau pour ne pas modifier l'original

  // Filtre par statut
  if (filtreStatut !== "tous") {
    resultats = resultats.filter((t) => t.statut === filtreStatut);
  }

  // Recherche par mot-clé dans le titre ou dans le nom de la catégorie
  const motCle = simplifierTexte(inputRecherche ? inputRecherche.value : "");
  if (motCle !== "") {
    resultats = resultats.filter((t) => {
      const cat = listeCategories.find((c) => c.id === Number(t.categorieId));
      const nomCategorie = cat ? cat.nom : "";
      return simplifierTexte(t.titre + " " + nomCategorie).includes(motCle);
    });
  }

  // Plus il y a d'étoiles, plus la tâche est prioritaire : 3 étoiles = important, 1 étoile = secondaire
  const valeurPriorite = { "***": 3, "**": 2, "*": 1 };
  const critereTri = selectTriOption ? selectTriOption.value : "aucun";

  if (critereTri === "priorite") {
    // Les tâches importantes (3 étoiles) d'abord
    resultats.sort(
      (a, b) => (valeurPriorite[b.priorite] || 0) - (valeurPriorite[a.priorite] || 0)
    );
  } else if (critereTri === "echeance") {
    // Date la plus proche d'abord ; sans échéance à la fin, classées entre elles par priorité
    resultats.sort((a, b) => {
      if (!a.echeance && !b.echeance) {
        return (valeurPriorite[b.priorite] || 0) - (valeurPriorite[a.priorite] || 0);
      }
      if (!a.echeance) return 1;
      if (!b.echeance) return -1;
      return a.echeance.localeCompare(b.echeance);
    });
  } else {
    // "Récents" : la dernière tâche créée (id le plus grand) en premier
    resultats.sort((a, b) => b.id - a.id);
  }

  return resultats;
}

// --- AFFICHAGE DE LA LISTE (US2, US3, US5, US6) ---

// Transforme "2026-11-15" en "15/11/2026"
function formaterDate(dateISO) {
  const morceaux = dateISO.split("-");
  return morceaux[2] + "/" + morceaux[1] + "/" + morceaux[0];
}

function afficherListeTaches() {
  if (!listeTachesHTML) return;

  listeTachesHTML.innerHTML = "";

  const tachesAAfficher = obtenirTachesFiltreesEtTriees();

  if (tachesAAfficher.length === 0) {
    const vide = document.createElement("li");
    vide.className = "empty-msg";
    vide.textContent = listeTaches.length === 0
      ? "Aucune tâche pour le moment. Ajoute ta première tâche ci-dessus."
      : "Aucune tâche ne correspond à ta recherche ou à ce filtre.";
    listeTachesHTML.appendChild(vide);
    return;
  }

  // Date d'aujourd'hui au format AAAA-MM-JJ (pour repérer les tâches en retard)
  const aujourdhui = new Date().toLocaleDateString("fr-CA");

  // Texte affiché pour chaque statut, et symbole dans la case à cliquer
  const nomsStatuts = {
    a_commencer: "À faire",
    en_cours: "En cours",
    abandonne: "Abandonnée",
    termine: "Terminée"
  };
  const symbolesCase = {
    a_commencer: "",
    en_cours: "–",
    abandonne: "✕",
    termine: "✓"
  };

  tachesAAfficher.forEach((tache) => {
    const li = document.createElement("li");
    li.className = "task-item statut-" + tache.statut;

    const estTerminee = tache.statut === "termine";
    if (estTerminee) {
      li.classList.add("completed");
    }

    // Badge de la catégorie (si la tâche en a une)
    let badgeCategorieHTML = "";
    if (tache.categorieId) {
      const cat = listeCategories.find((c) => c.id === Number(tache.categorieId));
      if (cat) {
        badgeCategorieHTML = `<span class="category-badge" style="background-color: ${couleurValide(cat.couleur)}">${echapperHTML(cat.nom)}</span>`;
      }
    }

    // Étoiles : "***" devient "★★★"
    const etoiles = "★".repeat(tache.priorite.length);
    const nomsPriorites = { "*": "Secondaire", "**": "Moyenne", "***": "Important" };

    // Échéance (en rouge si elle est dépassée et que la tâche n'est pas terminée)
    let dateHTML = "";
    if (tache.echeance) {
      const enRetard = tache.echeance < aujourdhui && !estTerminee;
      dateHTML = `<span class="task-date ${enRetard ? "late" : ""}">Échéance : ${formaterDate(tache.echeance)}${enRetard ? " (en retard)" : ""}</span>`;
    }

    // Date de fin ou d'abandon (affichée seulement si une date a été saisie)
    let dateFinHTML = "";
    if (tache.dateFin && estTerminee) {
      dateFinHTML = `<span class="task-date done">Terminée le ${formaterDate(tache.dateFin)}</span>`;
    } else if (tache.dateFin && tache.statut === "abandonne") {
      dateFinHTML = `<span class="task-date">Abandonnée le ${formaterDate(tache.dateFin)}</span>`;
    }

    // Bouton "Abandonner" : sur une tâche déjà abandonnée, il devient "Reprendre" (retour à "À faire")
    const estAbandonnee = tache.statut === "abandonne";
    const boutonAbandonHTML = estAbandonnee
      ? `<button type="button" class="text-btn" onclick="changerStatut(${tache.id}, 'a_commencer')">Reprendre</button>`
      : `<button type="button" class="text-btn" onclick="changerStatut(${tache.id}, 'abandonne')">Abandonner</button>`;

    // La case change le statut à chaque clic : À faire -> En cours -> Terminée -> À faire
    const infoBulle = `Statut : ${nomsStatuts[tache.statut]}. Cliquer pour passer à « ${nomsStatuts[STATUTS_SUIVANTS[tache.statut]]} »`;

    // Le titre passe par echapperHTML pour éviter l'injection de code
    li.innerHTML = `
      <button
        type="button"
        class="status-box"
        data-status="${tache.statut}"
        onclick="avancerStatut(${tache.id})"
        title="${infoBulle}"
        aria-label="${infoBulle}"
      >${symbolesCase[tache.statut]}</button>

      <div class="task-text">
        <span class="task-title-text">${echapperHTML(tache.titre)}</span>
        <div class="task-meta">
          <span class="task-status-label" data-status="${tache.statut}">${nomsStatuts[tache.statut]}</span>
          ${badgeCategorieHTML}
          <span class="task-priority" title="Priorité : ${nomsPriorites[tache.priorite]}">${etoiles}</span>
          ${dateHTML}
          ${dateFinHTML}
        </div>
      </div>

      <div class="task-actions">
        <button type="button" class="text-btn" onclick="modifierTache(${tache.id})">Modifier</button>
        ${boutonAbandonHTML}
        <button type="button" class="text-btn danger" onclick="supprimerTache(${tache.id})">Supprimer</button>
      </div>
    `;

    listeTachesHTML.appendChild(li);
  });
}

if (selectTriOption) selectTriOption.addEventListener("change", afficherListeTaches);
if (inputRecherche) inputRecherche.addEventListener("input", afficherListeTaches); // À chaque lettre tapée

// Au démarrage : on remplit le menu des catégories et on affiche la liste
chargerCategoriesFormulaire();
afficherListeTaches();
