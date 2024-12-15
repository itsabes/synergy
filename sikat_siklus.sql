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
-- Struktur dari tabel `sikat_siklus`
--

CREATE TABLE `sikat_siklus` (
  `ID` int(11) NOT NULL,
  `LEMBAR_PDSA_ID` int(11) DEFAULT NULL,
  `RENCANA` text DEFAULT NULL,
  `TANGGAL_MULAI` date NOT NULL,
  `TANGGAL_SELESAI` date NOT NULL,
  `BERHARAP` text DEFAULT NULL,
  `TINDAKAN` text DEFAULT NULL,
  `DIAMATI` text DEFAULT NULL,
  `PELAJARI` text DEFAULT NULL,
  `TINDAKAN_SELANJUTNYA` text DEFAULT NULL,
  `FILE_PATH` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `sikat_siklus`
--

INSERT INTO `sikat_siklus` (`ID`, `LEMBAR_PDSA_ID`, `RENCANA`, `TANGGAL_MULAI`, `TANGGAL_SELESAI`, `BERHARAP`, `TINDAKAN`, `DIAMATI`, `PELAJARI`, `TINDAKAN_SELANJUTNYA`, `FILE_PATH`) VALUES
(74, 64, 'a', '2024-11-24', '2024-11-27', 'a', 'a', 'a', 'a', 'a', '/uploads/siklus/6742a32196a36_(HiFiSnap_co)_wp4470264.jpg'),
(75, 64, 'b', '2024-11-24', '2024-11-27', 'b', 'b', 'b', 'b', 'bbbb', '/uploads/siklus/6742a3597e541_5e320045-3784-4ea4-aef0-7343ac2615ba.png'),
(76, 65, 'a', '2024-11-26', '2024-11-28', 'a', 'a', 'a', 'a', 'a', ''),
(77, 66, 'test', '2024-11-28', '2024-11-29', 'test', 'test', 'test', 'test', 'test', '/uploads/siklus/6747f41b3a86b_1.jpeg'),
(78, 67, 't', '2024-12-13', '2024-12-14', 't', 't', 't', 't', 't', '/uploads/siklus/675bccfe0b709_5e320045-3784-4ea4-aef0-7343ac2615ba.png');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `sikat_siklus`
--
ALTER TABLE `sikat_siklus`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `sikat_siklus`
--
ALTER TABLE `sikat_siklus`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
