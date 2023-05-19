var express = require('express');
var router = express.Router();
var moment = require('moment'); 
const userModel = require('../model/utilisateurs');
const orgaModel = require('../model/organisations');


/* GET users listing. */
router.get('/', function(req, res, next) {
  result=userModel.readall(function(result){
    console.log(result);
    res.render('administrateurUtilisateurs', { title: 'titre', nom:  req.session.nom, type:  req.session.type_compte, users: result, moment: moment});
  });
});

router.get('/organisations', function(req, res, next) {
    result=orgaModel.readall(function(result){
      res.render('administrateurOrganisations', { nom:  req.session.nom, type:  req.session.type_compte, organisations: result, moment: moment});
    });
  });

  router.post('/accepterOrganisation', function(req, res, next) {
    const siren = req.body.organisation_siren;
    console.log(siren);
    orgaModel.updateStatutDemande('validee', siren,function(result){});
    res.redirect('/administrateur/organisations');
  });

  router.post('/refuserOrganisation', function(req, res, next) {
    const siren = req.body.organisation_siren;
    orgaModel.updateStatutDemande('refusee', siren,function(result){});
    res.redirect('/administrateur/organisations');
  });


  
module.exports = router;