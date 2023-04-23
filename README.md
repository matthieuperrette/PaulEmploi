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
-> En commencant a travailler rebase dev sur sa branche persoNom quand il y a eu un changement


Commande git utile :

git checkout -> permet de voir sur quel branche tu es
git checkout nomDeLaBranche -> se déplace dans la branche nomDeLaBranche
git add . -> ajoute tous les fichiers modifiés
git commit -m 'Le message' -> commit avec le message entre ''
git push -> push la branche local actuel sur le repertoire en ligne
git rebase dev -> permet de mettre la derniere version de dev sur la branche actuel
Il fa falloir cependant gérer les conflits ce que je ne sais pas encore faire sur vscode


Pour lancer le serveur :

Nodemon est installé pour relancer le serveur automatiquement en cas de modification de ficher
SET PaulEmploi=* & nodemon npm start


