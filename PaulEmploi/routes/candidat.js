var express = require('express');
var moment = require('moment')
const offreModel = require('../model/offre_emplois');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  result=offreModel.readAllInfosPubliee(function(result){
    //console.log(result);
    res.render('candidatOffres', { nom:  req.session.nom, type:  req.session.type_compte, offres: result, moment: moment});
  });
});

router.post('/PageOffre', function(req, res, next) {
  const id_offre = req.body.id_offre;
  //console.log("id_offre=",id_offre);
  result=offreModel.readInfosPubliee(id_offre,function(result){
    console.log(result);
    res.render('candidatPageOffre', { nom:  req.session.nom, type:  req.session.type_compte, offre: result, moment: moment});
  });
});

  
module.exports = router;