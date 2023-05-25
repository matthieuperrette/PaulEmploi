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

router.get('/deconnection', function(req, res, next) {
  req.session.email = undefined;
  req.session.nom = undefined;
  req.session.type_compte = undefined;
  req.session.save();
  res.redirect('/');
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
  let tel = req.body.utilisateur_tel;
  //remplacer par un warning a l'utilisateur au lieu de renvoyer une erreur
  /*
  let telRegex = new RegExp(/^0\d{1}([\s ]|[\. ]?\d{2}){4}/) //commence par 0 et un chiffre puis suivi de 4 fois 2 chiffres separe par un espace un point ou rien
  if (!telRegex.test(tel))
    throw new Error('Format téléphone non respecté');
  //enleve tous les points et les espaces du numtel pour le stocker dans la bdd
  tel=tel.replace(/\s/g,'');
  tel=tel.replace(/\./g,'');
  let mdpRegex = 
    new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-~£€µ§ù¨¤}{|²<>)(°`',;:\\.)]).{12,}$/);
  if(!mdpRegex.test(motdepasse))
    throw new Error('Format mdp non respecté');
*/
    

  /*if(utilisateurs.create(email, nom, prenom, motdepasse, tel, function(){})){
    req.session.email = email;
    req.session.nom = nom;
    req.session.type_compte = 'candidat';
    req.session.save();
    res.redirect('/candidat')
  }
  else throw err;*/
});

router.post('/connexionUtilisateur', function(req, res, next) {
  const email = req.body.utilisateur_email;
  const motdepasse = req.body.utilisateur_motdepasse;
  utilisateurs.isValid(email, motdepasse,function(result){
    console.log(result);
    if(result && result[0].compte_actif===1){
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
    result=utilisateurs.updateCompteActif(0,id_email, function(result){
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
