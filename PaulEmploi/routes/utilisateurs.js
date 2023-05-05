var express = require('express');
const session = require('express-session');
const utilisateurs = require('../model/utilisateurs');
var router = express.Router();
var app = express();

/* GET users listing. */
router.get('/', function(req, res, next) {
  result=utilisateurs.readall(function(result){
    res.render('listeUtilisateurs', { title: 'List des utilisateurs', users: result });
  });
});

router.post('/nouvelUtilisateur', function(req, res, next) {
  const email = req.body.utilisateur_email;
  const nom = req.body.utilisateur_nom;
  const prenom = req.body.utilisateur_prenom;
  const motdepasse = req.body.utilisateur_motdepasse;
  const tel = req.body.utilisateur_tel;
  if(utilisateurs.create(email, nom, prenom, motdepasse, tel, function(){})){
    req.session.nom = nom;
    req.session.type_compte = 'candidat';
    req.session.save();
    res.redirect('/candidat')
  }
  else throw err;
});

router.post('/connexionUtilisateur', function(req, res, next) {
  const email = req.body.utilisateur_email;
  const motdepasse = req.body.utilisateur_motdepasse;
  utilisateurs.isValid(email, motdepasse,function(result){
    if(result){
      result=utilisateurs.read(email, function(result){
        console.log();
        req.session.nom = result[0].nom;
        req.session.type_compte = result[0].type_compte;
        req.session.save()
        res.redirect('/candidat');
      });
    }
    else{
      res.redirect('/');
    }
  });

  

});
  
module.exports = router;
