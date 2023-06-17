var db = require('./pool.js');
var mysql=require('mysql');

module.exports = {
    read: function (id_fiche, callback) {
        db.query("select * from fiche_postes where id_fiche= ?",id_fiche, function(err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    readParams: function (intitule, lieu, description, rythme, teletravail, recruteur, nom_metier, nom_statut, min_salaire, max_salaire, callback) {
        var data = [intitule, lieu, description, rythme, teletravail, recruteur, nom_metier, nom_statut, min_salaire, max_salaire]
        sql="select * from fiche_postes where intitule= ? AND  lieu=? AND description=?"+
        "AND rythme=? AND teletravail=? AND recruteur=? AND nom_metier=? AND nom_statut=?"+
        "AND min_salaire=? AND max_salaire=?"
        db.query(sql , data, function(err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    readallOrderBy: function ( colonne_ordre, callback) {
        db.query("select * from fiche_postes ORDER BY " + colonne_ordre, function(err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    readall: function (callback) {
        db.query("select * from fiche_postes", function (err, results) {
        if (err) throw err;
        callback(results);
        });
    },
    delete: function (id_fiche,callback) {
        db.query("DELETE from fiche_postes WHERE id_fiche=?",id_fiche, function (err, results) {
        if (err) throw err;
        callback(results);
        });
    },
    create: function (intitule, lieu, description, rythme, teletravail, recruteur, nom_metier, nom_statut, min_salaire, max_salaire, callback) {
        var data = [intitule, lieu, description, rythme, teletravail, recruteur, nom_metier, nom_statut, min_salaire, max_salaire]
        var sql = "INSERT INTO fiche_postes VALUES(NULL,?,?,?,?,?,?,?,?,?,?)";
        db.query(sql,data, function (err, results) {
            if (err) throw err;
            callback(results);
            });
    },
    update : function (nom, value, id_fiche,callback){
        if(nom.length!==value.length)   throw("Erreur les deux tableaux en parametre doivent etre de meme taille") 
        for (var i = 0; i < nom.length; i++){
            db.query("UPDATE fiche_postes SET " + nom[i] + "=? WHERE id_fiche=?", [value[i], id_fiche],function (err, results) {
                if (err) throw err;
                callback(results);
                });
        };
    },
    update : function (nom,value, id_fiche,callback){
        if(nom.length!==value.length)   throw("Erreur les deux tableaux en parametre doivent etre de meme taille") 
        sql="UPDATE fiche_postes SET "
        for (var i = 0; i < nom.length-1; i++){
            sql +=nom[i] + "="+mysql.escape(value[i])+","; 
        };
        sql+=nom[i] + "="+mysql.escape(value[i])+" WHERE id_fiche=?";
        //console.log(sql);
        db.query(sql, id_fiche,function (err, results) {
            if (err) throw err;
            callback(results);
            });
        return true;
    }
    
    
}

