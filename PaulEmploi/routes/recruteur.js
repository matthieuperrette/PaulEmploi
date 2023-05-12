var express = require('express');
var moment = require('moment')
const offreModel = require('../model/offre_emplois');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  const email = req.session.email
  result=offreModel.readInfosPublieeByAuthor(email, function(result){
    //console.log(result);
    res.render('recruteurOffres', { nom:  req.session.nom, type:  req.session.type_compte, offres: result, moment: moment});
  });
});

module.exports = router;