-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : lun. 24 avr. 2023 à 12:49
-- Version du serveur :  10.3.38-MariaDB-0+deb10u1
-- Version de PHP : 7.3.31-1~deb10u3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : sr10p028
--

DROP TABLE IF EXISTS candidatures;
DROP TABLE IF EXISTS offre_emplois;
DROP TABLE IF EXISTS fiche_postes;
DROP TABLE IF EXISTS statut_activites;
DROP TABLE IF EXISTS type_metiers;
DROP TABLE IF EXISTS utilisateurs;
DROP TABLE IF EXISTS organisations;

-- --------------------------------------------------------

--
-- Structure de la table organisations
--

CREATE TABLE organisations (
  siren int(11) NOT NULL,
  nom varchar(255) NOT NULL,
  statut_juridique varchar(255) NOT NULL,
  localisation_siege varchar(255) NOT NULL,
  statut_demande enum('en_attente','validée','refusée') NOT NULL,
  PRIMARY KEY(siren)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO organisations (siren, nom, statut_juridique, localisation_siege, statut_demande) VALUES
(127456789, 'oronge', 'pme', '12 rue invisible Paris', 'en_attente'),
(127456790, 'srf', 'entreprise liberale', '13 rue inventee Paris', 'refusée'),
(127456791, 'payant', 'entreprise gigantesque', '14 rue inexistante Paris', 'validée');


-- --------------------------------------------------------

--
-- Structure de la table utilisateurs
--

CREATE TABLE utilisateurs (
  id_utilisateur int(11) NOT NULL AUTO_INCREMENT,
  email varchar(255) NOT NULL UNIQUE,
  nom varchar(255) NOT NULL,
  prenom varchar(255) NOT NULL,
  mot_de_passe varchar(255) NOT NULL,
  numtel varchar(255) NOT NULL,
  date_creation date NOT NULL,
  compte_actif tinyint(1) NOT NULL,
  type_compte enum('candidat','recruteur','administrateur') NOT NULL,
  organisation int(11) DEFAULT NULL,
  PRIMARY KEY(id_utilisateur),
  FOREIGN KEY(organisation) REFERENCES organisations(siren)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO utilisateurs (id_utilisateur, email, nom, prenom, mot_de_passe, numtel, date_creation, compte_actif, type_compte, organisation) VALUES
(NULL, 'thomas.bridoux@orange.fr', 'Bridoux', 'Thomas', 'admin', '0672013966', '2023-03-31', 1, 'administrateur', NULL),
(NULL, 'mathildesoleil@caramail.fr', 'Bullot', 'Mathilde', 'mot_de_passe', '0655236958', '2013-03-01', 1, 'candidat', NULL),
(NULL, 'matthieu.perrette@payant.fr', 'Perrette', 'Matthieu', 'mdp', '0776692044', '2023-03-07', 1, 'recruteur', 127456791),
(NULL, 'htreht@frezfrz.fr', 'clem', 'toto', 'Compte2000', '062548552', '2023-04-14', 1, 'candidat', NULL);


-- --------------------------------------------------------

--
-- Structure de la table statut_activites
--

CREATE TABLE statut_activites (
  nom_activite varchar(255) NOT NULL,
  PRIMARY KEY(nom_activite)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO statut_activites (nom_activite) VALUES
('cadre'),
('ETAM'),
('chef de projet');

-- --------------------------------------------------------

--
-- Structure de la table type_metiers
--

CREATE TABLE type_metiers (
  nom_metier varchar(255) NOT NULL,
  PRIMARY KEY(nom_metier)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO type_metiers (nom_metier) VALUES
('informatique'),
('cybersécurité'),
('commercial');

-- --------------------------------------------------------

--
-- Structure de la table fiche_postes
--

CREATE TABLE fiche_postes (
  id_fiche int(11) NOT NULL AUTO_INCREMENT,
  intitule varchar(255) NOT NULL,
  lieu varchar(255) NOT NULL,
  description text NOT NULL,
  rythme varchar(255) NOT NULL,
  recruteur int(11) NOT NULL,
  nom_metier varchar(255) NOT NULL,
  nom_statut varchar(255) NOT NULL,
  min_salaire int(11) NOT NULL,
  max_salaire int(11) NOT NULL,
  PRIMARY KEY (id_fiche),
  FOREIGN KEY(recruteur) REFERENCES utilisateurs(id_utilisateur),
  FOREIGN KEY(nom_metier) REFERENCES type_metiers(nom_metier),
  FOREIGN KEY(nom_statut) REFERENCES statut_activites(nom_activite)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO fiche_postes (id_fiche, intitule, lieu, description, rythme, recruteur, nom_metier, nom_statut, min_salaire, max_salaire) VALUES
(NULL, 'Dev OPS', '13 rue blabla', 'developeur', '35heure/semaine, sans télétravail', 3, 'informatique', 'chef de projet', 1200, 1800);


-- --------------------------------------------------------

--
-- Structure de la table offre_emplois
--

CREATE TABLE offre_emplois (
  id_offre int(11) NOT NULL AUTO_INCREMENT,
  etat enum('Non Publiée','Publiée','Expirée') NOT NULL,
  date_validite date NOT NULL,
  indication text NOT NULL,
  nombre_pieces int(11) NOT NULL,
  organisation int(11) NOT NULL,
  fiche int(11) NOT NULL,
  PRIMARY KEY(id_offre),
  FOREIGN KEY(organisation) REFERENCES organisations(siren),
  FOREIGN KEY(fiche) REFERENCES fiche_postes(id_fiche)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO offre_emplois (id_offre, etat, date_validite, indication, nombre_pieces, organisation, fiche) VALUES
(NULL, 'Non Publiée', '2023-06-25', 'Chef de projet chez payant', 2, 127456791, 1);

-- --------------------------------------------------------

--
-- Structure de la table candidatures
--

CREATE TABLE candidatures (
  id_candidature int(11) NOT NULL AUTO_INCREMENT,
  date_candidature date NOT NULL,
  pieces text NOT NULL,
  candidat int(11) NOT NULL,
  offre int(11) NOT NULL,
  PRIMARY KEY(id_candidature),
  FOREIGN KEY(offre) REFERENCES offre_emplois(id_offre),
  FOREIGN KEY(candidat) REFERENCES utilisateurs(id_utilisateur)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO candidatures (id_candidature, date_candidature, pieces, candidat, offre) VALUES
(NULL, '2023-04-25', 'CV et lettre de motivation', 2, 1);



/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
