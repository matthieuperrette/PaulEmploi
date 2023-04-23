var express = require('express');
var router = express.Router();
var userModel = require('../model/users')


router.get('/', function(req, res, next) {
    result=userModel.readall(function(result){
        //console.log(result)
    });
    
  res.render('test');
});

module.exports = router;
