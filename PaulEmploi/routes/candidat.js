var express = require('express');
var moment = require('moment');
const offreModel = require('../model/offre_emplois');
const candidatureModel = require('../model/candidatures');
const organisationModel = require('../model/organisations');
const userModel = require('../model/utilisateurs');
const metierModel = require('../model/type_metiers');
const activiteModel = require('../model/statut_activites');

var router = express.Router();

// on va utliser Multer comme middleware de gestion d'upload de fichier (faire au préalable : npm install multer)
var multer = require('multer');  
const utilisateurs = require('../model/utilisateurs');

// définition du répertoire de stockage des fichiers chargés (dans le répertoire du projet pour la démo, mais sur un espace dédié en prod !)
// et du nom sous lequel entregistrer le fichier
var my_storage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, 'mesfichiers')},
  filename: function (req, file, cb) {
    let my_extension = file.originalname.slice(file.originalname.lastIndexOf(".")); // on extrait l'extension du nom d'origine du fichier
    if(my_extension !== ".pdf"){
      cb(null, "null.null"); // exemple de format de nommage : login-typedoc.ext
    }else{
      cb(null, req.session.email + '-' + req.body.myFileType+my_extension); // exemple de format de nommage : login-typedoc.ext
    }
  }
})

var upload = multer({ storage: my_storage })

/* GET users listing. */
router.get('/', function(req, res, next) {
    email=req.session.email;
    let search=req.query.search;
    let page= req.query.page;
    let tri= req.query.tri;
    let rythme=req.query.rythme;
    let teletravail=req.query.teletravail;
    let nom_statut=req.query.nom_statut;
    let nom_metier=req.query.nom_metier;
    let salaire=req.query.salaire;
    
    if(!page) page=1;
    if (!search) search='';
    if(!tri) tri='';
    if(!rythme) rythme='';
    console.log("rythme1", rythme)
    if (!teletravail) teletravail=-1;
    if(!nom_statut) nom_statut='';
    if(!nom_metier) nom_metier='';
    if (!salaire) salaire='';
    let min_rythme=-1;
    let max_rythme=-1;
    let min_salaire=-1;
    let max_salaire=-1;
    if(rythme!=''){
      let tmp2=rythme;
      let tmp=tmp2.split("a");
      min_rythme=tmp[0];
      max_rythme=tmp[1];
    }
    console.log("rythme2", rythme)
    if(salaire!=''){
      let tmp=salaire.split("a");
      console.log(tmp)
      min_salaire=+tmp[0];
      max_salaire=+tmp[1];   
    }
    let nom=['teletravail','min_rythme', 'max_rythme', 'nom_metier', 'nom_statut', 'min_salaire', 'max_salaire']
    let value=[teletravail, min_rythme,max_rythme, nom_metier, nom_statut, min_salaire, max_salaire]
      result=offreModel.readAllInfosPublieePasCandidaterLikeORDER(email, search, tri, nom, value, function(result){
        retour=activiteModel.readall( function(activites){
          retour=metierModel.readall( function(metiers) {
            res.render('candidatOffres', { nom:  req.session.nom, type:  req.session.type_compte, offres: result, moment: moment, page: page, search: search, tri: tri, nom_metiers: metiers, nom_statuts: activites, teletravail: teletravail, rythme: rythme, nom_metier: nom_metier, nom_statut: nom_statut, salaire: salaire, organisations: "undefined"});
            });
        });
      });

});

router.get('/Candidatures', function(req, res, next) {
  if (typeof req.session.email === 'undefined') {
    res.redirect('/');
  }else if (req.session.type_compte !== 'candidat') {
    res.status(403).send('Erreur 403 vous n\'avez pas accès à cette page')
  } else {
    error=req.query.error
    if(!error) error=""
    candidatures=candidatureModel.readCandidatOffre(req.session.email, function(result){
      console.log(result);
      res.render('candidatCandidatures', { nom:  req.session.nom, type:  req.session.type_compte, candidatures: result, moment: moment, error: error, organisations: organisations});
    });
  }
});

router.post('/PageOffre', function(req, res, next) {
  if (typeof req.session.email === 'undefined') {
    res.redirect('/');
  }else{
    const id_offre = req.body.id_offre;
    const sansCand=req.body.sansCandidature;
    console.log("sansCandidature=",sansCand);
    console.log("id_offre=",id_offre);
    result=offreModel.readInfos(id_offre,function(result){
      console.log(result);
      res.render('candidatPageOffre', { nom:  req.session.nom, type:  req.session.type_compte, offre: result, moment: moment, sansCandidature: sansCand});
    });
  }
});
router.post('/candidater', function(req, res, next) {
  if (typeof req.session.email === 'undefined') {
    res.redirect('/');
  }else{
    var id_offre = +req.body.id_offre;
    console.log(id_offre);
    if(req.session.type_compte === 'candidat'){
      retour=candidatureModel.readSpe(req.session.email, id_offre,function(candidat){
        if(candidat.length===0){
          result=candidatureModel.create(req.session.email, id_offre,function(result){
            console.log(result);
            console.log('hello');
            res.redirect('/candidat/Candidatures');
          });
        }else{
          res.redirect('/candidat/Candidatures');
        }
      }); 
    }
  }
});

router.post('/upload', upload.single('myFileInput') ,function(req, res, next) {
  if (typeof req.session.email === 'undefined') {
    res.redirect('/');
  }else{
    const uploaded_file = req.file
    if (!uploaded_file) {
      res.redirect('/candidat/Candidatures?error=Veuillez mettre un fichier');
    } else if(uploaded_file.originalname.slice(uploaded_file.originalname.lastIndexOf("."))!==".pdf"){
      res.redirect('/candidat/Candidatures?error=Le fichier doit etre un pdf');
    } else {
      let id_candidature=req.body.id_candidature
      result=candidatureModel.update([req.body.myFileType],[uploaded_file.filename],id_candidature, () => {});
      res.redirect('/candidat/Candidatures');
    }
  }
});
router.post('/SupprimerCandidature', function(req, res, next) { 
  if (typeof req.session.email === 'undefined') {
    res.redirect('/');
  }else{
  var id_offre = req.body.id_offre;
    id_offre=id_offre.slice(0, -1);
    result=candidatureModel.delete(req.session.email,id_offre,function(result){
      console.log("Number of records deleted: " + result.affectedRows);
      res.redirect('/candidat/Candidatures');
    });
  }
});
router.post('/tri', function(req, res, next) { 
  if (typeof req.session.email === 'undefined') {
    res.redirect('/');
  }else{
  let page = req.body.page;
  let search = req.body.search;
  let tri = req.body.tri;
  let lien ='/candidat?page='+page+'&search='+search+'&tri='+tri
  result=offreModel.readAllInfosPublieePasCandidaterLike(email, search, function(result){
    console.log(result);
  });
  res.redirect(lien)
  }
});


  
module.exports = router;