# TaskFlow

Mini-application web de gestion de tâches, réalisée en binôme dans le cadre du module **Outils IA** (Bachelor 1, Ynov Toulouse).

| | |
|---|---|
| **Binôme** | Lisa (Cybersécurité) · Raphaël (Informatique) |
| **Module** | Outils IA · Bachelor 1 · 3 séances |
| **Technologies** | HTML, CSS, JavaScript (sans framework) |
| **Données** | Stockées dans le navigateur (localStorage), sans serveur |

---

## 1. Cahier des charges

### Objectif
Permettre à un utilisateur de gérer ses tâches (créer, organiser, suivre, terminer) dans une application simple, protégée par un écran de connexion. L'application fonctionne entièrement dans le navigateur, avec **un seul utilisateur par navigateur**.

### Fonctionnalités de base
- Créer une tâche (titre, priorité, échéance facultative) ; un titre vide est refusé
- Afficher toutes les tâches avec leur priorité, leur échéance, leur statut et leur catégorie
- Modifier une tâche existante
- Terminer une tâche : elle apparaît barrée
- Supprimer une tâche (avec confirmation)
- Sauvegarde automatique : les tâches sont retrouvées après fermeture du navigateur

### Fonctionnalités filière Informatique (Raphaël)
- Priorité de 1 à 3 étoiles
- 4 statuts dans un menu déroulant : à faire, en cours, en attente, terminée
- Filtre par statut
- Tri par priorité ou par échéance
- Catégories en couleur et création de catégories

### Fonctionnalités filière Cybersécurité (Lisa)
- Création de compte avec contrôle de robustesse du mot de passe : 8 caractères minimum, une majuscule, un chiffre, un caractère spécial
- Jauge de robustesse faible / moyen / fort
- Écran de connexion avant d'accéder aux tâches
- Blocage pendant 1 minute après 3 échecs de connexion

### Contraintes techniques
- HTML, CSS et JavaScript, sans framework ni bibliothèque externe
- Pas de serveur ni de base de données : sauvegarde dans le localStorage
- Aucune donnée personnelle réelle dans l'application

---

## 2. User stories

Les stories ont été obtenues avec l'IA en 3 itérations (détail dans [PROMPTS.md](PROMPTS.md)). La règle du cours impose 8 stories maximum : nous avons fait une story par grand besoin plutôt qu'une par fonction.

### US1 · Créer une tâche
> En tant qu'utilisateur, je veux ajouter une tâche avec un titre, une priorité de 1 à 3 étoiles et une échéance, sans pouvoir valider si le titre est vide, afin de noter clairement tout ce que j'ai à faire.

- Si le titre est vide ou ne contient que des espaces, la tâche n'est pas créée et un message « Le titre est obligatoire » s'affiche sous le champ.
- La priorité se choisit en cliquant sur 1, 2 ou 3 étoiles ; par défaut, une tâche a 1 étoile.
- Une fois validée, la tâche apparaît immédiatement dans la liste avec le statut « à faire », et le formulaire se vide.

### US2 · Afficher, modifier, supprimer
> En tant qu'utilisateur, je veux voir toutes mes tâches et pouvoir les modifier ou les supprimer afin de garder une liste juste et à jour.

- Chaque tâche affiche son titre, sa priorité en étoiles, son échéance, son statut et sa catégorie.
- Je peux modifier le titre, la priorité, l'échéance ou la catégorie d'une tâche existante ; un titre vide est refusé comme à la création.
- Un clic sur la corbeille demande une confirmation, puis retire définitivement la tâche de la liste.

### US3 · Terminer une tâche
> En tant qu'utilisateur, je veux marquer une tâche comme terminée pour qu'elle apparaisse barrée afin de voir d'un coup d'œil ce que j'ai déjà accompli.

- Cocher la case d'une tâche affiche son titre barré et passe automatiquement son statut à « terminée ».
- Décocher la case retire le barré et remet le statut à « à faire ».

### US4 · Sauvegarde automatique
> En tant qu'utilisateur, je veux retrouver automatiquement mes tâches à chaque fois que j'ouvre l'application afin de ne rien perdre entre deux utilisations.

