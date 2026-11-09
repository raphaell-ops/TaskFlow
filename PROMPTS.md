# PROMPTS.md — Journal de prompts TaskFlow

> Module Outils IA · Bachelor 1 · Ynov Toulouse
>
> Binôme : Lisa (Cybersécurité) + Raph (Informatique)
>
> Fonctionnalités filière : connexion et robustesse du mot de passe (Lisa) · tri, filtres et catégories (Raph)

---

## Sommaire

- **Séance 1 · Cadrage du projet** : prompts 1 à 3 (user stories)
- **Séance 2 · Développement de TaskFlow**
  - Sprint 1 · Fonctions de base : prompts 4 et 5
  - Sprint 2 · Sauvegarde et mise en forme CSS : prompts 6 et 7
  - Sprint 3 · Fonctionnalités filière : prompts 8 à 11
  - Transversal · Vérifications et documentation : prompts 12 à 14
  - Bilan de la séance 2

---

## Séance 1 · Cadrage du projet

*User stories, critères d'acceptation, règles de gestion.*

### Prompt 1 · User stories (Claude)

**Prompt :**
> Tu es un développeur web qui accompagne des étudiants de 1re année.
> Contexte : nous sommes un binôme (une étudiante cyber, un étudiant informatique) et nous créons TaskFlow, une application de gestion de tâches en HTML, CSS et JavaScript, sans framework, sans serveur, avec sauvegarde dans le localStorage.
> Fonctionnalités de base : créer (titre, priorité, échéance, titre vide refusé), afficher, modifier, terminer (tâche barrée), supprimer, sauvegarder.
> Fonctionnalités filière : informatique = tri par priorité ou échéance, filtre par statut, catégories colorées ; cybersécurité = écran de connexion, contrôle de robustesse du mot de passe (8 caractères, majuscule, chiffre, caractère spécial), jauge faible/moyen/fort, bonus blocage après 3 échecs.
> Tâche : propose 8 user stories au format « En tant que… je veux… afin de… ».
> Contraintes : pas de code, rien qui nécessite un serveur.
> Format : liste numérotée, une story par ligne.

**Résultat :** 8 user stories proposées :
> 1. En tant qu'utilisateur, je veux créer une tâche avec un titre, une priorité et une échéance afin de noter ce que j'ai à faire.
> 2. En tant qu'utilisateur, je veux voir toutes mes tâches avec leur priorité et leur date afin d'avoir une vue d'ensemble de mon travail.
> 3. En tant qu'utilisateur, je veux modifier le titre, la priorité ou la date d'une tâche afin de corriger une erreur ou suivre un changement de planning.
> 4. En tant qu'utilisateur, je veux cocher une tâche terminée pour qu'elle apparaisse barrée afin de voir ce que j'ai déjà accompli.
> 5. En tant qu'utilisateur, je veux supprimer une tâche afin de garder une liste à jour.
> 6. En tant qu'utilisateur, je veux retrouver mes tâches après avoir fermé le navigateur afin de ne rien perdre entre deux sessions.
> 7. En tant qu'utilisateur, je veux trier mes tâches par priorité ou par échéance, les filtrer par statut et les classer par catégorie colorée afin de m'organiser plus facilement.
> 8. En tant qu'utilisateur, je veux me connecter avec un mot de passe robuste, dont la force est indiquée par une jauge, afin que mes tâches ne soient accessibles qu'à moi.

**Gardé :** stories 1, 2, 3, 4, 5 et 6, telles quelles
**Modifié :**
- Story 7 découpée en deux : « trier » (par priorité ou par échéance) d'un côté, « filtrer par statut et classer par catégorie » de l'autre
- Story 8 recentrée sur la connexion, avec ajout du blocage pendant 1 minute après 3 échecs
- Ajout d'une story « créer un compte » avec un mot de passe robuste

**Rejeté :**
- Déblocage du compte par mail
- Remplacer la suppression par un simple déplacement vers le filtre « Terminées »
- Réduire la story 7 au seul tri par priorité

**Pourquoi :**
- Les stories 7 et 8 contenaient plusieurs actions chacune : une story doit décrire une seule chose testable.
- La story 8 supposait qu'un compte existe déjà. Il fallait une étape d'inscription, et c'est là que le contrôle de robustesse et la jauge servent.
- Envoyer un mail nécessite un serveur, ce qui est exclu par le cadre du projet.
- Supprimer et terminer sont deux actions différentes, et la suppression est une fonctionnalité obligatoire. Le passage dans « Terminées » relève déjà de la story 4 et du filtre par statut.
- Ne garder que le tri par priorité aurait fait disparaître des fonctionnalités filière informatique obligatoires.

