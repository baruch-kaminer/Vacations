-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 26, 2023 at 11:43 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacations`
--
CREATE DATABASE IF NOT EXISTS `ndi3t2ozk5n1pkel` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `ndi3t2ozk5n1pkel`;

-- --------------------------------------------------------

--
-- Table structure for table `followvacation`
--

CREATE TABLE `followvacation` (
  `followId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `followvacation`
--

INSERT INTO `followvacation` (`followId`, `userId`, `vacationId`) VALUES
(290, 1, 36),
(292, 1, 33),
(293, 1, 35),
(294, 1, 21);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(20) NOT NULL,
  `lastName` varchar(20) NOT NULL,
  `userName` varchar(30) NOT NULL,
  `password` varchar(500) NOT NULL,
  `role` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `userName`, `password`, `role`) VALUES
(1, 'user', 'user', 'user', '8880d7ecc4e035df0bf2da2a792de0d9ba5b675d49e9a59c4be62dffa94d0075fa7adbfd303b7e61913dd10af0f58ef0a9bcb3fc96e4d65a0785b8e7fd0494ba', 'User'),
(2, 'admin', 'admin', 'admin', '71a553840b86ac9d97956dc03246a3776dd7ea9609b4f7fb7a7f98b33898e360146cc3c14fe2ff0d37ed43b57521deae3514f7a3af86932ae4a2a32005d127a9', 'Admin');

-- --------------------------------------------------------

--
-- Table structure for table `vacation`
--

CREATE TABLE `vacation` (
  `vacationId` int(11) NOT NULL,
  `description` varchar(500) NOT NULL,
  `destination` varchar(40) NOT NULL,
  `imageName` varchar(100) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` int(11) NOT NULL,
  `amountFollowers` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `vacation`
--

INSERT INTO `vacation` (`vacationId`, `description`, `destination`, `imageName`, `startDate`, `endDate`, `price`, `amountFollowers`) VALUES
(14, 'Join the special vacation in Paris, France!', 'Paris, France', 'c2b81b77-c70e-40b6-8a0b-5155d21c9121.jpg', '2023-05-14', '2023-05-22', 3200, 7),
(20, 'A dream vacation at a high level, sign now!', 'Athens, Greece', 'c06ca275-d273-4426-a84e-e57bafd48ebe.jpg', '2023-10-23', '2023-09-05', 2800, 5),
(21, 'Join the special vacation in New Delhi, India!', 'New Delhi, India', '92bf399b-d5e1-4f6a-8a82-64883126b2b8.jpg', '2023-04-03', '2023-04-27', 4200, 5),
(31, 'A dream vacation at a high level, sign now!', 'Barcelona, Spain', '15d1e350-dd0a-47b4-a96b-a7b4db4d4797.jpg', '2023-03-07', '2023-03-15', 1500, 8),
(32, 'Paradise vacation in Thailand Philippines', 'Thailand, Philippine', '7b10b40b-0505-4c41-9bbd-6befd47d90fc.jpg', '2023-06-18', '2023-07-05', 4300, 6),
(33, 'A special vacation you won\'t forget!', 'Cairo, Egypt', 'a2138dfd-1cba-49af-bb41-6f7248a9f73c.jpg', '2023-09-04', '2023-09-12', 1200, 1),
(34, 'Join us for an unforgettable vacation!', 'las-vegas, usa', 'bcaf9f4b-f04d-4290-adfe-cdd94b41c4af.jpg', '2023-03-21', '2023-04-10', 5500, 0),
(35, 'Join the special vacation in Switzerland!', 'Switzerland', '4742b0bc-1903-41ea-bbf2-386af8708fa9.jpg', '2023-03-19', '2023-03-31', 2600, 1),
(36, 'Sign up for the real vacation to Rome in Italy', 'Rome, Italy', 'ddd43684-280d-4122-9ccd-f560ae3c5c9b.jpg', '2023-04-21', '2023-04-26', 3000, 1),
(37, 'A dream vacation at a high level, sign now!', 'Dubai, uae', '693766f1-13dc-448a-8ea1-46526f475537.jpg', '2023-05-14', '2023-06-05', 6200, 0),
(38, 'Special vacation at Los Angeles, Usa', 'Los Angeles, usa', '2dacdca8-8e42-4586-b9e3-f212f075f183.jpg', '2023-07-10', '2023-07-25', 4500, 0),
(39, 'Holy Vacation in the Holy City of Jerusalem', 'Jerusalem, israel', '0ea7963b-5dd1-43d5-863a-abd43d7a2357.jpg', '2023-03-01', '2023-02-08', 3000, 0),
(40, 'Join the special vacation in Amsterdam!', 'Amsterdam, Netherlands', '6a00a299-7a19-4a6b-a108-a436ec2dee5d.jpg', '2023-05-13', '2023-05-24', 3600, 1),
(41, 'A special vacation you won\'t forget!', 'New York, usa', 'a7ad7b40-ea39-4e3e-bdac-bdf30caf9fb0.jpg', '2023-04-09', '2023-04-26', 4500, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followvacation`
--
ALTER TABLE `followvacation`
  ADD PRIMARY KEY (`followId`),
  ADD KEY `userId` (`userId`),
  ADD KEY `vacationId` (`vacationId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- Indexes for table `vacation`
--
ALTER TABLE `vacation`
  ADD PRIMARY KEY (`vacationId`),
  ADD KEY `followers` (`amountFollowers`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `followvacation`
--
ALTER TABLE `followvacation`
  MODIFY `followId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=298;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `vacation`
--
ALTER TABLE `vacation`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followvacation`
--
ALTER TABLE `followvacation`
  ADD CONSTRAINT `followvacation_ibfk_2` FOREIGN KEY (`vacationId`) REFERENCES `vacation` (`vacationId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followvacation_ibfk_3` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
