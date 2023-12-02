-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 02, 2023 at 03:27 AM
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
-- Database: `scopecliq_v1`
--

-- --------------------------------------------------------

--
-- Table structure for table `deliverables`
--

CREATE TABLE `deliverables` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `project_id` bigint(20) UNSIGNED NOT NULL,
  `milestone_id` bigint(20) UNSIGNED NOT NULL,
  `position` int(11) NOT NULL,
  `description` text NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'not_started',
  `datetime_started` datetime DEFAULT NULL,
  `datetime_completed` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `deliverables`
--

INSERT INTO `deliverables` (`id`, `project_id`, `milestone_id`, `position`, `description`, `status`, `datetime_started`, `datetime_completed`, `created_at`, `updated_at`) VALUES
(1, 2, 1, 0, 'Contract signing', 'COMPLETE', '2023-06-15 06:30:00', '2023-06-16 06:30:00', NULL, NULL),
(2, 2, 2, 0, 'Mooboard', 'COMPLETE', '2023-06-15 06:30:00', '2023-06-16 06:30:00', NULL, NULL),
(3, 2, 2, 1, 'Study Concepts and Logo options. Lorem ipsum dolor sit amet.', 'COMPLETE', '2023-06-18 06:30:00', '2023-06-20 06:30:00', NULL, NULL),
(4, 2, 2, 2, 'Editing incomplete deliverable. Ongoing deliverable with images. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,', 'COMPLETE', '2023-06-18 06:30:00', '2023-06-20 06:30:00', NULL, NULL),
(5, 2, 2, 3, 'Cancelled deliverable', 'COMPLETE', '2023-06-18 06:30:00', '2023-06-20 06:30:00', NULL, NULL),
(6, 2, 3, 0, 'Wireframes', 'INCOMPLETE', '2023-06-18 06:30:00', '2023-06-20 06:30:00', NULL, NULL),
(7, 2, 3, 1, 'User interface and component mockups', 'COMPLETE', '2023-06-18 06:30:00', '2023-06-20 06:30:00', NULL, NULL),
(8, 2, 3, 2, 'Protoype', 'INCOMPLETE', '2023-06-18 06:30:00', '2023-06-20 06:30:00', NULL, NULL),
(9, 2, 4, 0, 'Market, competition, and demography research', 'INCOMPLETE', '2023-06-18 06:30:00', '2023-06-20 06:30:00', NULL, NULL),
(10, 2, 4, 1, 'Setup of marketing channels: Facebook, LinkedIn, Instagram, Tiktok,', 'INCOMPLETE', '2023-06-18 06:30:00', '2023-06-20 06:30:00', NULL, NULL),
(11, 2, 4, 2, 'Google analytics setup', 'INCOMPLETE', '2023-06-18 06:30:00', '2023-06-20 06:30:00', NULL, NULL),
(12, 1, 5, 0, 'Survey and Planning', 'COMPLETE', '2023-06-15 06:30:00', '2023-06-16 06:30:00', NULL, NULL),
(13, 1, 5, 1, 'Approval', 'COMPLETE', '2023-06-15 06:30:00', '2023-06-16 06:30:00', NULL, NULL),
(14, 1, 5, 2, 'Backend', 'COMPLETE', '2023-06-15 06:30:00', '2023-06-16 06:30:00', NULL, NULL),
(15, 1, 6, 0, 'Brief + Project Plan', 'COMPLETE', '2023-06-15 06:30:00', '2023-06-16 06:30:00', NULL, NULL),
(16, 1, 6, 1, 'Study Concepts, Branding', 'INCOMPLETE', '2023-06-18 06:30:00', '2023-06-20 06:30:00', NULL, NULL),
(17, 1, 6, 2, 'SEO Strategy', 'INCOMPLETE', '2023-06-18 06:30:00', '2023-06-20 06:30:00', NULL, NULL),
(18, 1, 6, 3, 'Google Ads', 'COMPLETE', '2023-06-18 06:30:00', '2023-06-20 06:30:00', NULL, NULL),
(19, 1, 6, 3, 'Social Media Ads', 'INCOMPLETE', '2023-06-18 06:30:00', '2023-06-20 06:30:00', NULL, NULL),
(20, 1, 7, 0, 'Packaging', 'INCOMPLETE', '2023-06-18 06:30:00', '2023-06-20 06:30:00', NULL, NULL),
(21, 1, 7, 1, 'Product Distribution', 'INCOMPLETE', '2023-06-18 06:30:00', '2023-06-20 06:30:00', NULL, NULL),
(22, 5, 8, 0, 'Define requirements and objectives', 'COMPLETE', '2023-06-18 06:30:00', '2023-06-20 06:30:00', NULL, NULL),
(23, 5, 8, 1, 'Identify key features such as order management, route optimization, real-time tracking, reporting, user management, and more.', 'COMPLETE', '2023-06-18 06:30:00', '2023-06-20 06:30:00', NULL, NULL),
(24, 5, 8, 2, 'Consider scalability, security, and user experience.', 'COMPLETE', '2023-06-18 06:30:00', '2023-06-20 06:30:00', NULL, NULL),
(25, 5, 9, 0, 'Consider scalability, security, and user experience.', 'COMPLETE', '2023-06-18 06:30:00', '2023-06-20 06:30:00', NULL, NULL),
(26, 5, 9, 1, 'Database design', 'COMPLETE', '2023-06-18 06:30:00', '2023-06-20 06:30:00', NULL, NULL),
(27, 5, 9, 2, 'Design the database schema to store information about orders, drivers, vehicles, routes, and other relevant data. Implement a relational database (e.g., MySQL, PostgreSQL) for data storage.', 'COMPLETE', '2023-06-18 06:30:00', '2023-06-20 06:30:00', NULL, NULL),
(28, 5, 9, 3, 'Implement user authentication and authorization mechanisms', 'COMPLETE', '2023-06-18 06:30:00', '2023-06-20 06:30:00', NULL, NULL),
(29, 5, 9, 4, 'Implement a system for managing cargo orders.', 'COMPLETE', '2023-06-18 06:30:00', '2023-06-20 06:30:00', NULL, NULL),
(30, 5, 10, 0, 'Allow users to place, modify, and track orders', 'COMPLETE', '2023-06-18 06:30:00', '2023-06-20 06:30:00', NULL, NULL),
(31, 5, 10, 1, 'Route optimization', 'COMPLETE', '2023-06-18 06:30:00', '2023-06-20 06:30:00', NULL, NULL),
(32, 5, 10, 2, 'Provide a user interface for customers and administrators to track shipments', 'COMPLETE', '2023-06-18 06:30:00', '2023-06-20 06:30:00', NULL, NULL),
(33, 2, 11, 0, 'All hands meeting', 'INCOMPLETE', '2023-06-18 06:30:00', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `invoices`
--

CREATE TABLE `invoices` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `project_id` bigint(20) UNSIGNED NOT NULL,
  `milestone_id` bigint(20) UNSIGNED NOT NULL,
  `total` decimal(20,2) NOT NULL,
  `datetime_generated` datetime NOT NULL,
  `datetime_paid` datetime DEFAULT NULL,
  `datetime_void` datetime DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `payment_id` varchar(255) DEFAULT NULL,
  `payment_method` varchar(255) DEFAULT NULL,
  `payment_client_secret` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `invoices`
--

INSERT INTO `invoices` (`id`, `project_id`, `milestone_id`, `total`, `datetime_generated`, `datetime_paid`, `datetime_void`, `notes`, `payment_id`, `payment_method`, `payment_client_secret`, `created_at`, `updated_at`) VALUES
(1, 2, 1, '0.00', '2023-06-12 14:30:00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(2, 2, 2, '10150.00', '2023-06-12 14:30:00', '2023-07-17 00:00:00', NULL, NULL, NULL, NULL, 'PI_3OGW5ICUUD2E5VCQ06DWOUCX', NULL, NULL),
(3, 1, 5, '44000.00', '2023-06-12 14:30:00', '2023-11-11 00:00:00', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(4, 5, 8, '1260.00', '2023-08-10 00:00:00', '2023-08-12 00:00:00', NULL, NULL, NULL, NULL, 'PI_3OGW5ICUUD2E5VCQ06DZZZZZZ', NULL, NULL),
(5, 5, 9, '1680.00', '2023-09-10 00:00:00', '2023-10-10 10:00:00', NULL, NULL, NULL, NULL, 'PI_3OGW5ICUUD2E5VCQ06DYYYYYY', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(4, '2023_10_02_044611_create_organizations_table', 1),
(5, '2023_10_02_044618_create_projects_table', 1),
(6, '2023_10_02_044701_create_milestones_table', 1),
(7, '2023_10_02_044728_create_deliverables_table', 1),
(8, '2023_10_15_034015_create_notifications_table', 1),
(9, '2023_11_07_012207_create_invoices_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `milestones`
--

CREATE TABLE `milestones` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `project_id` bigint(20) UNSIGNED NOT NULL,
  `position` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `budget_percentage` int(11) NOT NULL,
  `status_completion` varchar(255) DEFAULT NULL,
  `status_invoice` varchar(255) DEFAULT NULL,
  `datetime_started` datetime DEFAULT NULL,
  `datetime_completed` datetime DEFAULT NULL,
  `datetime_due` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `milestones`
--

INSERT INTO `milestones` (`id`, `project_id`, `position`, `name`, `description`, `budget_percentage`, `status_completion`, `status_invoice`, `datetime_started`, `datetime_completed`, `datetime_due`, `created_at`, `updated_at`) VALUES
(1, 2, 0, 'Negotiation', 'The consistent theme / image you want in your consumer’s mind.', 0, 'COMPLETE', 'PAID', '2023-06-12 14:30:00', NULL, NULL, NULL, NULL),
(2, 2, 1, 'Branding', 'The consistent theme / image you want in your consumer’s mind.', 25, 'COMPLETE', 'SENT', '2023-06-12 14:30:00', NULL, '2023-10-30 00:00:00', NULL, NULL),
(3, 2, 2, 'Website', 'Best way possible leads can reach out. Home for articles and resources we can provide client.', 45, 'ONGOING', NULL, '2023-09-01 14:30:00', NULL, '2023-11-15 00:00:00', NULL, NULL),
(4, 2, 3, 'Digital Marketing Strategy and Setup', 'Research. Marketing Plan. Corporate versus Personal Branding. Setup and Implementation.', 25, 'PENDING', NULL, NULL, NULL, NULL, NULL, NULL),
(5, 1, 0, 'Website', 'Best way possible leads can reach out. Home for articles and resources we can provide client.', 50, 'COMPLETE', NULL, '2023-09-01 14:30:00', NULL, '2024-12-20 00:00:00', NULL, NULL),
(6, 1, 1, 'Digital Marketing', 'Research. Marketing Plan. Corporate versus Personal Branding. Setup and Implementation.', 25, 'ONGOING', NULL, NULL, NULL, NULL, NULL, NULL),
(7, 1, 1, 'On Field Marketing', 'Distribution of branding on the floor', 25, 'PENDING', NULL, NULL, NULL, '2024-02-28 00:00:00', NULL, NULL),
(8, 5, 0, 'Geographic Research', 'Define requirements and objectives', 30, 'COMPLETE', NULL, NULL, NULL, '2023-05-28 00:00:00', NULL, NULL),
(9, 5, 1, 'Technical Architecture', 'Choose a technology stack (programming language, database, framework).\n                Design the system architecture, considering scalability and performance.', 40, 'COMPLETE', NULL, NULL, NULL, '2023-06-28 00:00:00', NULL, NULL),
(10, 5, 2, 'Mobile Applications', 'Develop mobile applications for drivers and customers to facilitate order management and tracking.', 30, 'COMPLETE', NULL, NULL, NULL, '2023-08-28 00:00:00', NULL, NULL),
(11, 2, 5, 'Retrospective', 'Post mortem of project completion', 5, 'PENDING', NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `receiver_type` int(11) NOT NULL DEFAULT 0,
  `project_id` int(11) NOT NULL,
  `milestone_id` bigint(20) UNSIGNED DEFAULT NULL,
  `deliverable_id` bigint(20) UNSIGNED DEFAULT NULL,
  `type` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `extra` text DEFAULT NULL,
  `client_read_at` datetime DEFAULT NULL,
  `consultant_read_at` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `receiver_type`, `project_id`, `milestone_id`, `deliverable_id`, `type`, `status`, `description`, `extra`, `client_read_at`, `consultant_read_at`, `created_at`, `updated_at`) VALUES
(1, 0, 2, 3, 7, 'STATUS_UPDATE', 'COMPLETE', 'Market, competition, and demography research', 'This is done, thanks for your help.', NULL, NULL, '2023-12-01 08:00:00', NULL),
(2, 0, 2, 1, NULL, 'INVOICE', 'SENT', 'Negotiation', NULL, NULL, NULL, '2023-12-01 08:00:00', NULL),
(3, 0, 2, 1, 2, 'STATUS_UPDATE', 'COMPLETE', 'Moodboard', NULL, NULL, NULL, '2023-12-01 08:00:00', NULL),
(4, 0, 2, 2, 5, 'STATUS_UPDATE', 'INCOMPLETE', 'Wireframe', 'Please recreate', NULL, NULL, '2023-12-01 08:00:00', NULL),
(5, 0, 2, 11, NULL, 'CHANGE', 'CREATED', 'Retrospective', '', NULL, NULL, '2023-12-01 08:00:00', NULL),
(6, 0, 2, 11, 33, 'CHANGE', 'CREATED', 'All hand meeting', '', NULL, NULL, '2023-12-01 08:00:00', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `organizations`
--

CREATE TABLE `organizations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `organization_name` varchar(255) NOT NULL,
  `contact_name` varchar(255) NOT NULL,
  `contact_number` varchar(255) NOT NULL,
  `contact_email` varchar(255) NOT NULL,
  `contact_about` text NOT NULL,
  `organization_logo` varchar(255) DEFAULT NULL,
  `organization_address` text DEFAULT NULL,
  `consultant_user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `organizations`
--

INSERT INTO `organizations` (`id`, `organization_name`, `contact_name`, `contact_number`, `contact_email`, `contact_about`, `organization_logo`, `organization_address`, `consultant_user_id`, `created_at`, `updated_at`) VALUES
(1, 'Estilo Decada', 'Kevin Rizal', '+1 234 567 8901', 'rizalk@estilodecada.ca', 'Head Contractor at Estilo Decada', NULL, '2945 Jacklin Rd #406, Victoria, British Columbia, V9B 5E3, Canada', NULL, NULL, NULL),
(2, 'Julia Studios', 'Julia Evers', '+63 234 567 8901', 'director@juliastudios.com', 'Julia Studios est 1992', 'https://res.cloudinary.com/dtvsn2pru/image/upload/v1701369706/kxvnvsey2gfucxdyo6pq.jpg', '2200 Eagle St, Cambridge, Ontario, N3H 0A1, Canada', NULL, NULL, NULL),
(3, 'Stationery Company', 'Angela Sharma', '+1 234 567 8901', 'angela@office.com', 'Accounts Manager', NULL, '2945 Jacklin Rd #406, Victoria, British Columbia, V9B 5E3, Canada', NULL, NULL, NULL),
(4, 'Douglas Devs', 'Douglas Antonov', '+63 234 567 8901', 'doug@douglasdevs.io', 'Founder', 'https://pbs.twimg.com/profile_images/1717259548569075712/X0Up3325_400x400.jpg', '700 Royal Ave, New Westminster, BC V3M 5Z5', 1, NULL, NULL),
(5, 'Webcrafter Inc', 'Emmanuelle McRunners', '+1 001 002 3456', 'web@webcrafterinc.com', 'Director', 'https://webcrafterinc.com/img/brand/webcrafter-logo.png', '700 Royal Ave, New Westminster, BC V3M 5Z5', 2, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `consultant_user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `organization_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `about` text DEFAULT NULL,
  `budget` decimal(20,2) NOT NULL,
  `portal_domain` varchar(255) NOT NULL,
  `portal_password` varchar(255) NOT NULL,
  `terms` text DEFAULT NULL,
  `datetime_due` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `consultant_user_id`, `organization_id`, `name`, `about`, `budget`, `portal_domain`, `portal_password`, `terms`, `datetime_due`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'WaveKo Surf Lounge', 'Design and build of resort villa', '88000.00', 'waveko', 'beach', 'Text Content - All content material (copy, product images and details, etc)  is to be provided by the client. Should more content be needed, we can arrange for Content Creation to complete missing pieces of the website. (*See add-ons)\n\nImages - We primarily use images provided by clients. Additionally, we are free to use CC0 License images (a.k.a. Free License Images ) available online.\n\nRequests and revisions - Realistically, revisions are always part of any design process which is why revision rounds are allotted to the project. Once designs are approved and implemented on the website and/or when allotted revisions are exhausted, additional requests will be billed separately at  regular hourly rate. Itemized invoice of revision work order will be issued for your approval before we proceed.\n\nWhat is minor and major revision? Moving photos and text around the page and changing colors mean we are doing layout changes and that\'s a major revision. However, changing a short text phrase here and there is a minor revision.\n    3 revisions max for homepage\n    2 revisions max for template-pages\n    1 revision per regular page\n\nTechnical Support and Website Care - Technical support and minor troubleshooting. Should you need substantial amount of regular posting of products and other content, feel free to check the addons.', '2023-12-15 00:00:00', NULL, NULL),
(2, 1, 2, 'Siesta Farm and Restaurant', 'Markekting package. Farm to table artisinal easy dining', '40600.00', 'siesta', 'pizza', 'Text Content - All content material (copy, product images and details, etc)  is to be provided by the client. Should more content be needed, we can arrange for Content Creation to complete missing pieces of the website. (*See add-ons)\n\nImages - We primarily use images provided by clients. Additionally, we are free to use CC0 License images (a.k.a. Free License Images ) available online.\n\nRequests and revisions - Realistically, revisions are always part of any design process which is why revision rounds are allotted to the project. Once designs are approved and implemented on the website and/or when allotted revisions are exhausted, additional requests will be billed separately at  regular hourly rate. Itemized invoice of revision work order will be issued for your approval before we proceed.\n\nWhat is minor and major revision? Moving photos and text around the page and changing colors mean we are doing layout changes and that\'s a major revision. However, changing a short text phrase here and there is a minor revision.\n    3 revisions max for homepage\n    2 revisions max for template-pages\n    1 revision per regular page\n\nTechnical Support and Website Care - Technical support and minor troubleshooting. Should you need substantial amount of regular posting of products and other content, feel free to check the addons.', NULL, NULL, NULL),
(3, 1, 3, 'Lettered Leather', 'Markating package. Local leathered goods', '8000.00', 'lettered-leather', 'luna', 'Text Content - All content material (copy, product images and details, etc)  is to be provided by the client. Should more content be needed, we can arrange for Content Creation to complete missing pieces of the website. (*See add-ons)\n\nImages - We primarily use images provided by clients. Additionally, we are free to use CC0 License images (a.k.a. Free License Images ) available online.\n\nRequests and revisions - Realistically, revisions are always part of any design process which is why revision rounds are allotted to the project. Once designs are approved and implemented on the website and/or when allotted revisions are exhausted, additional requests will be billed separately at  regular hourly rate. Itemized invoice of revision work order will be issued for your approval before we proceed.\n\nWhat is minor and major revision? Moving photos and text around the page and changing colors mean we are doing layout changes and that\'s a major revision. However, changing a short text phrase here and there is a minor revision.\n    3 revisions max for homepage\n    2 revisions max for template-pages\n    1 revision per regular page\n\nTechnical Support and Website Care - Technical support and minor troubleshooting. Should you need substantial amount of regular posting of products and other content, feel free to check the addons.', '2023-12-25 00:00:00', NULL, NULL),
(4, 1, 2, 'TechMate', 'Mobile App', '8000.00', 'techmate', 'luna', 'Text Content - All content material (copy, product images and details, etc)  is to be provided by the client. Should more content be needed, we can arrange for Content Creation to complete missing pieces of the website. (*See add-ons)\n\nImages - We primarily use images provided by clients. Additionally, we are free to use CC0 License images (a.k.a. Free License Images ) available online.\n\nRequests and revisions - Realistically, revisions are always part of any design process which is why revision rounds are allotted to the project. Once designs are approved and implemented on the website and/or when allotted revisions are exhausted, additional requests will be billed separately at  regular hourly rate. Itemized invoice of revision work order will be issued for your approval before we proceed.\n\nWhat is minor and major revision? Moving photos and text around the page and changing colors mean we are doing layout changes and that\'s a major revision. However, changing a short text phrase here and there is a minor revision.\n    3 revisions max for homepage\n    2 revisions max for template-pages\n    1 revision per regular page\n\nTechnical Support and Website Care - Technical support and minor troubleshooting. Should you need substantial amount of regular posting of products and other content, feel free to check the addons.', '2023-11-29 00:00:00', NULL, NULL),
(5, 1, 2, 'Truck Flow Digital', 'Logistic system', '4200.00', 'truckflow', 'bobcat', 'Text Content - All content material (copy, product images and details, etc)  is to be provided by the client. Should more content be needed, we can arrange for Content Creation to complete missing pieces of the website. (*See add-ons)\n\nImages - We primarily use images provided by clients. Additionally, we are free to use CC0 License images (a.k.a. Free License Images ) available online.\n\nRequests and revisions - Realistically, revisions are always part of any design process which is why revision rounds are allotted to the project. Once designs are approved and implemented on the website and/or when allotted revisions are exhausted, additional requests will be billed separately at  regular hourly rate. Itemized invoice of revision work order will be issued for your approval before we proceed.\n\nWhat is minor and major revision? Moving photos and text around the page and changing colors mean we are doing layout changes and that\'s a major revision. However, changing a short text phrase here and there is a minor revision.\n    3 revisions max for homepage\n    2 revisions max for template-pages\n    1 revision per regular page\n\nTechnical Support and Website Care - Technical support and minor troubleshooting. Should you need substantial amount of regular posting of products and other content, feel free to check the addons.', '2023-09-01 00:00:00', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Douglas Dev', 'doug@douglasdevs.com', NULL, '$2y$10$ePeR9rh9pEIqlHL7LM0BnuESGMjUIMiEXp37SqoN9bwe2jcMWF6BK', NULL, NULL, NULL),
(2, 'Emmanuelle McRunners', 'web@webcrafterinc.com', NULL, '$2y$10$zv21Uy3QzuImfvsZVsSWc.IFML8whlaXdOSudPjKGn7vzgWTpSdPS', NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `deliverables`
--
ALTER TABLE `deliverables`
  ADD PRIMARY KEY (`id`),
  ADD KEY `deliverables_project_id_foreign` (`project_id`),
  ADD KEY `deliverables_milestone_id_foreign` (`milestone_id`);

--
-- Indexes for table `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `invoices_project_id_foreign` (`project_id`),
  ADD KEY `invoices_milestone_id_foreign` (`milestone_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `milestones`
--
ALTER TABLE `milestones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `milestones_project_id_foreign` (`project_id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `organizations`
--
ALTER TABLE `organizations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `organizations_contact_email_unique` (`contact_email`),
  ADD KEY `organizations_consultant_user_id_foreign` (`consultant_user_id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `projects_portal_domain_unique` (`portal_domain`),
  ADD KEY `projects_consultant_user_id_foreign` (`consultant_user_id`),
  ADD KEY `projects_organization_id_foreign` (`organization_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `deliverables`
--
ALTER TABLE `deliverables`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `invoices`
--
ALTER TABLE `invoices`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `milestones`
--
ALTER TABLE `milestones`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `organizations`
--
ALTER TABLE `organizations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `deliverables`
--
ALTER TABLE `deliverables`
  ADD CONSTRAINT `deliverables_milestone_id_foreign` FOREIGN KEY (`milestone_id`) REFERENCES `milestones` (`id`),
  ADD CONSTRAINT `deliverables_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`);

--
-- Constraints for table `invoices`
--
ALTER TABLE `invoices`
  ADD CONSTRAINT `invoices_milestone_id_foreign` FOREIGN KEY (`milestone_id`) REFERENCES `milestones` (`id`),
  ADD CONSTRAINT `invoices_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`);

--
-- Constraints for table `milestones`
--
ALTER TABLE `milestones`
  ADD CONSTRAINT `milestones_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`);

--
-- Constraints for table `organizations`
--
ALTER TABLE `organizations`
  ADD CONSTRAINT `organizations_consultant_user_id_foreign` FOREIGN KEY (`consultant_user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `projects`
--
ALTER TABLE `projects`
  ADD CONSTRAINT `projects_consultant_user_id_foreign` FOREIGN KEY (`consultant_user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `projects_organization_id_foreign` FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
