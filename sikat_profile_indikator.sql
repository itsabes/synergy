-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 01, 2024 at 08:09 PM
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
-- Table structure for table `sikat_profile_indikator`
--

CREATE TABLE `sikat_profile_indikator` (
  `ID` int(11) NOT NULL,
  `LEVEL` int(11) NOT NULL,
  `ORDERS` int(11) NOT NULL,
  `JUDUL_INDIKATOR` text DEFAULT NULL,
  `TAHUN` varchar(20) NOT NULL,
  `ISI_POPULASI` text NOT NULL,
  `USER_ACC` varchar(100) NOT NULL,
  `DASAR_PEMIKIRAN` varchar(100) NOT NULL,
  `IS_EFEKTIF` int(11) NOT NULL,
  `IS_EFISIEN` int(11) NOT NULL,
  `IS_TEPAT_WAKTU` int(11) NOT NULL,
  `IS_AMAN` int(11) NOT NULL,
  `IS_ADIL` int(11) NOT NULL,
  `IS_BERPASIEN` int(11) NOT NULL,
  `IS_INTEGRASI` int(11) NOT NULL,
  `ACC_DATE` varchar(50) NOT NULL,
  `TUJUAN` varchar(100) NOT NULL,
  `DEFINISI_PEMIKIRAN` text NOT NULL,
  `TIPE_INDIKATOR` varchar(50) NOT NULL,
  `UKURAN_INDIKATOR` varchar(100) NOT NULL,
  `NUMERATOR` text NOT NULL,
  `DENUMERATOR` text NOT NULL,
  `KRITERIA` text NOT NULL,
  `FORMULA` text NOT NULL,
  `SUMBER_DATA` text NOT NULL,
  `FREK_PENGUMPULAN` varchar(50) NOT NULL,
  `PERIODE_PELAPORAN` varchar(50) NOT NULL,
  `PERIODE_ANALISA` varchar(50) NOT NULL,
  `METODE_PENGUMPULAN` varchar(50) NOT NULL,
  `POPULASI_SAMPEL` varchar(100) NOT NULL,
  `ISI_SAMPLE` text NOT NULL,
  `RENCANA_ANALISIS` varchar(50) NOT NULL,
  `INSTRUMEN_PENGAMBILAN` varchar(100) NOT NULL,
  `PENANGGUNG_JAWAB` varchar(100) NOT NULL,
  `TYPE` int(11) DEFAULT NULL,
  `TARGET_PENCAPAIAN` varchar(255) DEFAULT NULL,
  `STATUS_ACC` int(11) DEFAULT NULL,
  `PROCESS_TYPE` varchar(50) DEFAULT NULL,
  `DAILY_MONTHLY_SPECIAL` varchar(50) NOT NULL,
  `ISI_INSTRUMEN` text NOT NULL,
  `BESAR_SAMPEL` text NOT NULL,
  `isINM` int(11) NOT NULL,
  `isIMPRs` int(11) NOT NULL,
  `isIMPUnit` int(11) NOT NULL,
  `CREATE_DATE` date DEFAULT NULL,
  `REVIEW_ULANG` text NOT NULL,
  `UPDATE_DATE` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sikat_profile_indikator`
--

INSERT INTO `sikat_profile_indikator` (`ID`, `LEVEL`, `ORDERS`, `JUDUL_INDIKATOR`, `TAHUN`, `ISI_POPULASI`, `USER_ACC`, `DASAR_PEMIKIRAN`, `IS_EFEKTIF`, `IS_EFISIEN`, `IS_TEPAT_WAKTU`, `IS_AMAN`, `IS_ADIL`, `IS_BERPASIEN`, `IS_INTEGRASI`, `ACC_DATE`, `TUJUAN`, `DEFINISI_PEMIKIRAN`, `TIPE_INDIKATOR`, `UKURAN_INDIKATOR`, `NUMERATOR`, `DENUMERATOR`, `KRITERIA`, `FORMULA`, `SUMBER_DATA`, `FREK_PENGUMPULAN`, `PERIODE_PELAPORAN`, `PERIODE_ANALISA`, `METODE_PENGUMPULAN`, `POPULASI_SAMPEL`, `ISI_SAMPLE`, `RENCANA_ANALISIS`, `INSTRUMEN_PENGAMBILAN`, `PENANGGUNG_JAWAB`, `TYPE`, `TARGET_PENCAPAIAN`, `STATUS_ACC`, `PROCESS_TYPE`, `DAILY_MONTHLY_SPECIAL`, `ISI_INSTRUMEN`, `BESAR_SAMPEL`, `isINM`, `isIMPRs`, `isIMPUnit`, `CREATE_DATE`, `REVIEW_ULANG`, `UPDATE_DATE`) VALUES
(537, 1, 1, 'indikator 1', '2024', '', 'pmkp@rsudsawahbesar.com', 'test', 0, 1, 0, 0, 0, 0, 0, '', 'test', 'test', 'Input', 'Presentase', 'numerator', 'denumerator', 'test', 'test', 'Data Primer', '', 'Harian', 'Triwulan', 'Retrospektif', 'Probability Sampling', '', '', 'Formulir', 'rawatJalan', NULL, '100 %', 1, 'rawatJalan', '', '', 'test', 1, 0, 0, '2024-12-01', '', '2024-12-01'),
(538, 2, 2, 'indikator 2', '2024', '', 'pmkp@rsudsawahbesar.com', 'test1', 0, 1, 0, 0, 0, 0, 0, '', 'test', 'test', 'Input', 'Presentase', 'numerator 2', 'denumerator 2', 'test', 'test', 'Data Primer', '', 'Bulanan', 'Triwulan', 'Retrospektif', 'Non Probability Sampling', '', '', 'Formulir', 'rawatJalan', NULL, '>= 100 %', 1, 'rawatJalan', '', '', 'test', 1, 0, 0, '2024-12-01', '', '2024-12-01'),
(539, 3, 3, 'indikator 3', '2024', '', 'pmkp@rsudsawahbesar.com', 'test', 0, 0, 1, 1, 0, 0, 0, '', 'tujuan', 'definisi', 'Proses', 'Presentase', 'numerator 3', 'denumerator 3', 'test', 'test', 'Data Primer', '', 'Harian', 'Triwulan', 'Retrospektif', 'Probability Sampling', '', '', 'Formulir', 'rawatJalan', NULL, '<= 100 %', 1, 'rawatJalan', '', '', 'test', 0, 1, 0, '2024-12-01', '', '2024-12-01'),
(540, 4, 4, 'inidikator  4', '2024', '', 'pmkp@rsudsawahbesar.com', 'testY', 1, 1, 0, 0, 0, 0, 0, '', 'tujuan', 'definisi', 'Input', 'Presentase', '', '', 'test', 'test', 'Data Primer', '', 'Harian', 'Triwulan', 'Retrospektif', 'Probability Sampling', '', '', 'Formulir', 'rawatJalan', NULL, '90 %', 1, 'rawatJalan', '', '', 'test', 1, 0, 0, '2024-12-01', '', '2024-12-01');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sikat_profile_indikator`
--
ALTER TABLE `sikat_profile_indikator`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sikat_profile_indikator`
--
ALTER TABLE `sikat_profile_indikator`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=541;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
