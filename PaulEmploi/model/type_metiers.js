var db = require('./pool.js');

module.exports = {
    readall: function (callback) {
        db.query("select * from type_metiers", function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    create: function (nom_metier, callback) {
        db.query("INSERT INTO type_metiers (nom_metier) VALUES (?)", nom_metier, function (err, results) {
            if (err) throw err;
            callback(results);
        });
        return true;
    },
    delete: function (nom_metier, callback) {
        db.query("DELETE FROM type_metiers WHERE nom_metier=?", nom_metier, function (err, results) {
            if (err) throw err;
            callback(results);
        });
        return true;
    },
    isValid: function (nom_metier, callback) {
        sql = "SELECT * FROM type_metiers WHERE nom_metier = ?";
        rows = db.query(sql, nom_metier, function (err, results) {
        if (err) throw err;
        if (results.length >= 1) {
            callback(true);
        } else {
            callback(false);
        }
        });
    },
}