- Après fermeture puis réouverture du navigateur, toutes les tâches et catégories sont présentes, avec leur état.
- Toute modification (ajout, changement, suppression, case cochée) est enregistrée sans bouton « Sauvegarder ».

### US5 · Organiser sa liste
> En tant qu'utilisateur, je veux choisir le statut de chaque tâche (à faire, en cours, en attente, terminée), filtrer ma liste par statut et la trier par priorité ou par échéance afin de me concentrer sur ce qui est le plus urgent.

- Chaque tâche a un menu déroulant avec les 4 statuts ; choisir « terminée » coche la case et barre la tâche, choisir un autre statut la décoche et retire le barré.
- Un filtre permet d'afficher toutes les tâches ou seulement celles d'un statut donné.
- Le tri par priorité affiche d'abord les tâches à 3 étoiles ; le tri par échéance affiche d'abord la date la plus proche.
- Filtre et tri peuvent être utilisés en même temps.

### US6 · Classer par catégorie
> En tant qu'utilisateur, je veux créer mes propres catégories colorées et y classer mes tâches afin de distinguer rapidement mes cours, ma vie perso et mes projets.

- Je peux créer une catégorie en lui donnant un nom et une couleur ; un nom vide ou déjà existant est refusé.
- Je peux attribuer une catégorie à une tâche à sa création ou en la modifiant.
- La couleur de la catégorie est visible sur chaque tâche qui lui appartient.

### US7 · Créer un compte sécurisé
> En tant que nouvel utilisateur, je veux créer un compte avec un mot de passe dont la robustesse (8 caractères, une majuscule, un chiffre, un caractère spécial) m'est indiquée par une jauge faible / moyen / fort afin de choisir un mot de passe difficile à deviner.

- La jauge se met à jour à chaque caractère tapé, selon le nombre de règles respectées sur 4 : 0 à 2 règles = faible, 3 règles = moyen, 4 règles = fort.
- La liste des 4 règles s'affiche sous le champ, et chaque règle respectée est marquée comme validée.
- Le compte ne peut être créé que si le mot de passe est « fort » ; sinon le bouton reste inactif et un message indique les règles manquantes.
- L'utilisateur doit saisir deux fois le mot de passe ; si les deux saisies diffèrent, le compte n'est pas créé.

### US8 · Se connecter
> En tant qu'utilisateur, je veux me connecter avant d'accéder à mes tâches, avec un blocage d'une minute après 3 échecs, afin que personne d'autre ne puisse consulter ma liste ni deviner mon mot de passe par essais successifs.

- Les tâches ne sont visibles qu'après une connexion réussie.
- Après un mot de passe incorrect, un message indique l'échec et le nombre d'essais restants.
- Après 3 échecs, le champ et le bouton sont désactivés, et un compte à rebours affiche le temps restant avant de pouvoir réessayer.
- Le blocage reste actif même si l'utilisateur recharge la page ; à la fin de la minute, le compteur d'échecs repart à zéro.

---

## 3. Règles de gestion

| Règle | Comportement |
|---|---|
| Case ↔ statut | Cocher la case passe le statut à « terminée » ; choisir « terminée » coche la case. Décocher ou choisir un autre statut fait l'inverse. |
| Statut par défaut | Une nouvelle tâche est « à faire » ; une tâche décochée revient à « à faire ». |
| Priorité par défaut | 1 étoile. |
| Échéance | Facultative. Dans le tri par échéance, les tâches sans échéance sont placées après les autres et classées entre elles par priorité. |
| Catégorie | Une tâche appartient à une seule catégorie au maximum. |
| Jauge | 0 à 2 règles = faible, 3 = moyen, 4 = fort. Seul un mot de passe « fort » est accepté. |
| Blocage | 3 échecs → 1 minute de blocage, maintenu même après rechargement de la page. |
| Mot de passe oublié | Aucune récupération possible (voir Sécurité). |

---


## Modèle de données

L'application ne dispose ni de serveur ni de base de données. Toutes les données sont sauvegardées dans le `localStorage` du navigateur, sous trois clés. Chaque navigateur ne gère qu'un seul utilisateur.

