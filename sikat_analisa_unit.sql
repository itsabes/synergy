-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 16, 2024 at 11:00 AM
-- Server version: 10.3.15-MariaDB
-- PHP Version: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sawah_besar`
--

-- --------------------------------------------------------

--
-- Table structure for table `sikat_analisa_unit`
--

CREATE TABLE `sikat_analisa_unit` (
  `id` int(11) NOT NULL,
  `unit` varchar(100) NOT NULL,
  `tahun` varchar(30) NOT NULL,
  `periode_analisa` varchar(30) NOT NULL,
  `create_date` varchar(50) NOT NULL,
  `update_date` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sikat_analisa_unit`
--

INSERT INTO `sikat_analisa_unit` (`id`, `unit`, `tahun`, `periode_analisa`, `create_date`, `update_date`) VALUES
(12, 'rawatJalan', '2025', '0', '2024-12-16 09:54:11', '2024-12-16 09:54:11'),
(13, 'rawatJalan', '2024', '0', '2024-12-16 09:54:32', '2024-12-16 10:18:20');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sikat_analisa_unit`
--
ALTER TABLE `sikat_analisa_unit`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sikat_analisa_unit`
--
ALTER TABLE `sikat_analisa_unit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
