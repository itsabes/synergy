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
-- Table structure for table `sikat_analisa_indikator`
--

CREATE TABLE `sikat_analisa_indikator` (
  `id` int(11) NOT NULL,
  `id_profile_indikator` int(11) NOT NULL,
  `analisa` text NOT NULL,
  `periode_analisa` varchar(20) NOT NULL,
  `unit` varchar(255) NOT NULL,
  `tahun` varchar(30) NOT NULL,
  `rekomendasi` text NOT NULL,
  `create_date` datetime DEFAULT current_timestamp(),
  `update_date` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sikat_analisa_indikator`
--

INSERT INTO `sikat_analisa_indikator` (`id`, `id_profile_indikator`, `analisa`, `periode_analisa`, `unit`, `tahun`, `rekomendasi`, `create_date`, `update_date`) VALUES
(34, 542, 'test', '0', 'rawatJalan', '2025', 'test', '2024-12-16 09:54:11', '2024-12-16 15:54:11'),
(35, 542, 'test', '0', 'rawatJalan', '2024', 'test12', '2024-12-16 09:54:32', '2024-12-16 10:18:20');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sikat_analisa_indikator`
--
ALTER TABLE `sikat_analisa_indikator`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_profile_indikator` (`id_profile_indikator`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sikat_analisa_indikator`
--
ALTER TABLE `sikat_analisa_indikator`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `sikat_analisa_indikator`
--
ALTER TABLE `sikat_analisa_indikator`
  ADD CONSTRAINT `sikat_analisa_indikator_ibfk_1` FOREIGN KEY (`id_profile_indikator`) REFERENCES `sikat_profile_indikator` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