---

### Prompt 2 · User stories (Claude)

**Prompt :**
> Voici nos retours sur ta première liste. Réécris-la entièrement en respectant ces règles. Projet : TaskFlow, application de gestion de tâches, un seul utilisateur par navigateur, sans serveur. Fonctions à couvrir : - Base : créer une tâche (titre vide refusé), afficher, modifier, terminer (la tâche terminée apparaît barrée), supprimer, sauvegarde automatique. - Informatique : priorité de 1 à 3 étoiles, 4 statuts dans un menu déroulant (propose les 4 statuts), filtre par statut, tri par priorité ou par échéance, catégories en couleur, création de catégories. - Cybersécurité : création du compte avec un mot de passe robuste (8 caractères, majuscule, chiffre, caractère spécial) et une jauge faible / moyen / fort, écran de connexion, blocage pendant 1 minute après 3 échecs. Règles : - Entre 5 et 8 stories maximum : une story par grand besoin (par exemple gérer ses tâches, organiser sa liste, classer par catégorie, protéger l'accès, récupérer l'accès), pas une par fonction. - Format « En tant que… je veux… afin de… », le « afin de » est obligatoire. - Les stories décrivent un besoin de l'utilisateur, pas une solution technique : ne mentionne ni localStorage, ni hachage, ni JSON. - Le fait qu'une tâche terminée apparaisse barrée doit être visible dans une story. - Pas de code. Format : 1. Liste numérotée des stories, une par ligne. 2. Un tableau de couverture : chaque fonction listée ci-dessus, et le numéro de la story qui la couvre.

**Résultat :** 8 user stories proposées et un tableau de couverture :
> 1. En tant qu'utilisateur, je veux ajouter une tâche avec un titre, une priorité de 1 à 3 étoiles et une échéance, sans pouvoir valider si le titre est vide, afin de noter clairement tout ce que j'ai à faire.
> 2. En tant qu'utilisateur, je veux voir toutes mes tâches et pouvoir les modifier ou les supprimer afin de garder une liste juste et à jour.
> 3. En tant qu'utilisateur, je veux marquer une tâche comme terminée pour qu'elle apparaisse barrée afin de voir d'un coup d'œil ce que j'ai déjà accompli.
> 4. En tant qu'utilisateur, je veux retrouver automatiquement mes tâches à chaque fois que j'ouvre l'application afin de ne rien perdre entre deux utilisations.
> 5. En tant qu'utilisateur, je veux choisir le statut de chaque tâche (à faire, en cours, en attente, terminée), filtrer ma liste par statut et la trier par priorité ou par échéance afin de me concentrer sur ce qui est le plus urgent.
> 6. En tant qu'utilisateur, je veux créer mes propres catégories colorées et y classer mes tâches afin de distinguer rapidement mes cours, ma vie perso et mes projets.
> 7. En tant que nouvel utilisateur, je veux créer un compte avec un mot de passe dont la robustesse (8 caractères, une majuscule, un chiffre, un caractère spécial) m'est indiquée par une jauge faible / moyen / fort afin de choisir un mot de passe difficile à deviner.
> 8. En tant qu'utilisateur, je veux me connecter avant d'accéder à mes tâches, avec un blocage d'une minute après 3 échecs, afin que personne d'autre ne puisse consulter ma liste ni deviner mon mot de passe par essais successifs.

| Fonction | Story |
|---|---|
| Créer une tâche (titre vide refusé) | 1 |
| Afficher | 2 |
| Modifier | 2 |
| Terminer (tâche barrée) | 3 |
| Supprimer | 2 |
| Sauvegarde automatique | 4 |
| Priorité de 1 à 3 étoiles | 1 |
| 4 statuts dans un menu déroulant | 5 |
| Filtre par statut | 5 |
| Tri par priorité ou par échéance | 5 |
| Catégories en couleur | 6 |
| Création de catégories | 6 |
| Création du compte, mot de passe robuste | 7 |
| Jauge faible / moyen / fort | 7 |
| Écran de connexion | 8 |
| Blocage 1 minute après 3 échecs | 8 |

