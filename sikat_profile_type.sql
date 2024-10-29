-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 28, 2024 at 04:05 AM
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
-- Table structure for table `sikat_profile_type`
--

CREATE TABLE `sikat_profile_type` (
  `ID` int(11) NOT NULL,
  `TYPE` varchar(255) DEFAULT NULL,
  `CREATE_DATE` date DEFAULT NULL,
  `UPDATE_DATE` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sikat_profile_type`
--

INSERT INTO `sikat_profile_type` (`ID`, `TYPE`, `CREATE_DATE`, `UPDATE_DATE`) VALUES
(1, 'igd', '2024-10-20', '2024-10-20'),
(2, 'rawatJalan', '2024-10-20', '2024-10-20'),
(3, 'rawatInap', '2024-10-20', '2024-10-20'),
(4, 'rawatInapAnak', '2024-10-20', '2024-10-20'),
(5, 'kamarOperasi', '2024-10-20', '2024-10-20'),
(6, 'perinatologi', '2024-10-20', '2024-10-20'),
(7, 'hcu', '2024-10-20', '2024-10-20'),
(8, 'kamarBersalin', '2024-10-20', '2024-10-20'),
(9, 'radiologi', '2024-10-20', '2024-10-20'),
(10, 'laboratorium', '2024-10-20', '2024-10-20'),
(11, 'farmasi', '2024-10-20', '2024-10-20'),
(12, 'gizi', '2024-10-20', '2024-10-20'),
(13, 'rekamMedis', '2024-10-20', '2024-10-20'),
(14, 'kesling', '2024-10-20', '2024-10-20'),
(15, 'cssdLinen', '2024-10-20', '2024-10-20'),
(16, 'Linen', '2024-10-20', '2024-10-20'),
(17, 'ipsrs', '2024-10-20', '2024-10-20'),
(18, 'k3rs', '2024-10-20', '2024-10-20'),
(19, 'kasir', '2024-10-20', '2024-10-20'),
(20, 'loketPendaftaran', '2024-10-20', '2024-10-20'),
(21, 'ambulance', '2024-10-20', '2024-10-20'),
(22, 'ppi', '2024-10-20', '2024-10-20'),
(23, 'timKprs', '2024-10-20', '2024-10-20'),
(24, 'komiteMedis', '2024-10-20', '2024-10-20'),
(25, 'komiteKeperawatan', '2024-10-20', '2024-10-20'),
(26, 'komiteNakesLain', '2024-10-20', '2024-10-20'),
(27, 'komiteEtik', '2024-10-20', '2024-10-20'),
(28, 'timPkrs', '2024-10-20', '2024-10-20'),
(29, 'timPpra', '2024-10-20', '2024-10-20'),
(30, 'timKomplain', '2024-10-20', '2024-10-20'),
(31, 'timPonek', '2024-10-20', '2024-10-20'),
(32, 'timTb', '2024-10-20', '2024-10-20'),
(33, 'manajemenKepegawaian', '2024-10-20', '2024-10-20'),
(34, 'keuangan', '2024-10-20', '2024-10-20'),
(35, 'timKb', '2024-10-20', '2024-10-20'),
(36, 'pengurusBarang', '2024-10-20', '2024-10-20'),
(37, 'stunting', '2024-10-20', '2024-10-20'),
(38, 'casemix', '2024-10-20', '2024-10-20'),
(39, 'timHiv', '2024-10-20', '2024-10-20'),
(40, 'it', '2024-10-20', '2024-10-20'),
(41, 'pengadaan', '2024-10-20', '2024-10-20');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sikat_profile_type`
--
ALTER TABLE `sikat_profile_type`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sikat_profile_type`
--
ALTER TABLE `sikat_profile_type`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
