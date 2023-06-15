var express = require('express');
var router = express.Router();
const orgaModel = require('../model/organisations');
const userModel = require('../model/utilisateurs');

router.post('/demandeRecruteur', function(req, res, next) {
    const nom = req.body.organisationNom;
    console.log(nom);
    //check organisation existe
    check = orgaModel.readByName(nom,function(check){
        if(check.length == 1){
            result = userModel.updateOrganisation(check[0].siren, req.session.email,function(reult){
                res.redirect("/candidat");
            } );
        }
        else{
            //redirection page création d'orga
            res.redirect();
        }
        
    });
    


});

module.exports = router;