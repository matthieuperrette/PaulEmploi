var express = require('express');
const utilisateurs = require('../model/utilisateurs');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  result=utilisateurs.readall(function(result){
    console.log(req.session.nom);
    res.render('candidatOffres', { nom:  req.session.nom});
  });
});


  
module.exports = router;