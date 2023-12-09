DROP DATABASE IF EXISTS `sneakers`;
CREATE DATABASE `sneakers`;
USE `sneakers`;

-- Delete tables if exists
DROP TABLE IF EXISTS `Collections`;
DROP TABLE IF EXISTS `Roles`;
DROP TABLE IF EXISTS `Users`;
DROP TABLE IF EXISTS `WishList`;

-- Create "Roles" table
CREATE TABLE `Roles` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(15),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Create "Users" table
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

-- Create "Collections" table
CREATE TABLE `Collections` (
    `user_id` INT,
    `sneaker_id` INT,
    PRIMARY KEY (`sneaker_id`),
    CONSTRAINT `fk_user_collection`
        FOREIGN KEY (`user_id`)
        REFERENCES `Users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Create "WishList" table
CREATE TABLE `WishList` (
    `user_id` INT,
    `sneaker_id` INT,
    PRIMARY KEY (`sneaker_id`),
    CONSTRAINT `fk_user_wishlist`
        FOREIGN KEY (`user_id`)
        REFERENCES `Users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
