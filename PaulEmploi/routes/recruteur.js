var express = require('express');
var moment = require('moment')
const offreModel = require('../model/offre_emplois');
const ficheModel = require('../model/fiche_postes');
const utilisateurModel = require('../model/utilisateurs');
const activiteModel = require('../model/statut_activites');
const metierModel = require('../model/type_metiers');
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
router.get('/ajouterOffre', function(req, res, next) {
  if (typeof req.session.email === 'undefined') {
    res.redirect('/');
  }else if (req.session.type_compte !== 'recruteur') {
    res.status(403).send('Erreur 403 vous n\'avez pas accès à cette page')
  } else {
    retour=activiteModel.readall( function(activites){
      result=metierModel.readall( function(metiers) {
        //console.log(activites)
        //console.log(metiers)
        res.render('recruteurAjouterOffre', { nom:  req.session.nom, type:  req.session.type_compte, offres: false, moment: moment, nom_metiers:metiers, nom_statuts: activites});
      });
    });  
  }
});
router.post('/refuserDemande', function(req, res, next) {
  if (typeof req.session.email === 'undefined') {
    res.redirect('/');
  }else if (req.session.type_compte !== 'recruteur') {
    res.status(403).send('Erreur 403 vous n\'avez pas accès à cette page')
  } else {
    const email = req.body.email;
    utilisateurModel.updateOrgaToNull(email,function(result){});
    res.redirect('/recruteur/demandes');
  }
});
router.post('/ajouterOffre', function(req, res, next) {
  if (typeof req.session.email === 'undefined') {
    res.redirect('/');
  }else if (req.session.type_compte !== 'recruteur') {
    res.status(403).send('Erreur 403 vous n\'avez pas accès à cette page')
  } else {
    result=utilisateurModel.read(req.session.email, function(user) {
      let intitule=req.body.intitule;
      let lieu=req.body.lieu;
      let description=req.body.description;
      let rythme=+req.body.rythme;
      let teletravail=+req.body.teletravail;
      let recruteur=req.session.email;
      let nom_metier=req.body.nom_metier;
      let nom_statut=req.body.nom_statut;
      //console.log("metier", nom_metier);
      //console.log("satut", nom_statut);
      let min_salaire=+req.body.min_salaire;
      let max_salaire=+req.body.max_salaire;
      ficheModel.create(intitule, lieu, description, rythme, teletravail, recruteur, nom_metier, nom_statut, min_salaire, max_salaire, function(){})
      result=ficheModel.readParams(intitule, lieu, description, rythme, teletravail, recruteur, nom_metier, nom_statut, min_salaire, max_salaire, function(result) {
        let id_fiche=result[0].id_fiche;
        let etat=req.body.etat;
        let date_validite=req.body.date_validite;
        let indication=req.body.indication;
        let nombre_pieces;
        if(indication==="CV" || indication==="lettre de motivation")
          nombre_pieces=1;
        else
          nombre_pieces=2
        let organisation=user[0].organisation
        offreModel.create(etat, date_validite, indication, nombre_pieces, organisation,id_fiche,function() {
          res.redirect('/recruteur')
        })
      });
    });
  }
});
router.post('/updateOffre', function(req, res, next) {
  if (typeof req.session.email === 'undefined') {
    res.redirect('/');
  }else if (req.session.type_compte !== 'recruteur') {
    res.status(403).send('Erreur 403 vous n\'avez pas accès à cette page')
  } else {
    result=utilisateurModel.read(req.session.email, function(user) {
    let id_fiche=req.body.id_fiche;
    let intitule=req.body.intitule;
    let lieu=req.body.lieu;
    let description=req.body.description;
    let rythme=+req.body.rythme;
    let teletravail=+req.body.teletravail;
    let recruteur=req.session.email;
    let nom_metier=req.body.nom_metier;
    let nom_statut=req.body.nom_statut;
    let min_salaire=+req.body.min_salaire;
    let max_salaire=+req.body.max_salaire;
    let id_offre=req.body.id_offre;
    let nom=['intitule', 'lieu', 'description', 'rythme', 'teletravail', 'recruteur', 'nom_metier', 'nom_statut', 'min_salaire', 'max_salaire'];
    let value=[intitule,lieu,description,rythme,teletravail,recruteur,nom_metier,nom_statut,min_salaire,max_salaire];
    ficheModel.update(nom, value, id_fiche, function(){})
    let etat=req.body.etat;
    let date_validite=req.body.date_validite;
    let indication=req.body.indication;
    let nombre_pieces;
    if(indication==="CV" || indication==="lettre de motivation")
      nombre_pieces=1;
    else
      nombre_pieces=2
    let organisation=user[0].organisation
    values=[etat, date_validite, indication, nombre_pieces, organisation, id_fiche]
    names=['etat', 'date_validite', 'indication', 'nombre_pieces', 'organisation', 'fiche']
    offreModel.update(names, values, id_offre,function() {
      res.redirect('/recruteur')
    })
  });
  }
});
router.post('/accepterDemande', function(req, res, next) {
  if (typeof req.session.email === 'undefined') {
    res.redirect('/');
  }else if (req.session.type_compte !== 'recruteur') {
    res.status(403).send('Erreur 403 vous n\'avez pas accès à cette page')
  } else {
    const email = req.body.email;
    utilisateurModel.updateTypeCompte('recruteur', email,function(result){
      console.log('Votre demande pour passer en recruteur a été accepter')
      res.redirect('/recruteur/demandes');
    });
    
  }
});
router.post('/chercherCandidatures', function(req, res, next) {
  if (typeof req.session.email === 'undefined') {
    res.redirect('/');
  }else if (req.session.type_compte !== 'recruteur') {
    res.status(403).send('Erreur 403 vous n\'avez pas accès à cette page')
  } else {
    const id_offre = req.body.id_offre;
    offreModel.readCandidatures(id_offre,function(result){
      //console.log(result)
      res.render('recruteurCandidaturesOffre', { nom:  req.session.nom, type:  req.session.type_compte, candidatures: result, moment: moment});
    });
  }
});
router.post('/supprimerOffre', function(req, res, next) {
  if (typeof req.session.email === 'undefined') {
    res.redirect('/');
  }else if (req.session.type_compte !== 'recruteur') {
    res.status(403).send('Erreur 403 vous n\'avez pas accès à cette page')
  } else {
    const id_offre = req.body.id_offre;
    result=offreModel.delete(id_offre,function(result){
      res.redirect('/recruteur');
    });
  }
});
router.post('/modifierOffre', function(req, res, next) {
  if (typeof req.session.email === 'undefined') {
    res.redirect('/');
  }else if (req.session.type_compte !== 'recruteur') {
    res.status(403).send('Erreur 403 vous n\'avez pas accès à cette page')
  } else {
    retour=activiteModel.readall( function(activites){
      result=metierModel.readall( function(metiers) {
        const id_offre = req.body.id_offre;
        result=offreModel.readInfos(id_offre,function(result){
          //console.log(result);
          res.render('recruteurAjouterOffre', { nom:  req.session.nom, type:  req.session.type_compte, offres: result, moment: moment, nom_metiers:metiers, nom_statuts: activites});
        });
      });
    });  
    
  }
});

module.exports = router;