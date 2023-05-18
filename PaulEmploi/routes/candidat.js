var express = require('express');
var moment = require('moment');
const offreModel = require('../model/offre_emplois');
const candidatureModel = require('../model/candidatures');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  email=req.session.email;
  result=offreModel.readAllInfosPublieePasCandidater(email,function(result){
    //console.log(result);
    res.render('candidatOffres', { nom:  req.session.nom, type:  req.session.type_compte, offres: result, moment: moment});
  });
});

router.get('/Candidatures', function(req, res, next) {
  if (typeof req.session.email === 'undefined') {
    res.redirect('/');
  }else{
    candidatures=candidatureModel.readCandidatOffre(req.session.email, function(result){
      console.log(result);
      res.render('candidatCandidatures', { nom:  req.session.nom, type:  req.session.type_compte, candidatures: result, moment: moment});
    });
  }
});

router.post('/PageOffre', function(req, res, next) {
  const id_offre = req.body.id_offre;
  const sansCand=req.body.sansCandidature;
  console.log("sansCandidature=",sansCand);
  console.log("id_offre=",id_offre);
  result=offreModel.readInfosPubliee(id_offre,function(result){
    console.log(result);
    res.render('candidatPageOffre', { nom:  req.session.nom, type:  req.session.type_compte, offre: result, moment: moment, sansCandidature: sansCand});
  });
});
router.post('/candidater', function(req, res, next) {
  var id_offre = req.body.id_offre;
  console.log(id_offre);
  if(req.session.type_compte === 'candidat'){
    result=candidatureModel.create("",req.session.email,id_offre,function(result){
      console.log(result);
      console.log('hello');
      res.redirect('/candidat/Candidatures');
    });
  }
});

router.post('/SupprimerCandidature', function(req, res, next) { 
  var id_offre = req.body.id_offre;
  id_offre=id_offre.slice(0, -1);
  result=candidatureModel.delete(req.session.email,id_offre,function(result){
    console.log("Number of records deleted: " + result.affectedRows);
    res.redirect('/candidat/Candidatures');
  });
  return(true);
});


  
module.exports = router;