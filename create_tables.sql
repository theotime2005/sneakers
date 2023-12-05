-- Supprimer les tables si elles existent
DROP TABLE IF EXISTS `Collections`;
DROP TABLE IF EXISTS `Roles`;
DROP TABLE IF EXISTS `Users`;
DROP TABLE IF EXISTS `Sneakers`;

-- Créer la table "Roles"
CREATE TABLE `Roles` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(15),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Créer la table "Users"
CREATE TABLE `Users` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(10),
    `role_id` INT,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_role_id`
    FOREIGN KEY (`role_id`)
    REFERENCES `Roles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Créer la table "Sneakers"
CREATE TABLE `Sneakers` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `brand` VARCHAR(20) DEFAULT NULL,
    `colorway` VARCHAR(20) DEFAULT NULL,
    `estimatedMarketValue` INT DEFAULT NULL,
    `gender` VARCHAR(10) DEFAULT NULL,
    `image` VARCHAR(255) DEFAULT NULL, -- Modifier le type de données
    `links` VARCHAR(255) DEFAULT NULL,
    `name` VARCHAR(20) NOT NULL,
    `releaseDate` VARCHAR(255) DEFAULT NULL, -- Modifier le type de données
    `releaseYear` VARCHAR(255) DEFAULT NULL, -- Modifier le type de données
    `retailPrice` INT DEFAULT NULL,
    `silhouette` VARCHAR(255) DEFAULT NULL, -- Modifier le type de données
    `sku` VARCHAR(255) DEFAULT NULL, -- Modifier le type de données
    `story` VARCHAR(255) DEFAULT NULL, -- Modifier le type de données
    `UID` VARCHAR(255) NOT NULL, -- Modifier le type de données
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Créer la table "Collections"
CREATE TABLE `Collections` (
    `user_id` INT,
    `sneaker_id` INT,
    CONSTRAINT `fk_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `Users` (`id`),
    CONSTRAINT `fk_sneaker_id`
    FOREIGN KEY (`sneaker_id`)
    REFERENCES `Sneakers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
