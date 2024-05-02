-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : dim. 28 avr. 2024 à 13:55
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `ingredient`
--

INSERT INTO `ingredient` (`id`, `name`) VALUES
(1, 'amandes'),
(2, 'ananas'),
(3, 'asperge'),
(4, 'avocat'),
(5, 'avoine'),
(6, 'betterave'),
(7, 'carotte'),
(8, 'celeri-rave'),
(9, 'chou vert'),
(10, 'endive'),
(11, 'epinards'),
(12, 'poireau'),
(13, 'poire'),
(14, 'radis'),
(15, 'oeuf'),
(16, 'poivre'),
(17, 'sel'),
(18, 'citron'),
(19, 'huile'),
(20, 'moutarde'),
(21, 'pain écroûtées'),
(22, 'muscade'),
(23, 'creme fraiche'),
(24, 'beurre'),
(25, 'lait'),
(26, 'lasagnes'),
(27, 'eau'),
(28, 'farine'),
(29, 'fromage rape'),
(30, 'sucre en poudre'),
(31, 'chocolat'),
(35, 'sucre semoule'),
(36, 'blanc d\'oeuf');

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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `recette`
--

INSERT INTO `recette` (`id`, `chef_id`, `title`, `description`, `time`, `created_at`, `categorie_id`) VALUES
(1, NULL, 'Salade Cesar', 'Tres bonne pour l\'été fraiche et appetissante', 20, '2024-04-20 17:25:56', 1),
(3, 1, 'La quiche lorraine', '\r\n\r\nMaintenant que vous maîtrisez la pâte brisée, je vous montre comment la garnir façon Lorraine avec du lard fumé et beaucoup de gruyère bien sûr !! Prêts à vous régaler ?!\r\n', 30, '2024-04-20 18:15:29', 1),
(5, 10, 'Lasagnes à la bolognaise', ' la bolognaise est parfaite pour découvrir les légumineuses. Enrobées de sauce tomate, les lentilles se transforment en une sauce fondante et végétarienne ! »', 125, '2024-04-24 21:42:39', 2),
(6, NULL, 'fondant au chocolat', '« Pour aller plus vite, pour faire fondre le chocolat et le beurre, je mets le tout dans un bol coupé en carrés au micro-ondes.', 40, '2024-04-24 21:47:29', 3),
(7, NULL, 'Risotto aux champignons', 'Tres bonne pour l\'été fraiche et appetissante', 50, '2024-04-28 13:25:56', 2),
(10, NULL, 'Meringue ', 'Cette recette est un miracle !', 5, '2024-04-28 13:51:44', 3);

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
-- Déchargement des données de la table `recette_ingredient`
--

INSERT INTO `recette_ingredient` (`recette_id`, `ingredient_id`) VALUES
(1, 15),
(1, 16),
(1, 17),
(1, 18),
(1, 19),
(1, 20),
(1, 21),
(3, 15),
(3, 16),
(3, 17),
(3, 22),
(3, 23),
(3, 24),
(3, 25),
(5, 7),
(5, 16),
(5, 17),
(5, 22),
(5, 24),
(5, 25),
(5, 26),
(5, 27),
(5, 28),
(5, 29),
(6, 15),
(6, 24),
(6, 28),
(6, 30),
(6, 31),
(10, 35),
(10, 36);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(180) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roles` json NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_IDENTIFIER_EMAIL` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `email`, `roles`, `password`) VALUES
(1, 'admin@admin.com', '[\"ROLE_ADMIN\", \"ROLE_USER\"]', '$2y$13$2HFiA2QnPdkaZeDf1zXR2O09aG7oPjhIQGSc93FgTsmc3qVViYK8y'),
(2, 'admin@admin.fr', '[\"ROLE_ADMIN\", \"ROLE_USER\"]', '$2y$13$x3IamkG.2lnnMX9r9nByMe8PjBATJxJuVAijSeDptnuL11yzxviA.'),
(3, 'user@user.com', '[\"ROLE_USER\"]', '$2y$13$eWX8NSVj3usI7mt//2hofOBfKrJYmYZJyYXmqUCf.E/pR2EUE.9gu'),
(4, 'yams@yams.fr', '[\"ROLE_ADMIN\"]', 'yams');

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
