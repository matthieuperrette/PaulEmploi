var express = require('express');
var router = express.Router();
var userModel = require('../model/utilisateurs')
var candidatureModel = require('../model/candidatures')
var offreModel = require('../model/offre_emplois')

/*
test des models :


read y
readall y
readAllInfos
is_valid y
create y
delete y 
update y 

*/

router.get('/', function(req, res, next) {
    result=userModel.update(["nom","prenom"],["test","test"],"test@test.fr",function(result){
        console.log(result);
        res.render('test');
    });
});

module.exports = router;
