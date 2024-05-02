-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : sam. 20 avr. 2024 à 18:29
-- Version du serveur : 8.2.0
-- Version de PHP : 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `miams`
--

-- --------------------------------------------------------

--
-- Structure de la table `categorie`
--

DROP TABLE IF EXISTS `categorie`;
CREATE TABLE IF NOT EXISTS `categorie` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `categorie`
--

INSERT INTO `categorie` (`id`, `name`) VALUES
(1, 'Entrée'),
(2, 'Plats'),
(3, 'Dessert');

-- --------------------------------------------------------

--
-- Structure de la table `chef`
--

DROP TABLE IF EXISTS `chef`;
CREATE TABLE IF NOT EXISTS `chef` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `chef`
--

INSERT INTO `chef` (`id`, `name`, `description`) VALUES
(1, 'Philippe Etchebest', 'Philippe Etchebest, né le 2 décembre 1966 à Soissons, est un chef cuisinier et un animateur de télévision français. Depuis 2015, il est juré de Top Chef, et anime les émissions Objectif Top Chef, Cauchemar en cuisine et Cauchemar à l\'hôtel sur M6'),
(2, 'Stéphanie Le Quellec', 'Stéphanie Le Quellec, née Lecocq le 6 décembre 1981 à Enghien-les-Bains est une chef cuisinière française doublement étoilée. Elle est vainqueur de la saison 2 de Top Chef sur M6 en 2011. Elle est une des rares femmes à avoir obtenu deux étoiles au guide Michelin'),
(3, 'Cyril Lignac', 'Cyril Lignac est un chef cuisinier, pâtissier et animateur de télévision français, né le 5 novembre 1977 à Rodez. Il est chef et propriétaire des restaurants parisiens Le Chardenoux, Aux Prés, Bar des Prés, Dragon, Ischia et Le Bar. 2021 voit l’ouverture de son premier restaurant à l’étranger : Bar des Prés Mayfair'),
(4, 'Johnatan Rose', 'Chef cuistot anciennement sur la cybertech il s\'est réorienter en faisant des trompes l\'oeil basé sur le boolean false ; '),
(5, 'Guy Savoy', 'Guy Savoy, né le 24 juillet 1953 à Nevers, est un chef cuisinier français. Son restaurant, situé dans le 6ᵉ arrondissement de Paris, est doublement étoilé au Guide Michelin depuis 1985 et triplement étoilé de 2002 à 2022'),
(6, 'Anne-Sophie Pic', 'Anne-Sophie Pic, née le 12 juillet 1969 à Valence, est une cheffe cuisinière et maître restauratrice française. Elle est propriétaire du restaurant gastronomique la Maison Pic à Valence.'),
(7, 'Thierry Marx', 'Thierry Marx, né le 19 septembre 1959 à Paris, est un homme d\'affaires, et chef cuisinier français. Sa cuisine s\'inspire notamment de la gastronomie moléculaire. Ancien parachutiste au Liban, il exerce plusieurs métiers avant de se tourner vers la restauration'),
(8, 'Alain Passard', 'Alain Passard, né le 4 août 1956 à La Guerche-de-Bretagne, est un chef cuisinier français, propriétaire du restaurant parisien trois étoiles L\'Arpège'),
(9, 'Georges Blanc', 'Georges Blanc, né le 2 janvier 1943, à Bourg-en-Bresse dans l\'Ain, est un des chefs cuisiniers, restaurateurs et hôteliers français du village de Vonnas en plein cœur de la Bresse. Trois étoiles au Guide Michelin et 4 toques au Gault-Millau.'),
(10, 'Yams', 'ceci est une description test');

-- --------------------------------------------------------

--
-- Structure de la table `ingredient`
--

DROP TABLE IF EXISTS `ingredient`;
CREATE TABLE IF NOT EXISTS `ingredient` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `recette`
--

DROP TABLE IF EXISTS `recette`;
CREATE TABLE IF NOT EXISTS `recette` (
  `id` int NOT NULL AUTO_INCREMENT,
  `chef_id` int DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `time` int NOT NULL,
  `created_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `categorie_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_49BB6390150A48F1` (`chef_id`),
  KEY `IDX_49BB6390BCF5E72D` (`categorie_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `recette`
--

INSERT INTO `recette` (`id`, `chef_id`, `title`, `description`, `time`, `created_at`, `categorie_id`) VALUES
(1, NULL, 'Salade Cesar', 'Tres bonne pour l\'été fraiche et appetissante', 20, '2024-04-20 17:25:56', 1),
(3, 1, 'La quiche lorraine', '\r\n\r\nMaintenant que vous maîtrisez la pâte brisée, je vous montre comment la garnir façon Lorraine avec du lard fumé et beaucoup de gruyère bien sûr !! Prêts à vous régaler ?!\r\n', 30, '2024-04-20 18:15:29', 1);

-- --------------------------------------------------------

--
-- Structure de la table `recette_ingredient`
--

DROP TABLE IF EXISTS `recette_ingredient`;
CREATE TABLE IF NOT EXISTS `recette_ingredient` (
  `recette_id` int NOT NULL,
  `ingredient_id` int NOT NULL,
  PRIMARY KEY (`recette_id`,`ingredient_id`),
  KEY `IDX_17C041A989312FE9` (`recette_id`),
  KEY `IDX_17C041A9933FE08C` (`ingredient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `recette`
--
ALTER TABLE `recette`
  ADD CONSTRAINT `FK_49BB6390150A48F1` FOREIGN KEY (`chef_id`) REFERENCES `chef` (`id`),
  ADD CONSTRAINT `FK_49BB6390BCF5E72D` FOREIGN KEY (`categorie_id`) REFERENCES `categorie` (`id`);

--
-- Contraintes pour la table `recette_ingredient`
--
ALTER TABLE `recette_ingredient`
  ADD CONSTRAINT `FK_17C041A989312FE9` FOREIGN KEY (`recette_id`) REFERENCES `recette` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_17C041A9933FE08C` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredient` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
