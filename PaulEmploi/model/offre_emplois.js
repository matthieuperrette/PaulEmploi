var db = require('./pool.js');
var mysql = require('mysql');

module.exports = {
    read: function (id_offre, callback) {
        db.query("select * from offre_emplois where id_offre= ?",id_offre, function(err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    readCandidatures: function (id_offre, callback) {
        db.query("select * from offre_emplois oe, candidatures c, utilisateurs u where oe.id_offre= ? AND c.offre=oe.id_offre AND c.candidat=u.email AND u.compte_actif=1",id_offre, function(err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    readAllInfos: function (callback) {
        var sql="SELECT intitule, lieu, description, rythme, teletravail, nom_metier, nom_statut, "+
        "min_salaire, max_salaire, id_fiche, etat, date_validite, indication, nombre_pieces, nom " + 
        "FROM offre_emplois oe, fiche_postes fp, organisations o "+ 
        "WHERE fp.id_fiche=oe.fiche AND oe.organisation=o.siren";
        db.query(sql, function(err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    readAllInfosPubliee: function (callback) {
        var sql="SELECT id_offre, intitule, lieu, description, rythme, teletravail, nom_metier, nom_statut, "+
        "min_salaire, max_salaire, etat, date_validite, indication, nombre_pieces, nom " + 
        "FROM offre_emplois oe, fiche_postes fp, organisations o "+ 
        "WHERE fp.id_fiche=oe.fiche AND oe.organisation=o.siren AND oe.etat='Publiee'";
        db.query(sql, function(err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    readAllInfosPublieePasCandidater: function (email,callback) {
        var sql="SELECT id_offre, intitule, lieu, description, rythme, teletravail, nom_metier, nom_statut, "+
        "min_salaire, max_salaire, etat, date_validite, indication, nombre_pieces, nom, candidat " + 
        "FROM offre_emplois oe LEFT OUTER JOIN candidatures c ON oe.id_offre=c.offre " +
        "LEFT OUTER JOIN fiche_postes fp ON fp.id_fiche=oe.fiche " +
        "LEFT OUTER JOIN organisations o ON  oe.organisation=o.siren "+ 
        "WHERE oe.etat='Publiee' AND (c.candidat is NULL OR c.candidat<>"+mysql.escape(email)+")";
        db.query(sql, function(err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    readAllInfosPublieePasCandidaterLike: function (email, like, callback) {
        var sql="SELECT id_offre, intitule, lieu, description, rythme, teletravail, nom_metier, nom_statut, "+
        "min_salaire, max_salaire, etat, date_validite, indication, nombre_pieces, nom " + 
        "FROM offre_emplois oe LEFT OUTER JOIN candidatures c ON oe.id_offre=c.offre " +
        "LEFT OUTER JOIN fiche_postes fp ON fp.id_fiche=oe.fiche " +
        "LEFT OUTER JOIN organisations o ON  oe.organisation=o.siren "+ 
        "WHERE oe.etat='Publiee' AND (c.candidat is NULL OR c.candidat<>"+mysql.escape(email)+")" +
        " AND intitule LIKE " + mysql.escape("%" + like +"%") +" GROUP BY id_offre;";
        db.query(sql, function(err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    readAllInfosPublieePasCandidaterLikeORDER: function (email, like, order, nom, value, callback) {
        if(!email) email="";
        var sql="SELECT id_offre, intitule, lieu, description, rythme, teletravail, nom_metier, nom_statut, "+
        "min_salaire, max_salaire, etat, date_validite, indication, nombre_pieces, nom " + 
        "FROM offre_emplois oe LEFT OUTER JOIN candidatures c ON oe.id_offre=c.offre " +
        "LEFT OUTER JOIN fiche_postes fp ON fp.id_fiche=oe.fiche " +
        "LEFT OUTER JOIN organisations o ON  oe.organisation=o.siren "+ 
        "WHERE oe.etat='Publiee' AND (c.candidat is NULL OR c.candidat<>"+mysql.escape(email)+")" +
        " AND intitule LIKE "+ mysql.escape("%" + like +"%") + " ";
        let min=-1;
        let max=-1;
        let min_rythme=-1;
        let max_rythme=-1;
        if(nom.length!==value.length)   throw("Erreur les deux tableaux en parametre doivent etre de meme taille") 
        for (var i = 0; i < nom.length; i++){
            if(nom[i]!='min_salaire' && nom[i]!='max_salaire' && nom[i]!='min_rythme' && nom[i]!='max_rythme' && nom[i]!='teletravail')
                sql += "AND " +nom[i] + " LIKE "+ mysql.escape("%" + value[i] +"%") +" "; 
            else if (nom[i]=='min_salaire')
                min=i;
            else if (nom[i]=='max_salaire')
                max=i
            else if (nom[i]=='teletravail' && value[i]!=-1)
                sql+= "AND teletravail="+mysql.escape(value[i])+" ";
            else if (nom[i]=='min_rythme')
                min_rythme=i;
            else if (nom[i]=='max_rythme')
                max_rythme=i
        };
        if(value[min]!=-1){
            sql += "AND ((min_salaire<="+mysql.escape(value[max])+" AND max_salaire>="+mysql.escape(value[max])+")" +
            " OR (min_salaire<="+mysql.escape(value[min])+" AND max_salaire>="+mysql.escape(value[min])+")" +
            " OR (min_salaire>="+mysql.escape(value[min])+" AND max_salaire<="+mysql.escape(value[max])+")) "
        }
        if(value[min_rythme]!=-1){
            sql += "AND (rythme>"+mysql.escape(value[min_rythme])+" AND rythme<="+mysql.escape(value[max_rythme])+") "
        }
        sql +="GROUP BY id_offre "
        if(order!=='')
            sql += "ORDER BY "+ order;
        else 
            sql+=";"
        //console.log(sql)
        db.query(sql, function(err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    readInfos: function (id_offre,callback) {
        var sql="SELECT id_offre, intitule, lieu, description, rythme, teletravail, nom_metier, nom_statut, "+
        "min_salaire, max_salaire, etat, id_fiche, date_validite, indication, nombre_pieces, nom " + 
        "FROM offre_emplois oe, fiche_postes fp, organisations o "+ 
        "WHERE oe.id_offre=" + mysql.escape(id_offre) + " AND fp.id_fiche=oe.fiche AND oe.organisation=o.siren";
        db.query(sql, function(err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    readInfosPublieeByAuthor: function (email, callback) {
        var sql="SELECT id_offre, intitule, lieu, description, rythme, teletravail, nom_metier, nom_statut, "+
        "min_salaire, max_salaire, etat, date_validite, indication, nombre_pieces, nom " + 
        "FROM offre_emplois oe, fiche_postes fp, organisations o "+ 
        "WHERE fp.recruteur=" + mysql.escape(email) + " AND fp.id_fiche=oe.fiche AND oe.organisation=o.siren AND oe.etat='Publiee'";
        db.query(sql, function(err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    readInfosPublieeByAuthorLike: function (email, search, callback) {
        var sql="SELECT id_offre, intitule, lieu, description, rythme, teletravail, nom_metier, nom_statut, "+
        "min_salaire, max_salaire, etat, date_validite, indication, nombre_pieces, nom " + 
        "FROM offre_emplois oe, fiche_postes fp, organisations o "+ 
        "WHERE fp.recruteur=" + mysql.escape(email) + " AND fp.id_fiche=oe.fiche AND oe.organisation=o.siren AND oe.etat='Publiee'"+
        "AND intitule LIKE "+ mysql.escape("%" +search +"%") + " ORDER BY intitule";
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
            sql +=nom[i] + "="+mysql.escape(value[i])+","; 
        };
        sql+=nom[i] + "="+mysql.escape(value[i])+" WHERE id_offre=?";
        //console.log(sql);
        db.query(sql, id_offre,function (err, results) {
            if (err) throw err;
            callback(results);
            });
        return true;
    }
}

