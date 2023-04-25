var express = require('express');
var router = express.Router();
var userModel = require('../model/utilisateurs')
var candidatureModel = require('../model/candidatures')
var ficheModel = require('../model/fiche_postes')

/*
test des models :
utilisateurs :
read y
readall y
is_valid y
create y
delete y (etant donnée les clefs etrangeres on ne peut supprimer certains utilisateurs)
update y 

fiche postes
read
readall
create
delete
update

candidatures
read
readall
create
delete
update

offre emplois
read
readall
create
delete
update

organisation
read
readall
create
delete
update

statut activites
read
readall
create
delete
update

type métier
read
readall
create
delete
update

*/

router.get('/', function(req, res, next) {
    var nb = false;
    result=userModel.readallOrderBy('nom',function(result){
        console.log(result);
        res.render('test');
    });
});

module.exports = router;
