var db = require('./pool.js');

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
    readallDemandes: function (SIREN, callback) {
        db.query("select * from utilisateurs WHERE organisation=? AND type_compte='candidat'",SIREN, function (err, results) {
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
        sql = "SELECT mot_de_passe FROM utilisateurs WHERE email = ?"; 
        rows = db.query(sql, email, function (err, results) {
        if (err) throw err;
        if (results.length == 1 && results[0].mot_de_passe === password) {
        callback(true);
        } else {
        callback(false);
        }
        });
    },
    create: function (email, nom, prenom, motdepasse, numtel, callback) {
        var date = new Date().toISOString().slice(0, 10);
        var regex = /^0\d{1}([\s ]|[\. ]?\d{2}){4}/ //commence par 0 et un chiffre puis suivi de 4 fois 2 chiffres separe par un espace un point ou rien
        if (!regex.test(numtel))
            throw new Error('Format téléphone non respecté');
        //enleve tous les points et les espaces du numtel pour le stocker dans la bdd
        numtel=numtel.replace(/\s/g,'');
        numtel=numtel.replace(/\./g,'');
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
            sql +=nom[i] + "='"+value[i]+"',"; 
        };
        sql+=nom[i] + "='"+value[i]+"'WHERE email=?";
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
        if (typeof compte_actif == "number")    
            if (!(compte_actif === 1 || compte_actif === 0))
                throw new Error('Erreur le compte actif est un booléen');
        else if( !(typeof compte_actif == "boolean"))
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



