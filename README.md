# TaskFlow

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