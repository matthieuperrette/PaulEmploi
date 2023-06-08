var express = require('express');
var moment = require('moment');
const offreModel = require('../model/offre_emplois');
const candidatureModel = require('../model/candidatures');
var router = express.Router();

// on va utliser Multer comme middleware de gestion d'upload de fichier (faire au préalable : npm install multer)
var multer = require('multer');  

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
    if(!page) page=1;
    if (!search) search='';
    result=offreModel.readAllInfosPublieePasCandidaterLike(email, search, function(result){
      //console.log(result);
      res.render('candidatOffres', { nom:  req.session.nom, type:  req.session.type_compte, offres: result, moment: moment, page: page, search: search});
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
      res.render('candidatCandidatures', { nom:  req.session.nom, type:  req.session.type_compte, candidatures: result, moment: moment, error: error});
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
    result=offreModel.readInfosPubliee(id_offre,function(result){
      console.log(result);
      res.render('candidatPageOffre', { nom:  req.session.nom, type:  req.session.type_compte, offre: result, moment: moment, sansCandidature: sansCand});
    });
  }
});
router.post('/candidater', function(req, res, next) {
  if (typeof req.session.email === 'undefined') {
    res.redirect('/');
  }else{
    var id_offre = req.body.id_offre;
    console.log(id_offre);
    if(req.session.type_compte === 'candidat'){
      result=candidatureModel.create("",req.session.email,id_offre,function(result){
        console.log(result);
        console.log('hello');
        res.redirect('/candidat/Candidatures');
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


  
module.exports = router;