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
        numtel=numtel.replace(/\s/g,'');
        console.log(numtel);
        numtel=numtel.replace(/\./g,'');
        var data = [email, nom, prenom, motdepasse, numtel, date, 1, 'candidat'];
        db.query("INSERT INTO utilisateurs (id_utilisateur, email, nom, prenom, mot_de_passe, numtel, date_creation, compte_actif, type_compte, organisation) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, NULL)", data, function (err, results) {
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
    }
    
}



