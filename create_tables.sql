DROP DATABASE IF EXISTS `sneakers`;
CREATE DATABASE `sneakers`;
USE `sneakers`;

-- Supprimer les tables si elles existent
DROP TABLE IF EXISTS `Collections`;
DROP TABLE IF EXISTS `Roles`;
DROP TABLE IF EXISTS `Users`;
DROP TABLE IF EXISTS `WishList`;

-- Créer la table "Roles"
CREATE TABLE `Roles` (
     `id` INT NOT NULL AUTO_INCREMENT,
     `name` VARCHAR(15),
     PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Créer la table "Users"
CREATE TABLE `Users` (
     `id` INT NOT NULL AUTO_INCREMENT,
     `email` VARCHAR(50),
    `username` VARCHAR(30),
    `password` VARCHAR(1024),
     `role_id` INT,
     PRIMARY KEY (`id`),
     CONSTRAINT `fk_user_role`
         FOREIGN KEY (`role_id`)
             REFERENCES `Roles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Créer la table "Collections"
CREATE TABLE `Collections` (
           `user_id` INT,
           `sneaker_id` INT,
           CONSTRAINT `fk_user_collection`
               FOREIGN KEY (`user_id`)
                   REFERENCES `Users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Créer la table WishList
CREATE TABLE `WishList` (
        `user_id` INT,
        `sneaker_id` INT,
        CONSTRAINT `fk_user_wishlist`
            FOREIGN KEY (`user_id`)
                REFERENCES `Users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