**Gardé :** les 8 stories telles quelles, ainsi que les 4 statuts (à faire, en cours, en attente, terminée), qui correspondent à ceux définis par le binôme
**Modifié :** ajout d'une règle de cohérence entre la story 3 et la story 5 : cocher une tâche passe automatiquement son statut à « terminée », et choisir le statut « terminée » coche automatiquement la case (et inversement quand on décoche ou change de statut)
**Rejeté :** aucune story
**Pourquoi :**
- Les stories 2 et 5 regroupent plusieurs actions : c'est assumé, car la règle du cours impose 8 stories maximum et il y a beaucoup plus de fonctions que de stories. On a donc fait une story par grand besoin plutôt qu'une par fonction.
- Sans règle entre la case à cocher et le statut « terminée », une tâche pourrait être cochée tout en restant « en cours » : cette incohérence serait un bug dès la séance 2.

---

### Prompt 3 · User stories (Claude)

**Prompt :**
> Nous validons tes 8 stories. Ajoute une règle de cohérence : cocher une tâche passe automatiquement son statut à « terminée », et choisir le statut « terminée » coche la case ; décocher la case ou choisir un autre statut fait l'inverse. Tâche : pour chacune des 8 stories, rédige 2 à 4 critères d'acceptation, c'est-à-dire des conditions concrètes et vérifiables qui disent quand la story est terminée. Points obligatoires : - Story 1 : ce qui se passe si le titre est vide. - Stories 3 et 5 : la règle de cohérence entre la case et le statut. - Story 7 : la règle précise de la jauge (combien de critères respectés pour faible, moyen, fort) et si un mot de passe faible est refusé. - Story 8 : ce que voit l'utilisateur pendant le blocage d'une minute. Contraintes : pas de code, pas de termes techniques (localStorage, hachage, JSON). Format : le numéro et le texte de chaque story, puis ses critères en liste à puces. À la fin : liste les hypothèses que tu as faites, puis indique ce qui pourrait être faux ou manquant dans ta réponse.

**Techniques utilisées (diapo 24) :** hypothèses (« liste les hypothèses que tu as faites ») et auto-critique (« ce qui pourrait être faux ou manquant »)

**Résultat :** 2 à 4 critères d'acceptation par story, 5 hypothèses et 5 points manquants :

