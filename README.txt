-> installer git sur son pc

Ajouter le compte gitlab :

installer gitlab workflow dans vscode faire ctr + shif + p rechercher gitlab add account entrer l'URL hhtps://gitlab.utc.fr
rentrer un access token préalablement fait depuis le site gitlab (setings -> access token)


Cloner :

ctr + shift + p
chercher git clone selectionner Clone from GitLab 
selectionner le bon projet
Selectionner l'url https://gitlab.utc.fr/...
Selectionner le dossier dans lequel cloner
Se connecter à gitlab

fonctionement des branches que j'ai créé :

main -> contien nos fichiers de TD pour l'instant et est destiné a avoir la version finale de notre site
dev -> contient la version la plus actuel stable
persoNom -> contient la dernière version de Nom
-> persoNom et dev son merge lorsque persoNom a terminer de travailler sur une feature importante et qu'elle est stable


Commande git utile :

git checkout -> permet de voir sur quel branche tu es
git checkout nomDeLaBranche -> se déplace dans la branche nomDeLaBranche
git add . -> ajoute tous les fichiers modifiés
git commit -m "Le message" -> commit avec le message entre ""
git push -> push la branche local actuel sur le repertoire en ligne
git pull -> met la branche en ligne sur la branche locale
git rebase dev -> permet de mettre la derniere version de dev sur la branche actuel
Il fa falloir cependant gérer les conflits ce que je ne sais pas encore faire sur vscode

-> En commencant a travailler toujours pull dev en locale puis rebase dev sur sa branche persoNom quand il y a eu un changement
-> pendant le travail faire des commits régulier est utile
-> En faisant une merge request ne pas oublié de ne pas merge sur main mais sur dev et décocher la case supprimer la branche source

Pour lancer le serveur :

Nodemon est installé pour relancer le serveur automatiquement en cas de modification de ficher
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


/!\ pas assez de droit pour utiliser TO_DATE() sur la bdd :
execute command denied to user 'sr10p028'@'localhost' for routine 'sr10p028.TO_DATE'


