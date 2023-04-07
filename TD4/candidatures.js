var db = require('./pool.js');

module.exports = {
    read: function (id_candidature, callback) {
        db.query("select * from candidatures where id_candidature= ?",id_candidature, function(err, results) {
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
    update : function (nom,value,id_candidature,callback){
        if(nom.length!==value.length)   throw("Erreur les deux tableaux en parametre doivent etre de meme taille") 
        for (var i = 0; i < nom.length; i++){
            db.query("UPDATE candidatures SET ?=?", [nom[i], value[i], id_candidature],function (err, results) {
                if (err) throw err;
                callback(results);
                });
        };
    },
    delete: function (id_candidature,callback) {
        db.query("DELETE from candidatures WHERE id_candidature=?",id_candidature, function (err, results) {
        if (err) throw err;
        callback(results);
        });
    },
    create: function (id_candidature, pieces, id_utilisateur, id_offre, callback) {
        var now = Date.now();

        var data = [id_candidature, now.toISoString(), pieces, id_utilisateur, id_offre]
        var sql = "INSERT INTO candidatures VALUES(NULL,?,'?',?,?,?)";
        db.query(sql,data, function (err, results) {
            if (err) throw err;
            callback(results);
            });
    return false;
}
}

