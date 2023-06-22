var express = require('express');
var router = express.Router();
var moment = require('moment'); 
const userModel = require('../model/utilisateurs');
const orgaModel = require('../model/organisations');


/* GET users listing. */
router.get('/', function(req, res, next) {
  if (typeof req.session.email === 'undefined') {
    res.redirect('/');
  }else if (req.session.type_compte !== 'administrateur') {
    res.status(403).send('Erreur 403 vous n\'avez pas accès à cette page')
  } else {
    let search=req.query.search;
    let page= req.query.page;
    if(!page) page=1;
    if (!search) search='';
    result=userModel.readallLike(search,function(result){
      //console.log(result);
      res.render('administrateurUtilisateurs', { title: 'titre', nom:  req.session.nom, type:  req.session.type_compte, users: result, moment: moment, page: page, search: search});
    });
  }
});

router.get('/organisations', function(req, res, next) {
  if (typeof req.session.email === 'undefined') {
    res.redirect('/');
  }else if (req.session.type_compte !== 'administrateur') {
    res.status(403).send('Erreur 403 vous n\'avez pas accès à cette page')
  } else {
      let search=req.query.search;
      let page= req.query.page;
      if(!page) page=1;
      if (!search) search='';
      result=orgaModel.readallLike(search, function(result){
          //console.log(result)
          res.render('administrateurOrganisations', { nom:  req.session.nom, type:  req.session.type_compte, organisations: result, moment: moment, page: page, search: search});
      });
    }
  });

  router.post('/accepterOrganisation', function(req, res, next) {
    if (typeof req.session.email === 'undefined') {
      res.redirect('/');
    }else if (req.session.type_compte !== 'administrateur') {
      res.status(403).send('Erreur 403 vous n\'avez pas accès à cette page')
    } else {
      const siren = req.body.organisation_siren;
      //console.log(siren);
      userModel.updateTypeCompteWithOrga('recruteur', siren, function(result){})
      orgaModel.updateStatutDemande('validee', siren,function(result){});
      res.redirect('/administrateur/organisations');
    }
  });

  router.post('/organisations/recherche', function(req, res, next) {
    if (typeof req.session.email === 'undefined') {
      res.redirect('/');
    }else if (req.session.type_compte !== 'administrateur') {
      res.status(403).send('Erreur 403 vous n\'avez pas accès à cette page')
    } else {
      const search = req.body.recherche;
      //console.log('search',search);
      res.redirect('/administrateur/organisations?search=' + search);
    }
  });

  router.post('/refuserOrganisation', function(req, res, next) {
    if (typeof req.session.email === 'undefined') {
      res.redirect('/');
    }else if (req.session.type_compte !== 'administrateur') {
      res.status(403).send('Erreur 403 vous n\'avez pas accès à cette page')
    } else {
      const siren = req.body.organisation_siren;
      orgaModel.updateStatutDemande('refusee', siren,function(result){});
      res.redirect('/administrateur/organisations');
    }
  });


  
module.exports = router;