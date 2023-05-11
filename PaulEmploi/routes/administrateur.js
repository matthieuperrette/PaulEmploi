var express = require('express');
var router = express.Router();
var moment = require('moment'); 

const userModel = require('../model/utilisateurs');
const orgaModel = require('../model/organisations');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  result=userModel.readall(function(result){
    console.log(result);
    res.render('administrateurUtilisateurs', { title: 'titre', nom:  req.session.nom, type:  req.session.type_compte, users: result, moment: moment});
  });
});

router.get('/organisations', function(req, res, next) {
    result=orgaModel.readall(function(result){
      console.log(result);
      res.render('administrateurOrganisations', { nom:  req.session.nom, type:  req.session.type_compte, organisations: result, moment: moment});
    });
  });


  
module.exports = router;