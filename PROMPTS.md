# PROMPTS.md — Journal de prompts TaskFlow

> Module Outils IA · Bachelor 1 · Ynov Toulouse
> Binôme : Lisa (Cybersécurité) + Raph (Informatique)
> Fonctionnalités filière : connexion et robustesse du mot de passe (Lisa) · tri, filtres et catégories (Raph)

---

## Prompt 1 · User stories (Claude)

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

## Prompt 2 · User stories (Claude)

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

## Prompt 3 · User stories (Claude)

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
