var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let error=req.query.error;
  if(!error) error="";
  console.log(error)
  res.render('index', {error: error});
});


module.exports = router;