| Clé localStorage | Contenu |
|---|---|
| `taskflow_taches` | Tableau des tâches |
| `taskflow_categories` | Tableau des catégories (nom + couleur) |
| `taskflow_utilisateur` | Objet utilisateur (identifiant, mot de passe et phrase de secours hachés) |

### Exemple

```json
{
  "taskflow_taches": [
    {
      "id": 1,
      "titre": "Réviser le CSS",
      "description": "Flexbox",
      "priorite": "***",
      "echeance": "2026-11-15",
      "statut": "a_commencer",
      "categorieId": 2
    },
    {
      "id": 4,
      "titre": "Rendre le TP JavaScript",
      "description": "",
      "priorite": "**",
      "echeance": "2026-11-18",
      "statut": "en_cours",
      "categorieId": null
    }
  ],
  "taskflow_categories": [
    { "id": 1, "nom": "Travail", "couleur": "#EF4444" },
    { "id": 2, "nom": "Etude", "couleur": "#3B82F6" },
    { "id": 3, "nom": "Perso", "couleur": "#F59E0B" }
  ],
  "taskflow_utilisateur": {
    "identifiant": "utilisateur_demo",
    "motDePasseHache": "9f86d081884c7d65...",
    "sel": "a1b2c3d4...",
    "phraseSecoursHachee": "5e884898da280471...",
    "selPhrase": "e5f6a7b8...",
    "echecsConnexion": 0,
    "bloque": false
  }
}
```

### Tâche

| Champ | Type | Valeurs autorisées | Rôle |
|---|---|---|---|
| `id` | nombre | unique, jamais réutilisé | Identifie la tâche. Les trous (1, 4…) sont normaux après une suppression. |
| `titre` | texte | non vide | Nom de la tâche |
| `description` | texte | peut être vide | Détails |
| `priorite` | texte | `"*"`, `"**"`, `"***"` | Plus il y a d'étoiles, plus la priorité est haute |
| `echeance` | texte | date `AAAA-MM-JJ` (ISO 8601) | Norme internationale ; triée comme du texte, elle reste dans l'ordre chronologique |
| `statut` | texte | `"a_commencer"`, `"en_cours"`, `"termine"`, `"abandonne"` | Choisi dans un menu déroulant ; une tâche `termine` s'affiche barrée |
| `categorieId` | nombre ou `null` | `id` d'une catégorie existante, ou `null` | Lien vers la catégorie ; `null` = sans catégorie |

### Catégorie

| Champ | Type | Rôle |
|---|---|---|
| `id` | nombre | Identifiant unique, utilisé par les tâches |
| `nom` | texte | Nom affiché, modifiable sans casser le lien avec les tâches |
| `couleur` | texte (code hexadécimal) | Couleur affichée pour toutes les tâches de la catégorie |

L'utilisateur peut créer ses propres catégories. Quand on supprime une catégorie, ses tâches passent en « sans catégorie » (`categorieId: null`).

### Utilisateur

| Champ | Type | Rôle |
|---|---|---|
| `identifiant` | texte | Nom de connexion |
| `motDePasseHache` | texte | Empreinte du mot de passe. Le mot de passe n'est jamais stocké en clair. |
| `sel` | texte | Valeur aléatoire ajoutée au mot de passe avant hachage |
| `phraseSecoursHachee` | texte | Empreinte de la phrase de secours qui débloque le compte |
| `selPhrase` | texte | Sel propre à la phrase de secours |
| `echecsConnexion` | nombre | Nombre d'échecs consécutifs |
| `bloque` | booléen | `true` après 3 échecs ; le déblocage passe par la phrase de secours |

### Limites connues

Sans serveur, toutes les données restent accessibles depuis les outils de développement du navigateur. Une personne qui a accès à l'ordinateur peut effacer le `localStorage` ou modifier `bloque`. Le hachage empêche de lire le mot de passe et la phrase de secours, mais l'écran de connexion et le blocage servent surtout à dissuader, pas à protéger réellement les données.