var db = require('./pool.js');

module.exports = {
    read: function (id_offre, callback) {
        db.query("select * from offre_emplois where id_offre= ?",id_offre, function(err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    readallOrderBy: function ( colonne_ordre, callback) {
        db.query("select * from offre_emplois ORDER BY " + colonne_ordre, function(err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    readall: function (callback) {
        db.query("select * from offre_emplois", function (err, results) {
        if (err) throw err;
        callback(results);
        });
    },
    delete: function (id_offre,callback) {
        db.query("DELETE from offre_emplois WHERE id_offre=?",id_offre, function (err, results) {
        if (err) throw err;
        callback(results);
        });
    },
    create: function (etat, date_validite, indication, nombre_pieces, organisation, fiche, callback) {
        var data = [etat, date_validite, indication, nombre_pieces, organisation, fiche]
        var sql = "INSERT INTO offre_emplois VALUES(NULL, ?, ?, ?, ?, ?, ?)";
        db.query(sql,data, function (err, results) {
            if (err) throw err;
            callback(results);
            });
    },
    update : function (nom, value, id_offre,callback){
        if(nom.length!==value.length)   throw("Erreur les deux tableaux en parametre doivent etre de meme taille") 
        for (var i = 0; i < nom.length; i++){
            db.query("UPDATE offre_emplois SET " + nom[i] + "=? WHERE id_offre=?", [value[i], id_offre],function (err, results) {
                if (err) throw err;
                callback(results);
                });
        };
    } 
}

