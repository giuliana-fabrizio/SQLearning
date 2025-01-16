# **Cahier des charges**

L'application a pour objectif d'entraîner ses utilisateurs à effectuer des requêtes SQL. Elle propose plusieurs bases de données (BDD) accompagnées de questions spécifiques à chacune.

<br>

## 1.1°/ Structure générale de l'application

L'application est basée sur trois types de profils :
- le public (personnes non connectées) ;
- les utilisateurs ;
- les administrateurs.

Les deux derniers nécessitent une authentification. L'authentification doit se faire avec un système de tokens afin de sécuriser l'application.

<br>
<br>

## 1.2°/ Structure détaillée de l'application

### `Compte administrateur`

**Page d'accueil (dashboard)**

- Graphique de taux de complétion : affiche le taux de complétion global pour chaque BDD.
- Graphique des performances globales par question :
    - Questions facilement réussies (moins de 3 essais).
    - Questions moyennement réussies (entre 3 et 10 essais).
    - Questions difficiles (plus de 10 essais).
    - Questions pour lesquelles les utilisateurs ont consulté la correction.
- Graphique des secteurs d'activité : affiche les secteurs d'activité des utilisateurs enregistrés.

<br>

**Page de gestion des BDD**

Cette page liste toutes les BDD enregistrées dans l'application avec pour chacune :
- la description / le thème ;
- le nombre d’utilisateurs travaillant dessus ;
- des options pour modifier ou supprimer la BDD.

Elle permet également à l'administrateur d'ajouter une nouvelle BDD.

Des filtres pourront être ajoutés si nécessaire.

<br>

**Page pour ajouter une BDD**

Cette page permet à l'administrateur d’ajouter une nouvelle BDD en renseignant :
- le nom de la BDD ;
- sa description (le thème) ;
- la base de données à utiliser (fichier `.db`) ;
- des questions, en précisant pour chacune :
    - le résultat attendu ;
    - une requête optimale servant de correction.

<br>

**Page pour modifier une BDD**

Cette page reprend les mêmes éléments que la page d’ajout d’une BDD, mais affiche les valeurs actuelles des champs à modifier.

---

### `Compte utilisateur`

**Page d'accueil**

- Graphique de taux de complétion : affiche le taux de complétion personnel pour chaque BDD.
- Graphique des performances personnelles par question :
    - questions facilement réussies (moins de 3 essais) ;
    - questions moyennement réussies (entre 3 et 10 essais) ;
    - questions difficiles (plus de 10 essais) ;
    - questions pour lesquelles l’utilisateur a consulté la correction.

<br>

**Page pour visualiser les BDD**

Cette page liste toutes les BDD de l'application avec pour chacune :
- sa description / son thème ;
- le nombre d’utilisateurs travaillant dessus ;
- le pourcentage de complétion de l’utilisateur ;
- son niveau de difficulté moyen selon les évaluations des utilisateurs.

Elle propose également des filtres permettant de trier les BDD selon des critères tels que :
- si l’utilisateur a déjà travaillé dessus ;
- si l’utilisateur a terminé son travail ;
- si l’utilisateur n’a jamais travaillé dessus ;
- si la BDD est récemment ajoutée à l’application.

<br>

**Page d'une BDD**

Cette page affiche les informations détaillées sur une BDD :
- sa date de création ;
- sa description ;
- le nombre de personnes travaillant ou ayant travaillé dessus ;
- les questions associées avec pour chacune, le niveau de difficulté moyen estimé par les utilisateurs ;
- son niveau de difficulté moyen selon les utilisateurs.

L’utilisateur y trouve un bouton pour s’inscrire à la BDD et commencer à travailler dessus. Il peut travailler sur plusieurs BDD simultanément.

Après s’être inscrit, il peut répondre aux questions via des champs dédiés. Lorsqu’une réponse est correcte, l’utilisateur peut consulter la solution optimale. Après au moins 3 essais, l’utilisateur peut évaluer la difficulté de la question.

Les questions peuvent être résolues dans n'importe quel ordre.

---

### `Compte public`

**Page d'accueil**

Cette page présente brièvement l'objectif du site Web. De plus, elle liste toutes les BDD de l'application avec pour chacune :
- sa description / son thème ;
- le nombre d’utilisateurs travaillant dessus ;
- son niveau de difficulté moyen selon les évaluations des utilisateurs.

<br>

**Page d'une BDD**

Cette page affiche les informations détaillées sur une BDD :
- sa date de création ;
- sa description ;
- le nombre de personnes travaillant ou ayant travaillé dessus ;
- les questions associées avec pour chacune, le niveau de difficulté moyen estimé par les utilisateurs ;
- son niveau de difficulté moyen selon les utilisateurs.

L’utilisateur y trouve un bouton pour s’inscrire à la BDD auquel cas il est redirigé vers la page de connexion.

<br>

**Page de connexion**

Sur cette page, l'utilisateur peut se créer un compte au s'authentifier s'il en a déjà un.

<br>
<br>

## 1.3°/ Potentielles améliorations futures

- Les utilisateurs pourront poser des questions ou laisser des messages d’aide visibles par tous. L’administrateur pourra gérer ces commentaires.
- L'application sera disponible en plusieurs langues.