> **Story 1.** En tant qu'utilisateur, je veux ajouter une tâche avec un titre, une priorité de 1 à 3 étoiles et une échéance, sans pouvoir valider si le titre est vide, afin de noter clairement tout ce que j'ai à faire.
> - Si le titre est vide ou ne contient que des espaces, la tâche n'est pas créée et un message « Le titre est obligatoire » s'affiche sous le champ.
> - La priorité se choisit en cliquant sur 1, 2 ou 3 étoiles ; par défaut, une tâche a 1 étoile.
> - Une fois validée, la tâche apparaît immédiatement dans la liste avec le statut « à faire », et le formulaire se vide.
>
> **Story 2.** En tant qu'utilisateur, je veux voir toutes mes tâches et pouvoir les modifier ou les supprimer afin de garder une liste juste et à jour.
> - Chaque tâche affiche son titre, sa priorité en étoiles, son échéance, son statut et sa catégorie.
> - Je peux modifier le titre, la priorité, l'échéance ou la catégorie d'une tâche existante ; un titre vide est refusé comme à la création.
> - Un clic sur la corbeille demande une confirmation, puis retire définitivement la tâche de la liste.
>
> **Story 3.** En tant qu'utilisateur, je veux marquer une tâche comme terminée pour qu'elle apparaisse barrée afin de voir d'un coup d'œil ce que j'ai déjà accompli.
> - Cocher la case d'une tâche affiche son titre barré et passe automatiquement son statut à « terminée ».
> - Décocher la case retire le barré et remet le statut à « à faire ».
>
> **Story 4.** En tant qu'utilisateur, je veux retrouver automatiquement mes tâches à chaque fois que j'ouvre l'application afin de ne rien perdre entre deux utilisations.
> - Après fermeture puis réouverture du navigateur, toutes les tâches et catégories sont présentes, avec leur état.
> - Toute modification (ajout, changement, suppression, case cochée) est enregistrée sans bouton « Sauvegarder ».
>
> **Story 5.** En tant qu'utilisateur, je veux choisir le statut de chaque tâche (à faire, en cours, en attente, terminée), filtrer ma liste par statut et la trier par priorité ou par échéance afin de me concentrer sur ce qui est le plus urgent.
> - Chaque tâche a un menu déroulant avec les 4 statuts ; choisir « terminée » coche la case et barre la tâche, choisir un autre statut la décoche et retire le barré.
> - Un filtre permet d'afficher toutes les tâches ou seulement celles d'un statut donné.
> - Le tri par priorité affiche d'abord les tâches à 3 étoiles ; le tri par échéance affiche d'abord la date la plus proche.
> - Filtre et tri peuvent être utilisés en même temps.
>
> **Story 6.** En tant qu'utilisateur, je veux créer mes propres catégories colorées et y classer mes tâches afin de distinguer rapidement mes cours, ma vie perso et mes projets.
> - Je peux créer une catégorie en lui donnant un nom et une couleur ; un nom vide ou déjà existant est refusé.
> - Je peux attribuer une catégorie à une tâche à sa création ou en la modifiant.
> - La couleur de la catégorie est visible sur chaque tâche qui lui appartient.
>
> **Story 7.** En tant que nouvel utilisateur, je veux créer un compte avec un mot de passe dont la robustesse (8 caractères, une majuscule, un chiffre, un caractère spécial) m'est indiquée par une jauge faible / moyen / fort afin de choisir un mot de passe difficile à deviner.
> - La jauge se met à jour à chaque caractère tapé, selon le nombre de règles respectées sur 4 : 0 à 2 règles = faible, 3 règles = moyen, 4 règles = fort.
> - La liste des 4 règles s'affiche sous le champ, et chaque règle respectée est marquée comme validée.
> - Le compte ne peut être créé que si le mot de passe est « fort » ; sinon le bouton reste inactif et un message indique les règles manquantes.
> - L'utilisateur doit saisir deux fois le mot de passe ; si les deux saisies diffèrent, le compte n'est pas créé.
>
> **Story 8.** En tant qu'utilisateur, je veux me connecter avant d'accéder à mes tâches, avec un blocage d'une minute après 3 échecs, afin que personne d'autre ne puisse consulter ma liste ni deviner mon mot de passe par essais successifs.
> - Les tâches ne sont visibles qu'après une connexion réussie.
> - Après un mot de passe incorrect, un message indique l'échec et le nombre d'essais restants.
> - Après 3 échecs, le champ et le bouton sont désactivés, et un compte à rebours affiche le temps restant avant de pouvoir réessayer.
> - Le blocage reste actif même si l'utilisateur recharge la page ; à la fin de la minute, le compteur d'échecs repart à zéro.
>
> **Hypothèses faites :**
> - Décocher une tâche, ou quitter le statut « terminée », remet le statut à « à faire ».
> - Une tâche a 1 étoile par défaut et appartient à une seule catégorie au maximum.
> - La suppression d'une tâche demande une confirmation.
> - Le compte n'est accepté qu'avec un mot de passe « fort », puisque le cahier des charges impose les 4 règles.
> - Le tri par échéance place les dates les plus proches en premier.
>
> **Ce qui pourrait être faux ou manquant :**
> - Mot de passe oublié : aucune solution n'est prévue. Sans serveur ni phrase secrète, l'utilisateur perd l'accès à ses tâches. Il faut décider si c'est accepté comme limite.
> - Tâches sans échéance : on ne sait pas si l'échéance est obligatoire, ni où ces tâches apparaissent dans le tri par échéance.
> - Suppression d'une catégorie : rien n'est prévu pour les tâches qui y étaient classées.
> - Déconnexion : il n'y a pas de bouton « Se déconnecter ». On ne sait pas non plus si l'utilisateur reste connecté après fermeture du navigateur.
> - Échéance dans le passé : rien n'indique si elle est autorisée, ni si une tâche en retard est signalée.

**Gardé :** tous les critères d'acceptation et les 5 hypothèses, y compris les ajouts de l'IA (confirmation avant suppression, double saisie du mot de passe)
**Modifié :**
- Échéance facultative : dans le tri par échéance, les tâches sans échéance sont placées après celles qui en ont une, et classées entre elles par priorité
- Mot de passe oublié : aucune récupération possible, c'est une limite assumée
**Rejeté (reporté en améliorations possibles) :** suppression d'une catégorie, bouton de déconnexion et durée de la session, gestion des échéances passées et des tâches en retard
**Pourquoi :**
- La confirmation avant suppression évite une perte de données par erreur, et la double saisie évite de créer un compte avec une faute de frappe dans le mot de passe, ce qui est important puisqu'il n'y a aucune récupération possible.
- Sans serveur et sans phrase secrète, permettre une récupération créerait un moyen de contourner le mot de passe. Ne rien prévoir est le choix le plus sûr : personne ne peut accéder aux tâches sans le mot de passe, au prix de leur perte en cas d'oubli.
- Rendre l'échéance obligatoire serait contraignant pour des tâches sans date précise ; il fallait donc décider où les placer dans le tri.
- Les points reportés ne sont pas exigés par le cahier des charges et ne tiennent pas dans le temps imparti.

