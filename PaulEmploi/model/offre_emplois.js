var db = require('./pool.js');

module.exports = {
    read: function (id_offre, callback) {
        db.query("select * from offre_emplois where id_offre= ?",id_offre, function(err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    readCandidatures: function (id_offre, callback) {
        db.query("select * from offre_emplois oe, candidatures c, utilisateurs u where oe.id_offre= ? AND c.offre=oe.id_offre AND c.candidat=u.email",id_offre, function(err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    readAllInfos: function (callback) {
        var sql="SELECT intitule, lieu, description, rythme, nom_metier, nom_statut, "+
        "min_salaire, max_salaire, etat, date_validite, indication, nombre_pieces, nom " + 
        "FROM offre_emplois oe, fiche_postes fp, organisations o "+ 
        "WHERE fp.id_fiche=oe.fiche AND oe.organisation=o.siren";
        db.query(sql, function(err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    readAllInfosPubliee: function (callback) {
        var sql="SELECT id_offre, intitule, lieu, description, rythme, nom_metier, nom_statut, "+
        "min_salaire, max_salaire, etat, date_validite, indication, nombre_pieces, nom " + 
        "FROM offre_emplois oe, fiche_postes fp, organisations o "+ 
        "WHERE fp.id_fiche=oe.fiche AND oe.organisation=o.siren AND oe.etat='Publiee'";
        db.query(sql, function(err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    readAllInfosPublieePasCandidater: function (email,callback) {
        var sql="SELECT id_offre, intitule, lieu, description, rythme, nom_metier, nom_statut, "+
        "min_salaire, max_salaire, etat, date_validite, indication, nombre_pieces, nom, candidat " + 
        "FROM offre_emplois oe LEFT OUTER JOIN candidatures c ON oe.id_offre=c.offre " +
        "LEFT OUTER JOIN fiche_postes fp ON fp.id_fiche=oe.fiche " +
        "LEFT OUTER JOIN organisations o ON  oe.organisation=o.siren "+ 
        "WHERE oe.etat='Publiee' AND (c.candidat is NULL OR c.candidat<>'"+email+"')";
        db.query(sql, function(err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    readInfosPubliee: function (id_offre,callback) {
        var sql="SELECT id_offre, intitule, lieu, description, rythme, nom_metier, nom_statut, "+
        "min_salaire, max_salaire, etat, date_validite, indication, nombre_pieces, nom " + 
        "FROM offre_emplois oe, fiche_postes fp, organisations o "+ 
        "WHERE oe.id_offre=" + id_offre + " AND fp.id_fiche=oe.fiche AND oe.organisation=o.siren";
        db.query(sql, function(err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    readInfosPublieeByAuthor: function (email, callback) {
        var sql="SELECT id_offre, intitule, lieu, description, rythme, nom_metier, nom_statut, "+
        "min_salaire, max_salaire, etat, date_validite, indication, nombre_pieces, nom " + 
        "FROM offre_emplois oe, fiche_postes fp, organisations o "+ 
        "WHERE fp.recruteur='" + email + "' AND fp.id_fiche=oe.fiche AND oe.organisation=o.siren AND oe.etat='Publiee'";
        db.query(sql, function(err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    readInfosPublieeByAuthorLike: function (email, search, callback) {
        var sql="SELECT id_offre, intitule, lieu, description, rythme, nom_metier, nom_statut, "+
        "min_salaire, max_salaire, etat, date_validite, indication, nombre_pieces, nom " + 
        "FROM offre_emplois oe, fiche_postes fp, organisations o "+ 
        "WHERE fp.recruteur='" + email + "' AND fp.id_fiche=oe.fiche AND oe.organisation=o.siren AND oe.etat='Publiee'"+
        "AND intitule LIKE '%"+ search +"%' ORDER BY intitule";
        db.query(sql, function(err, results) {
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
    update : function (nom,value, id_offre,callback){
        if(nom.length!==value.length)   throw("Erreur les deux tableaux en parametre doivent etre de meme taille") 
        sql="UPDATE offre_emplois SET "
        for (var i = 0; i < nom.length-1; i++){
            sql +=nom[i] + "='"+value[i]+"',"; 
        };
        sql+=nom[i] + "='"+value[i]+"' WHERE id_offre=?";
        console.log(sql);
        db.query(sql, id_offre,function (err, results) {
            if (err) throw err;
            callback(results);
            });
        return true;
    }
}

