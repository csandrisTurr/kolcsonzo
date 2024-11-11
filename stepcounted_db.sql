-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: localhost
-- Létrehozás ideje: 2024. Okt 22. 10:14
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `13a_stepcounter`
--
CREATE DATABASE IF NOT EXISTS `13a_stepcounter` DEFAULT CHARACTER SET utf8 COLLATE utf8_hungarian_ci;
USE `13a_stepcounter`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `stepdatas`
--

CREATE TABLE `stepdatas` (
  `ID` varchar(40) NOT NULL,
  `userID` varchar(40) NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp(),
  `count` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `stepdatas`
--

INSERT INTO `stepdatas` (`ID`, `userID`, `date`, `count`) VALUES
('26aaf155-dde2-438d-9130-83e532ea1d95', '0211cf01-5147-4f57-b654-06c2dacb98e9', '2024-09-10', 8900),
('36d7af27-6289-402a-a1d1-ef01ef8f9178', '0211cf01-5147-4f57-b654-06c2dacb98e9', '2024-09-11', 5678),
('3dd05db7-5b04-4553-a2ba-01ebf9386969', '0211cf01-5147-4f57-b654-06c2dacb98e9', '2024-09-14', 10200),
('68bb57df-137b-4aa8-a2d8-02a45b5d1fa8', '0211cf01-5147-4f57-b654-06c2dacb98e9', '2024-09-07', 6666),
('6f59169a-fe74-4983-a451-9ebd07b4e547', '0a48eefb-4b02-4bf9-b239-13269c3cb7ef', '2024-09-10', 4670),
('71c9d83a-2f64-4767-8dab-13015380366a', '0a48eefb-4b02-4bf9-b239-13269c3cb7ef', '2024-09-17', 6789),
('75491322-ee25-4533-aa9c-a77b61f0b0c4', '0211cf01-5147-4f57-b654-06c2dacb98e9', '2024-09-08', 9888),
('7f8368b6-e564-4109-8c54-60cd7fc1ce49', '0a48eefb-4b02-4bf9-b239-13269c3cb7ef', '2024-09-11', 10000),
('80cb117d-cc1f-4a7c-91fc-74506509ac0f', '0211cf01-5147-4f57-b654-06c2dacb98e9', '2024-09-13', 7850),
('8478ffac-4d50-4880-8c38-7a18965a1ea9', '0211cf01-5147-4f57-b654-06c2dacb98e9', '2024-09-09', 7777),
('b9548cf5-72f2-4f25-a114-6e29bb1415dc', '0211cf01-5147-4f57-b654-06c2dacb98e9', '2024-09-15', 12000),
('c7758a65-8dd2-4978-803e-90a2403d5a50', '0a48eefb-4b02-4bf9-b239-13269c3cb7ef', '2024-09-09', 25670),
('cc6b4e45-9a28-45a9-9f56-10d43aa47891', '0211cf01-5147-4f57-b654-06c2dacb98e9', '2024-09-06', 20000),
('cd68fc72-940a-4b91-9f1a-df7aa168ffdd', '0a48eefb-4b02-4bf9-b239-13269c3cb7ef', '2024-09-02', 2324),
('d733694f-9c17-415e-acd4-353d55236d48', '0a48eefb-4b02-4bf9-b239-13269c3cb7ef', '2024-09-05', 5600),
('e342765e-cb5b-4a9d-8e8f-ccd6d6b5fb03', '0211cf01-5147-4f57-b654-06c2dacb98e9', '2024-09-12', 14500),
('e69e7398-7b6a-494d-a080-969bb07bce59', '0211cf01-5147-4f57-b654-06c2dacb98e9', '2024-09-16', 5000);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `ID` varchar(40) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `passwd` varchar(40) NOT NULL,
  `role` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`ID`, `name`, `email`, `passwd`, `role`) VALUES
('0211cf01-5147-4f57-b654-06c2dacb98e9', 'feri', 'feri@gmail.com', '5503054db09108585089953a43a4b84856b9dff2', 'admin'),
('0a48eefb-4b02-4bf9-b239-13269c3cb7ef', 'Kovács Béla', 'bela@gmail.com', '5ea345ab330cf29f81d8de9bf5466f508fe351e1', 'user'),
('0e1f7b0d-f9c7-4bcd-a7cc-5ebfcbb083d6', 'Jani', 'jani@gmail.com', '5ea345ab330cf29f81d8de9bf5466f508fe351e1', 'user'),
('19e10134-7eb8-4bda-876c-00efd674fc86', 'Sanyi', 'sanyi@gmail.com', '5503054db09108585089953a43a4b84856b9dff2', 'user'),
('2cbc29f6-dca3-4e0f-8ee0-d648e5bee2b3', 'Balázs', 'balazs@gmail.com', '5ea345ab330cf29f81d8de9bf5466f508fe351e1', 'user'),
('3dce6566-69c0-4539-98fd-5acffde2dffb', 'Éva', 'eva@gmail.com', '5ea345ab330cf29f81d8de9bf5466f508fe351e1', 'user'),
('5703ee58-feec-4975-9f9c-c724cdc304bf', 'Lajos', 'lali@gmail.com', 'cd4dbbea57559ce882ba146f53ccf0fcf96bdeba', 'user'),
('e14f1737-a67c-4c05-b2dd-71e30e9c5326', 'Laci', 'laci@gmail.com', '5503054db09108585089953a43a4b84856b9dff2', 'admin');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `stepdatas`
--
ALTER TABLE `stepdatas`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `userID` (`userID`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`);

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `stepdatas`
--
ALTER TABLE `stepdatas`
  ADD CONSTRAINT `stepdatas_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
