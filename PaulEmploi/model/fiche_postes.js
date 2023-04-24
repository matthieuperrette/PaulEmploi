var db = require('./pool.js');

module.exports = {
    read: function (id_fiche, callback) {
        db.query("select * from fiche_postes where id_fiche= ?",id_fiche, function(err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    readall_order_by: function (id_fiche, colonne_ordre, callback) {
        db.query("select * from fiche_postes ORDER BY ?",id_fiche,colonne_ordre, function(err, results) {
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
    update : function (nom,value,id_fiche,callback){
        if(nom.length!==value.length)   throw("Erreur les deux tableaux en parametre doivent etre de meme taille") 
        for (var i = 0; i < nom.length; i++){
            db.query("UPDATE fiche_postes SET ?=?", [nom[i], value[i], id_fiche],function (err, results) {
                if (err) throw err;
                callback(results);
                });
        };
    },
    delete: function (id_fiche,callback) {
        db.query("DELETE from fiche_postes WHERE id_fiche=?",id_fiche, function (err, results) {
        if (err) throw err;
        callback(results);
        });
    },
    create: function (id_fiche, pieces, id_utilisateur, id_offre, callback) {
        var now = Date.now();

        var data = [id_fiche, now.toISoString(), pieces, id_utilisateur, id_offre]
        var sql = "INSERT INTO fiche_postes VALUES(NULL,?,'?',?,?,?)";
        db.query(sql,data, function (err, results) {
            if (err) throw err;
            callback(results);
            });
    return false;
}
}

