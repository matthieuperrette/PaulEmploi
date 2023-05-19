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
  let nom = req.body.utilisateur_nom;
  nom=nom.toLowerCase();
  nom=nom[0].toUpperCase()+nom.slice(1);
  let prenom = req.body.utilisateur_prenom;
  prenom=prenom.toLowerCase();
  prenom=prenom[0].toUpperCase()+prenom.slice(1);
  const motdepasse = req.body.utilisateur_motdepasse;
  const tel = req.body.utilisateur_tel;
  if(utilisateurs.create(email, nom, prenom, motdepasse, tel, function(){})){
    req.session.email = email;
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
        req.session.email = result[0].email;
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

router.post('/supprimerUtilisateur', function(req, res, next) {
    const id_email = req.body.utilisateur_id_email;
    result=utilisateurs.delete(id_email, function(result){
      res.redirect('/administrateur');
    });
});

router.post('/editUtilisateur', function(req, res, next) {
  const id_email = req.body.utilisateur_id_email;
  const prenom = req.body.utilisateur_prenom;
  const nom = req.body.utilisateur_nom;
  const email = req.body.utilisateur_email;
  const numtel = req.body.utilisateur_numtel;
  const type = req.body.utilisateur_type;
  const actif = req.body.utilisateur_actif;
  let nom_col = ['nom', 'prenom', 'numtel', 'compte_actif', 'type_compte', 'email'];
  let value= [nom, prenom, numtel, actif, type, email]
  result=utilisateurs.update(nom_col, value, id_email, function(result){
    res.redirect('/administrateur');
  });
});
  
module.exports = router;
