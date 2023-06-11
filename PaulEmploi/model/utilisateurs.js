var db = require('./pool.js');
var mysql = require('mysql')

module.exports = {
    read: function (email, callback) {
        db.query("select * from utilisateurs where email= ?",email, function
        (err, results) {
        if (err) throw err;
        callback(results);
        });
    },
    readall: function (callback) {
        db.query("select * from utilisateurs", function (err, results) {
        if (err) throw err;
        callback(results);
        });
    },
    readallLike: function (like, callback) {
        sql="select * from utilisateurs WHERE nom LIKE "+mysql.escape("%" + like +"%")+" OR prenom LIKE "+mysql.escape("%" + like +"%")+" ORDER BY nom";
        db.query(sql, function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    readallDemandes: function (SIREN, callback) {
        db.query("select * from utilisateurs WHERE organisation=? AND type_compte='candidat'",SIREN, function (err, results) {
        if (err) throw err;
        callback(results);
        });
    },
    readallDemandesLike: function (SIREN, search, callback) {
        db.query("select * from utilisateurs WHERE organisation=? AND type_compte='candidat' AND (nom LIKE "+mysql.escape("%"+search+"%")+" OR prenom LIKE "+mysql.escape("%"+search+"%")+") ORDER BY nom",SIREN, function (err, results) {
        if (err) throw err;
        callback(results);
        });
    },
    readallOrderBy: function ( colonne_ordre, callback) {
        db.query("select * from utilisateurs ORDER BY " + colonne_ordre, function(err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    checkOrga: function ( email, callback) {
        db.query("select organisation from utilisateurs WHERE email=?", email, function(err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    isValid: function (email, password, callback) {
        sql = "SELECT mot_de_passe, compte_actif FROM utilisateurs WHERE email = ?"; 
        rows = db.query(sql, email, function (err, results) {
            if (err) throw err;
            if (results.length == 1 && results[0].mot_de_passe === password) {
            callback(results);
            } else {
            callback(false);
            }
        });
    },
    create: function (email, nom, prenom, motdepasse, numtel, callback) {
        var date = new Date().toISOString().slice(0, 10);
        var data = [email, nom, prenom, motdepasse, numtel, date, 1, 'candidat'];
        db.query("INSERT INTO utilisateurs (email, nom, prenom, mot_de_passe, numtel, date_creation, compte_actif, type_compte, organisation) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, NULL)", data, function (err, results) {
        if (err) throw err;
        callback(results);
        });
        return true;
    },
    delete: function (email, callback) {
        db.query("DELETE FROM utilisateurs WHERE email=?", email, function (err, results) {
            if (err) throw err;
            callback(results);
        });
        return true;
    },
    update : function (nom,value,email,callback){
        if(nom.length!==value.length)   throw("Erreur les deux tableaux en parametre doivent etre de meme taille") 
        sql="UPDATE utilisateurs SET "
        for (var i = 0; i < nom.length-1; i++){
            sql +=nom[i] + "="+mysql.escape(value[i])+","; 
        };
        sql+=nom[i] + "="+mysql.escape(value[i])+"WHERE email=?";
        console.log(sql);
        db.query(sql, email,function (err, results) {
            if (err) throw err;
            callback(results);
            });
        return true;
    },
    updateNom : function (nom,email,callback){
        db.query("UPDATE utilisateurs SET nom=? WHERE email=?", [nom, email],function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    updatePrenom : function (prenom,email,callback){
        db.query("UPDATE utilisateurs SET prenom=? WHERE email=?", [prenom, email],function (err, results) {
            if (err ) throw err;
            callback(results);
        });
    },
    updateMotDePasse : function (mdp,email,callback){
        db.query("UPDATE utilisateurs SET mot_de_passe=? WHERE email=?", [mdp, email],function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    updateNumTel : function (numtel,email,callback){
        db.query("UPDATE utilisateurs SET numtel=? WHERE email=?", [numtel, email],function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    updateCompteActif : function (compte_actif,email,callback){
        console.log(compte_actif)
        console.log(!(compte_actif === 1 || compte_actif === 0))
        if (typeof compte_actif == 'number') {
            if (compte_actif !== 1 && compte_actif !== 0)
                throw new Error('Erreu le compte actif est un booléen');
        }
        else if( !(typeof compte_actif == 'boolean'))
                throw new Error('Erreur le compte actif est un booléen');
        db.query("UPDATE utilisateurs SET compte_actif=? WHERE email=?", [compte_actif, email],function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    updateTypeCompte : function (type,email,callback){
        db.query("UPDATE utilisateurs SET type_compte=? WHERE email=?", [type, email],function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    updateTypeCompteWithOrga : function (type, siren,callback){
        db.query("UPDATE utilisateurs SET type_compte=? WHERE organisation=?", [type, siren],function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    updateOrganisation : function (orga,email,callback){
        db.query("UPDATE utilisateurs SET organisation=? WHERE email=?", [orga, email],function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    updateOrgaToNull : function (email,callback){
        db.query("UPDATE utilisateurs SET organisation=NULL WHERE email=?",  email,function (err, results) {
            if (err) throw err;
            callback(results);
        });
    }
    
}



