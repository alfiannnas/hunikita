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
    status ENUM('Draft', 'Published', 'Rejected') DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

--
-- Dumping data for table `artikel`
--
INSERT INTO artikel (judul, slug, isi, kategori_id, status) VALUES 
('Tips Hemat untuk Anak Kos', 'tips-hemat-anak-kos', 
'Menjadi anak kos berarti harus pintar mengatur keuangan agar cukup untuk kebutuhan sehari-hari. Beberapa tips yang bisa dilakukan antara lain: 
1. Buat anggaran bulanan dan catat semua pengeluaran. 
2. Masak sendiri daripada sering membeli makanan di luar. 
3. Gunakan transportasi umum atau sepeda untuk menghemat biaya transportasi. 
4. Manfaatkan promo dan diskon saat belanja kebutuhan sehari-hari. 
5. Kurangi kebiasaan nongkrong di kafe dan coba alternatif yang lebih murah seperti taman atau perpustakaan.', 
NULL, 'Published'),

('Resep Masakan Simpel untuk Anak Kos', 'resep-masakan-simpel-anak-kos', 
'Banyak anak kos yang malas atau tidak punya waktu untuk memasak, padahal memasak sendiri bisa lebih hemat dan sehat. Berikut beberapa resep mudah dan murah yang bisa dicoba:
1. **Nasi Goreng Sederhana**: Tumis bawang putih dan bawang merah, tambahkan nasi, kecap, dan telur.
2. **Indomie Tek-tek**: Masak mi instan seperti biasa, lalu tumis dengan telur dan sayuran.
3. **Telur Dadar Sayur**: Campurkan telur dengan sedikit tepung, irisan wortel, dan daun bawang, lalu goreng hingga matang.
4. **Oatmeal Pisang**: Campurkan oatmeal dengan susu dan pisang untuk sarapan sehat dan mengenyangkan.
5. **Tumis Tahu dan Tempe**: Tumis tahu dan tempe dengan bawang putih, kecap, dan sedikit cabai untuk makanan bergizi.', 
NULL, 'Published'),

('Cara Mengatur Waktu antara Kuliah dan Kerja Part-time', 'atur-waktu-kuliah-part-time', 
'Banyak anak kos yang harus bekerja sambil kuliah untuk mencukupi kebutuhan finansial. Namun, mengatur waktu dengan baik sangat penting agar kuliah tidak terganggu. Berikut beberapa tips:
1. Buat jadwal harian yang jelas dan patuhi dengan disiplin.
2. Prioritaskan tugas kuliah dan jangan menunda pekerjaan rumah.
3. Pilih pekerjaan part-time yang memiliki jam fleksibel atau sesuai dengan jadwal kuliah.
4. Manfaatkan waktu luang di antara kelas untuk mengerjakan tugas.
5. Jangan lupa untuk menjaga kesehatan dengan tidur yang cukup dan makan makanan bergizi.', 
NULL, 'Draft'),

('Trik Membersihkan Kamar Kos dengan Cepat', 'trik-bersihkan-kamar-kos', 
'Kamar kos yang bersih dan rapi akan membuatmu lebih nyaman dan produktif. Berikut beberapa trik membersihkan kamar kos dengan cepat:
1. Rapikan tempat tidur setiap pagi agar kamar langsung terlihat lebih rapi.
2. Gunakan kotak atau wadah penyimpanan untuk menghindari barang berserakan.
3. Bersihkan meja belajar dan lantai setidaknya seminggu sekali.
4. Gunakan penyegar ruangan agar kamar tetap harum dan segar.
5. Buang sampah setiap hari agar tidak menumpuk dan menimbulkan bau.', 
NULL, 'Rejected'),

('Ide Dekorasi Murah untuk Kamar Kos', 'ide-dekorasi-murah-kamar-kos', 
'Ingin kamar kos terlihat lebih menarik tanpa mengeluarkan banyak uang? Berikut beberapa ide dekorasi yang murah dan mudah:
1. **Gunakan Lampu LED**: Lampu hias LED bisa membuat suasana kamar lebih nyaman dan aesthetic.
2. **Manfaatkan Kertas Dinding atau Wallpaper**: Pilih wallpaper dengan motif yang kamu suka untuk memberikan tampilan baru pada dinding kamar.
3. **Tambahkan Tanaman Kecil**: Tanaman hias seperti kaktus atau sukulen bisa mempercantik kamar dan memberikan kesan segar.
4. **Gunakan Rak Dinding**: Rak dinding minimalis bisa digunakan untuk menyimpan buku atau barang kecil agar kamar tetap rapi.
5. **Cetak Foto atau Poster Inspiratif**: Hiasi dinding dengan foto kenangan atau poster motivasi agar suasana kamar lebih personal.', 
NULL, 'Published');


