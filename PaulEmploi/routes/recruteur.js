var express = require('express');
var moment = require('moment')
const offreModel = require('../model/offre_emplois');
const utilisateurModel = require('../model/utilisateurs');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  if (typeof req.session.email === 'undefined') {
    res.redirect('/');
  }else if (req.session.type_compte !== 'recruteur') {
    res.status(403).send('Erreur 403 vous n\'avez pas accès à cette page')
  } else {
    const email = req.session.email
    let search=req.query.search;
    let page= req.query.page;
    if(!page) page=1;
    if (!search) search='';
    result=offreModel.readInfosPublieeByAuthorLike(email, search, function(result){
      //console.log(result);
      res.render('recruteurOffres', { nom:  req.session.nom, type:  req.session.type_compte, offres: result, moment: moment, page: page, search: search});
    });
  }
});
router.get('/demandes', function(req, res, next) {
  if (typeof req.session.email === 'undefined') {
    res.redirect('/');
  }else if (req.session.type_compte !== 'recruteur') {
    res.status(403).send('Erreur 403 vous n\'avez pas accès à cette page')
  } else {
    const email = req.session.email
    retour=utilisateurModel.checkOrga(email, function(retour){
      let search=req.query.search;
      let page= req.query.page;
      if(!page) page=1;
      if (!search) search='';
      result=utilisateurModel.readallDemandesLike(retour[0].organisation, search, function(result){
        res.render('recruteurDemandes', { nom:  req.session.nom, type:  req.session.type_compte, users: result, moment: moment, page: page, search: search});
      });  
    });
  }
});
router.post('/refuserDemande', function(req, res, next) {
  const email = req.body.email;
  utilisateurModel.updateOrgaToNull(email,function(result){});
  res.redirect('/recruteur/demandes');
});
router.post('/accepterDemande', function(req, res, next) {
  const email = req.body.email;
  utilisateurModel.updateTypeCompte('recruteur', email,function(result){});
  res.redirect('/recruteur/demandes');
});
router.post('/chercherCandidatures', function(req, res, next) {
  if (typeof req.session.email === 'undefined') {
    res.redirect('/');
  }else if (req.session.type_compte !== 'recruteur') {
    res.status(403).send('Erreur 403 vous n\'avez pas accès à cette page')
  } else {
    const id_offre = req.body.id_offre;
    offreModel.readCandidatures(id_offre,function(result){
      console.log(result)
      res.render('recruteurCandidaturesOffre', { nom:  req.session.nom, type:  req.session.type_compte, candidatures: result, moment: moment});
    });
  }
});

module.exports = router;