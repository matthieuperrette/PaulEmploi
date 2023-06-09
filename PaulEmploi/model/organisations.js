var db = require('./pool.js');

module.exports = {
    read: function (siren, callback) {
        db.query("select * from organisations where siren= ?",siren, function(err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    readByName: function (nom, callback) {
        db.query("select * from organisations where nom=?",nom, function(err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    readall: function (callback) {
        db.query("select * from organisations", function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    readallOrganisationNames: function (callback) {
        db.query("select nom from organisations", function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    readallLike: function (like, callback) {
        sql="select * from organisations WHERE nom LIKE '%" + like +"%' ORDER BY nom";
        db.query(sql, function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    readallOrderBy: function ( colonne_ordre, callback) {
        db.query("select * from organisations ORDER BY " + colonne_ordre, function(err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    create: function (siren, nom, statut_juridique, localisation, statut_demande, callback) {
        var data = [siren, nom, statut_juridique, localisation, statut_demande];
        db.query("INSERT INTO organisations (siren, nom, statut_juridique, localisation_siege, statut_demande) VALUES (?, ?, ?, ?, ?)", data, function (err, results) {
            if (err) throw err;
            callback(results);
        });
        return true;
    },
    delete: function (siren, callback) {
        db.query("DELETE FROM organisations WHERE siren=?", siren, function (err, results) {
            if (err) throw err;
            callback(results);
        });
        return true;
    },
    update : function (nom,value,siren,callback){
        if(nom.length!==value.length)   throw("Erreur les deux tableaux en parametre doivent etre de meme taille") 
        sql="UPDATE organisations SET "
        for (var i = 0; i < nom.length-1; i++){
            sql +=nom[i] + "='"+value[i]+"',"; 
        };
        sql+=nom[i] + "='"+value[i]+"' WHERE siren=?";
        console.log(sql);
        db.query(sql, siren,function (err, results) {
            if (err) throw err;
            callback(results);
            });
        return true;
    },
    updateNom : function (nom, siren,callback){
        db.query("UPDATE organisations SET nom=? WHERE siren=?", [nom, siren],function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    updateStatutJuridique : function (statut_juridique,siren,callback){
        db.query("UPDATE organisations SET statut_juridique=? WHERE siren=?", [statut_juridique, siren],function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    updateLocalisation : function (localisation,siren,callback){
        db.query("UPDATE organisations SET localisation=? WHERE siren=?", [localisation, siren],function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    updateStatutDemande : function (statut_demande,siren,callback){
        db.query("UPDATE organisations SET statut_demande=? WHERE siren=?", [statut_demande, siren],function (err, results) {
            if (err) throw err;
            callback(results);
        });
    }
    
}



