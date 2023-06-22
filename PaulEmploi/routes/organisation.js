var express = require('express');
var router = express.Router();
const orgaModel = require('../model/organisations');
const userModel = require('../model/utilisateurs');

router.post('/demandeRecruteur', function(req, res, next) {
    if (typeof req.session.email === 'undefined') {
        res.redirect('/');
      }else{
        const nom = req.body.organisationNom;
        //check organisation existe
        check = orgaModel.readByName(nom,function(check){
            if(check.length == 1){
                result = userModel.updateOrganisation(check[0].siren, req.session.email,function(reult){
                    res.redirect("/candidat/devenirRecruteur");
                } );
            }
            else{
                //redirection page création d'orga
                res.redirect("/candidat/creaOrganisation");
            }
            
        });
        

      }

});

router.post('/creationOrga', function(req, res, next) {
    if (typeof req.session.email === 'undefined') {
        res.redirect('/');
    }else{
        const organisationNom = req.body.organisation_nom;
        const organisationSIREN = req.body.organisation_SIREN;
        const organisationLocalisation = req.body.organisation_localisation;
        const organisationStatut = req.body.organisation_statut;
        
        orgaModel.create(organisationSIREN, organisationNom, organisationStatut, organisationLocalisation, "en_attente", function(result) {
            if(result.affectedRows == 1){
                result = userModel.updateOrganisation(organisationSIREN, req.session.email,function(reult){
                    res.redirect("/candidat/devenirRecruteur");
                } );
            }
            else{
                req.query.error = "Erreur données invalides."
                res.redirect("/");
            }
            
        });
    }
});

module.exports = router;