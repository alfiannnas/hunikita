-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 11, 2023 at 02:40 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `auth`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`name`, `email`, `password`) VALUES
('merah', 'merah@gmail.com', '$2b$10$5gIha3X8KbD8ghfsEsivVuwEvoonIrgbW5tfgFAySIQxt0e6PESju'),
('bjir', 'bjir@gmail.com', '$2b$10$t4NJO6wUDq6V.T3zvW721OCaonMfiao2cSWz5m7C8H0B27mQCleM2'),
('wadu', 'wadu@gmail.com', '$2b$10$oM61Ou0PEw7xIQi0fCmTJuH6lOGMANK3oEU8cyc0oPA4..gx9QN66'),
('kecoa', 'kecoa@gmail.com', '$2b$10$eo6Ipbkx4IUoKCZ7KMuFN.hWnXUkYW3MGkaczJKD8.yc7n4Pa58Dm'),
('udin', 'udin@gmail.com', '$2b$10$Um6FyzfCbOqES5tkFF8hB.eWvZZDIsqQXki3mvz5a2Rakth.aQ66W'),
('kuning', 'kuning@gmail.com', '$2b$10$wBNXSJDDQJ7GfwjCu6KaEOGnXIYrC9SZDXCc1axBPX.ucs2bmUEzi');

CREATE TABLE `property_types` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(30) UNIQUE NOT NULL
);

INSERT INTO `property_types` (`name`) VALUES
('kos'),
('kontrakan');


CREATE TABLE `properties` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `property_type_id` INT NOT NULL,
  `owner_name` varchar(100) NOT NULL,
  `owner_email` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL,
  `room_count` INT NOT NULL, 
  `img_path` VARCHAR(250) NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`property_type_id`) REFERENCES `property_types`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);