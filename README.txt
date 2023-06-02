fonctionement des branches que j'ai créé :

main -> contien nos fichiers de TD pour l'instant et est destiné a avoir la version finale de notre site
dev -> contient la version la plus actuel stable
persoNom -> contient la dernière version de Nom
-> persoNom et dev son merge lorsque persoNom a terminer de travailler sur une feature importante et qu'elle est stable

Démarage :

-> installer git sur son pc

Ajouter le compte gitlab :

faire un access token depuis le site gitlab (setings -> access token)
installer Gitlab Workflow dans vscode avec le menu extensions 
faire ctr + shif + p rechercher gitlab add account entrer l'URL https://gitlab.utc.fr
rentrer l'access token préalablement fait


Cloner :

ctr + shift + p
chercher git clone selectionner Clone from GitLab 
selectionner le bon projet
Selectionner l'url https://gitlab.utc.fr/...
Selectionner le dossier dans lequel cloner
Se connecter à gitlab


Commande git utile :

/!\ pour les commandes git il faut etre dans le dossier sr10_p2023_bridoux_perrette
git checkout -> permet de voir sur quel branche tu es
git checkout nomDeLaBranche -> se déplace dans la branche nomDeLaBranche
git add . -> ajoute tous les fichiers modifiés
git commit -m "Le message" -> commit avec le message entre ""
git push -> push la branche local actuel sur le repertoire en ligne
git pull -> met la branche en ligne sur la branche locale
git rebase dev -> permet de mettre la derniere version de dev sur la branche actuel

-> En commencant a travailler toujours pull dev en locale puis rebase dev sur sa branche persoNom
-> pendant le travail faire des commits réguliers est utile
-> En faisant une merge request ne pas oublié de ne pas merge sur main mais sur dev et décocher la case supprimer la branche source


Pour lancer le serveur :

Nodemon est installé pour relancer le serveur automatiquement en cas de modification de ficher (npm install Nodemon)
cd PaulEmploi
SET PaulEmploi=* & nodemon npm start


utiliser le vpn de l'école
-> bdd http://tuxa.sme.utc/pma/
Login : sr10p028
Password : j136vcydSRLj


Avancement :
recap de ce qui a été fait pour se mettre à jour facilement

23/04/2023 -> refonte pour gitlab
24/04/2023 -> petits changements sur les tables et mise en place du fichier sql avec des données
test de quelque model
25/04/2023 -> finition des models
06/05/2023 -> debut d'adaptation des vues candidatOffre et candidatPageOffre 
fait et adaptation des boutons selon la session
07/05/2023 -> vues candidatCandidatures faite et test des boutons candidater/supprimer (charge dans le vide mais fonctionne a peu près)
11/05/2023 -> ajout des vues administrateurs
11/05/2023 -> ajout fonctionnalitéss admin et d'une vue recruteur
18/05/2023 -> ajout des vues de recruteur bouton candidater/supprimer fait + nom et prenom mis correctement dans la bdd
25/05/2023 -> completion de la to do list
01/06/2023 -> completion to do list

TO DO:

DONE -> fait
QUESTION -> voir le partie question prof a la fin du readme

- pop up en cas d'erreur lors de la creation d'un compte/connection
    Deux fois le même email dans la bdd
    Un regex qui ne fonctionne pas
    mauvais mdp/identifiant connexion
    connection a un compte supprimer/inactif
- tri/filtre sur candidat
- bouton ajouter des offres et modifier/supprimer
- demande pour devenir un recruteur/creation d'entreprise
- mettre des documents pour les candidats et pouvoir les télécharger
- bug
    les boutons "plus" déroule tous et ne se referme pas
    affichage de la navbar
    autre?
- rendre une recherche sans rien plus belle
- faire + de test de models et de pages
- Changement bdd 
    par candidature faire colonnes CV et lettre de motiv a la place de piece 
    dans offre emploi transformer indication en enum CV, lettre de motivation, lettre de motiv et CV
- DONE pagination
- DONE faire un regex pour le mot de passe
- DONE partials pour le header et la navbar
- DONE verifier si connecter sinon rediriger vers l'accueil/si le bon type de compte pour la page
- DONE dans l'index faire en sorte qu'on puisse appuyer que sur un seul des boutons
- DONE connexion check compte_actif
- DONE bouton log out
- DONE corriger le log out pour mettre req.session.destroy()




/!\ pas assez de droit pour utiliser TO_DATE() sur la bdd :
execute command denied to user 'sr10p028'@'localhost' for routine 'sr10p028.TO_DATE'

100 -> informatif
200 -> succès
300 -> redirection 
400 -> erreur req client
500 -> erreur serveur

Question prof:
la suppression de compte définitif -> drop cascade ou alors juste mettre le compte_actif