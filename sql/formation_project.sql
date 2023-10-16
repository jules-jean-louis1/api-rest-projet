-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : dim. 15 oct. 2023 à 18:53
-- Version du serveur : 5.7.36
-- Version de PHP : 8.1.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `formation_project`
--

-- --------------------------------------------------------

--
-- Structure de la table `projects`
--

DROP TABLE IF EXISTS `projects`;
CREATE TABLE IF NOT EXISTS `projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `github` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `images` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `projects`
--

INSERT INTO `projects` (`id`, `name`, `description`, `github`, `website`, `images`, `created_at`, `updated_at`) VALUES
(8, ' App-favorite', 'Site de favoris en HTML/CSS ', 'https://jules-jean-louis.students-laplateforme.io/Projet/index.php#', 'https://github.com/jules-jean-louis1', 'previs-app-fav.png', '2022-11-05 10:20:00', NULL),
(9, 'Module de connexion', 'Module de connexion/inscription en PHP', 'https://github.com/jules-jean-louis1/module-connexion', 'https://jules-jean-louis.students-laplateforme.io/moduleconnexion/index.php', 'module-connexion.png', '2022-12-03 10:20:00', NULL),
(10, 'Option 13 - Blog', 'Le projet \"Option 13\" est un blog dédié au développement web. Il offre aux utilisateurs la possibilité de publier des articles et d\'interagir avec la communauté. Le blog est conçu pour être à la fois convivial et professionnel.\r\n\r\nFonctionnalités Principales :\r\n\r\n    Page d\'Accueil : La page d\'accueil affiche les derniers articles publiés, fournissant un aperçu du contenu du blog. Les utilisateurs peuvent cliquer sur les articles pour en savoir plus.\r\n\r\n    Système d\'Authentification : Le blog dispose d\'un système d\'authentification. Les utilisateurs peuvent s\'inscrire et se connecter de manière sécurisée. L\'inscription est gérée de manière asynchrone pour une expérience utilisateur fluide.\r\n\r\n    Gestion des Profils : Une fois connectés, les utilisateurs peuvent accéder à leur profil. Ils ont la possibilité de modifier leurs informations, telles que le nom, l\'adresse e-mail et le mot de passe.\r\n\r\n    Liste d\'Articles : Le blog propose une liste d\'articles. Cette liste est paginée, ce qui signifie que seuls un certain nombre d\'articles sont affichés à la fois. Les utilisateurs peuvent naviguer entre les pages d\'articles.\r\n\r\n    Création d\'Articles : Les utilisateurs avec des privilèges de rédaction (modérateurs et administrateurs) ont accès à une interface de création d\'articles. Ils peuvent rédiger des articles et les associer à des catégories.\r\n\r\n    Affichage d\'Articles : Chaque article dispose d\'une page dédiée. Les visiteurs peuvent lire l\'article complet, y compris les détails tels que la date de publication, l\'auteur et les commentaires.\r\n\r\n    Ajout de Commentaires : Les utilisateurs enregistrés ont la possibilité d\'ajouter des commentaires aux articles. Cela favorise l\'interaction entre les auteurs et les lecteurs.\r\n\r\n    Panel d\'Administration : Les administrateurs du blog ont accès à un panneau d\'administration. Ils peuvent gérer les utilisateurs, les articles, les commentaires, les catégories et d\'autres aspects du blog.\r\n\r\n    Pagination des Articles : La pagination est mise en place pour garantir que la liste d\'articles reste gérable et que les visiteurs puissent explorer le contenu de manière organisée.\r\n\r\nArchitecture de la Base de Données :\r\nL\'architecture de la base de données est conçue pour stocker des informations sur les utilisateurs, les articles, les commentaires, les catégories et les autres données pertinentes. Cela permet au blog de fonctionner de manière fluide et de gérer efficacement le contenu.', 'https://github.com/jules-jean-louis1/blog-js', 'https://jules-jean-louis.students-laplateforme.io/blog-js/index.php', 'blog-js.png', '2023-03-20 10:00:00', NULL),
(14, 'Todolist', 'Cette application de liste de tâches permet aux utilisateurs de créer, ajouter, modifier et supprimer des rappels. Les principales fonctionnalités comprennent :\r\n\r\n    Création de Tâches : Les utilisateurs peuvent créer de nouvelles tâches en spécifiant leur titre, leur description et d\'autres détails pertinents.\r\n\r\n    Ajout de Nouveaux Rappels : Les utilisateurs peuvent ajouter de nouveaux rappels à leur liste de tâches en spécifiant la date et l\'heure auxquelles la tâche doit être accomplie.\r\n\r\n    Modification de Tâches : Les utilisateurs ont la possibilité de modifier les détails de leurs tâches existantes, y compris le titre, la description, la date et l\'heure d\'échéance.\r\n\r\n    Suppression de Tâches : Les utilisateurs peuvent supprimer des tâches de leur liste de tâches lorsqu\'elles ne sont plus pertinentes.\r\n\r\n    État des Tâches : Chaque tâche peut être marquée comme \"À faire\" ou \"Terminée\", permettant aux utilisateurs de suivre leur progression.\r\n\r\nCette application de liste de tâches offre une solution simple et efficace pour la gestion des rappels. Les utilisateurs peuvent organiser leurs activités, suivre les tâches à accomplir et indiquer celles qui sont terminées. Elle est idéale pour les personnes qui cherchent à rester organisées et à gérer leur temps de manière efficace.', 'https://github.com/jules-jean-louis1/tdl', 'https://jules-jean-louis.students-laplateforme.io/tdl/index.php', '1695583696191-todolist.jpg', '2023-02-25 11:10:00', NULL),
(19, 'Remind Me!', '\"Remind Me!\" est une application de gestion de tâches complète, conçue pour aider les utilisateurs à organiser et à suivre leurs listes de tâches de manière efficace. Voici un aperçu de ses fonctionnalités principales :\r\n\r\n    Inscription et Connexion Sécurisées : Les utilisateurs peuvent s\'inscrire de manière sécurisée, créer un compte personnel et se connecter facilement à l\'application.\r\n\r\n    Gestion Complète du Profil : Chaque utilisateur peut personnaliser son profil en ajoutant des informations personnelles, telles qu\'une photo de profil, une brève biographie, etc.\r\n\r\n    Création de Listes de Tâches : Les utilisateurs ont la possibilité de créer jusqu\'à 8 listes de tâches différentes pour organiser leurs activités.\r\n\r\n    Ajout de Tâches : Les utilisateurs peuvent ajouter des tâches à leurs listes. Ils ont également la possibilité d\'ajouter des tâches sans les attribuer à une liste spécifique.\r\n\r\n    Personnalisation des Tâches : Chaque tâche peut être personnalisée en fonction des besoins de l\'utilisateur. Les détails de la tâche incluent la description, la date de début et de fin, la priorité, et des tags pour une meilleure organisation.\r\n\r\n    Partage de Tâches : Pour une collaboration optimale, les utilisateurs peuvent partager des tâches individuelles avec d\'autres utilisateurs. Cela facilite le travail d\'équipe et la gestion des projets.\r\n\r\n    Fonction d\'Autocomplétion : L\'application propose une fonction d\'autocomplétion qui facilite la recherche de tâches en utilisant divers filtres, notamment la date, la liste d\'appartenance et la priorité. Cela permet aux utilisateurs de trouver rapidement les tâches dont ils ont besoin.\r\n\r\n\"Remind Me!\" offre une solution complète pour la gestion des tâches, ce qui en fait un outil idéal pour rester organisé et productif. Avec des fonctionnalités avancées de personnalisation, de partage et de recherche, il permet aux utilisateurs de gérer efficacement leur travail et leurs projets. Que ce soit pour des tâches personnelles ou pour une collaboration en équipe, \"Remind Me!\" simplifie la gestion des listes de tâches.', 'https://github.com/jules-jean-louis1/super-reminder', 'https://jules-jean-louis.students-laplateforme.io/super-reminder/', '1697108111171-supperreminder.png', '2023-09-28 12:55:11', NULL),
(20, 'Module de connexion', 'Le Module de Connexion est une application web sécurisée qui offre des fonctionnalités d\'inscription, de connexion et de gestion de profils. Conçu en suivant une architecture Modèle-Vue-Contrôleur (MVC), ce module utilise des normes de sécurité, des expressions régulières (regex), et des pratiques de développement de PHP, telles que htmlspecialchars et les requêtes préparées avec PDO, pour garantir la sécurité des données et prévenir les attaques.\r\n\r\nFonctionnalités Principales :\r\n\r\n    Authentification Sécurisée : Les utilisateurs peuvent s\'inscrire et se connecter de manière sécurisée. Les mots de passe sont stockés de manière cryptée à l\'aide de fonctions de hachage.\r\n\r\n    Modèle-Vue-Contrôleur (MVC) : L\'application suit une architecture MVC, ce qui garantit un code bien organisé et maintenable. Le modèle gère les données, la vue gère l\'interface utilisateur, et le contrôleur gère la logique de l\'application.\r\n\r\n    Utilisation de PDO et Requêtes Préparées : Les requêtes SQL sont exécutées à l\'aide de PDO (PHP Data Objects) avec des requêtes préparées pour empêcher les injections SQL.\r\n\r\n    Filtrage et Validation des Données : Toutes les données entrantes sont filtrées et validées. Les expressions régulières (regex) sont utilisées pour garantir que les données sont conformes aux normes.\r\n\r\n    Utilisation de htmlspecialchars : Les données affichées dans les vues sont préalablement passées à travers la fonction htmlspecialchars pour éviter les attaques XSS.\r\n\r\n    Gestion de Profils : Les utilisateurs ont des profils personnalisés. Ils peuvent mettre à jour leurs informations de profil, notamment leur nom, leur photo de profil, etc.\r\n\r\n    Système de Notifications : Les utilisateurs reçoivent des notifications pour les actions telles que les connexions réussies, les erreurs d\'inscription, etc.\r\n\r\nSécurité : La sécurité est une priorité. Les fonctions de hachage, les requêtes préparées, les normes de sécurité, et l\'utilisation de htmlspecialchars garantissent la sécurité des données et préviennent les attaques.\r\n\r\nBase de Données : Une base de données robuste est utilisée pour stocker les informations des utilisateurs, y compris leurs profils, les détails d\'inscription, etc.', 'https://github.com/jules-jean-louis1/module-connexion-b2', 'https://jules-jean-louis.students-laplateforme.io/moduleconnexionb2/', '1697111897152-moduleconnexionb2.png', '2023-09-16 10:00:00', NULL),
(21, 'WatchManager', 'WatchManager est une application qui s\'appuie sur l\'API TMDB (The Movie Database) pour constituer sa base de données. Cette plateforme permet à l\'utilisateur d\'ajouter des films et des séries à sa liste de favoris. De plus, l\'utilisateur peut laisser des commentaires et consulter des informations détaillées telles que la date de sortie et les évaluations pour chaque film. \r\n\r\nL\'application est construite en suivant une architecture MVC (Modèle-Vue-Contrôleur) pour garantir une structure logique et organisée du code. En outre, l\'utilisation d\'un Altorouter permet de gérer de manière efficace le routage au sein de l\'application, facilitant ainsi la navigation et l\'interaction pour l\'utilisateur.', 'https://github.com/jules-jean-louis1/cinetech', 'https://jules-jean-louis.students-laplateforme.io/cinetech/', 'cinetech.png', '2023-05-25 11:50:52', NULL),
(22, 'Clicker', 'Clicker Game\" est un jeu simple et addictif où les utilisateurs peuvent cliquer sur un bouton pour accumuler des points. L\'objectif principal est de cliquer autant que possible pour gagner des points. Le jeu comprend des fonctionnalités supplémentaires telles que des bonus qui peuvent être débloqués à mesure que le joueur progresse. Ces bonus augmentent en prix au fur et à mesure qu\'ils sont achetés ou ajoutés, rendant le jeu plus compétitif et stimulant pour les utilisateurs. La progression est un élément clé de l\'expérience utilisateur, car elle offre une motivation continue pour rester engagé dans le jeu. Le projet est développé en JavaScript pour assurer une expérience interactive et fluide pour les joueurs.', 'https://github.com/jules-jean-louis1/clicker', 'https://jules-jean-louis.students-laplateforme.io/clicker/index.php', 'clicker.png', '2023-03-04 13:34:37', NULL),
(23, 'WellGames', '\"WellGames\" est une boutique en ligne spécialisée dans la vente de jeux vidéo pour PC, offrant une expérience d\'achat conviviale et ergonomique. Le site propose une multitude de fonctionnalités avancées telles que l\'autocomplétion, des pages de résultats de recherche filtrées, et des descriptions détaillées des jeux avec des images de haute qualité. Les visiteurs du site peuvent laisser des commentaires sur les jeux, et les administrateurs peuvent y répondre pour favoriser l\'interaction.</br>\r\n\r\nLa boutique propose une gestion complète du panier, avec une prise en charge optimisée pour les utilisateurs connectés et déconnectés à l\'aide de cookies, ainsi qu\'une simulation de paiement pour une expérience d\'achat réaliste. Le panneau d\'administration permet de gérer l\'ajout de nouveaux produits, de gérer les stocks, de gérer les commandes et les utilisateurs, et met l\'accent sur l\'optimisation du référencement (SEO) et des temps de chargement. Le projet est construit en utilisant des requêtes préparées et des fonctions natives de PHP pour assurer une sécurité optimale du site.', 'https://github.com/jules-jean-louis1/boutique-en-ligne', 'https://jules-jean-louis.students-laplateforme.io/wellgames/', 'wellGames.png', '2023-04-26 13:42:24', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `project_tags`
--

DROP TABLE IF EXISTS `project_tags`;
CREATE TABLE IF NOT EXISTS `project_tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `project_tags`
--

