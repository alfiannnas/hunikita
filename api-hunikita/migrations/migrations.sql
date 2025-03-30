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
  `role` ENUM('Admin', 'Pemilik', 'Penyewa') NOT NULL DEFAULT 'Penyewa',
  `jenis_kelamin` ENUM('Laki-laki', 'Perempuan') NULL,
  `kota_asal` varchar(100) NULL,
  `pekerjaan` varchar(100) NULL,
  `nama_kampus` varchar(150) NULL,
  `status` ENUM('Belum Kawin', 'Sudah Kawin') DEFAULT 'Belum Kawin',
  `pendidikan_terakhir` ENUM('SD', 'SMP', 'SMA/SMK', 'D3', 'S1', 'S2', 'S3') NULL,
  `no_kontak` varchar(20) NULL,
  `no_kontak_darurat` varchar(20) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO users (name, email, password, role, jenis_kelamin, kota_asal, pekerjaan, nama_kampus, status, pendidikan_terakhir, no_kontak, no_kontak_darurat) VALUES
('Admin Kos', 'admin@kos.com', '$2b$12$hVTKKEeC1H7nLm4jPd02m.xx1zbYZT3qGbXpI60utlNJG44IDv7oy', 'Admin', 'Laki-laki', 'Jakarta', 'Pengelola Kos', NULL, 'Belum Kawin', 'S1', '081234567890', 021777484),
('Budi Pemilik', 'budi@pemilik.com', '$2b$12$H/LAKHFY8B3uy2vkaL3uce.nVdvoazeg85TPKYZgwPcL7n09oaJwy', 'Pemilik', 'Laki-laki', 'Bandung', 'Wiraswasta', NULL, 'Sudah Kawin', 'S2', '081298765432', 021777484),
('Siti Penyewa', 'siti@penyewa.com', '$2b$12$TFgq.k.RtOLpHhhqkfs.MuZiuts5EZwhoL2RXah.3cjUOn4I/B4ju', 'Penyewa', 'Perempuan', 'Surabaya', 'Mahasiswa', 'Universitas Airlangga', 'Belum Kawin', 'S1', '081245678912', 021777484),
('Rudi Mahasiswa', 'rudi@student.com', '$2b$12$spS7WJ5MCvsGGRyD6CtuyeUlPGtx10jTQ8KSfTozpj7sSZ1ogtq.q', 'Penyewa', 'Laki-laki', 'Yogyakarta', 'Mahasiswa', 'Universitas Gadjah Mada', 'Belum Kawin', 'S1', '081356789123', 021777484),
('Dewi Freelancer', 'dewi@freelance.com', '$2b$12$OlQ/hyzNuII3it8DQdtmXOA8PGc2sg0n9l9jvcQ9bjqpNM8L0bch2', 'Penyewa', 'Perempuan', 'Medan', 'Freelancer', NULL, 'Sudah Kawin', 'SMA/SMK', '081367890234', 021777484);


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


--
-- Table structure for table `penyewa`
--
CREATE TABLE penyewa ( 
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL,
    property_id INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

--
-- Dumping data for table `penyewa`
--
INSERT INTO penyewa (user_id, property_id) VALUES
(1, 2),
(2, 3),
(3, 1),
(4, 5),
(5, 4);


--
-- Table structure for table `artikel`
--
CREATE TABLE artikel ( 
    id INT AUTO_INCREMENT PRIMARY KEY,
    judul VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    isi TEXT NOT NULL,
    kategori_id INT NULL,
    status ENUM('Draft', 'Published', 'Rejected') DEFAULT 'Draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_posting TINYINT(1) NOT NULL DEFAULT 0,
    gambar VARCHAR(255) NOT NULL
);

--
-- Dumping data for table `artikel`
--
INSERT INTO artikel (judul, slug, isi, kategori_id, status, created_at, updated_at, is_posting, gambar) VALUES
('Tips Menghemat Uang untuk Anak Kos', 'tips-hemat-anak-kos', 
 'Mengatur keuangan saat menjadi anak kos memang tidak mudah. Berikut adalah beberapa tips yang bisa membantu Anda mengelola uang dengan lebih bijak...', 
 1, 'Published', NOW(), NOW(), 1, 'images/tips-hemat.jpg'),

('Resep Masakan Sederhana untuk Anak Kos', 'resep-masakan-anak-kos', 
 'Makanan enak tidak harus mahal. Berikut beberapa resep sederhana yang bisa dimasak dengan bahan murah...', 
 2, 'Published', NOW(), NOW(), 1, 'images/resep-murah.jpg'),

('Cara Menata Kamar Kos agar Nyaman', 'menata-kamar-kos', 
 'Kamar kos yang rapi dan nyaman bisa meningkatkan produktivitas dan kenyamanan Anda selama tinggal di perantauan...', 
 3, 'Draft', NOW(), NOW(), 0, 'images/kamar-kos.jpg'),

('Pekerjaan Sampingan yang Cocok untuk Anak Kos', 'pekerjaan-sampingan-anak-kos', 
 'Banyak anak kos mencari pekerjaan sampingan untuk menambah penghasilan. Berikut beberapa pekerjaan yang bisa Anda coba...', 
 4, 'Published', NOW(), NOW(), 1, 'images/pekerjaan-sampingan.jpg'),

('Cara Mengatasi Kebosanan di Kosan', 'mengatasi-bosan-di-kosan', 
 'Sering merasa bosan saat sendirian di kos? Berikut beberapa aktivitas yang bisa dilakukan untuk menghilangkan kebosanan...', 
 5, 'Rejected', NOW(), NOW(), 0, 'images/mengatasi-bosan.jpg');



