var db = require('./pool.js');

module.exports = {
    readall: function (callback) {
        db.query("select * from statut_activites", function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    create: function (nom, callback) {
        db.query("INSERT INTO statut_activites (nom) VALUES (?)", nom, function (err, results) {
            if (err) throw err;
            callback(results);
        });
        return true;
    },
    delete: function (nom, callback) {
        db.query("DELETE FROM statut_activites WHERE nom=?", nom, function (err, results) {
            if (err) throw err;
            callback(results);
        });
        return true;
    },
    isValid: function (nom, callback) {
        sql = "SELECT nom FROM statut_activites WHERE nom = ?";
        rows = db.query(sql, nom, function (err, results) {
        if (err) throw err;
        if (results.length >= 1) {
            callback(true);
        } else {
            callback(false);
        }
        });
    },
}