INSERT INTO `project_tags` (`id`, `project_id`, `tag_id`) VALUES
(1, 10, 2),
(4, 20, 1),
(5, 20, 2),
(6, 20, 4),
(7, 20, 5),
(8, 21, 1),
(9, 21, 2),
(10, 21, 4),
(11, 21, 5),
(12, 21, 6),
(13, 19, 1),
(14, 19, 4),
(15, 19, 5),
(16, 22, 2),
(17, 22, 4),
(18, 23, 1),
(19, 23, 2),
(20, 23, 4),
(21, 23, 5),
(22, 10, 1),
(23, 10, 4);

-- --------------------------------------------------------

--
-- Structure de la table `tags`
--

DROP TABLE IF EXISTS `tags`;
CREATE TABLE IF NOT EXISTS `tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `tags`
--

INSERT INTO `tags` (`id`, `name`) VALUES
(1, 'PHP'),
(2, 'JS'),
(3, 'Node.js'),
(4, 'TailwindCSS'),
(5, 'MVC'),
(6, 'API'),
(7, 'React JS');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `site_right` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `login`, `email`, `password`, `site_right`, `created_at`) VALUES
(1, 'Test', 'test@gmail.com', '$2b$10$wTSI07D6oel.CHgs7R6HlOJEJQNnZxVcpOgt5OVGwys.1cXCTDB9S', 'admin', '2023-09-16 20:34:12'),
(2, 'Jules', 'jules.jean-louis@laplateforme.io', '$2b$10$mEbpJlA6r84gmYaTAWYTUuOWKm.RPyxuIZUIezHTNrw/8a8943UJG', 'admin', '2023-09-17 11:42:44');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
