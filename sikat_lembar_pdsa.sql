-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 15 Des 2024 pada 08.51
-- Versi server: 10.3.15-MariaDB
-- Versi PHP: 7.3.6

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
-- Struktur dari tabel `sikat_lembar_pdsa`
--

CREATE TABLE `sikat_lembar_pdsa` (
  `ID` int(11) NOT NULL,
  `JUDUL_PROYEK` varchar(100) DEFAULT NULL,
  `KETUA_TIM` varchar(100) DEFAULT NULL,
  `ANGGOTA_1` varchar(100) DEFAULT NULL,
  `ANGGOTA_2` varchar(100) DEFAULT NULL,
  `ANGGOTA_3` varchar(100) DEFAULT NULL,
  `JABATAN_1` varchar(100) DEFAULT NULL,
  `JABATAN_2` varchar(100) DEFAULT NULL,
  `JABATAN_3` varchar(100) DEFAULT NULL,
  `BENEFIT` text DEFAULT NULL,
  `MASALAH` text DEFAULT NULL,
  `TUJUAN` text DEFAULT NULL,
  `UKURAN` varchar(100) DEFAULT NULL,
  `PERBAIKAN` text DEFAULT NULL,
  `PERIODE_WAKTU` varchar(100) DEFAULT NULL,
  `TANGGAL_MULAI` date DEFAULT NULL,
  `TANGGAL_SELESAI` date DEFAULT NULL,
  `ANGGARAN` varchar(100) NOT NULL,
  `CREATE_DATE` varchar(50) DEFAULT NULL,
  `UPDATE_DATE` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `sikat_lembar_pdsa`
--

INSERT INTO `sikat_lembar_pdsa` (`ID`, `JUDUL_PROYEK`, `KETUA_TIM`, `ANGGOTA_1`, `ANGGOTA_2`, `ANGGOTA_3`, `JABATAN_1`, `JABATAN_2`, `JABATAN_3`, `BENEFIT`, `MASALAH`, `TUJUAN`, `UKURAN`, `PERBAIKAN`, `PERIODE_WAKTU`, `TANGGAL_MULAI`, `TANGGAL_SELESAI`, `ANGGARAN`, `CREATE_DATE`, `UPDATE_DATE`) VALUES
(64, 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'proses', 'a', 'a', '2024-11-24', '2024-11-30', 'a', '2024-11-24 04:54:01', NULL),
(65, 'a', 'a', 'a', 'a', 'a', 's', 'a', 'a', 'a', 'a', 'a', 'struktur', 'a', 'a', '2024-11-24', '2024-11-28', 'a', '2024-11-24 05:02:13', '2024-11-24 05:22:26'),
(66, 'judul', 'ketua', 'rakha', 'sopiian', 'arif', 'developer', 'programmer', 'designer', 'keuntungan', 'masalah', 'langkah 1', 'struktur', 'perbaikan', '4 bulan', '2024-11-28', '2024-11-30', '1 juta', '2024-11-28 05:38:42', '2024-11-28 05:39:55'),
(67, 'a', 'a', 'a', 't', 't', 's', 't', 't', 't', 't', 't', 'struktur', 't', 't', '2024-12-13', '2024-12-20', 't', '2024-12-13 06:58:22', '2024-12-13 06:58:33');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `sikat_lembar_pdsa`
--
ALTER TABLE `sikat_lembar_pdsa`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `sikat_lembar_pdsa`
--
ALTER TABLE `sikat_lembar_pdsa`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
