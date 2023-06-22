var express = require('express');
var router = express.Router();

 

/* GET download */
router.get('', function(req, res, next) {
  if (typeof req.session.email === 'undefined') {
    res.redirect('/');
  } else {
    try {
      fichier=req.query.fichier;
      tab=fichier.split('-');
      if(tab[0]!==req.session.email && req.session.type==='candidat') throw new Error("Vous n'avez pas accès au fichier");
      res.download('./mesfichiers/'+req.query.fichier);
    } catch (error) {
      res.send('Une erreur est survenue lors du téléchargement de '+req.query.fichier+'. '+error);
    }
  }
});

module.exports = router;