---

---

## Séance 2 · Développement de TaskFlow avec l'IA

> **Outil :** Claude Code (Claude Sonnet 5.5), qui lit et modifie directement les fichiers du dossier TaskFlow. C'est le mode « déléguer » du cours : l'IA est très autonome, donc chaque modification a été relue et testée dans le navigateur.
>
> **Prompts :** ils sont copiés tels qu'ils ont été écrits, fautes comprises.
>
<<<<<<< HEAD
> **Classement :** les prompts sont regroupés par sprint du cours. Un prompt qui touche plusieurs sprints est rangé dans celui où se trouve l'essentiel du travail, et une ligne « Touche aussi » l'indique. Les numéros ne suivent donc pas l'ordre chronologique.
>
=======
>>>>>>> 01b08c179b0476faa3a15b771beec3d851fafc44
> **Attention :** les prompts 1 à 3 décrivent l'état de la séance 1. L'application a évolué depuis (« en attente » est devenu « abandonnée », les priorités ont été renommées, etc.). Le README décrit l'état actuel.

---

### Sprint 1 · Fonctions de base

*Créer, afficher, modifier, supprimer, terminer.*

#### Prompt 4 · Date de fin facultative

- **Outil :** Claude Code

**Prompt :**
> quand on met une tache en terminé il faut proposer a l'utilisateur de mettre une date de fin, il faut ajouter un bouton passer si l'utilisateur ne souhaite pas mettre de date

