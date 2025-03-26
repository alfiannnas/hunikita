-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 11, 2023 at 09:42 AM
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
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES
(1, 'kecoabasah', 'ansjdnasjdn@gmail.com', '$2b$10$RQ.tiTnjdvEAN73qJ.MPZO7E48IKN9kj5DZU4xQef/Yb7WKOzwq1K'),
(2, 'erwerwerwe', 'ewrwerwer@gmail.com', '$2b$10$5Vv3f/lXxYZDRHkBFmobmOyTz11KuKSuSmsnpy7CI8Ypyo3MXZU9i'),
(3, 'merah', 'merah@gmail.com', '$2b$10$5gIha3X8KbD8ghfsEsivVuwEvoonIrgbW5tfgFAySIQxt0e6PESju'),
(4, 'bjir', 'bjir@gmail.com', '$2b$10$t4NJO6wUDq6V.T3zvW721OCaonMfiao2cSWz5m7C8H0B27mQCleM2'),
(5, 'wadu', 'wadu@gmail.com', '$2b$10$oM61Ou0PEw7xIQi0fCmTJuH6lOGMANK3oEU8cyc0oPA4..gx9QN66'),
(7, 'kecoa', 'kecoa@gmail.com', '$2b$10$eo6Ipbkx4IUoKCZ7KMuFN.hWnXUkYW3MGkaczJKD8.yc7n4Pa58Dm'),
(8, 'udin', 'udin@gmail.com', '$2b$10$Um6FyzfCbOqES5tkFF8hB.eWvZZDIsqQXki3mvz5a2Rakth.aQ66W'),
(11, 'ytu', 'tyu@gmail.com', '$2b$10$49/0gifGXkcVa/04h3dNfupL2BGOeTZnmOJLTuinOYbQrFo.rbJa6'),
(12, 'sadasd', 'hjir@gmail.com', '$2b$10$ADDLKdo4ELr2h/5b.d.e9uMQRjZzk77MXDMg0/sZEhZwCHWxQ.t6W'),
(13, 'sdfdsfsdfsd', 'sdfsdfsdfsdfsdf@gmail.com', '$2b$10$QhsWIiFvPmu4k45kGtG.UeHEFcCyoiAkm/cyKQ2wcIoCfvoe90XyC'),
(14, 'biru', 'biru@gmail.com', '$2b$10$uuB36i/IGp4IzZC29UbQ5e7HeXOzZehtCD8rmsv/agAbQuYIWWVly'),
(16, 'kocak', 'kocak@gmail.com', '$2b$10$3ei9tlYuHKkcqCQ2khQ0jey062eV.j1jhpGi/5X4eet0Ngb4W9.nG'),
(17, 'sudah', 'sudah@gmail.com', '$2b$10$KMzUlRZh7b6FBLEWn8SOdeUf0gtqOAaaIrPMnPgz.Dv8zqkZv5m9G'),
(18, 'coba', 'coba@gmail.com', '$2b$10$5c3Dz8eGFkMQyi91tVd/7uGlp//pN3Sr73yNqDnRaWUBHQUln4cjW'),
(19, 'masa', 'masa@gmail.com', '$2b$10$voR38kr/OBy42wG/TK1SZeIfZvUbgW89QPoebbjmS7.JAk2uyqQJ2'),
(21, '0909', '0909@gmail.com', '$2b$10$oqvVJ6IUMNtdtEBeAm2B4Ow4ry2agb4PE8BRxNx4v947q8FMhdjrO');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
