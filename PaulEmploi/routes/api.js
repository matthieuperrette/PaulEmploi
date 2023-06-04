var express = require('express');
var offresModel = require('../model/offre_emplois');
var userModel = require('../model/utilisateurs');
var router = express.Router();

router.get('/offres', function (req, res, next) {
    result=offresModel.readall(function(result){
        res.status(200).json(result);
    });
});
router.get('/users', function (req, res, next) {
    result=userModel.readall(function(result){
        res.status(200).json(result);
    });
});
router.get('/offres/:id_offre', function (req, res, next) {
    const id = req.params.id_offre;
    console.log(id);
    result=offresModel.read(id, function(result){
        res.status(200).json(result);
    });
});
router.post('/offres', function (req, res, next) {
    let newUser = {
        username: req.body.username,
        lastname: req.body.lastname
    };
    result=offresModel.create(newUser, function(result){
        res.status(200).json(result);
    });
});
    
  
module.exports = router;