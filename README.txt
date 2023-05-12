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


chose a changer :

- dans l'index faire en sorte qu'on puisse appuyer que sur un seul des boutons
- debugger les boutons candidater et supprimer
- faire un regex pour le mot de passe
- appuyer sur le logo fais revenir au départ


Questions prof :

/!\ pas assez de droit pour utiliser TO_DATE() sur la bdd :
execute command denied to user 'sr10p028'@'localhost' for routine 'sr10p028.TO_DATE'


