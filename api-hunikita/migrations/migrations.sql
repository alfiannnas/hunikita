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
  `password` varchar(100) NOT NULL,
  `role` ENUM('Admin', 'Pemilik', 'Penyewa') NOT NULL DEFAULT 'Penyewa'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`name`, `email`, `password`, `role`) VALUES
('merah', 'merah@gmail.com', '$2b$10$5gIha3X8KbD8ghfsEsivVuwEvoonIrgbW5tfgFAySIQxt0e6PESju', 'Penyewa'),
('bjir', 'bjir@gmail.com', '$2b$10$t4NJO6wUDq6V.T3zvW721OCaonMfiao2cSWz5m7C8H0B27mQCleM2', 'Pemilik'),
('wadu', 'wadu@gmail.com', '$2b$10$oM61Ou0PEw7xIQi0fCmTJuH6lOGMANK3oEU8cyc0oPA4..gx9QN66', 'Penyewa'),
('kecoa', 'kecoa@gmail.com', '$2b$10$eo6Ipbkx4IUoKCZ7KMuFN.hWnXUkYW3MGkaczJKD8.yc7n4Pa58Dm', 'Pemilik'),
('udin', 'udin@gmail.com', '$2b$10$Um6FyzfCbOqES5tkFF8hB.eWvZZDIsqQXki3mvz5a2Rakth.aQ66W', 'Penyewa'),
('kuning', 'kuning@gmail.com', '$2b$10$wBNXSJDDQJ7GfwjCu6KaEOGnXIYrC9SZDXCc1axBPX.ucs2bmUEzi', 'Admin');

CREATE TABLE `property_types` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(30) UNIQUE NOT NULL
);

INSERT INTO `property_types` (`name`) VALUES
('Kost'),
('Kontrakan');

--
-- Table structure for table `properties`
--
CREATE TABLE properties (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL,
    property_type_id INT NULL,
    owner_name VARCHAR(255) NULL,
    owner_email VARCHAR(255) NULL,
    status VARCHAR(255) NULL,
    name VARCHAR(255) NOT NULL,
    address TEXT NULL,
    room_count INT NULL,
    img_path VARCHAR(500) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

--
-- Dumping data for table `properties`
--
INSERT INTO properties (user_id, property_type_id, owner_name, owner_email, name, address, room_count, img_path, status)
VALUES
(1, 2, 'John Doe', 'john.doe@example.com', 'Luxury Villa', '123 Sunset Blvd, Los Angeles, CA', 5, '/images/villa1.jpg', 'Disetujui'),
(2, 3, 'Jane Smith', 'jane.smith@example.com', 'Modern Apartment', '456 Ocean Drive, Miami, FL', 3, '/images/apartment1.jpg', 'Diproses'),
(3, 1, 'Michael Brown', 'michael.brown@example.com', 'Cozy Cottage', '789 Maple Street, Denver, CO', 2, '/images/cottage1.jpg', 'Ditolak'),
(4, 2, 'Alice Johnson', 'alice.johnson@example.com', 'Beach House', '101 Palm Tree Ave, Honolulu, HI', 4, '/images/beachhouse.jpg', 'Diproses'),
(5, 1, 'Robert Williams', 'robert.williams@example.com', 'Mountain Cabin', '555 Rocky Road, Aspen, CO', 3, '/images/cabin2.jpg', 'Disetujui');