**Résultat :**
- Quand une tâche passe en « Terminée », une fenêtre propose une date de fin (aujourd'hui par défaut) avec deux boutons : « Enregistrer » et « Passer ».
- La date apparaît ensuite sur la tâche (« Terminée le … »). Les tâches ont un nouveau champ `dateFin`.
- Testé : passer, enregistrer, décocher (la date est effacée), tâche déjà terminée (la fenêtre ne se rouvre pas).

- **Gardé :** la fenêtre, le champ `dateFin` et l'effacement de la date quand le statut change
- **Modifié :** rien
- **Rejeté :** rien
- **Pourquoi :**
  - Une fenêtre dédiée est plus fiable qu'une saisie de texte libre : le navigateur fournit le sélecteur de date et le format reste `JJ-MM-AAAA`, comme pour l'échéance.
  - Les anciennes tâches sans `dateFin` continuent de fonctionner.

#### Prompt 5 · Changer le statut en cliquant sur la case

- **Outil :** Claude Code
- **Touche aussi :** sprint 3 (statuts)

**Prompt :**
> maintenant je ne veux plus du systeme actuel de changement de status sur chaque taches, je veux maintenant que ce soit sous forme de cliques sur la case, il faut que ça suive la logique une tache commence en A faire, puis un clique sur la case la passe en en cours et un autre la passe en terminé, donc a cote du bouton de suppression mettre un bouton pour passer la tache en abandonnée

**Résultat :**
- La case de chaque tâche a trois états : vide (À faire), « – » (En cours), cochée en vert (Terminée, titre barré). Chaque clic passe à l'état suivant.
- Un bouton « Abandonner » est placé à côté de « Supprimer ».
- La ligne de boutons de statut sous chaque tâche est supprimée. Le statut est écrit en couleur sous le titre.

- **Gardé :** le cycle À faire → En cours → Terminée et le bouton « Abandonner »
- **Modifié :** rien
- **Rejeté :** rien
- **Pourquoi :** deux choix de l'IA qui n'étaient pas dans le prompt, à connaître pour l'oral :
  - Un clic de plus sur une tâche terminée la remet « À faire » : c'est l'ancien comportement du décochage (story 3).
  - Le bouton « Abandonner » devient « Reprendre » sur une tâche abandonnée, pour ne pas la bloquer dans cet état en cas d'erreur.

---

### Sprint 2 · Sauvegarde et mise en forme CSS

*Sauvegarde dans le localStorage, style de l'application.*

#### Prompt 6 · Audit du code et restylage

- **Outil :** Claude Code

**Prompt :**
> regarde tous les fichiers, ne touche pas a structure meme du code, si y'a des critiques a faire dis les moi et restylise le site de manière moderne afin qu'il soit jolie

**Résultat :**
- Une liste de critiques sur le code existant :
  - faille XSS (titres et noms de catégorie insérés tels quels avec `innerHTML`) ;
  - deux fonctions `afficherListeTaches`, dont une jamais utilisée ;
  - catégorie choisie jamais enregistrée avec la tâche ;
  - modification d'une tâche non codée ;
  - blocage de connexion sans compte à rebours ;
  - bouton d'inscription non désactivé pour un mot de passe faible.
- Découverte que `css/style.css` s'arrêtait en plein milieu d'un commentaire à la ligne 236 : tout le style des tâches, des accordéons et des filtres n'existait pas. Le fichier a été réécrit en entier, avec les mêmes noms de classes, dans un thème violet.

- **Gardé :** toutes les critiques (elles ont servi de liste de travail au prompt 7) et la réécriture complète du CSS
- **Modifié :** le thème violet a été remplacé juste après (prompt 7)
- **Rejeté :** rien
- **Pourquoi :**
  - Un CSS tronqué n'est pas une question de goût, c'est un bug : l'application s'affichait sans mise en forme.
  - La faille XSS est un vrai risque, d'autant plus dans un projet où une moitié du binôme fait de la cybersécurité.

#### Prompt 7 · Corrections du code et style plus naturel

- **Outil :** Claude Code
- **Touche aussi :** sprint 1 (modifier une tâche) et sprint 3 (sécurité du compte)

**Prompt :**
> fais tous les changements nécessaire, je te rappel que j'ai un niveau b1 en info a Ynov, de plus je veux que tu changes le style pour qu'il parraisse plus naturel

**Contexte donné à l'IA :** le niveau du binôme (B1), pour que le code reste simple et commenté en français.

**Résultat :**
- **Sécurité :**
  - les textes affichés passent par une fonction `echapperHTML` (test : un titre `<img onerror=…>` ne s'exécute plus) ;
  - le mot de passe est haché avec un sel aléatoire ;
  - il ne reste qu'un seul afficheur de liste.
- **Fonctions :**
  - la catégorie est enregistrée avec la tâche ;
  - un bouton « Modifier » remplit le formulaire (titre vide refusé aussi à la modification) ;
  - le tri « Récents » met la dernière tâche d'abord ;
  - les tâches sans échéance sont classées entre elles par priorité ;
  - une échéance dépassée s'affiche en rouge « (en retard) ».
- **Compte :**
  - l'inscription ne peut plus écraser un compte existant, et la page s'ouvre sur la connexion si un compte existe ;
  - le bouton d'inscription reste inactif tant que le mot de passe n'est pas « Fort » ;
  - après 3 échecs, les champs sont désactivés et un compte à rebours s'affiche, même si la page est rechargée ;
  - on reste connecté après un rechargement dans le même onglet.
- **Style :** fond crème, accent vert sapin, boutons plats, titres en Georgia, plus d'emojis dans les titres, mode sombre automatique, affichage adapté au téléphone.
- Le README a été aligné sur le code (statuts, champs de l'utilisateur, arborescence).

- **Gardé :** tout ce qui précède
- **Modifié :** rien à ce stade
- **Rejeté (proposé par l'IA, non demandé) :**
  - priorité en étoiles cliquables comme dans le README (le menu déroulant est plus simple) ;
  - remplacement des `onclick` par des `addEventListener`.

- **Pourquoi :**
  - Niveau B1 : on préfère un code qu'on sait expliquer ligne par ligne à un code plus « propre » mais plus abstrait.
  - Les corrections de sécurité et le blocage avec compte à rebours viennent des critères d'acceptation de la story 8 (prompt 3), que le code de départ ne respectait pas.
  - Le premier style (violet, dégradés) faisait « généré par une IA » : on voulait quelque chose de plus sobre.

---

### Sprint 3 · Fonctionnalités filière

*Cybersécurité : compte et connexion. Informatique : statuts, filtres, priorités, recherche.*

#### Prompt 8 · Identifiant déjà existant

- **Outil :** Claude Code
- **Filière :** cybersécurité

**Prompt :**
> de plus il faut vérifier lors de la connexion ou de la création du compte que l'id n'existe pas deja

**Résultat :**
- À l'inscription : le message « Cet identifiant existe déjà » s'affiche si c'est le même identifiant (majuscules ignorées). Sinon, un message rappelle la limite d'un seul compte par navigateur.
- À la connexion : « Cet identifiant n'existe pas » ou « Mot de passe incorrect », chaque essai comptant dans les 3 échecs.

- **Gardé :** les deux vérifications
- **Modifié :** rien
- **Rejeté (proposé, non demandé) :** gérer plusieurs comptes sur le même navigateur
- **Pourquoi :**
  - Plusieurs comptes obligeraient à changer le modèle de données du README (un seul objet utilisateur aujourd'hui), ce qui dépasse le temps imparti.
  - **Point ouvert :** dire si l'identifiant existe aide quelqu'un à le deviner. Le binôme peut choisir de revenir à un message unique « Identifiant ou mot de passe incorrect ».

#### Prompt 9 · Statut « abandonnée » et filtre en boutons

- **Outil :** Claude Code
- **Filière :** informatique

**Prompt :**
> modifie le statut en attente par le statut abandonné avec la date comme pour le terminé, de plus dans le filtre des status je veux que ce soit comme pour en dessous des taches en forme de ligne avec des clicables

**Résultat :**
- « En attente » est remplacé par « Abandonnée » partout (code et README), avec la même fenêtre de date facultative que « Terminée » (« Date d'abandon »).
- Le filtre par statut n'est plus un menu déroulant mais une ligne de boutons cliquables : Tous, À faire, En cours, Abandonnées, Terminées.
- Les tâches déjà enregistrées avec l'ancien statut « en_attente » repassent automatiquement en « À faire ».

- **Gardé :** tout ce qui précède
- **Modifié :** rien
- **Rejeté :** rien
- **Pourquoi :**
  - La migration vers « À faire » est un choix de l'IA, pas du cours : c'est le statut le plus neutre, et ces tâches n'avaient pas été abandonnées.
  - Les prompts 2 et 3 gardent « en attente » parce qu'ils décrivent la séance 1.

#### Prompt 10 · Noms des priorités (une erreur de l'IA)

- **Outil :** Claude Code
- **Filière :** informatique

**Prompt (première version) :**
> dans la création d'une tache, pour la priorité au lieu qu'il y ai marqué 1 etoile a cote de l'étoile, qu'il y ai marqué nv.1( une etoile): important , nv.2 (2 étoiles): moyenne, et le troisième secondaire

**Résultat 1 (faux) :** l'IA a lu « nv.1 : important » comme « 1 étoile = le plus prioritaire » et a aussi inversé le tri par priorité pour rester cohérente. Cela contredisait le cahier des charges (« plus il y a d'étoiles, plus la priorité est haute »).

**Prompt de correction :**
> mais c'est dans lautre sens, plus c'est important, plus il y a d'étoiles

**Résultat 2 :** Nv. 1 (★) : secondaire, Nv. 2 (★★) : moyenne, Nv. 3 (★★★) : important. Le tri par priorité remet les 3 étoiles en premier, le survol des étoiles affiche le nom de la priorité, et le README est corrigé.

- **Gardé :** le résultat 2
- **Modifié :** les libellés, les valeurs de tri et le README
- **Rejeté :** le résultat 1 en entier
- **Pourquoi :** la phrase pouvait se lire dans les deux sens, et l'IA a choisi sans poser de question. L'ordre du menu et le tri ont montré tout de suite le contresens : c'est l'intérêt de tester dans le navigateur.

#### Prompt 11 · Recherche par mot-clé et tâches abandonnées en rouge

- **Outil :** Claude Code
- **Filière :** informatique (bonus du sujet)

**Prompt :**
> alors ajoute la recherche par mots clés, de plus quand une tache est abandonné je veux quelle soit en rouge comme le vert pour valider

**Résultat :**
- Une barre de recherche au-dessus des filtres : elle garde les tâches dont le titre ou la catégorie contient le mot saisi, à chaque lettre tapée, sans tenir compte des majuscules ni des accents (« etude » trouve « Étude »). Elle fonctionne en même temps que le filtre de statut et le tri.
- Une tâche abandonnée est en rouge, comme une tâche terminée est en vert : case pleine avec ✕, bord gauche, statut, et bouton de filtre « Abandonnées » quand il est actif.

- **Gardé :** tout ce qui précède
- **Modifié :** le texte de la barre de recherche a été raccourci, car il était coupé sur petit écran
- **Rejeté :** rien
- **Pourquoi :** la recherche est un bonus du sujet pour la filière informatique. Chercher aussi dans le nom de la catégorie est un choix de l'IA : c'est pratique avec les catégories colorées, et c'est écrit dans le README.

---

### Transversal · Vérifications et documentation

#### Prompt 12 · Vérifier la conformité avec le cours

- **Outil :** Claude Code, avec le PDF de la séance 1

**Prompt :**
> est ce que ce site correspond bien a toutes les attentes du profs

**Résultat :** une comparaison point par point avec le sujet.
- Conforme : cadre technique, fonctions de base, tri, filtre et catégories, connexion, robustesse, jauge, blocage, 8 user stories.
- À régler : la recherche par mot-clé (bonus) n'existait pas, PROMPTS.md n'était pas à jour, aucun commit n'avait été fait.
- Le README contenait aussi des règles de gestion qui décrivaient encore l'ancienne case à cocher : elles ont été corrigées.

- **Gardé :** toute la liste
- **Modifié :** les règles de gestion du README
- **Rejeté :** rien
- **Pourquoi :** demander à l'IA de comparer le projet au sujet est utile, mais elle ne voit que les documents qu'on lui donne : elle n'avait pas le PDF de la séance 2 à ce moment-là.

#### Prompt 13 · Rédaction de ce journal

- **Outil :** Claude Code, avec les PDF des séances 1 et 2

**Prompt :**
> avec les deux fichiers que je t'ai donné, rédige moi le prompt.md qui correspond a la fois a ce que le prof demande et au site que l'on a, en gardant bien les prompts qui sont deja dans le prompt.md qui otn définis les users stories

**Résultat :** ce fichier : les prompts 1 à 3 gardés tels quels, puis les prompts de la séance 2 avec l'outil, le prompt exact, ce qui a été gardé, modifié ou rejeté, et pourquoi.

- **Gardé :** les prompts 1 à 3 sans aucune modification
- **Modifié :** rien
- **Rejeté :** rien
- **Pourquoi :** les user stories ont été décidées en séance 1 et servent de base au README : on garde leur trace d'origine, même si l'application a ensuite évolué.

#### Prompt 14 · Restructuration de ce journal

- **Outil :** Claude Code

**Prompt :**
> restructure les prompt afin que les sprint de meme niveaux soient tous regroupés et que le md soit propre

**Résultat :** les prompts de la séance 2 sont regroupés par sprint et renumérotés, avec le même format partout et un sommaire. Le texte des prompts 1 à 3 n'a pas changé : seul le niveau de leurs titres a été ajusté.

- **Gardé :** tout le contenu
- **Modifié :** l'ordre, la numérotation et la mise en forme
- **Rejeté :** rien
- **Pourquoi :** le cours demande un journal lisible, qui permette de retrouver ce qui a été fait à chaque sprint.

---

## Bilan de la séance 2

### Récapitulatif par sprint

| Sprint | Contenu | Prompts |
|---|---|---|
| 1 · Fonctions de base | Date de fin, statut par clic sur la case, bouton « Abandonner » | 4, 5 |
| 2 · Sauvegarde et CSS | Audit, corrections du code, deux styles successifs | 6, 7 |
| 3 · Fonctionnalités filière | Identifiant unique, statut « abandonnée », filtre en boutons, priorités, recherche | 8, 9, 10, 11 |
| Transversal | Conformité au cours, rédaction du journal | 12, 13, 14 |

### Où l'IA a aidé
- Repérer des défauts qu'on n'aurait pas vus seuls : CSS tronqué, faille XSS, fonction en double, catégorie jamais enregistrée.
- Écrire du code répétitif (formulaire de modification, tri, filtres, compte à rebours) et le tester dans le navigateur.
- Remettre le README en accord avec le code.

### Où elle a fait perdre du temps
- Le contresens sur les priorités (prompt 10) : elle a pris une décision sans poser de question, ce qui a obligé à corriger le code et le README.
- Plusieurs allers-retours sur le changement de statut (menu déroulant, puis boutons, puis clic sur la case) : un schéma de l'écran voulu dès le départ aurait évité deux versions.

### Ce qu'on retient
Une demande précise avec un exemple (prompt 5) donne le bon résultat du premier coup ; une demande ambiguë (prompt 10) demande une vérification.
