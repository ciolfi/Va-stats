-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql.vastats.dreamhosters.com
-- Generation Time: Apr 30, 2023 at 08:35 AM
-- Server version: 8.0.28-0ubuntu0.20.04.3
-- PHP Version: 7.4.3-4ubuntu2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `visionaid1`
--

-- --------------------------------------------------------

--
-- Table structure for table `vabatches`
--

CREATE TABLE `vabatches` (
  `id` smallint NOT NULL,
  `coursename` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `batch` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `coursestart` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `courseend` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `coursedays` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `coursetimes` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `instructor` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `PM` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `TA` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `cost` int NOT NULL,
  `trainingmode` enum('VIRTUAL','IN-PERSON','SELF-PACED') COLLATE utf8mb4_general_ci NOT NULL,
  `status` enum('UNSTARTED','ONGOING','COMPLETE') COLLATE utf8mb4_general_ci NOT NULL,
  `currency` enum('INR','USD') COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vabatches`
--

INSERT INTO `vabatches` (`id`, `coursename`, `batch`, `coursestart`, `courseend`, `coursedays`, `coursetimes`, `instructor`, `PM`, `TA`, `cost`, `trainingmode`, `status`, `currency`) VALUES
(105, 'PHP', 'HTR4532', '2023-03-30', '2023-06-01', 'Th', '08:00', 'Ciolfi', 'Ciolfi', '', 10, 'IN-PERSON', 'UNSTARTED', 'INR'),
(129, 'CCA', 'CCA0123', '2023-04-14', '2023-07-13', 'MTWThF', '10:00 - 12:00', 'Satish', '', '', 0, 'IN-PERSON', 'UNSTARTED', 'INR');

-- --------------------------------------------------------

--
-- Table structure for table `vacourses`
--

CREATE TABLE `vacourses` (
  `id` smallint NOT NULL,
  `course` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `duration` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `duration_type` enum('Weeks','Months') COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacourses`
--

INSERT INTO `vacourses` (`id`, `course`, `description`, `duration`, `duration_type`) VALUES
(1, 'python', 'Learn basics of Python language', '3 months', 'Months'),
(2, 'C', 'Learn basics of C', '6 months', 'Months'),
(3, 'C++', 'Learn C++', '6 months', 'Months'),
(10, 'CCA', 'Computer Applications', '3 months', 'Months'),
(13, 'PHP', '', '3', 'Months');

-- --------------------------------------------------------

--
-- Table structure for table `vastudents`
--

CREATE TABLE `vastudents` (
  `id` int NOT NULL,
  `email` varchar(35) NOT NULL,
  `name` varchar(35) NOT NULL,
  `simg` blob,
  `phone_number` varchar(15) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `gender` varchar(30) DEFAULT NULL,
  `age` varchar(50) DEFAULT NULL,
  `edu_qualifications` text NOT NULL,
  `courses` text NOT NULL,
  `location` varchar(80) DEFAULT NULL,
  `objectives` varchar(250) DEFAULT NULL,
  `vision_impairment` varchar(250) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `usable_vision` varchar(250) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `total_vision_loss` varchar(250) DEFAULT NULL,
  `source` varchar(80) DEFAULT NULL,
  `is_qualified` tinyint(1) NOT NULL,
  `registration_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `vastudents`
--

INSERT INTO `vastudents` (`id`, `email`, `name`, `simg`, `phone_number`, `gender`, `age`, `edu_qualifications`, `courses`, `location`, `objectives`, `vision_impairment`, `usable_vision`, `total_vision_loss`, `source`, `is_qualified`, `registration_date`) VALUES
(76, 'theboywholived@gmail.com', 'Harry Potter', '', '1110', 'Male', '11', '', '', 'Godric\'s Hollow, England', 'Become a wizard.', 'I\'ve had really bad myopia my whole life.', 'Only up close, and not very clear', '10%', 'An owl delivered a letter to me.', 0, '0000-00-00'),
(96, 'john@gmail.com', 'Johnny like', '', '7572389382', 'Male', '29', '', '', 'Atlanta, GA', 'Learn to code', 'since five', 'so so', '35%', 'google', 0, '0000-00-00'),
(97, 'David@gmail.com', 'david johns', '', '7572389383', 'Male', '22', '', '', 'Atlanta, GA', 'program to learn', 'since four', 'somewhat', '35%', 'google', 0, '0000-00-00'),
(98, 'andrew@gmail.com', 'Andrew Bank', '', '7572389385', 'Female', '30', '', '', 'Atlanta, GA', 'programmer', 'since two', 'eh', '35%', 'google', 0, '0000-00-00'),
(99, 'chris@gmail.com', 'chris trish', '', '3879873673', 'Male', '22', '', '', 'Atlanta, GA', 'Learn to program', 'my impairment consist of', 'answer here', '20%', 'google', 0, '0000-00-00'),
(100, 'santosh.vempala@gmail.com', 'S V', '', '8579285466', 'M', '51', '', '', 'Atlanta', 'learning', 'none', '95%', '0', 'friends', 0, '0000-00-00'),
(104, 'janet@gmail.com', 'Janet', '', '9384999333', 'F', '23', '', '', 'Maharashtra', 'To make an impact', 'Test', 'Test', '32', 'Vision-Aid', 0, '0000-00-00'),
(105, 'Vaishali@gmail.com', 'Vaishali', '', '3948495849', 'F', '21', '', '', 'Gujarat', 'Test', 'Test', 'Test', '33', 'VA', 1, '0000-00-00');

-- --------------------------------------------------------

--
-- Table structure for table `vastudent_to_batch`
--

CREATE TABLE `vastudent_to_batch` (
  `id` smallint NOT NULL,
  `student_id` smallint NOT NULL,
  `batch_id` smallint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vastudent_to_batch`
--

INSERT INTO `vastudent_to_batch` (`id`, `student_id`, `batch_id`) VALUES
(151, 76, 105),
(152, 96, 105),
(153, 97, 105),
(154, 98, 105),
(155, 99, 105),
(161, 100, 105),
(164, 104, 105);

-- --------------------------------------------------------

--
-- Table structure for table `vausers`
--

CREATE TABLE `vausers` (
  `id` int NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `firstname` varchar(35) COLLATE utf8mb4_general_ci NOT NULL,
  `lastname` varchar(35) COLLATE utf8mb4_general_ci NOT NULL,
  `role` enum('ADMINISTRATOR','PM','MANAGEMENT') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'ADMINISTRATOR',
  `isactive` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vausers`
--

INSERT INTO `vausers` (`id`, `email`, `firstname`, `lastname`, `role`, `isactive`) VALUES
(1, 'piyalibaner@gmail.com', '', '', 'MANAGEMENT', 1),
(2, 'idelkh8@gmail.com', '', '', 'MANAGEMENT', 1),
(4, 'ciolfi2@gmail.com', '', '', 'MANAGEMENT', 1),
(6, 'isaacw06@gmail.com', '', '', 'MANAGEMENT', 1),
(10, 'santosh.vempala@gmail.com', '', '', 'MANAGEMENT', 1),
(30, 'vinimanoj1@gmail.com', 'Vineetha', 'Lastname', 'MANAGEMENT', 1);

-- --------------------------------------------------------

--
-- Table structure for table `va_attendance`
--

CREATE TABLE `va_attendance` (
  `id` int NOT NULL,
  `batch_id` int NOT NULL,
  `student_id` int NOT NULL,
  `date` date NOT NULL,
  `is_present` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `va_attendance`
--

INSERT INTO `va_attendance` (`id`, `batch_id`, `student_id`, `date`, `is_present`) VALUES
(1765, 105, 76, '2023-04-04', 0),
(1766, 105, 76, '2023-04-11', 0),
(1767, 105, 76, '2023-04-18', 0),
(1768, 105, 76, '2023-04-25', 0),
(1769, 105, 76, '2023-05-02', 1),
(1770, 105, 76, '2023-05-09', 0),
(1771, 105, 76, '2023-05-16', 0),
(1772, 105, 76, '2023-05-23', 0),
(1773, 105, 76, '2023-05-30', 0),
(1774, 105, 76, '2023-03-30', 0),
(1775, 105, 76, '2023-04-06', 1),
(1776, 105, 76, '2023-04-13', 0),
(1777, 105, 76, '2023-04-20', 0),
(1778, 105, 76, '2023-04-27', 0),
(1779, 105, 76, '2023-05-04', 1),
(1780, 105, 76, '2023-05-11', 0),
(1781, 105, 76, '2023-05-18', 0),
(1782, 105, 76, '2023-05-25', 0),
(1783, 105, 96, '2023-04-04', 0),
(1784, 105, 96, '2023-04-11', 0),
(1785, 105, 96, '2023-04-18', 0),
(1786, 105, 96, '2023-04-25', 0),
(1787, 105, 96, '2023-05-02', 0),
(1788, 105, 97, '2023-04-04', 0),
(1789, 105, 96, '2023-05-09', 0),
(1790, 105, 97, '2023-04-11', 0),
(1791, 105, 96, '2023-05-16', 0),
(1792, 105, 97, '2023-04-18', 0),
(1793, 105, 96, '2023-05-23', 0),
(1794, 105, 97, '2023-04-25', 0),
(1795, 105, 98, '2023-04-04', 0),
(1796, 105, 96, '2023-05-30', 0),
(1797, 105, 97, '2023-05-02', 0),
(1798, 105, 98, '2023-04-11', 0),
(1799, 105, 97, '2023-05-09', 0),
(1800, 105, 98, '2023-04-18', 0),
(1801, 105, 97, '2023-05-16', 0),
(1802, 105, 98, '2023-04-25', 0),
(1803, 105, 97, '2023-05-23', 0),
(1804, 105, 98, '2023-05-02', 0),
(1805, 105, 99, '2023-04-04', 0),
(1806, 105, 97, '2023-05-30', 0),
(1807, 105, 99, '2023-04-11', 0),
(1808, 105, 98, '2023-05-09', 0),
(1809, 105, 98, '2023-05-16', 0),
(1810, 105, 99, '2023-04-18', 0),
(1811, 105, 98, '2023-05-23', 0),
(1812, 105, 99, '2023-04-25', 0),
(1813, 105, 99, '2023-05-02', 0),
(1814, 105, 98, '2023-05-30', 0),
(1815, 105, 99, '2023-05-09', 0),
(1816, 105, 99, '2023-05-16', 0),
(1817, 105, 99, '2023-05-23', 0),
(1818, 105, 99, '2023-05-30', 0),
(1819, 105, 98, '2023-03-30', 1),
(1820, 105, 98, '2023-04-06', 1),
(1821, 105, 98, '2023-04-13', 1),
(1822, 105, 98, '2023-04-20', 1),
(1823, 105, 98, '2023-04-27', 1),
(1824, 105, 98, '2023-05-04', 1),
(1825, 105, 98, '2023-05-11', 1),
(1826, 105, 98, '2023-05-18', 1),
(1827, 105, 98, '2023-05-25', 1),
(1828, 129, 76, '2023-04-14', 0),
(1829, 129, 76, '2023-04-17', 0),
(1830, 129, 96, '2023-04-14', 0),
(1831, 129, 76, '2023-04-18', 0),
(1832, 129, 96, '2023-04-17', 0),
(1833, 129, 76, '2023-04-19', 0),
(1834, 129, 96, '2023-04-18', 0),
(1835, 129, 97, '2023-04-14', 0),
(1836, 129, 76, '2023-04-21', 0),
(1837, 129, 96, '2023-04-19', 0),
(1838, 129, 97, '2023-04-17', 0),
(1839, 129, 76, '2023-04-24', 0),
(1840, 129, 96, '2023-04-21', 0),
(1841, 129, 97, '2023-04-18', 0),
(1842, 129, 76, '2023-04-25', 0),
(1843, 129, 97, '2023-04-19', 0),
(1844, 129, 96, '2023-04-24', 0),
(1845, 129, 76, '2023-04-26', 0),
(1846, 129, 97, '2023-04-21', 0),
(1847, 129, 76, '2023-04-28', 0),
(1848, 129, 96, '2023-04-25', 0),
(1849, 129, 97, '2023-04-24', 0),
(1850, 129, 96, '2023-04-26', 0),
(1851, 129, 76, '2023-05-01', 0),
(1852, 129, 96, '2023-04-28', 0),
(1853, 129, 97, '2023-04-25', 0),
(1854, 129, 76, '2023-05-02', 0),
(1855, 129, 96, '2023-05-01', 0),
(1856, 129, 97, '2023-04-26', 0),
(1857, 129, 76, '2023-05-03', 0),
(1858, 129, 96, '2023-05-02', 0),
(1859, 129, 97, '2023-04-28', 0),
(1860, 129, 76, '2023-05-05', 0),
(1861, 129, 96, '2023-05-03', 0),
(1862, 129, 97, '2023-05-01', 0),
(1863, 129, 76, '2023-05-08', 0),
(1864, 129, 96, '2023-05-05', 0),
(1865, 129, 97, '2023-05-02', 0),
(1866, 129, 76, '2023-05-09', 0),
(1867, 129, 96, '2023-05-08', 0),
(1868, 129, 97, '2023-05-03', 0),
(1869, 129, 76, '2023-05-10', 0),
(1870, 129, 97, '2023-05-05', 0),
(1871, 129, 96, '2023-05-09', 0),
(1872, 129, 76, '2023-05-12', 0),
(1873, 129, 76, '2023-05-15', 0),
(1874, 129, 76, '2023-05-16', 0),
(1875, 129, 97, '2023-05-08', 0),
(1876, 129, 96, '2023-05-10', 0),
(1877, 129, 76, '2023-05-17', 0),
(1878, 129, 97, '2023-05-09', 0),
(1879, 129, 96, '2023-05-12', 0),
(1880, 129, 76, '2023-05-19', 0),
(1881, 129, 96, '2023-05-15', 0),
(1882, 129, 97, '2023-05-10', 0),
(1883, 129, 76, '2023-05-22', 0),
(1884, 129, 97, '2023-05-12', 0),
(1885, 129, 96, '2023-05-16', 0),
(1886, 129, 76, '2023-05-23', 0),
(1887, 129, 96, '2023-05-17', 0),
(1888, 129, 76, '2023-05-24', 0),
(1889, 129, 97, '2023-05-15', 0),
(1890, 129, 76, '2023-05-26', 0),
(1891, 129, 97, '2023-05-16', 0),
(1892, 129, 96, '2023-05-19', 0),
(1893, 129, 76, '2023-05-29', 0),
(1894, 129, 96, '2023-05-22', 0),
(1895, 129, 97, '2023-05-17', 0),
(1896, 129, 96, '2023-05-23', 0),
(1897, 129, 76, '2023-05-30', 0),
(1898, 129, 97, '2023-05-19', 0),
(1899, 129, 97, '2023-05-22', 0),
(1900, 129, 76, '2023-05-31', 0),
(1901, 129, 96, '2023-05-24', 0),
(1902, 129, 97, '2023-05-23', 0),
(1903, 129, 76, '2023-06-02', 0),
(1904, 129, 96, '2023-05-26', 0),
(1905, 129, 97, '2023-05-24', 0),
(1906, 129, 76, '2023-06-05', 0),
(1907, 129, 96, '2023-05-29', 0),
(1908, 129, 76, '2023-06-06', 0),
(1909, 129, 97, '2023-05-26', 0),
(1910, 129, 96, '2023-05-30', 0),
(1911, 129, 96, '2023-05-31', 0),
(1912, 129, 97, '2023-05-29', 0),
(1913, 129, 76, '2023-06-07', 0),
(1914, 129, 96, '2023-06-02', 0),
(1915, 129, 97, '2023-05-30', 0),
(1916, 129, 76, '2023-06-09', 0),
(1917, 129, 76, '2023-06-12', 0),
(1918, 129, 97, '2023-05-31', 0),
(1919, 129, 96, '2023-06-05', 0),
(1920, 129, 76, '2023-06-13', 0),
(1921, 129, 96, '2023-06-06', 0),
(1922, 129, 97, '2023-06-02', 0),
(1923, 129, 97, '2023-06-05', 0),
(1924, 129, 96, '2023-06-07', 0),
(1925, 129, 76, '2023-06-14', 0),
(1926, 129, 97, '2023-06-06', 0),
(1927, 129, 76, '2023-06-16', 0),
(1928, 129, 96, '2023-06-09', 0),
(1929, 129, 97, '2023-06-07', 0),
(1930, 129, 96, '2023-06-12', 0),
(1931, 129, 76, '2023-06-19', 0),
(1932, 129, 97, '2023-06-09', 0),
(1933, 129, 96, '2023-06-13', 0),
(1934, 129, 76, '2023-06-20', 0),
(1935, 129, 76, '2023-06-21', 0),
(1936, 129, 97, '2023-06-12', 0),
(1937, 129, 96, '2023-06-14', 0),
(1938, 129, 76, '2023-06-23', 0),
(1939, 129, 97, '2023-06-13', 0),
(1940, 129, 96, '2023-06-16', 0),
(1941, 129, 76, '2023-06-26', 0),
(1942, 129, 96, '2023-06-19', 0),
(1943, 129, 97, '2023-06-14', 0),
(1944, 129, 96, '2023-06-20', 0),
(1945, 129, 76, '2023-06-27', 0),
(1946, 129, 97, '2023-06-16', 0),
(1947, 129, 96, '2023-06-21', 0),
(1948, 129, 76, '2023-06-28', 0),
(1949, 129, 97, '2023-06-19', 0),
(1950, 129, 96, '2023-06-23', 0),
(1951, 129, 76, '2023-06-30', 0),
(1952, 129, 97, '2023-06-20', 0),
(1953, 129, 96, '2023-06-26', 0),
(1954, 129, 76, '2023-07-03', 0),
(1955, 129, 97, '2023-06-21', 0),
(1956, 129, 76, '2023-07-04', 0),
(1957, 129, 96, '2023-06-27', 0),
(1958, 129, 97, '2023-06-23', 0),
(1959, 129, 76, '2023-07-05', 0),
(1960, 129, 96, '2023-06-28', 0),
(1961, 129, 97, '2023-06-26', 0),
(1962, 129, 96, '2023-06-30', 0),
(1963, 129, 76, '2023-07-07', 0),
(1964, 129, 97, '2023-06-27', 0),
(1965, 129, 76, '2023-07-10', 0),
(1966, 129, 96, '2023-07-03', 0),
(1967, 129, 97, '2023-06-28', 0),
(1968, 129, 96, '2023-07-04', 0),
(1969, 129, 76, '2023-07-11', 0),
(1970, 129, 97, '2023-06-30', 0),
(1971, 129, 96, '2023-07-05', 0),
(1972, 129, 76, '2023-07-12', 0),
(1973, 129, 97, '2023-07-03', 0),
(1974, 129, 96, '2023-07-07', 0),
(1975, 129, 97, '2023-07-04', 0),
(1976, 129, 96, '2023-07-10', 0),
(1977, 129, 97, '2023-07-05', 0),
(1978, 129, 96, '2023-07-11', 0),
(1979, 129, 97, '2023-07-07', 0),
(1980, 129, 96, '2023-07-12', 0),
(1981, 129, 97, '2023-07-10', 0),
(1982, 129, 97, '2023-07-11', 0),
(1983, 129, 97, '2023-07-12', 0),
(1984, 134, 76, '2023-04-29', 0),
(1985, 134, 76, '2023-04-30', 0),
(1986, 134, 76, '2023-05-06', 0),
(1987, 134, 76, '2023-05-07', 0),
(1988, 134, 76, '2023-05-13', 0),
(1989, 134, 76, '2023-05-14', 0),
(1990, 134, 76, '2023-05-20', 0),
(1991, 134, 76, '2023-05-21', 0),
(1992, 134, 76, '2023-05-27', 0),
(1993, 105, 100, '2023-04-04', 0),
(1994, 105, 100, '2023-04-11', 0),
(1995, 105, 100, '2023-04-18', 0),
(1996, 105, 100, '2023-04-25', 0),
(1997, 105, 100, '2023-05-02', 0),
(1998, 105, 100, '2023-05-09', 0),
(1999, 105, 100, '2023-05-16', 0),
(2000, 105, 100, '2023-05-23', 0),
(2001, 105, 100, '2023-05-30', 0),
(2002, 128, 76, '2023-04-11', 0),
(2003, 128, 76, '2023-04-12', 0),
(2004, 128, 76, '2023-04-18', 0),
(2005, 128, 76, '2023-04-19', 0),
(2006, 124, 76, '2023-04-11', 0),
(2007, 124, 76, '2023-04-18', 0),
(2008, 105, 98, '2023-06-01', 1),
(2009, 105, 104, '2023-04-04', 0),
(2010, 105, 104, '2023-04-11', 0),
(2011, 105, 104, '2023-04-18', 0),
(2012, 105, 104, '2023-04-25', 0),
(2013, 105, 104, '2023-05-02', 0),
(2014, 105, 104, '2023-05-09', 0),
(2015, 105, 104, '2023-05-16', 0),
(2016, 105, 104, '2023-05-23', 0),
(2017, 105, 104, '2023-05-30', 0),
(2018, 105, 99, '2023-03-30', 1),
(2019, 105, 99, '2023-04-06', 1),
(2020, 105, 99, '2023-04-13', 1),
(2021, 105, 99, '2023-04-20', 1),
(2022, 105, 99, '2023-04-27', 1),
(2023, 105, 99, '2023-05-04', 1),
(2024, 105, 99, '2023-05-11', 1),
(2025, 105, 99, '2023-05-18', 0),
(2026, 105, 99, '2023-05-25', 1),
(2027, 105, 99, '2023-06-01', 0),
(2028, 124, 76, '2023-04-13', 0),
(2029, 124, 76, '2023-04-13', 0),
(2030, 124, 76, '2023-04-20', 1);

-- --------------------------------------------------------

--
-- Table structure for table `va_grades`
--

CREATE TABLE `va_grades` (
  `id` int NOT NULL,
  `student_id` int NOT NULL,
  `batch_id` int NOT NULL,
  `assignment_name` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `grade` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `va_grades`
--

INSERT INTO `va_grades` (`id`, `student_id`, `batch_id`, `assignment_name`, `grade`) VALUES
(220, 76, 105, 'HW2', 50),
(221, 96, 105, 'HW2', 90),
(222, 97, 105, 'HW2', 90),
(223, 98, 105, 'HW2', 100),
(224, 99, 105, 'HW2', 80),
(225, 100, 105, 'HW2', 60),
(226, 104, 105, 'HW2', 40);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `vabatches`
--
ALTER TABLE `vabatches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vacourses`
--
ALTER TABLE `vacourses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vastudents`
--
ALTER TABLE `vastudents`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vastudent_to_batch`
--
ALTER TABLE `vastudent_to_batch`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vausers`
--
ALTER TABLE `vausers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `va_attendance`
--
ALTER TABLE `va_attendance`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `va_grades`
--
ALTER TABLE `va_grades`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `vabatches`
--
ALTER TABLE `vabatches`
  MODIFY `id` smallint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=136;

--
-- AUTO_INCREMENT for table `vacourses`
--
ALTER TABLE `vacourses`
  MODIFY `id` smallint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `vastudents`
--
ALTER TABLE `vastudents`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=113;

--
-- AUTO_INCREMENT for table `vastudent_to_batch`
--
ALTER TABLE `vastudent_to_batch`
  MODIFY `id` smallint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=165;

--
-- AUTO_INCREMENT for table `vausers`
--
ALTER TABLE `vausers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `va_attendance`
--
ALTER TABLE `va_attendance`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2031;

--
-- AUTO_INCREMENT for table `va_grades`
--
ALTER TABLE `va_grades`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=227;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
