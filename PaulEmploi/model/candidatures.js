var db = require('./pool.js');
var mysql=require('mysql');

module.exports = {
    read: function (id_candidature, callback) {
        //console.log(id_candidature)
        db.query("select * from candidatures where id_candidature=?",id_candidature, function(err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    readSpe: function (email, id_offre, callback) {
        //console.log(id_candidature)
        db.query("select * from candidatures where candidat=? AND offre=?",[email,id_offre], function(err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    readCandidatOffre: function (candidat, callback) {
        //console.log(candidat)
        db.query("select * from candidatures c, offre_emplois oe, fiche_postes fp, organisations o where candidat=? AND oe.id_offre=c.offre AND oe.fiche=fp.id_fiche AND oe.organisation=o.siren",candidat, function(err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    readall: function (callback) {
        db.query("select * from candidatures", function (err, results) {
        if (err) throw err;
        callback(results);
        });
    },
    readallOrderBy: function ( colonne_ordre, callback) {
        db.query("select * from candidatures ORDER BY " + colonne_ordre, function(err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    update : function (nom,value,id_candidature,callback){
        if(nom.length!==value.length)   throw("Erreur les deux tableaux en parametre doivent etre de meme taille") 
        sql="UPDATE candidatures SET "
        for (var i = 0; i < nom.length-1; i++){
            sql +=nom[i] + "="+mysql.escape(value[i])+","; 
        };
        sql+=nom[i] + "="+mysql.escape(value[i])+" WHERE id_candidature=?";
        //console.log(sql);
        db.query(sql, id_candidature,function (err, results) {
            if (err) throw err;
            callback(results);
            });
        return true;
    },
    delete: function (candidat, offre, callback) {
        var data = [candidat, offre];
        db.query("DELETE from candidatures WHERE candidat=? AND offre=?",data, function (err, results) {
        if (err) throw err;
        callback(results);
        });
    },
    create: function (id_utilisateur, id_offre, callback) {
        var date = new Date().toISOString().slice(0, 10);
        
        //console.log(id_utilisateur)
        //console.log(id_offre)
        var data = [date, id_utilisateur, id_offre]
        var sql = "INSERT INTO candidatures VALUES(NULL,?,NULL,NULL,?,?)";
        db.query(sql,data, function (err, results) {
            if (err) throw err;
            callback(results);
        });
    }
}

