var express = require('express');
var router = express.Router();

 

/* GET download */
router.get('', function(req, res, next) {
  try {
    res.download('./mesfichiers/'+req.query.fichier);
  } catch (error) {
    res.send('Une erreur est survenue lors du téléchargement de '+req.query.fichier+' : '+error);
  }
});

module.exports = router;
