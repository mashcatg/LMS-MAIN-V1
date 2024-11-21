-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 21, 2024 at 06:42 AM
-- Server version: 10.11.9-MariaDB-cll-lve
-- PHP Version: 8.3.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ennovatc_lms`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `admin_id` bigint(20) NOT NULL,
  `admin_name` varchar(200) NOT NULL,
  `admin_number` varchar(20) NOT NULL,
  `admin_password` varchar(200) NOT NULL,
  `admin_otp` varchar(200) DEFAULT NULL,
  `admin_otp_expiry_time` datetime DEFAULT NULL,
  `admin_token` varchar(100) DEFAULT NULL,
  `admin_permissions` varchar(500) NOT NULL,
  `service_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`admin_id`, `admin_name`, `admin_number`, `admin_password`, `admin_otp`, `admin_otp_expiry_time`, `admin_token`, `admin_permissions`, `service_id`) VALUES
(1, "Mashraf", "0187", "$2y$10$xaeImqp.x48pzS4xklTSruVrRcuEf20PMKYEMGK.F5GZyC7vQ0KP6", "463128", "2024-10-04 20:30:32", "15cb2ecf35796fa5d79786e0ceaef0931d145cb0c296e1661fd92846c1728ffe", "", 61545),
(2, "", "new", "$2y$10$KX8cM0aSqnQVbR0UbOATFeUJikZ2OFnEYWhuE4ZU0Xo6vzpNBvGVm", NULL, NULL, NULL, "", 40781),
(3, "zaz", "3203202", "$2y$10$WqkLE6Ip3h3JZmsQJbSemeNmOh6.FagGxfE.wXSSc1bZEfRN53HSy", NULL, NULL, NULL, "finance,quizzes,notes,cards,attendance", 61545),
(5, "zasdad", "1202301203", "$2y$10$.nOcvENwkvJSR44Iq4EHX.MqIJG7NPTODgi3fm8YoAG4.7zwq6zgy", NULL, NULL, NULL, "notices,exams,cards,attendance,materials,routine,students", 61545),
(7, "032as0d321as3d1", "030230301", "$2y$10$x72AROTabwOHQY/6OOOup.FxV6PhxfvIqbjDq72KGciTfO8HRcvWq", NULL, NULL, NULL, "notices,quizzes,students,attendance,routine,cards,materials,sms,admins,exams", 61545),
(26, "Mash", "8801724373117", "$2y$10$3xgdNnXF9pJksznHToKaWe0jLVeZTNbtlvnQe8QCqubshg/9.MXxu", NULL, NULL, NULL, "finance,courses,notices,class,live-class,quizzes,exams,notes,cards,attendance,routine,students,sms,admins,settings,logs,financial-numbers,materials,customize-website", 61545),
(27, "Mash", "8801724373117", "$2y$10$i1BTm5la942CDCaY/ZBj6.4EAyXsQP4Lk21dgJ1iuEadpkZvRMlD2", NULL, NULL, NULL, "finance,courses,notices,class,live-class,quizzes,exams,notes,cards,attendance,routine,students,sms,admins,settings,logs,financial-numbers,materials,customize-website", 61545);

-- --------------------------------------------------------

--
-- Table structure for table `admin_logins`
--

CREATE TABLE `admin_logins` (
  `login_id` int(11) NOT NULL,
  `admin_id` bigint(20) NOT NULL,
  `admin_token` varchar(200) DEFAULT NULL,
  `expiry_date` timestamp NULL DEFAULT NULL,
  `service_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin_logins`
--

INSERT INTO `admin_logins` (`login_id`, `admin_id`, `admin_token`, `expiry_date`, `service_id`) VALUES
(1, 1, "4e80cd15a81fbf4f100b4ecd8800ff492977c70763ab2cfc2baacde2c403aa19", "2025-04-18 21:48:20", 61545),
(2, 1, "78b002c07e6b2a62a59cf9e6da0901d227bc467051d5ea2eeddb244512adf678", "2025-04-22 06:25:28", 61545),
(3, 1, "74b486ab5119cfbbc4474661bd46ce2118e382361a5af830af0bc96151384009", "2025-04-22 06:53:36", 61545),
(4, 1, "bbdfe66595fd1e2cf8a65837e477e50f01a95cb63bb0e0d270264e728c9fb9f9", "2025-04-22 06:54:39", 61545),
(5, 1, "960262160977c678669d34f88a51fa9eb156f941ac2dc0354e12421761952756", "2025-04-22 22:52:02", 61545),
(6, 1, "bbf6d24c58fece2c313dc032d1acab2bfbfb320eafcaae81829ad5ec394bf0fe", "2025-04-23 10:38:52", 61545),
(7, 1, "9c7d0a2c793d8c39e1429bb8933585558964a6a9da6ff91a048befdb9ea18761", "2025-04-23 12:25:27", 61545),
(8, 1, "fc7866ed00d6cd537a275f656091ab002c71b6141f1e444d42322638b7e8db69", "2025-04-23 12:34:30", 61545),
(9, 1, "164ced8a4ee9339686b5dc521cc90ee039e0e7a552252d7f0f0b89486549f6d8", "2025-04-23 13:05:54", 61545),
(10, 1, "4bb5813307ef7bbe5be1ac0faca0e687f436f171f4a986328185b18e782db4d1", "2025-04-24 02:41:46", 61545),
(11, 1, "9f7d9f10717b7c733a1bfa70549df062cddf1723252329dc66fa5999d42ac1e2", "2025-04-24 03:32:47", 61545),
(12, 1, "3bf7011483a7cb2e7d60e546baa430ada1fe37fceefcdf61b5a0fe59dd85d1df", "2025-04-24 03:57:35", 61545),
(13, 1, "b5c451522597c2420c893ee42da58fdd39cf3b0267d3129b4e2a84a9af2111f0", "2025-04-24 04:57:59", 61545),
(14, 1, "04bb099dc778a4a1ba5c496599a015dcb80f8b3ca418e71cee86bbdc20ffde5f", "2025-04-24 05:05:45", 61545),
(15, 1, "2adc58f344ba1b00ae04108b1cc419e96f5aec816b18a83b3f4a213269c6c885", "2025-04-24 05:16:33", 61545),
(16, 1, "23087adc3233e7d9e4e4e0e3cf0be66ab42c75947d12897ff2b0cdacbd706862", "2025-04-24 05:23:27", 61545),
(17, 1, "bfb9e40da26e6784ff8c48491cf5d648d1e1431b6d3cf813ec8e766831f4ced9", "2025-04-24 05:23:52", 61545);

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `attendance_id` bigint(20) NOT NULL,
  `attendance_date` date NOT NULL,
  `student_index` bigint(20) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_by` bigint(20) NOT NULL,
  `service_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `attendance`
--

INSERT INTO `attendance` (`attendance_id`, `attendance_date`, `student_index`, `created_at`, `created_by`, `service_id`) VALUES
(1, "2024-10-12", 1234, "2024-10-12 12:31:31", 1, 61545),
(3, "2024-10-11", 1234, "2024-10-12 09:43:07", 1, 61545),
(4, "2024-10-26", 1234, "2024-10-26 15:30:15", 1, 61545);

-- --------------------------------------------------------

--
-- Table structure for table `batches`
--

CREATE TABLE `batches` (
  `batch_id` bigint(20) NOT NULL,
  `course_id` bigint(20) NOT NULL,
  `branch_id` bigint(20) NOT NULL,
  `batch_name` varchar(100) NOT NULL,
  `accepting_admission` varchar(20) NOT NULL,
  `service_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `batches`
--

INSERT INTO `batches` (`batch_id`, `course_id`, `branch_id`, `batch_name`, `accepting_admission`, `service_id`) VALUES
(1, 1, 3251032015401, "morning", "", 61545),
(2, 1, 3251032015402, "evening", "", 61545),
(3, 2, 3251032015403, "Afternoon", "", 61545);

-- --------------------------------------------------------

--
-- Table structure for table `branches`
--

CREATE TABLE `branches` (
  `branch_id` bigint(20) NOT NULL,
  `branch_name` varchar(100) NOT NULL,
  `branch_details` varchar(200) DEFAULT NULL,
  `branch_location` varchar(1000) NOT NULL,
  `created_by` bigint(20) NOT NULL,
  `time` datetime DEFAULT NULL,
  `service_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `branches`
--

INSERT INTO `branches` (`branch_id`, `branch_name`, `branch_details`, `branch_location`, `created_by`, `time`, `service_id`) VALUES
(3251032015401, "Chawkbazar", "Main Branch", "https://maps.app.goo.gl/T34oH4ELmBUUfgeF6", 0, NULL, 61545),
(3251032015402, "Andarkillah Branch", "Second Branch", "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d230.6459315539788!2d91.83670173483239!3d22.340979856826763!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30ad275955701491%3A0x7187efe2b64e576d!2sAndarkilla%20Shahi%20Jame%20Masjid%2C%20Chittagong!5e0!3m2!1sen!2sbd!4v1728098306522!5m2!1sen!2sbd\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>", 1, "2024-10-05 05:17:07", 61545),
(3251032015403, "GEC Branch", "After Car rental shop", "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d378.01798573955114!2d91.82088692594647!3d22.359120300815174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd9f3802e919b%3A0x85952e5d63503409!2sGec%20Chittagong!5e0!3m2!1sen!2sbd!4v1728098465251!5m2!1sen!2sbd\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>", 1, "2024-10-05 05:21:58", 61545),
(3251032015404, "zaz", "azazaz", "zazaza", 1, "2024-10-16 18:35:24", 61545),
(3251032015406, "df01sd30f12s01f0sdf5", "sad0121as2d01 as01d32a1s32d01as32d", "014sad01wq540sd2sdef21sdf2sd01f1sd32fsd132f01s32df", 1, "2024-10-18 18:08:03", 61545);

-- --------------------------------------------------------

--
-- Table structure for table `cards`
--

CREATE TABLE `cards` (
  `card_id` bigint(20) NOT NULL,
  `course_id` bigint(20) NOT NULL,
  `card_title` varchar(100) NOT NULL,
  `availability` enum("yes","no") NOT NULL,
  `created_by` bigint(20) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `service_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cards`
--

INSERT INTO `cards` (`card_id`, `course_id`, `card_title`, `availability`, `created_by`, `created_at`, `service_id`) VALUES
(1, 2, "zaz", "yes", 1, "2024-10-15 12:26:29", 61545),
(2, 1, "zazasas123", "no", 1, "2024-10-15 12:26:37", 61545),
(4, 1, "asdasd", "yes", 1, "2024-10-16 10:35:02", 61545),
(7, 1, "admit", "yes", 1, "2024-10-26 15:33:16", 61545);

-- --------------------------------------------------------

--
-- Table structure for table `chats`
--

CREATE TABLE `chats` (
  `message_id` bigint(20) NOT NULL,
  `course_id` bigint(20) NOT NULL,
  `sender_type` varchar(100) NOT NULL,
  `sender_id` bigint(20) NOT NULL,
  `message` text NOT NULL,
  `message_time` datetime NOT NULL,
  `service_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `classes`
--

CREATE TABLE `classes` (
  `class_id` bigint(20) NOT NULL,
  `note_id` varchar(500) DEFAULT NULL,
  `class_link` varchar(200) NOT NULL,
  `class_name` varchar(200) NOT NULL,
  `class_description` text NOT NULL,
  `class_index` bigint(20) NOT NULL,
  `playlist_id` bigint(20) NOT NULL,
  `created_by` bigint(20) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `service_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `classes`
--

INSERT INTO `classes` (`class_id`, `note_id`, `class_link`, `class_name`, `class_description`, `class_index`, `playlist_id`, `created_by`, `created_at`, `service_id`) VALUES
(1, "9,3,1,7,2,8", "https://www.youtube.com/watch?v=YJctp0q34aI", "How to Embed a YouTube Video in WordPress", "Clean Bandit - Symphony (Lyrics/Vietsub) feat. Zara Larsson\n\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n🎹 Mỗi ngày chúng tôi đều cập nhật danh sách phát các bài hát tình yêu lãng mạn, các bài hát disco cho các bạn đăng ký của tôi.\n🔔 Mọi người like, subscribe và nhấn chuông thông báo để ủng hộ mình nhé!\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n◢ Để liên hệ và gửi nhạc: channel@chilledlab.com\n►Tất cả các quyền thuộc về chủ sở hữu tương ứng của✔ họ.\n✔ Video này đã được cấp phép đặc biệt trực tiếp từ các nghệ sĩ và chủ sở hữu quyền.\n◢ Cảm ơn đã xem Đừng quên Đăng ký, Bình luận, Ch✔ia sẻ và Thích (Youtube, Facebook, Twitter, v.v.)In this video tutorial, Envato Tuts+’s Adi Purdila shows you how to embed a Youtube video in WordPress. ► Explore Thousands of WordPress Themes and Plugins with Envato Elements. https:/elements.envato.com/wordpress?utm_campaign=yt_tutsplus_YJctp0q34aI&utm_medium=referral&utm_source=youtube.com&utm_content=description\n\nLearn more on How to Embed a YouTube Video in WordPress on Envato Tuts+: https://webdesign.tutsplus.com/tutori...\n\n- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n Envato Tuts+ Discover free how-to tutorials and online courses. Design a logo, create a website, build an app, or learn a new skill: https://tutsplus.com/?utm_campaign=yt... \nEnvato Elements All the creative assets you need under one subscription. Customize your project by adding unique photos, fonts, graphics, and themes. \n► Download Unlimited Stock Photos, Fonts & Templates with Envato Elements: https://elements.envato.com/?utm_camp... \n► Subscribe to Envato Tuts+ on YouTube:    / tutsplus   \n► Follow Envato Tuts+ on Twitter:   / tutsplus   \n► Follow Envato Tuts+ on Facebook:   / tutsplus   -\n- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -", 1, 1, 0, NULL, 61545),
(2, NULL, "https://www.youtube.com/watch?v=U-PXEe-qeK4", "Zara Larsson - Uncover", "iTunes: http://smarturl.it/Uncvr Spotify: http://smarturl.it/ZL_Uncvr Google Play: http://smarturl.it/Uncver  http://zaralarsson.se http://www.zaralarssonofficial.com/   / zaralarssonofficial     / zaralarsson    http://ten.se   / tenmusicgroup    Director: A.V. Rockwell Producer: Ryan Biazon  Prod Company: Three 21 Films   Music video by Zara Larsson performing Uncover. (C) 2015 Record Company TEN AB, Under exclusive license to Universal Music AB", 2, 1, 0, NULL, 61545),
(4, "9, 2", "asdasd", "asdasd", "asdasd", 0, 1, 1, "2024-10-10 19:30:47", 61545);

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `contact_id` bigint(20) NOT NULL,
  `contact_type` varchar(200) NOT NULL,
  `contact_details` varchar(200) NOT NULL,
  `service_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `course_id` bigint(20) NOT NULL,
  `course_name` varchar(200) NOT NULL,
  `course_banner` varchar(200) NOT NULL,
  `course_description` text NOT NULL,
  `fee_type` varchar(20) NOT NULL,
  `course_fee` int(20) NOT NULL,
  `discounted_amount` int(20) DEFAULT NULL,
  `active_months` varchar(1000) NOT NULL,
  `accepting_admission` varchar(20) NOT NULL,
  `service_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`course_id`, `course_name`, `course_banner`, `course_description`, `fee_type`, `course_fee`, `discounted_amount`, `active_months`, `accepting_admission`, `service_id`) VALUES
(1, "HSC 26", "", "", "monthly", 2000, 1000, "September 2024,January 2025,December 2024,November 2024,October 2024", "", 61545),
(2, "HSC 25", "", "", "installment", 2000, 1000, "October 2024", "", 61545),
(4, "azasad", "project.PNG", "asd032as0d132asd", "monthly", 1000, 100, "September 2024,October 2024,April 2025,March 2025,February 2025", "No", 61545);

-- --------------------------------------------------------

--
-- Table structure for table `enrollments`
--

CREATE TABLE `enrollments` (
  `enrollment_id` bigint(20) NOT NULL,
  `student_id` bigint(20) NOT NULL,
  `course_id` bigint(20) NOT NULL,
  `course_fee` bigint(20) DEFAULT NULL,
  `batch_id` bigint(20) NOT NULL,
  `student_index` bigint(20) NOT NULL,
  `enrollment_time` datetime NOT NULL,
  `notification_read_status` varchar(20) NOT NULL,
  `service_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `enrollments`
--

INSERT INTO `enrollments` (`enrollment_id`, `student_id`, `course_id`, `course_fee`, `batch_id`, `student_index`, `enrollment_time`, `notification_read_status`, `service_id`) VALUES
(1, 1, 1, NULL, 2, 1234, "2024-10-07 15:48:10", "", 61545),
(2, 2, 1, NULL, 1, 5678, "2024-10-07 15:48:36", "", 61545),
(4, 3, 1, NULL, 2, 1245, "2024-10-13 01:56:11", "", 61545),
(5, 5, 1, NULL, 2, 2412101, "2024-10-14 03:54:49", "unread", 61545),
(8, 132032103, 2, NULL, 3, 12020, "0000-00-00 00:00:00", "", 61545),
(9, 3, 1, NULL, 2, 202101, "0000-00-00 00:00:00", "", 61545),
(10, 1, 2, NULL, 3, 1010, "0000-00-00 00:00:00", "", 61545),
(11, 2, 2, NULL, 3, 1891, "0000-00-00 00:00:00", "", 61545),
(12, 2, 2, NULL, 3, 1891, "0000-00-00 00:00:00", "", 61545);

-- --------------------------------------------------------

--
-- Table structure for table `exams`
--

CREATE TABLE `exams` (
  `exam_id` bigint(20) NOT NULL,
  `course_id` varchar(500) NOT NULL,
  `exam_name` varchar(200) NOT NULL,
  `exam_date` date NOT NULL,
  `mcq_marks` float NOT NULL,
  `cq_marks` float NOT NULL,
  `practical_marks` float NOT NULL,
  `bonus_marks` float NOT NULL,
  `student_visibility` varchar(100) NOT NULL DEFAULT "None",
  `created_by` bigint(20) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `service_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `exams`
--

INSERT INTO `exams` (`exam_id`, `course_id`, `exam_name`, `exam_date`, `mcq_marks`, `cq_marks`, `practical_marks`, `bonus_marks`, `student_visibility`, `created_by`, `created_at`, `service_id`) VALUES
(1, "1", "First Exam", "2024-10-11", 25, 50, 25, 2, "1", 0, NULL, 61545),
(2, "2", "Second Exam", "2024-10-26", 25, 50, 25, 3, "0", 0, NULL, 61545),
(3, "1,2,3", "1", "2024-10-13", 30, 30, 20, 5, "1", 1, "2024-10-09 04:24:03", 61545),
(4, "2,1", "10", "2024-10-12", 25, 50, 20, 2, "1", 1, "2024-10-09 04:36:32", 61545);

-- --------------------------------------------------------

--
-- Table structure for table `exam_marks`
--

CREATE TABLE `exam_marks` (
  `marks_id` bigint(20) NOT NULL,
  `exam_id` bigint(20) NOT NULL,
  `student_index` bigint(20) NOT NULL,
  `cq_marks` int(10) NOT NULL,
  `mcq_marks` int(10) NOT NULL,
  `practical_marks` int(10) NOT NULL,
  `service_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `expenses`
--

CREATE TABLE `expenses` (
  `expense_id` bigint(20) NOT NULL,
  `sector_id` bigint(20) NOT NULL,
  `expensed_amount` int(10) NOT NULL,
  `expense_details` varchar(200) NOT NULL,
  `expense_time` datetime NOT NULL,
  `service_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `expenses`
--

INSERT INTO `expenses` (`expense_id`, `sector_id`, `expensed_amount`, `expense_details`, `expense_time`, `service_id`) VALUES
(2, 2, 1564, "1210102", "2024-10-21 21:24:17", 61545),
(3, 3, 2300, "3210as3d20as32d0a32s0d", "2024-07-21 21:37:16", 61545),
(4, 1, 1600, "10120121120102", "2024-08-21 22:00:15", 61545),
(5, 3, 1200, "120102", "2024-09-21 22:00:33", 61545);

-- --------------------------------------------------------

--
-- Table structure for table `expense_sectors`
--

CREATE TABLE `expense_sectors` (
  `sector_id` bigint(20) NOT NULL,
  `sector_name` varchar(100) NOT NULL,
  `service_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `expense_sectors`
--

INSERT INTO `expense_sectors` (`sector_id`, `sector_name`, `service_id`) VALUES
(1, "Rental", 61545),
(2, "zaz", 61545),
(3, "asd", 61545),
(4, "mash", 61545);

-- --------------------------------------------------------

--
-- Table structure for table `invoices`
--

CREATE TABLE `invoices` (
  `id` int(11) NOT NULL,
  `invoice_id` bigint(20) DEFAULT NULL,
  `service_id` int(11) NOT NULL,
  `due_date` date NOT NULL,
  `payment_date` date DEFAULT NULL,
  `amount` decimal(10,2) NOT NULL,
  `trx_id` varchar(255) DEFAULT NULL,
  `status` enum("unpaid","paid","overdue") NOT NULL,
  `time` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `invoices`
--

INSERT INTO `invoices` (`id`, `invoice_id`, `service_id`, `due_date`, `payment_date`, `amount`, `trx_id`, `status`, `time`) VALUES
(1, 2011320, 97897, "2024-10-28", "2024-10-21", 3000.00, "101010101010", "paid", "2024-10-02 15:11:19"),
(2, 4052411, 97897, "2024-11-28", NULL, 300.00, "", "unpaid", "2024-10-03 09:53:08");

-- --------------------------------------------------------

--
-- Table structure for table `live_classes`
--

CREATE TABLE `live_classes` (
  `live_class_id` int(11) NOT NULL,
  `live_class_name` varchar(255) NOT NULL,
  `live_class_desc` text DEFAULT NULL,
  `course_id` varchar(500) NOT NULL,
  `batch_id` varchar(500) NOT NULL,
  `service_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `live_classes`
--

INSERT INTO `live_classes` (`live_class_id`, `live_class_name`, `live_class_desc`, `course_id`, `batch_id`, `service_id`) VALUES
(2, "Class 02", "mnman ajksd wqoipe mabc aisdpqw [posadjkqwe asdbmn asdjlc asdipoqw", "1, 2", "2, 3", 61545),
(3, "zaz", "zaz", "1", "1,2", 61545),
(4, "Class 03", "as dmnc iuqwem xmncbm n oqwec poipas ", "1,2", "2,3,1", 61545),
(5, "asdasd", "asdasdasd", "2,1", "1,3", 61545),
(8, "zaas", "zasdad", "1", "1", 61545),
(9, "021sa10d30asd", "zasdad", "2,1", "1", 61545);

-- --------------------------------------------------------

--
-- Table structure for table `login_logs`
--

CREATE TABLE `login_logs` (
  `log_id` int(11) NOT NULL,
  `u_id` bigint(20) DEFAULT NULL,
  `ip_address` varchar(255) NOT NULL,
  `cookie` varchar(255) DEFAULT NULL,
  `login_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `login_logs`
--

INSERT INTO `login_logs` (`log_id`, `u_id`, `ip_address`, `cookie`, `login_time`) VALUES
(1, 16976312243384, "::1", "937b17cf498868c2c4a071778a528523bbc48ae485b587ac51d82e90019f868b", "2024-09-30 15:14:21"),
(2, 16976312243384, "::1", "d70b1a29c464597a32ab3384cce6e76d", "2024-10-01 02:13:15");

-- --------------------------------------------------------

--
-- Table structure for table `marks`
--

CREATE TABLE `marks` (
  `marks_id` int(11) NOT NULL,
  `exam_id` bigint(20) NOT NULL,
  `student_index` bigint(20) NOT NULL,
  `cq_marks` bigint(20) NOT NULL,
  `mcq_marks` bigint(20) NOT NULL,
  `practical_marks` bigint(20) NOT NULL,
  `created_by` bigint(20) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `service_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `marks`
--

INSERT INTO `marks` (`marks_id`, `exam_id`, `student_index`, `cq_marks`, `mcq_marks`, `practical_marks`, `created_by`, `created_at`, `service_id`) VALUES
(1, 1, 1234, 23, 20, 23, 1, "2024-10-06 23:50:05", 61545),
(24, 3, 1234, 10, 30, 20, 0, NULL, 0),
(25, 4, 1234, 10, 5, 20, 0, NULL, 0),
(26, 1, 1245, 10, 15, 20, 0, NULL, 0),
(27, 1, 1245, 2, 15, 20, 0, NULL, 0),
(28, 1, 1245, 20, 15, 20, 0, NULL, 0),
(29, 1, 2412101, 0, 3, 0, 0, NULL, 0),
(30, 1, 2412101, 0, 0, 0, 0, NULL, 0),
(31, 1, 2412101, 0, 1, 0, 0, NULL, 0),
(32, 1, 2412101, 0, 12, 0, 0, NULL, 0),
(33, 1, 2412101, 0, 120, 0, 0, NULL, 0),
(34, 1, 2412101, 0, 12, 0, 0, NULL, 0),
(35, 1, 2412101, 0, 1, 0, 0, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `materials`
--

CREATE TABLE `materials` (
  `material_id` int(20) NOT NULL,
  `material_name` varchar(200) NOT NULL,
  `course_id` bigint(20) NOT NULL,
  `service_id` bigint(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `materials`
--

INSERT INTO `materials` (`material_id`, `material_name`, `course_id`, `service_id`) VALUES
(1, "Bags", 1, 61545),
(7, "Shirt", 1, 61545),
(8, "Books", 1, 61545),
(9, "Extra Book", 2, 61545),
(12, "zaz", 4, 61545);

-- --------------------------------------------------------

--
-- Table structure for table `material_receivers`
--

CREATE TABLE `material_receivers` (
  `material_receiver_id` bigint(20) NOT NULL,
  `enrollment_id` bigint(200) NOT NULL,
  `material_id` bigint(200) NOT NULL,
  `service_id` bigint(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `material_receivers`
--

INSERT INTO `material_receivers` (`material_receiver_id`, `enrollment_id`, `material_id`, `service_id`) VALUES
(3, 1, 7, 61545),
(4, 2, 7, 61545);

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `message_id` bigint(20) DEFAULT NULL,
  `ticket_id` int(11) NOT NULL,
  `sender_type` enum("user","admin") NOT NULL,
  `u_id` bigint(20) NOT NULL,
  `message` text NOT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `message_id`, `ticket_id`, `sender_type`, `u_id`, `message`, `time`) VALUES
(1, NULL, 120305, "user", 16976312243384, "Hi", "2024-10-02 11:28:25"),
(2, NULL, 120305, "user", 16976312243384, "How can I login to admin Panel?", "2024-10-02 11:28:37"),
(3, NULL, 120305, "user", 16976312243384, "Should I use admin panel credentials?", "2024-10-02 11:29:11"),
(4, NULL, 120305, "admin", 16976312243384, "Sir, you can easily do that by the URL that I am giving you!", "2024-10-02 11:31:52"),
(5, NULL, 120305, "admin", 10102, "1010", "2024-10-02 11:32:26"),
(6, NULL, 120305, "user", 16976312243384, "asdasd", "2024-10-02 14:38:32"),
(7, NULL, 120305, "admin", 10102, "123123", "2024-10-02 14:39:01"),
(8, NULL, 120305, "user", 16976312243384, "as2d01a23sd", "2024-10-02 14:40:04"),
(9, NULL, 120305, "user", 16976312243384, "asdasd", "2024-10-02 14:48:30"),
(10, NULL, 120305, "admin", 10102, "a2s501d32as32da32s0d", "2024-10-02 14:48:43"),
(11, NULL, 120305, "user", 16976312243384, "asdasd", "2024-10-03 00:02:50"),
(12, NULL, 120305, "user", 16976312243384, "asdasd", "2024-10-03 00:02:59"),
(13, NULL, 120305, "admin", 10102, "Composer Installed\r\nUsing web socket for speedy message managements", "2024-10-03 00:03:48"),
(14, NULL, 120305, "user", 16976312243384, "1002", "2024-10-03 00:55:21"),
(15, NULL, 120305, "admin", 10102, "Ratchet and composer php installed\r\nenvironment variables set up done\r\n", "2024-10-03 00:57:17"),
(16, NULL, 120305, "admin", 10102, "C:\\xampp\\htdocs\\lms", "2024-10-03 00:57:37"),
(17, NULL, 120305, "user", 2147483647, "ok", "2024-10-03 00:57:53"),
(18, NULL, 120305, "user", 16976312243384, "hi", "2024-10-03 01:04:47"),
(19, NULL, 120305, "user", 16976312243384, "hello", "2024-10-03 01:04:55"),
(20, NULL, 120305, "user", 16976312243384, "can I have a  chat now?", "2024-10-03 01:06:18"),
(21, NULL, 120305, "admin", 10102, "Yes, Sir", "2024-10-03 01:07:25"),
(22, NULL, 120305, "user", 16976312243384, "so start", "2024-10-03 01:13:07"),
(23, NULL, 120305, "admin", 10102, "socket io removed and websocket included", "2024-10-03 01:13:36"),
(24, NULL, 120305, "user", 16976312243384, "hmm", "2024-10-03 01:26:53"),
(25, NULL, 120305, "user", 16976312243384, "How?", "2024-10-03 01:29:57");

-- --------------------------------------------------------

--
-- Table structure for table `notes`
--

CREATE TABLE `notes` (
  `note_id` bigint(20) NOT NULL,
  `note_name` varchar(100) NOT NULL,
  `file_address` varchar(200) NOT NULL,
  `note_tags` varchar(500) NOT NULL,
  `course_id` varchar(500) DEFAULT NULL,
  `batch_id` varchar(500) DEFAULT NULL,
  `created_by` bigint(20) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `service_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notes`
--

INSERT INTO `notes` (`note_id`, `note_name`, `file_address`, `note_tags`, `course_id`, `batch_id`, `created_by`, `created_at`, `service_id`) VALUES
(2, "asdasd", "../uploads/_C__Users_Home_Downloads_index.html.png", "Intro", "2,1", "3", 1, "2024-10-12 10:38:18", 61545),
(3, "This is a note", "../uploads/b_gzoyverb4lw.v0.build_.png", "Intro, hi, new", "2", "3", 1, "2024-10-12 10:34:58", 61545),
(7, "Thid ", "../uploads/services (1).csv", "Intro,new,hi", "2", "2", 1, "2024-10-09 03:29:11", 61545),
(8, "go", "../uploads/Screenshot_2022-11-01-07-51-31-00.jpg", "Intro", "1,2", "1,3,2", 1, "2024-10-09 03:32:07", 61545),
(9, "123", "../uploads/Screenshot 2024-09-27 075827.png", "note1,extra,question,Algebra,new,recent", "1", "2,1", 1, "2024-10-09 04:06:54", 61545),
(10, "zaz", "../uploads/f41d03e81c65f26b14a5032eeeb417bf.jpg", "Intro,extra,answer,hi", "2,1", "3,1", 1, "2024-10-09 04:12:53", 61545),
(12, "Graph", "../uploads/Untitled design (5).png", "graph,new,extra", "2", "3", 1, "2024-10-12 10:42:31", 61545);

-- --------------------------------------------------------

--
-- Table structure for table `notices`
--

CREATE TABLE `notices` (
  `notice_id` bigint(20) NOT NULL,
  `notice_type` varchar(500) NOT NULL,
  `notice` text NOT NULL,
  `notice_by` bigint(20) NOT NULL,
  `notice_time` datetime NOT NULL,
  `service_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notices`
--

INSERT INTO `notices` (`notice_id`, `notice_type`, `notice`, `notice_by`, `notice_time`, `service_id`) VALUES
(1, "Public", "This is my test Notice ", 1, "2024-10-06 18:42:55", 61545),
(3, "Public", "Testing a notice\n", 1, "2024-10-08 15:39:02", 61545),
(4, "Public", "A public message", 1, "2024-10-08 15:45:04", 61545),
(5, "Public", "Checking for new message", 1, "2024-10-08 15:45:18", 61545),
(7, "1", "zaz", 1, "2024-10-12 02:09:26", 61545),
(8, "1,2", "This is a notice", 1, "2024-10-12 02:09:48", 61545),
(9, "2", "Mashraf only", 1, "2024-10-12 02:10:53", 61545),
(10, "1", "Doe only", 1, "2024-10-12 02:11:43", 61545),
(13, "1,2", "message!!!", 1, "2024-10-14 02:33:12", 61545),
(17, "1,2,3,4,5", "20121", 1, "2024-10-23 13:00:58", 61545),
(18, "5,4", "132132013", 1, "2024-10-23 13:01:25", 61545),
(19, "1,4,5,9", "Ajke 4 tay class", 1, "2024-10-26 15:22:51", 61545);

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `payment_id` bigint(20) NOT NULL,
  `student_index` bigint(20) NOT NULL,
  `payment_time` datetime NOT NULL,
  `paid_amount` int(10) NOT NULL,
  `method` enum("offline","online") NOT NULL DEFAULT "online",
  `discounted_amount` int(10) NOT NULL,
  `enrollment_id` bigint(20) NOT NULL,
  `service_id` bigint(20) NOT NULL,
  `created_by` bigint(20) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`payment_id`, `student_index`, `payment_time`, `paid_amount`, `method`, `discounted_amount`, `enrollment_id`, `service_id`, `created_by`, `created_at`) VALUES
(1, 12020, "2024-10-23 18:51:04", 120, "online", 100, 1, 61545, NULL, NULL),
(2, 12020, "2024-09-23 18:51:37", 120, "online", 100, 1, 61545, NULL, NULL),
(3, 202101, "2024-08-23 18:56:30", 1201, "online", 120, 9, 61545, NULL, NULL),
(4, 1010, "2024-08-23 20:02:20", 800, "offline", 200, 1, 61545, NULL, NULL),
(5, 1010, "2024-07-24 13:35:42", 1222, "online", 30, 10, 61545, NULL, NULL),
(6, 202101, "2024-09-24 11:24:12", 1200, "offline", 100, 9, 61545, NULL, NULL),
(7, 1891, "2024-10-27 19:19:21", 600, "offline", 400, 11, 61545, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `playlists`
--

CREATE TABLE `playlists` (
  `playlist_id` int(11) NOT NULL,
  `playlist_name` varchar(300) NOT NULL,
  `playlist_banner` varchar(200) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_by` bigint(20) NOT NULL,
  `course_id` varchar(500) NOT NULL,
  `service_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `playlists`
--

INSERT INTO `playlists` (`playlist_id`, `playlist_name`, `playlist_banner`, `created_at`, `created_by`, `course_id`, `service_id`) VALUES
(1, "Music", NULL, "2024-10-07 22:47:16", 1, "1,2", 61545),
(2, "AI", NULL, "2024-10-07 22:47:16", 1, "1", 61545),
(3, "Data Science", NULL, "2024-10-09 05:03:04", 1, "1", 61545),
(4, "EEE", NULL, "2024-10-09 05:03:21", 1, "2", 61545);

-- --------------------------------------------------------

--
-- Table structure for table `quizzes`
--

CREATE TABLE `quizzes` (
  `quiz_id` bigint(20) NOT NULL,
  `quiz_name` varchar(200) NOT NULL,
  `quiz_description` text NOT NULL,
  `available_from` datetime NOT NULL,
  `available_to` datetime NOT NULL,
  `quiz_duration` int(10) NOT NULL,
  `questions_per_quiz` int(10) NOT NULL,
  `marks_per_question` float NOT NULL,
  `negative_marks` float NOT NULL,
  `student_visibility` enum("1","0") NOT NULL,
  `multiple_availability` varchar(10) NOT NULL,
  `course_id` bigint(20) NOT NULL,
  `service_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `quizzes`
--

INSERT INTO `quizzes` (`quiz_id`, `quiz_name`, `quiz_description`, `available_from`, `available_to`, `quiz_duration`, `questions_per_quiz`, `marks_per_question`, `negative_marks`, `student_visibility`, `multiple_availability`, `course_id`, `service_id`) VALUES
(1, "1201320", "1230", "2024-10-19 17:45:15", "2024-12-04 17:45:15", 10, 10, 1, 0.25, "1", "1", 1, 61545),
(2, "01010", "1021313", "2024-10-18 00:00:00", "2024-10-18 00:00:00", 10, 1, 1, 10, "0", "0", 2, 61545);

-- --------------------------------------------------------

--
-- Table structure for table `quiz_questions`
--

CREATE TABLE `quiz_questions` (
  `question_id` bigint(20) NOT NULL,
  `quiz_id` bigint(20) NOT NULL,
  `question` text NOT NULL,
  `option_1` text NOT NULL,
  `option_2` text NOT NULL,
  `option_3` text NOT NULL,
  `correct_option_4` text NOT NULL,
  `quiz_solution` text DEFAULT NULL,
  `follow_up_question` bigint(20) DEFAULT NULL,
  `service_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `quiz_questions`
--

INSERT INTO `quiz_questions` (`question_id`, `quiz_id`, `question`, `option_1`, `option_2`, `option_3`, `correct_option_4`, `quiz_solution`, `follow_up_question`, `service_id`) VALUES
(2, 1, "<h2>32032013</h2>", "<h2>0132033</h2>", "<h2>12320320</h2>", "<h2>320303120</h2>", "<h2>01320230</h2>", NULL, NULL, 61545),
(3, 1, "<h2>zazs<strong>dadasd</strong></h2>", "<ul style=\"list-style-type:circle;\"><li><h2>0as32d032as0d32asd2&nbsp;</h2></li><li>202020</li></ul><blockquote><ul style=\"list-style-type:circle;\"><li><h2>asdasdasd</h2></li></ul></blockquote>", "<h2>0a5s1d32a</h2><figure class=\"table\"><table><tbody><tr><td>asd</td><td>asdasdasdasd</td></tr></tbody></table></figure>", "<h2>03a2s0d32a<mark class=\"marker-green\">0sd as3d032</mark>sad0230as2d</h2>", "<pre><code class=\"language-php\">asd d sa das as as asd ds &lt;?php echo \"correct option\"; ?&gt;</code></pre>", "asd052012", NULL, 61545),
(4, 1, "<h2>zazs<strong>dadasd</strong></h2>", "<ul style=\"list-style-type:circle;\"><li><h2>0as32d032as0d32asd2&nbsp;</h2></li><li>202020</li></ul><blockquote><ul style=\"list-style-type:circle;\"><li><h2>asdasdasd</h2></li></ul></blockquote>", "<h2>0a5s1d32a</h2><figure class=\"table\"><table><tbody><tr><td>asd</td><td>asdasdasdasd</td></tr></tbody></table></figure>", "<h2>03a2s0d32a<mark class=\"marker-green\">0sd as3d032</mark>sad0230as2d</h2>", "<pre><code class=\"language-php\">asd d sa das as as asd ds &lt;?php echo \"correct option\"; ?&gt;</code></pre>", "asd0ad21", NULL, 61545);
INSERT INTO `quiz_questions` (`question_id`, `quiz_id`, `question`, `option_1`, `option_2`, `option_3`, `correct_option_4`, `quiz_solution`, `follow_up_question`, `service_id`) VALUES
(6, 2, "<p>asd 60as61 sd6f we64 f0xd2<mark class=\"marker-yellow\">1f06wet 94erdfcv3</mark></p><p>d3fg<u>0 dfg6</u> f635v01c32&nbsp;</p><p><i><strong><u>sd6a01f320asd13f23asd</u></strong></i>2f0b1<strong>3 02</strong>cvb0&nbsp;</p>", "<p>asdas</p>", "<figure class=\"image\"><img style=\"aspect-ratio:2048/1364;\" src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAACAAAAAVUCAYAAABEb/gRAAAAAXNSR0IArs4c6QAAIABJREFUeF7s3flfXPl95/sXtS8UUOwgIYQkxCKBhJDQ1p12d8d77I7d8TiObxbHceYxM8nkMXf+ivnh/jAzNzePicexbzq+dhbvduz21nZaSwskIfZNCBCb2CmKovaq+zhVgBotFlpB4n0eDz9km6pzzvf5/Z5TVef7+X4+Gd7iqiTaJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhJ4JIHhvuZHet+TflOGAgCeNKn2JwEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACO0lAAQA7qbfVVglIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISeGEFFADwwnatGiYBCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAjtJQAEAO6m31VYJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEnhhBRQA8MJ2rRomAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAI7SUABADupt9VWCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhJ4YQUUAPDCdq0aJgEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACO0lAAQA7qbfVVglIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISeGEFFADwwnatGiYBCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAjtJQAEAO6m31VYJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEnhhBRQA8MJ2rRomAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAI7SUABADupt9VWCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhJ4YQUUAPDCdq0aJgEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACO0ngcQIAotEoKysrKS6Xy4XVan1kugxvcVXykd+tN0pAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAR2uMDjBAD4fD5GR0dTgmVlZWRnZz+ypgIAHplOb5SABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQnAowQArK38n5ub2xAAkJeX98iZABQAoNEoAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISeAyBRwkAWFv5bwQAvL8EgBEA8KiZABQA8BidqLdKQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEHiYA4M6V/0YgwPs3owSAEQDwKJkAFACgsSgBCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhJ4DIGHCQC4c+W/ERDw/s1qtaZKADxKJgAFADxGJ+qtEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQggc0EADxo5f+dio+SCUABABqLEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQggccQ2EwAwINW/t95+EfJBKAAgMfoRL1VAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQk8DABAEYgwMNsa5kAjH8ftCkA4EFC+rsEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUjgNwhsJgBgrQSA8e/DbGuZAIx/H7QpAOBBQvq7BCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlI4DcIbCYA4FkAKgDgWSjrGBKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQk8MIKKADghe1aNUwCEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABHaSgAIAdlJvq60SkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJPDCCigA4IXtWjVMAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAR2koACAHZSb6utEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCTwwgooAOCF7Vo1TAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEdpKAAgB2Um+rrRKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQk8MIKKADghe1aNUwCEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACv1kgw2zDZPVgsrowWVxkmO1kmCxkmMxAhvgkIAGSJBNxkokYyXiYRGyFRNT4j59kPLLtfBQAsO26RCckAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQggWcjYHbkYfdWYsvai9WzG4uzALMtiwyLg4wMk4IAnk036CjbViBJMpkgGQsRjywRC84Q9Y8RWRomvDBAPDS37c5cAQDbrkt0QhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhJ4SgIZJjIyzJisbsyOXGxZe3DkHcKWvV8BAE+JXLt9ngXuEwDgGyQ010Vk6Sbx0DyJaIBkMg7JxJY3VgEAW94FOgEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJPBuBDJM1Nflvy67AVdyEI7cmNfFvZAJQCYBn0wc6yvMmcHcJAGPlv5EJIDTfw8qtZiK+oXQQQCK65Y27MwDg2rVrz+Scjh49uuE4Gd7iquQzObIOIgEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIIEdKmC256Qm/x359bh3ncWecxDj/zNZHDtURM2WwMMLJIySAOFFwov9BMbPE5ptTwUBGP/fVm8KANjqHtDxJSABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJPCMBGzZ+/CUfxBnUSP27H2YHflkmK2psgDaJCCBzQkY6f6T8Sjx0Cxh3w2CU1fwj/yMiO/G5nbwFF+lAICniKtdS0ACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSGA7CGSYbZisHpwFdWTv/10cBUe18n87dIzO4bkWWMsEEJq5hm/wuwRnOkhE/STjkS1rlwIAtoxeB5aABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpDAsxEwO/KweytxFTWSWfYqtuwDWvn/bOh1lBdYYC0TQMR3neXRd1iZukJ4YYB4aG7LWq0AgC2j14ElIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQk8GwErJ4y3KVncRU34SxswOoueTYH1lEksAMEooFJgtOtrNxqJjBxnqh/dMtarQCALaPXgSUgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCTwbATs3iqy9n8iFQBg85Rjtmc/mwPrKBLYAQLxsI+IfyQVALA0+APCC31b1moFAGwZvQ4sAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQggWcj4Mivx1vz+VQAgNnuxWRxPJsD6ygS2AECiViIeHghFQCw0PN1QrPtW9ZqBQBsGb0OLAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIIFnI+AsPEZe3ZdSAQAZZjsZJsuzObCOIoEdIJBMxEjGw6kAgLmOLxOcvrplrVYAwJbR68ASkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISeDYCruIT5B35j+kAgAwTkPFsDqyjSGBHCCRJJhPpAIC2/4eVWy1b1moFAGwZvQ4sAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQggWcjYEz85x/9T6kAAE3+PxtzHWWnCSRTAQCz1/469e9WbQoA2Cp5HVcCEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACz0ggHQDwF6sBAM/ooDqMBHaYQDoA4P9WAIARZuQtrkrusP5XcyUgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCTwTAQUAPBMmHWQHS6gAIDbA0ABADv8YlDzJSABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEnp6AAgCenq32LIE1AQUAKABAV4MEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEnrqAAgCeOrEOIIFU6n+VAEgPBGUA0AUhAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQggackoACApwSr3UrgfQIKALiNoQAAXRoSkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISeEoCCgB4SrDarQQUAJASOHr06IaxoAAAXRqPL2Ayg8WO1WbH6bTjsttw2MxYzSYyUntPAgkS0SjRUJDQSoiVYJhwNE4s9ZfnczNbrNicTuwOJw6HA7vVgtUEpnSjIREnGY8QjQRZWQkQDEcIRiAWfz7bu3VnbQLMWKw2HE4Hdqcdh8OGzWLGkgEZq97JeIxELEg0bHgHCYVjhGIQe14H2NaB68gSkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCTwBAUUAPAEMbUrCdxHQBkAbsMoAECXyeML2FzgKSArt4CykgJ2F+RQmusmy2nFbNSZwJjxjhL2L7I0McGtsVuMjM4wvbRCAIg8/hlsyR6cniy8pWUUlJRSWlRMQXYmWVawG402wh6iQeLBORbnJhgdu8H41AITC+APbsnpPscHtQJuMrO8FJUVUbSrgKKiPLweJ5lmsK4GAMTDfiJL4yzMTDA2OsHErJ8pPyw/rwPsOe4xnboEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQncFlAAgEaDBJ6+gAIAbhsrAMCwSE1g55OV7WF3jp1shwVjzfFdWzIGiTChJT+L47P4llbwA+FNj1kb4CEzK4uiXVlkZ9uxZYB5bcX4+n7SK+bjIT+hxUl8Pj/Tfghsl4lMkxUsThzuTLzeLLLy8sjMK6GwsDAdAFC4MQDA9L4AAN/EBFNjtxi+OcXU3DwLK0vML/mZmwuwHIykggHuXiDvALxkZnkoKXOTnW3FmBJe76N4FGIBlpb83JxcwLcc2nSPPMwLzTYnNo+XTE8WeVlOCgryKCwro7g0HQCQn51J9vsCABJGAMDKHL75dADA2OQM4zNhZucDLPsWWPKvsLASJxTVEvWN/ZBe8W91uHDnePFkecl2eykoKGDXniJKjACA4jxyPU7cZlLXkLG9PwBgdHSC8al5JueDzC4s4ZtfYGk5iD8CEWVgeJhhr9dKQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpDAYwooAOAxAfV2CWxCQAEAt5EUAGBY5O2Bgy9Re7iaN48WUFfsxpiqvysIIBGAyAy3unpp/c45Onpu0gvMbmLQpV+SB1Sxv6aGD75ZS92hAvIt4LzrQOkV84FbvUxd+yEdnf38sh+G5jZ9oKf7QlsWeMoo2bufhuO1HDq4h8oSLyXeTDwuOy6HDafNjGW1BEDGWgmAWJRo0CgBsEIgsMzSzDjzN7vp7+7nwqUbDIwtsADcvUC+BGig8lANH/9sOXWHcsgC7GutDC+Cf4TOrh6+8eNWOgYmn0r7nXmleCtPUFldzZnaMqrK8sjPcZKV6cRpv7sEQPJ9JQCCwQAB/wKBhRkmRwYZaG+la+AmrSMBJn3Rp3K+z+9O0yv+c4r3UN7QQFVNJfX7SqgoziEvy0GWy47dKAFgTZcAWLt8kokYRtBFJBwkuBJkeWke/9woNwd6aW9uofv6BAMLMKcMDM/v0NCZS0ACEpCABCQgAQlIQAISkIAEJCABCUhAAhJ4DgUUAPAcdppO+bkTUADA7S5TAIBhUVINjb/LqTNN/NWru3lpb1Zqctly59COByA6zdiVZt772j9x/lIXv16C4c2mALDvgeyXaDjVxJ/+yVFeaiymwAKuuwIAYqm8AovDzYy882XOX7jKN69A59OZ1978BWyygSUTd95uCvcfourwIU6frOXIwVIOFrjJd1tT2QzWarLfd8fJuJEfn/DiFEs3uxno6OTcux1c6x5hYMrH9HIoFQRgKKS3CuA1jp1p4s/+ay1nzxSkQilca38OzsB8N+cuNPPfvvpLzrcObb5Nm3ilxenGmVtEUUU1lUdP01BXy5lDZVSWZJFlv53y/0G7SkYDxAMzzI5ep7/9Mm3t3VzoGKFvdJ4Zf5xAeKdnAkiv/Le7cvEUlFNeVcvRU8c5Un+A+n0FlOW5cVvAds/0HHfrx0NLRH2jTAx20f7eBVrb+7h6fZqh6QALQQjeHmAP6jr9XQISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCTwyAIKAHhkOr1RApsWUADAbSoFABgWmw0ASEYhEWT+ejPXf/IVzr3Xyre6oGdmk2Ov8CAc/h1Onm7iP39oL2cP5ODMuF3D/PZetmkAgC0XPJVU1NTx2oeaOHF0H1UlWZR6nXjsZuzGiv+7yhncyyYJyQSJaJjoyhK+6ZtMDrbTebmdX73dRufgFBOQKq+Q3rY2AMCzax+lJ36b+mMNvFZXTt2efAqznHicVqwmMG2qzUZVhxjJeJhwwId//hbj1zvobv4FLW39/Lo3wPDsTs8EkF75n19+kOpXXufY8Tpeqi6msiSbnEw7TpslveJ/k97JeDSVESC0NM3i1BBD3a1cffcdrnYOcXkCJm4PsE1ewHqZBCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSODhBRQA8PBmeocEHlZAAQC3xRQAYFhsNgAglco+zspEGzNX3uLcxRb+7h0/rcNG5foHb46KOrJf/xxnzjTxpYY8jhc7MQN3z2duzwAAW84e3BUvc/REE7/38SM01RZT5IDMO1IlJBMJEsbkazxB3Jjrx0SG2YzJbMZiyrhrAjceWiC6eIMb167yb9/9Je9dHeDyXIiJlbUl2lsUAGCygyWbkpqjHPvE73LmVD2v7fOw32vf2G9Jo5HxVHujRpuNhfwZJkwmE2aLGdNqm9f7ORkzCtbjv9XHRPvPuNx8lR/8eoS2G4v4YhDaqYkArNngLmNffSOvf+rDnD1RxfEiO6V3DzBIrHkniRtX0Kq3UXbCbMrYGIgSD0F0kbnhTgbO/yuXLrXz4ytz9EwE78g08eBrWK+QgAQk8CgCNocTd7YXl9OJwwzmTWYySQcyBQgGgyz4wwTDRokgbRJ4TgUsNnBk4nQ68bqsqXJRxqVw1/fgZCL1vSoeixAOBgkGw/iDUSKxxxv/FrsDhycbp9NOpjWJKRIiNLfESjBMANjct/nfZJ8OZHQ4HWTnGYGLSUzRACFdv8/lgL3zvm1KBImFF1hZCeILQOi+cbvGrzujXJUTj9eN0/g5EQsQDuk+/lwOhEc96c3e7x6w/2Rss+PuUU/0ab1v43XgcmRgS4QJh0LM+QKs3P8CelontM32+6x8dD/ayo43We1YXFk4XS6y3Hbcdit2c8bq74AkiViUWNgokRlgyb/MSihCKAaxnfo8aCs7S8eWgAQk8AwFFADwDLF1qB0roACA212vAADDYtMBAMaLk0TnBwkO/pzzF5v5H9/p41Lv3KYupqKaY9R/+oucPdPERyqcVHot95j8N3a1PQMAvHsPsf/Vz3DyVBOfOFpEbak7NZFhrMp+/xY3VvYH/IRWf8DETVZMDhcOh/Gjx4zNqBPwvi0Zj6QmOBZHuxm5/GPOX2rlny5M0TW6vPqqLQoAsBWCp47qY8f51B+c5ezxcio9VvLtpo39ljB+pRkPNMIsBaKpH21kWLHa7Tgy7TjsFqwZpMojpLd0wEBsZYbgXB/Xr1zmnX/5BZfahmj3w9TjP4He1Hjcdi/K2QMVL3Ok6QR//PE6ztYUUeIwk3n3AIOw8SA1wlIoTihhDEIHNruNTKcVu828sRSFUXIiESXim8A/eo32i1f4zj9foqV77I5ME9tORCckAQm8IALeolL2152gbHcpRU5wG/OEm9ji4UUiiyOMjY9zuXeGidmVTbxLL5HANhXIzIWiSkp3l3K8PIfdOQ5sqeI/d2xGxq14gJWleWYnxhkdn2FgwsecP/RYDcvML6Ko+ghluwrYlxPFNjvF1KVuRsdmGAQWHmvvxptzgHKKdpdSf7KA0vwotsURpnT9PrbsVuzgzvu2LTLB8nQLo2MTtA/B1OL9zsooUlZAfskuqhvLKc2HzMAIs5O6j29FP27ZMTd7v3vACUYDmx13W9bS+xx443VQVmQlNzrD7MREqgTe6P0voO3WkKd0Ps/KR/ejp9SBm9qtLbsAd3ktu/eUc2hvAXsLPOQ7rbhSvwOiRAI+AtPjTNwcoXdggOFb80z5YXmnPg/alKpeJAEJSOD5F1AAwPPfh2rB9hdQAMDtPlIAgGHxUAEAkAzcIj5zjcsXmvnbvz/Hhbab+IDwfce+Hchm/9ETfOhP/oCXzhyhIc9Mset+ucwfNwDAeJRqxWK14HRbsVpNmIxJ53iUeDhINBp7yMhi4/Gsm92HjnH6s5/j7JkGXimzU561tvTfyIyQIBYKEPJNszA7x9itBeZ9oVSddSMAwOx04c7OpaCwiLzcbPI9Nlz2jSu/Ir5hAjd/TcuFZt765w5auqZXXR8tAMBksWCxO7FaLdjNSTLiMaKBUKr9xm+qB64jy94He16n8VQTf/5mDWcP5eM1kyrbkNoSUZLRAIHFBWZHbzE952MqECVgrAjKsGJxZuLMycOb76W0MJtcjwOnJSNVNiD9/iDE5rnVfYW273yL85c6+MlImOuLDzyzDSPtdjtXI8ozEqlzM9oZCEaJPuaKubuH9ZMeX+kj2HbV4Gl6k5NnmvjTl0toKvfgANZHWSxMImyUT5jj1tgUM/PLzAfjBNcCADKzcOfmk5ebQ2l+JjluG3bT+wIvon4IjDN4pZmffv07nLvcQ+sS3Lr/hbv9P810hhKQwHMhULq/mhMfeoPDtdXszwKv8bVgE1ssMEVoqo3O7j6+9+4QvSOPP0W5icNu/iVWO7izcLns5NnBFg0/4RXVmz8VvfI5EMjdDZWnqa6t4o0jRRwuztzwOb/egvcHAIyPc3Nskv6bU4xPzrA4M8eSfwV/DMIPuUIut/wAlS9/hMO1e2ksCuMYuc7gv7xDZ/cwLZAKCny8rRg4yoHaaj78e+VUlYdxTrVxfbtev4/X2Bf43cbvHg9lB6o5/dHXOVxbwR43OEPDBMaN8dLLDy/66B+73xdIb6p8WXlVFb/1ySNUl4N3oY2Rvm16H3/EnlzPqOGwkWmJQzjE8sIyQSMAfDWc/RF3/WK8bbP3uwe0NrTQy8LQ9+jq7uXtK3B9cqt5NmY6cVijEF4gdFdmjI3XweH9dkpCI4z09fKPP71G5+CtrW7IFh//WfnsjPvRFnfm+w5vPOgxY3dl4skvIH9PBbuq6jiwfy+Hy/PZm+8hzwgASD3giBJZWWRlZpKJ0Rv09vcyMDjM4PAU47MB5oOknqVtz+15zyyx2fvY9tTXWUlAAs+/wHYPADCbwW4Fi5lUxj5jXV0kCsb0gjFj8ZA/w7e8w0zG3IAl3R6b0aAExCLp9hhTOM9be7Yc9Dk5AQUA3O4oBQAYFg8ZAGCkE08Ghum/0MyP/uaHnL/cTxcwfd8LoBCo43DTCT77n17hpTN7KXdkkHNH6vzbb3/cAABj2jQbT04WpeUecnJsWImTXFkiNDfBos//kJHFxg/HfVQdO8En/uzDvHSmkppsMwWOtZlw4/YfZXlqkKm2d+jo6OXnnT6uT4dS6fCTGekSADml+yhr+ACHD9dwpjqXvflOjK/eayu/EuE5YksD9F9s5id/+zYXrwyuuj5aAIDN7cFdWEpOTib5zjjmgJ+lkSkWF5dTq7yCD7ph7a6B029y+nQT/+VMCWf3eLAZK/lX35cMLxL3jzDc2c25H12mvW+ckXgCX+qTw0SGMw9zTiUV1dX81m/VUV9ZRJnHTJaxE2MzPkGTEfxjnUy0fIdzF6/w1rsztN98uBWet9uZRb7TjMsUgaifxcUlRiZ8LD7mirm7mZ70+EofIa/yCJUf++NUiYw3ajzUFGwstRAPTBOd7qCvo5uf/LKXzsFZFuJJQskMMJkwZZdg2VNPZU0NH2qqpK48l3w7uNYHWCS1onBmoJmen36V85eu8f0u6Jt50EDQ3yUgAQk8nkDF4QZe+/0vcvJEA7VeKDBuo5vYYktjhMcvcelyK1/+fhdX++7/TWMTu3vyL8kpgIpaynYXcKYQvIszT3hF9ZM/Ze1xCwWKDkD9Rzh2ooEvnd3FyTIPRizM3V+HV0sARNMlAAJLc/hmRxnp6aLtVxfpGhil1w+zD7lCrriqnqOf/DxNx2t4edcKzr4Ouv/m21y63MMvgaHHptkDvETd8QY+/x+qOFYVxDV+iY7tev0+dntf1B3kAVVUNxzjU184y8kTe9hlh8zQOLGpZppbWvmb73Rwued+92Pjd98hqhsaeOOLJzl2EApnL9Hbuk3v44/YjesZNUry2OcOwOwUN64MMDo5zxSwlsftEXf//L9t0/e739zU4Gwr8z1foflyK19/BzqGt5pmY6aTohwfTLcwdVdmjI3XQdNhJ2UrffRdbeV/fvMczZ03t7ohW3z8Z+WzM+5HW9yZ7zt8emI5f88Bql8KbqHKAAAgAElEQVR+hbqjh2g8UEBFkQev04rbasbIAWpKPQ5KQiJGIh4mHPTh900w1tdO97/9nNbOG1yagHH/9mnZxjN53jNLbPY+tl39dV4SkMDzLrDdAwBcDsjzgsdpFDaDaBAWF8CYXjBmLO5bCW2bdozVBi5Puj05NjCmTZbnwB+Epd+4oHebNkintSkBBQDcZlIAgGHxsAEAqZXbc0xcaabla9/g3Hsd/NIHQ/dbCOKogJzXaTzdxJ//aQ1njxXgzXjfSvK7hu1mAwDSEcY2hwuP10tmlhuP047DlonVnE22EQCwNx0AYCNOYi0AYHGJKX+CpUCYaGiZlSU/C7N+llci96mJXgI0UtfUxOf/8jQvnSljtx2ybs/cQ3yJ6f5WOn7yLc6/18aPegMMzG78SPAUVVB65HWOnWzi4x+o4ci+AnKt4FzfzwrEZhm/3EzzV77J+UudvOOHocjmAgAuXe3kv3+7nfbBWbyZdnJyveQUlZLrTQcAmIwAgOEpFuYXmIsGWVhewje7wNJyMLWSLHJHyJe98giej/0hL51p4j/UZHOi4P1LNpPE/DcJjl+k/UIz//yNVi51Tm5MKW8zPi33sae2gZc/+gpnjldyao+bsmxrKohgLXwiMj9IYPBtzl1o5q+/O0Dz/UpKGLUknR5cmR7ys9xku+w4rGbcWVlkFpXizUkHADhXAwB8i0sMGwEAvgAJo45uqq+N9gZYWI4TvLPBd43DZzW+0gfefbiRU5/996kSGa/strJ3fYAZGSbihGau4+v+Gc0XLvMPPx7g8sD8xpq9nkIoraOyoZGPfugMZw/vpT7PStF6BEB6P4GJa0xf/nvOX2jhq78O0Dr8kDMIm/qY0YskIAEJ3BY40NDER7/wF7x0qoF6TwBH1M/NyQV8y785pXkiME1kuoOOrl6+9c4A3cPz24u1ZC80vppaUf3ZCtg1OfyEV1Rvr+bqbB5TYP379gn+6tVSThVnwOIkyz4/08sQWP8enc40ZHy/zfTmkOlMkpWxwOKNDjp++jYXLnfxs0E/NxYe7vO78EAthz/yGY4dreRUaQjH9W76vvpDrrb28y7w+NNRu4CT1DbU8eYXDnDkQBjXxBW6r3Xw1k96abs++5iAevszEbDvgeyXaDh1gj/9kzpOHSnEE0/iiszhWOmn7fJl/vbvf8H5q0MsxCB415IRIxNEA4ebmvj9vzzLqUNQNHWezuZm/vs/tfJe14ux8nk9o0bVbhq9Phi5zpXvX6Szb4wBYJt9Wj2TobPhIHl74OBL1B6u5s2jBdQVu1MlT9YSwdndHrIKSsjKcuG1RSHgZ2F8lqWllQ0PIsOLPSwNfYeOzl5+1AID48++KRuPuDHTyf6SWzD0PQbvylCQD1RTWVfHxz7fSEONndLgda53dPC/v32Jqz1b3pAthnxWPjvjfrTFnbl+eIvTizO3gn2Hj/HyR17nRN1e6vKj5BDANzvPkj+EPwzh1YSPZocLe04BWdkOCj0xYlO9jJz/IZffa+PHLXN0T6xsfN6xXRrK855ZYrP3sW0DrhORgAReMIHtFgBgtYLbDW4HeGzgzYR8L2Q50gEAsRAsLIAvAP4oLBn/2/j9bqw/fJIr6NPTEKmV+sZckdmIlYunV+obn51x47H+JjaTBcyOdHtyHZDtBo8Hsl3gNQIAwrA8D0sBWIyBL5z+70YJnqBxvNXjmMxg2FhMq+Wvt0smhCfktAnKTb3EZgO3BzIdkGVN+64sgPG408iY/niFHDd1Cvd8kQIAbrMoAMCweNgAgGQMkkHmrzcz+NOvcP7iVf6lE7rvtxCkuBoafje9kvz13ZytyNqwkvzuUbrZAIB0hHFeyR4qGxs4WL2fyrICSnOzyLJbyXRYcLit2FZLACSNEgCRINFwmFA4SsA3w9LkAMPd/bSe72Pg5tx9aqIbK5pe5ujpJr7wX47w0pliCk3gXpvBji5BcJzrV1p4+60fcL6ll2v+OLfuyM1qceTgzC6n+lgTH/69T3Dy2EGqciB/bSVkMmLUV2Cur5m+H3yV8xev8Z0B6J3bXABA241bvHUlwmzYTuP+AvYVZ5PtdqYcbEYJgFi6BEBoeZ6Ab5TRgV7az7XQPTjBgB/m7niOnF/TQPWnv5gKAHijwkmVd61oc3oiOTjdznznN7h04TJvvb3A1euhjQEUJhtY3LjKaslv+ginTh7lD86UcKxsY8rbhH+C2OQVzl9s5v/6+kUudIzd++7myYPSKvbsr+TlQ/s5ZPR1jp0cjwO704ndZsVmzsBsJK9JRolGYqyEooRWlokE5pmbGGS4t4We/hEuDwaYmH9QzN6zGl/p5u47coLX/+g/pgIAjheYKF0fYOnrwXfjGiM//wYXjOvt2jKdtyIYf1l/7mqxgzMb78F69v/2J3npRD2/V5VD7foAM46SJDI3wHLfjzl3sZm//sENWvq2WUrtR/9s0zslIIFtKrAeANB4kHrrCNODPXzjx610PCiX72rpE59vibGZZZaMX1jbadtbA69+OrWi+i9roGKo5wmvqN5OjdW5PLbA+vftRv7q1SKOOiZYbP0hPV39/LIfhubWjpDONJRbvJd9x45QW1PG0X0ucmOT+Hve5b33rvC/3+7j6uD6GzZ1apmFpZQcaqS8vIgDOVFsMxNMvNvOyM0pBp/IhKWxomwvJXt20/hyEWUFMWyLQ0yMjHGxa4qx6cCmzlMv2mKBwoNw+Hc4efoY//lDJRwpcbE0E8caX6EoZ4HpnlZ+8bXvcr65l8t+mLjrtrwzJtzWM2o0HODl/Dnob+fdr/yE5tbrXANejDCHxxiLNhd48snK9rA7x062w7I++W/stWDvQao/8DscrtlDg3cRhvtp/fY5Ontv0gusJShLRJaIBsbxLfmZnIflB6awe4xz3tRbN2Y6qau4CT1fSWU62ZihwA0UUbR7N3WnKthTYiEnOsX02BjvXhlmZHJxU0d7cV/0rHx2xv1ou4wTz64DlJ74MMeaTvCxE/s4VACelRvMDvVy5b0Oum9MMeyHxdWAR1vubjIrT1F9qIrXjhRQkbkMk+0MvHeZH//jRVo6R1PfT7bf04rnPbPEZu9j22Vk6TwkIIEXTWC7BQDk5ED5XthfAgdzoSQT3DawGZPwxnN3I1V+BFZWwL8EI5Nw9ToMGZPoT3IFfXoaIrVSv9QBrgSEjaCDIMwZk8qbLI1jzQRXEewthpMlUJGTDmxwWUmVZc4wJvkjqQpmBAMwMQOdQzA4CxNhUotEjc1uTGhng8cBmSZIhLZJJoQn5PSkritvHlQchMoSqPGAbQ5Gr8DAJHRAKjvcVmwKALitrgAAw+JhAwCMdF3EWbnVxkzr1zl3oYW/+8USrXelAEiH5DgP1OP9yOc4e+Y4f34oh8bCB+X+fVAAgJEs1YEzMxdv0W4qqqs4drqRw7UHOJgKAHCTZQf72sr6O68yI/V8PEp4aYalWwMMdXRx9detXOscon1ygfHlOyay2Qu8SsPpJr74Xw/x0plC8jPASPyV2qI+WBlloKWZf/3q9zjf0kdHEKbuujGn71CltQ0c/8znONV0mJcKk5S5IGaUrTfOiyhLY62MX3yL5pY2vnMNem49IAAgZIShDTE0u8I7tzKJWHNoMlKt5btxW1bru7zPIB5aIuobZbyvnbZf/ZrLV/u4MLDA0PzGdpfUHqPxM3+WmpD+YLmDfdnr1ehX+/8ac21vcfFiC1/72TJXb9wxIb12zJwKqHidY02NfPHj+zh5IAdXPI4lmUyNJELzsDDA1ctX+fI33qW5c2RD7UyT3YXFk4dnVwVFNUdSNaRfObyfw3sK2JVjJ8tpwZwBGWsBGXf0dzwaJJoKALjOcG8z7e2dnL8yTM/wPNP+OIG7iug+6/GVPuEDR5v48Bf+IuV9NA+KnWsNWb0eBq8y9PZbnLtwlX/qCNE1fe9PfltJFe6GT3Ly5DH+9GwhR3e7SBrhe4l0CF/cP050vJlLLa38r+93cGW7pdTeik9FHVMCEniqAusBAA0V1NPNQGsz/+2rv+R86yMmHTcZYchOHC432TluPC47TksG1lRO0SSJeIR4eIXgcoDFhQCBYARjjmp1wdHttpqNX3VunG43udkuPE4bdiOQLMO4XyZJRMNEgwECxn58QVbC0VTglcXhxJ3txXWwHsfLH+fEsYP8WRWUjfbT89UfcfVaPxdIMBwJElnxsRIMpdLFJS2r77NbcRAmEg4x5wukgtXev63XlnbaybQmMUVChOaWWAmGUyuhWD2+02bBlghifJqGTU4yTJaUgzkRIhZeYOWOmsRmmwObx4vb7SbHbcNpNac+P01GKFkiRjRl5sMfCOJbiROK3rG090m5P9XRto13vv59+xh/9WoBh+ll6p0v896Fq3zzCnSu17ZOBwB4S/ayv+EIx07W8+rLddQUJvAutNJ5qYX/9dY5LnRN4XdkYnLa8bpM2JIQWTZGuQlbpg1jeJuSUWIrwVRt8pgzC0tFNYUleVTlxHEszjJ9dYDJyTlGST+8SG1r/ex0kZ3tJtNpw2kzYzFnkGGMtniMeCRE2Lg2fEsEjHEZg2giPaGTX1xEVUMRRd4Edv8os7emaB9cYGopDo5MnOvnmyTii5LMsGDJcWNfu46N628z4zH1OMaKzWlkAssmM9OB225OPahJnWc0RHTFTzCaYDlpT5XkUq32B18fjn11eH/7Dzhzqp4/qzOzx5SkrzcOGUkqayww3UXvP3+Dixfb+eFonP6lO1MA3HvCra+tgy+/fZPOET8epwX7eoD2Ju/XDxyXD9iP1Q7uLFwuO3l2sEXDG+6r63EMRsax1Dh14nVZcZgiJMILBFci+AJ2kmYnHq+b8rojHP3IZzhev5czRgDA9W4u/H/vcLVjkG7i3AoG773/B3fBjnjFrkPHOPHvvsRLTdW8WjQDXVd5539+l3PNvbQA91sfv2WfY+vjZz959tM0Hj/Cm1+opKZsAvq+Tk9rB9+6CF3DURLRAMFgnAW/GUd2PvsP76ekwEFOfJaF6Smu9EwwOWMkkLVjd6THk8OWwBRZIkEGUWs2VpsLj8Ocep6RkYwTj6wQ9PtYXg6zsJJBwuLEk5dDptuJx5aRrudqvC4aIhwwPsdXmPdHCUbu/OazlmHGOG4W7kxn+r5pMaUDNIyU7LEg4ZUA/sUlAitr9/e1Ybmx9vn6eSchasnGYpx36vrOwJS6D9/7e1QiVQjRjbew6D4+a7nf08+TrHbj+1M27sy1/a+ebzJOMh4hkvo8WmA5EMIfgdvNfrgAgMceXzvi6r1XI438Hh6Ka47S8KlPc/bUIV7fY6EwMsmtjma6rl7l3UsdtA9NM2IEAKzecI0AAPf+k9Q0NvKhV4/StD+LSvscy12Xefetb3GuuZuLSzC6GjBgstqxuLJS39tz3A5cdmOhi7EAJLm58b92HTtt5NkSWOJJlgNJMFtxZbtwrv4OMBnlQ+81rjLWPh9243Udoq7xKB/7gxMcPQAFsy1cb+/grZ/20zYwBfEwweAd3/Mf8XfHXYl2Hvh5eJ/vaea1z8HN3seCLPjDBNdSNuzY8a2GS0ACT1pguwQApFZuZ8LuEjhcCTWlUJkFxvrHaBSixsR/EjLM4LCBOQ6JAIxPwOUe6JiAgWWYf1LrVNIVZijJhcYsyIuD35iUn4cBXzoIYDNbVj6UVUHdXnipFPa6wBSFuJG9zajGbAK73fglDZYwzBkBAAPQMQptszC5kn525smGsjIoNcp4miHmg5tDMLGYDtZ9uALOmznzTb7mCTlt8mgPfFlhCdQ1QkMFnPSCYxL6fgGtN3hCmRYfeAr3fIECAG6zKADAsHjoAADjTUmiC0MEh97h/IVm/se3u7nUc2cx8dUJ70ONHP/s/8HZMw28XmZl33pq8/sN4AcFAGSmHjCW7q/m+IdPcez4QY5VFLK3IItM4+GhzZKKaErXFrvXZvxASKQf7IeWWZ4ZY26og86WNn7641baBu5IZU/57QwA/6eRAaCIwoz3ZQBIrEB0jomOZlr+5Rucf6+TX0zA0F01y1YDIipq8L72Bg11B/l0SZz9zmQq7WsklcslwcpcH3N936ezu4+fd8CNqQcEAESNIjSL+CNxxmNOEhY7RZl2PHYLFuPB/h0ORiaERDTIytxN5oda6bjUyr/+oJXWvo3tLqxpoG41A8DHKpxUrmcASPd/ZP56KnV/84UWvpZK3X9HSvo1emsxuI9QU3+YT3+qirrKHByhMOZYLPWBkoz6UxkUhrt7+dWPWugcmNhQO9OWX4a7+jQ19Uf44IlKGvYXU+Z1k+u2pyYvrMYD6fv2tdHV8dRkUCS4RMA/xeT1dnrO/4yW1j5+2Rtg6I5SDfCsx1caat+RJl7/479IZVxoLIDS9QiTtdT93cxc+XYqdf/f/WqK1uF7Vxc1OfZg8b5M3ZFa/t0bxdTucxIPREmuljxIBudJLAzQ2d3LP/+ii66hO6/bR/tg0bskIAEJ3E/giQcA2LLAU0ZRWTn1R/ZzcE8eZZlWsmzGh0GCaHCB4NwIY9eHaG25wdDEQmr10F0LB51e8O5jV0UFJ4+Uc3CXl3y7CZeRa40oYf8cvrFBhq+PcK1zlJHppdQEvLuolP11Jyg7dJSi6kPU7i/kZSNrtm+akXe7GLk5yU2iTC2OMz/SxujYFL3Gs0D36vuKsilihoWpCS50jDA6tXEl4Hpt6V0F7DNWas9OMXWpm9GxmdRKKFaPX5qfiTcySoIEs5ZSzI4sSt1mHJFbLE+3MHpHTWJnXgneygYq9u2jYW8eu73OVGo5a9L4ErLM0uwoo9c76B8ap30kwJTvjkw5T8p9p14qmw4AuF0CwO3NoaqhkVff/CxNh0upsQwyd7WZ7/+vH3O+d57eokpsuws4Xm7FG0+yMGAkmLPirczD7c3AFltkaWwiVZt8PGpntqaRor0lfKA0Se7MJGPvXOXG0GRqxe16gv61ft61h/pD5Rwoy6fU6yDLYUplWYqH/AQXppgZHWKwq5uh8ZnVB/oeoJTi8nIaXj5AeXGSTN8At26O8G7bJCPLNiiqpHTtfKMxFrr8xE0u3Ef2U7B2HVuMulSbGI+kAyXySvdQeaKOAwdK2Z/nINdpTAZEiS5N47vZx8RiiIFEEUmLXbXaN3HtGVkiGj7z55w9UcMHC2cxzy7z7r/FiVhcNH6oGK/lBvPv/gPNF67wjZYAHeN3ZtS694Tb2PA43+22MxN2cXB3JoUeK1bj7rXZ+/WDxuWD9pNTABW1lO0u4EwheBdnNtxX11eYZuaujtNSjpfnUGSdJzLdwsTYIu1DBcSdu6huLKfqaC0HDjVSvcdLbbYPZifovjTIyPgUcwSYGZ+49/430Qc74SWPGgCwZZ9j6+OnmjOFlZyoqeDoy2UUZy/BzUvcujnGtREYm14ksjjC2Pgkl3sXiNrzqT15ln27cyhNTjIzNsLPmwe4MW7cqwvIL0mPpyJvFNt8N7GkCV/2ETx5ZdQUuyhwGQ+bVwjMjjLR18bAjRlaR6xEPLuoPHmEg/tLU7/R8+xJiIdYWZhgdriD/hs3uTTgY3zuzqSjq/fNkjIqG2rZf6CUvYUu8ty21ENgIn6iyxNM37xBf1s3g6Nr9/e1Ubmx9vn6eccz8LnryMwrW72+LViJErvP96hIKtzATMGu8vv4rBXRSD9PyincRfnhOvYfWNu/PXW+GfEg8fAc8+M3GGxr5frQJAMLMLf+he/hAgAee3zthIv3nm3MA6qoOnacT37pVc4eL6DaMsNyXye/+vbPab7aQ9ecj/HAxoASk82JJTOPvKp6Kl79GGcaq/jUfiuF8+30//SrnHuvle90Qe/q4wpbdgHu8lrK9lZQv6+IvQUevHYTTlNic+N/7TouzeVMbhR3KMaNoTgJezZ7j5RTuvo7wAjSvee4Mq99PuzjeHkFRw8doO5kFXvzwevrY25sjIt9C4xOzkFwhrGxO77nP+LvjrvmlR70eXi/72mutc/Bzd7HxrncO8PE7JZN8ezYK0oNl8CLLrBdAgC8uVBRCbXlcLwYytzgTKRXxU8ugBGvuRBPrT2hOB8KM6HAkkrezK0xUt/9fjII159U7S+jwsx+qCmDNwuhPAozw9A9Cu9Owsi9pwHuGi57dsPLp+BoBex3giMC89Mw7QPjK2jcBnlGe7KgxAlWowTAtBHICm93pz93jTt/fjEcOwq1pVBhg/AtaGsBo5LVlpY8e0JOT+o6UwDA/SWH+5o3/PHaNSNX3tPfjh49uuEgCgAwOB4UAGDMlyfTq4czjJnW1cnW5Mo08blOrlxo5n9/7VdcuDacesC+/jPT5AFLKQePNfE7f2REAtdwyAtrCQCMfSYS6XhWk8mU3ndq+80BACZHEZacOqqPNfKJN89w+lg5VTlW8hxrS/7TEcAJI+V9JEo0niSKObUyzm63YrWY0ivGV4+WDC8S949wo/UKv/rWz7hwpY/Lc2EmjLCo1JaukVXX1MTn/vIlzp7Zwx47ZK8fLpq6+y+O9DBy/ie0tffy66EQ16eDBIPB1Aq8FX+IcCSWXoFYsBsOnWT/nlI+mB+nzJZM1VmJrC7ojgYm7nhw/4AAgLgRkhZNTaZHrVaSJjPWZBLT+/rs/f22dgWk2z3E4JVmfvHNH3H+Sj+tS3BrNaIs50A95R/+Q86caeIzh7M5XOhIrbVac4sHpolOd9Db0cWPf95Ne/8kc8EgiytBAsEggVA6WjgaMybUy9hVvoeTr5SzZ3cmtlA4VZLA6P2EkUMmtsjC6gPq0cn51QCA1R/8FbVUvPYxTp5q4JNHijhckonR1UZwg7GlJ/ijxKIxIhFjGiSDDJsNi9WC3WzCvB4Bkc6wsHyrn6lrb3P5wmW+/YsR2m4spmqyrAXSPfvxlW5H6aFGTnz236cCAF4rs1JxR6BMZHGUwMjFVAaD754foXNwjpAxvoIrrKwEWAlHCEaM2kDpH+B7Ksp4+fU8du+ykQhESawGABAN3PsH6dO//+oIEpDADhV4YgEAqdIymbjzd1O4/xAHa6poaqigencupc4MMi0ZJDKMRTc+YoujjF8f4OqFjlRK4f5bC0wth9IZZiwOcHrJLNpDSWUdh2orOXukjIMl2XjNYDclSZqSqewxK5ND3Ozv48rlLjoGxuibWcZWXMHxD77BoSPH2L+rkIpiNxX5YIsEmBmaZnHBxzIh5qf6mGh7m66eQd69DlFvNSc+9AaH9xWznxHGb/Tyjz+9RufgxmTR67Wla/fSWBTGMXKdwX95h87u4dTKSPan91NdUcyu2AiWjASzjjIsjmxKnSasgX4Whr5HV08fP70KI4tunLlFFFUcpPJoE4er9nGsLJtd2XYsJDEnY5iSQZbnx5m43kZPTzfN7YP0jy4w4zdq26U/j915uyioqufg4bR7zW9yv5h2H5hMuxvP4jeZse7FvUo2HQCwkWBvfROv/uF/4uzJak5mjxNpb06vlL2+TEvlaTy1FbxxxEW5xcR8b5SMpI38ai+enATW8BRT3b1c+eEluvwWrje+SmntXj5bAbsmhzeMq4m16ytv9fqqPkhTXTlVZbkUe8xk2tPVuxPhADH/DLOj17nR0UpP7w2uDc4yMmfHH6uguLKK3/rkEarLwbvQxkhfH997d4hevxsqT1Ndu5c3jjgxEtDOXgsQz3CRfbSc/LJcSt1WsqyJ1fE4xsT1Vro7e7hwdSg1HueNNIWxtUxNBeSWVLCvupqG03XUHChhb44Zr2M1EMg/w8pEP5O+EL2RQpIWM5WZPiJDqtV+z4vM5ABLNpXHmvjoH/0hZ46WcCjZw9zAFN/+UYygLZ9XPldPRck8lv7v0P5eM3/3r+NcGfBvLEmV+t3UwOGmJn7/L89yqs5OyUIbS/N+Ls/nEzJncaDISb7bmvo9xj3u1wOr9+vUfWOz4zK0et8fvM7V97ro6b3J0MQcU/4gRkx2uGQvNL7K4fuN/zWU3N2r47SKN44UccA+RnDoe/R13+LtKxVEPVW8/Dv11DdWUl5SSlmug12uFVjxMz62wKLPRwQfsz19DH7rV3T1DHMZUmXmtN0WeNgAAItziz/HPMUEj32AqprDfLailJMVhRRX5JFpi8DsKMuLPm4ZK5vnpwhOtdPZ08cPzg3htxbf53Pf+OVZQXlV+n55oAxc020kkxn4vUYAwG4qC9wUuE1YMiIE50aZHrhCb/80FwZsRDJ3Uf/yEaorS6jwWMixG89p4oR9EyzcbKO3q4tfX+qle2iWmQAEou+7bxZXsK/qIA1Nh1LvL8+zkeO0YDKWg0UDJIJTzI1dZ+BaW+r+3jEyzc3ZAAshCMU21j5fP+84BLLqcOeXsa84k3wjwMeUJGF8j7o1yHBPDy2X2lLfowYWwsyvPmcxFnTc+3uRUVvSjN2di6dgL+WV1RxtrKf24C4qS5zkuS2YEhlkJMIQ97EweYPhtuZUSZ3WgSluTAVWPy82FwBgcrix5BSmvifVHjtJffV9vifNjTNxo53enl6a24fpH71fRsEddrXby8DzEg2nTvCFP23gVBXkzLUy+F4z3/yH87zXPnqfUptpJ9uug7hPfIITx+v5o4YsKhL9jF/6Oi2X2/n+NRhYMDJC5pNXto/99Q3UVh+gYV8B5bluPMb39gzjqVKckG+ShdEOBvr7udg+mlroMD67jH9ldQp97XOgqozP7o5SHEvQdyODuDWLfXW7KS3NJtduwWmKpMeVUULy2kW62vpp7pzlRiwX/4GT7K2p5RNHdnPiYCm7dpeQ54LMlUmCS0vcnIviW5iDpZHU9/B//FkbXTcXH+t3x+za+W/28/B+39NshfjrP8CBqoe7j/UZ569NAhKQwBMU2PIAAONnrRV27YKTDXBsDxx2gzsK01MwNgM35tMr4RcSYF4NAKgohJoiyLdCxhL0D8P3LkP7BOnfG6tGFgs4neC0g8vIzGxeXZxpxKtFIWSk2XxitAsAACAASURBVA9C0MgyYMyzWNLp9h2F4KyE+j3wZhHsicDUEPSMwblbMOxLlyIwEkgGorD2mH+9a4yve3aoroBPnYGjpZAdhaU56LoBgzMwYUzBrAYA7ClKZz0odYIrCCPD8K/vQfcU+F1QUAYnjsLhXbB/NQDgWgt0j8NgEqajEFxJn4/R9qQFjGQ7Tlu65IAxd7M2/2aUUYgYZRSCsGK8zyhDkJ5qxLzWfis4jRIFRukDo0p2BhhZGsxGfxmvT6TnHDPyHtIpdRCw2yDbaKs1nS3bmOMyps5iMQgbJRYi3JFJKn1+JqMdRntspDKOOyzpOanVxIUY8eOlNVC9WxkA7rxNKADgCd44H3tXDwgASCaSxGPpyXCzxZhIX515jS2RDI0yeKGZn/3191K1IFuB9QymthLwNKYnzv/kNGePl22YOI/H40SNnCrGfddqxWxem1H/zQEAtuJK3A0f5fjJE/zhyxWc2Ocl22rCkXqKZFy9sVTKrfDKMkvzi/iCcZYSLsyOTPLzPWS77RsmkElESUYDLIx2MXzpB5x/r5V/em+GrrG1SFdjRVMJBxua+J0vvsnZMxsDGVJV2JNxooFFAjOjTE9OMDQ6xcjoBKPjo4wOjzM6MMXU3HJ6BaLdCVl5ZLocFNmTqZtbugTA2ukH70jd+4AAAONulUik0uknTKbUzStp9NfqDo3+2tBvawMmEU6tvp+53kzvz/5fzl9q4/td0LcaYW3dVYP7xKc5ebqJP3ullJPlntRaq/VCAKu1mZfmphkfGWN8dJzxsQlGxsa5MT7KsJFSdjrAUipfsROny0VugRuXy4IpHidjtQRA0ih9kIwSXU1RGwxFVksAGLVky9lXf4zXP/9Bzpw5SEORg9LM1ZT/q+0wUh0a9su+APPzIcJYseTm4s7OTD1cdFnfFxhCgtjKLKHZXvovtvDzr/2CS9eG6AKMxwzG9uzHV/q4WQfq2f1RI1NGE58/lEN9wcZSGYnoCrHAHPMztxgZHmX05jgT4xOMjd1keOwGo1MLTCwYXyLSKfhcbhf5hTZcThPJeBLjOk5tifT1cVdKuse+kWgHEpCABO4t8MQCAGy54KmkoraO1z7cxPH6cqoKnOQbD75DQRLxJBGzHbM5A7c1SmzpFnNDXXRebudnb7fSfn0yHWDmKYHSBirr6vn4Bw7RVF1MhddKltmY9A8TixsPA51YzODMCBKZG2G6r5lLVzr4x18PsOzewyu/9yecOHGC2iInu7OtqTptpkSUoC9IJLxCjBUWxq4x+t4/0XKlix90QLSwgdd+/4ucPLyHWvoY6mzlf37zHM2dNzfArdeWPl7Dy7tWcPZ10P033+bS5R5+abzycHo/jfXV7LMskGODmCsHs8WOw8jQNNvKfN/XaLl6jX/8NxiJ7aP0xG9Tf6yB1+rKOFTiIc8SxZIwyuDEiWeYsbmdmIiQDEwxc+Mq3Rd/wOVr/fy6H4bn0p/He2vqeOXNsxw/vi/V7oL7uftvMTfSRdfldn7541ba78qstEOvlEcMACivO8Ern/8PqQCA095Joh0t6QCAkRgt9R+h6MRhvnQ2myN5LoIzVsxJC1m5FuyWAMmVcUauXOPcWz+jZclGx6ufpvx4DX9ZAxVDPRvG1dDa9VVTx2sfMq6vvVQVuTG+jpijAeLxBGHsmMxm3NY4hOZYnhpksL2Ncz89x9WeEL3+Q+QfauCNL57k2EEonL1Eb2srX/5+F1cXs6D+Ixw7UcuXzno4nOXAN2omGTXhyc/A5jIZIZxYrNb0eEwGSS6PMdFzlatvv83ltutcmoLx5XSmpl2VtZz86Es0Hq/iSLmXUo8FWzRAMmGcp42MjATOjBUisTizQSvJZJh82xyzHarVfs8r0FYEniOpifvP/cnLnKzMoHD6Xfqv3uAr3wvhd+7h41/4II01Nnb5LqVKn/3tN1q42DGRyoxye4Xixgm308fy2RWexRKPsICTaCIDezSSemASM9tTpSXef79O3TdW79fGpLn//2fvvb8ju8r83UeqpMpBKuVSzjmrJbVt2oHGNgYbbDDYwHhgmDXpy/2uuXfxN3Dnzp3FnWFYM+CxCcYJY3scGuPQtN1KpVYOLbVaOYcqSRWkKpVKumufU2q3hBu1Mbibsc5ahh9adc4+79ln7332+7yfz/X2y+jIefwruOZGGbvQR8cr7fSNzMoKFxmFcOoL1F2r/+8HJSEn0k8r+aumFEq1l9m8+DhdF2Z56mwhQVMF932tjrr6TNKtBuy6yPuws43fE2R728su6yx19jD0o5fp6BrmHDD5CR32rnXbHxYAMKbc4Hls28z8rZ+noKqKv82PozHFhM6sRSUqj7d8hILb0mamf20W/5yTjs4efnLmIh5N6jXmfbF9WUxBpTxelheaMK7PEbMbIspgRqHWoYpSoFRpUGi1KNlC4Z9hddXP0EwMuwodedlGYs0qdsXuabQKhVaPMnobVWiJ1ctdDLzzMs6uEc5NwOR6ZNzMKaL+tBg386RxM8WsIGZ3C8K7bO6opB1OXcwee9vrklrg9MVeut49S9fgBN1LsOA76H2+327tXgil0YZCoyNqL4oohYpojRa1Yg/tng//wgjT3W/T3jXAyx0rjMzL+yyZkfXM766LxI6SnriMfApO3UVVVSknc+PIilWh29siKhxmM6RgTyEgARVRYS/bazPMX+ym9+236Owfj8wX1wcACLBTX3mK8spK7q/OoCrF9LvrJK1YJ4XYC6xKKgsjrW9yoedaioKfsBc+LgcK7qa2oY6/uyebatsyoeGX6W518rPXZugc9fxeEDTalIrScYL8/AzurdKREDXLdN9Zhkcm6J4EtzINfcFJisvLuftENpWZsSQYFGgJs+0PEt4VWsZ6FNE7qHbW8C9PMDfci7P7Ii82jzI8HSnN3J8HKgv4h6xdCnVK5j06dnaVWHQiYSGKkhQo1Uq5X4XW2F4ZZaKjm3efO0/niorh0rtIqa7kGydSaciKJc4k224qQ352trfxbe2x7V2B9UvSOPDvv2ylY2bnI313DExF2n+98+G11mmbOoYrP09myYcbx3pHjxUjP2Fv9PHtHkfgTx6BGw4AaMQmPOSlw70CAEiAhF3YWIT2Xhiah2lRNS+S1vsWABrISoHGcihIAHsUrE1B+3vQPQUXr1LUMxohORlShRS/CWwxosgE9kQC3AuLK3BpBuY8sg2fwgCxCZCYBI5kyE+AaiFWGQbXIiy4YcIPSxuw4YbFdZjwwNphSwDZkY+STPhKCZSagHUYm4Ffi8r+ZdgSKaxoObEurlVTBkVJkK4C3zQ4z4l1I/gdYEpDgvozrZCshJAHxiZldYT1XVheg5kZWBT2BCJHrwdTPKTEQp4VEnWgE/DDLuwEwe2GyTmYWYN5AUFEKkR0+/cvLAfE3sM2LLuRinuscRAj6lG2wBcCUTqjMH3IOAlOUA/xNigW92qBWJHQj5JTJD4fLK/AtAsuHVCSkl8FlYAGrJAUBwVCsdkABgEFCHBAiFqrwG+Xz39sAXBw+DgGAP7kw+mHuMARAMBuaIeQf0uq1o4SG3IqpZQEjt4ThrbrLHVdoO+Jp2lu7ePMWpjRQKSq35SF0nEX1Q11/OVD+TSUxGGNEpvpcsI3uB3G4xN/G43JqEGj3k8tXwsAkD3nzLnlpN/9EI0NVXyp2EKJfb8yXSZ/RcXe1tIUywtLjM2vs+gJsyEAAKMde2o6KclxZMULclwlS+RHQrW9No5//E3ahKLBiyN0XFyNJKIjVgYFFdR8/ss0NFRya46eLJsK1VW/FxCAdF9+D56VJZYXIwDAxD4A4MEdDuPbEb6/W2xt+vB7PPiEt94Br7rDz+4IAED68z12tzele19f32B2eROPwMFExAxGTIkpWK1mbFqF5A8sH/vS8j0sX/ipJC3/xDk/3ZORLTxLGmTeQnl9Ld+4t4ymwgSSNMI/9aDevvBYDW+t43WtsDQ3z8zsHGNzM0zNrzKz5GPdu0V4J0QosMnWphefbxNPxEtMPOnf8TTbv31NMphqKaur49Gv1XOyOpWUGDDud5NwkL2gl3XXClPj08zPu1lxiypDDQpbPLbkRLIyUkiMM0nScDH77RabHDsu5juddDz5NOfb+nlnAyaCN6p/yTesTpLBlroTtfzFLVnUZdrQqyKejld1iXDQT8i7wvrKEvOzoo/tAwBu5l27eHw77GwHCQQ22fR78fq22PCHCAjzouPjOALHETiOwA2IwPsAQBZlUcNMicT3s804B4Tz+LUO4TUeIhzcIhTaIbAD0aY09Jm3UFFfy4P3FlOZpsXomSfgdjG3usma2HSLjiHGYiXBkYrdANadWeb7L/Dms6/R2nWZXo8Cjy0Pa5UACat4+NYkiuMEBTaPd3WNOXeAjW0FYbUJoy2WlPRE4jQ+dGs9DDo7eOKpFqZ8OnI+/Xmyq6rJzkwmM9FAphG0AjycmGd9fR0XAVaXRljslxUAzo2CMq2Oux/7e05WZlLGEKPdTr73xDs0d08cCMKVxEhjGaccfnSDXfT981Ocb+nnjPjLSvk8DXUVFGr9WPa8BHzr0njv8oZZWx5mY+plBkem+HWvGb+5gqrPfZ6GmnxOJe9i3/OxMrvEqtsnVeFtK/WorcnY4iykJWpQey/h7n6BzrYunju3Rt+ClYCxmqK6Oh75egMnSs3Eb88TWltlcsaDyxeW4q42W7GlpBBnhIS9eZYHOzn73Cu0dF6iax0WDisR34C+eEMv+SEBgGgBoeisZFfUcudDD9NQ4aBCO42np4PXfvgazXPRDFTfT1ZjFd85Zac+UU14I8jWul9aC/p9boKBFeaGRuh+tZWBXQujpx+hoLGU75ZA7uX+A/1q2hJ5v+pqefCeMqqyDFgCy2xvuJhdXMPt3WGLGFRGC7bEJOxmNYkxHrxjvXS++hLNHS7emSpEn1ctV34XQ8JSMwNOJ99/rps2twWq7+dEYyXfOWWlxq5iaymIz+Vhw72Ex++XNgHCWjNqewZ2u5HsuB1Y6OPyb56hpbWHFweDXPbZiYktp6haKIE1UF0YS8quC7zuQ+00Y0uMx2o2YYlRYlRuoYtaYraj87q8xm9oX7kBF4++8t1Wy18+lEulXfiyv0Jn6xD/+UaQNUMed37ji5ysTqZaM4VrsINnfnqG852XmQrAxhWJj4MJt8a6ZBxsod32sulzs7a2wfyih/VNedyIsdhIcDiwG8EWmmGxv4O3n32N5i5Zmcyt/XD9Ms6sxK524R3upfuZ12jtGOIdV5CJlCI4/QhN1+j/l/djfui7uEo3jH/g32hrGeXHb2Thjs7nts+WUlWbQ256KimxemI1IfB5cE0tsb7uxouXRUkB4CyDFyeOFQA+oD9fNwAQUaZIKrzB89hCiK7sU9gyy/lyehoNGXZSM40YdQHwzuBd22DWBe6VZbaW+2UFgPfGCcfmXmPeF/oW7ytl1FXGEutfQbmxinfVJX0/r26LDUUzilh5PMyL3yEmKszSyh5Bjxft9pK0nzDnCePFiMLkIDbeQo5DiXp9kOX3nqattYunnH4GXFaU1lKKqmp44MEm6kviSVNuEOVzMTu3wuq6kGYXZVdm9HFJxMXqcFi22VkYZPS3L9Pi7OW/+7yMLNkOtTuO2M1V1H4XQe8aa55NFjxhfOEYUNuw2mPJzorFtLfEzvg7dLZ18MR/j3BhRN5nyYisZ35nXTTgBr2DrPIa7vji3TSUp1Fh8KALuCU7pNW1LfzbCnZjzGgTUomLM5BuC8NCP+NvPU9rWw+/Gtji4rJQxrtKkeTwvDQoKzCZc8pIu/tRGk9U8aWCGHKUftYnBHCxLqlCbkbrUesTsMXZcKTp0QSm8PSeoavtAs+/M0PPxIYEQh02RLkBQ/mNuaSjEBq+SENjLf+7MYHyqFFW2n9CW8sFfnbeT+/0EZFRW8GYRVJiHJW5KowKN4uTIywueJhf06NILCbz9vuoP1HK58pMZOu3CSwvsL66zoI7gFcoXGitGG02klJjsSi9xKwOcrHrAj9/6TztA9MIN4zNjFJ5Hqgv57v5KqqNYdyeAC63h9VFN15vgO09BQqTFaMjA7sthvSYdXyDF2j/6XM0j3k4F9+AJquU+0ozOZGfTFa6lVgDqINrkhLI1KKPDdcyeCcZvDjKs78ZZHzL9JG+O4SCgigk2v2o67RZP+/ENaJLLvlQ49jI9BWTnBvTv46vehyB4wj8j4vAjQYAog2gSIKSLPhSMZQJAesNGB+HX1+A3nnZ416qZ7zqSEmE2kooSgWHBsJLcFlI4s9CbxjcKtAbICkeCtIgKx4cRiSlJlGzuicq/v1ysnl4EsaWYMoDIR0kZEOGEIy2Q5YFUgwQswu+DfBsyd9a7nVYmYPLi9C5AguHGygS/ilQlgmPFEKJDsRnsrjWy/0wsAh+ISIdScQkJEB5KRSmQI5Wvp8hJwgnSF0pxKVDuk1O5AulTCG8JJL+HuGEvQNLizDYD5NrsKQHVSykp0K2uH8LxAt7AWHRLaCDEKyvwdQMjC0gWWSK9otb0NogLQdyE6FID7owLLsgHAW2WNAoIOwFVxDJElOhu844LUPnOmwowB4PWYlQngQZZrAK1QFJlRr8fnCtwuQS9M/DlIAAhPKgSJtpwGKVn01eonzdZKEWIZQKhPLBJnh2YSUG9HooNEL0HIy8Dd3j8B5wsNzn43udNxedrPb8G+L/b9RxDADcqMh/0HWPAADCm1sEV1xSZUfIHotSpxXgDGqhv7EXYmOim6mzP6dZeEF2+xlYkBf46pQC9LUP0NBYx7dvSaE23YSw51VEwAGPL8zskhaiNKQmajAZjgIAZM+59NIabnnkCzQ1FNOQpMJhVERk6cV1/Ximhph57wy9vSOcnQwxtr5HaE9BlCUdTWYDxWVFPHDSQVm6Cb2QE4nks3f9S+ys9NHT6uTnP3mX1t6piBS97FGnTYokDE7U8vBt6VRnWhAq7Zor+XBRer/LbniHUDBAMCDk2bfY9G+x5Q1IdgBbQT8+jwu38PGbGmNsaIjx6RXG1mDtd8yJ9x/WUQCAnMgPrs3gmXDSPzDMq+0LXJqTzWGs6bnk3HovpSWF1CdrSLmSQRf/use2axTfyBnOtzr5wSvjdIxEFvgq84EP76aafGriVZK/8IFjNywlaULbQYKSJP0Wvn3rg80ttvw+At511pZnmZ8cYWxsmsHhFWZXNw9VDB3qnPZcKBYJ8Tr+/tPZNOVaEZfef157m6uEXSOSBcErb/TSO7LA2vYuATREqS0k5hVRducdVJTmUBmvImm/3UIhYm8L92UnY795nObWLn45AEPLN6p/yfctWQ+IjZnqWh546KRkbZFtVGB9v4NJf7e3u8NuKEgoKKr4hc3EJv4tvxT3wFaITa8X39oqy/NTTE2MMDI+S9/EBkvrn/TMy8006B635TgCn6wIXAEAqnIoE5uCEyM8+/YgA+P72iuH4yHPazubHgKuedY3vCx5QZVSTPbtD0mWMPeVGUjZnmax9Q2GBi7x3nSYqQ1BCUdjcuSQ3vBpSouzOZkK+tUeRt76Ca3tQ7wyqMcbGwH66gu4NT2IwXWZS785y8DgOF1ru8wHhZ2OifisAkrvvJ2yAjsVxnn8vZ289e+v0DU0z2RCMpuFFRia7qS6LJuvZkHK3Bhjz7xF/8Bl2gkzFfAS2FjC4/VJUvpJxX9cAKDpRDklJi+a5WGm2t5iYGic1rk9Jl0ehJ2QJ6hjMVROanENDzzSwImCGDK2hlkdGeaNd4YZHFtlLbxHUBNHtKWA7OIi7rqziKKEbUwrHVxuv8Czz3bQvqhlKe80BQ11/M09uVTHrREee4ORgUFec3q4NB+S4q5JzsZacwelxTnck6UiztPH2LknaGnv5sVuGD7odPDJegnE3X5IAEBtTkafXktZbS2f+2w9dVkaHFvDTDid/PSJtzm/qGGh+n5KGmv5zqkkTsQF2FsYYmxgmN+cG+Xi5DK+cBCPx8vaggtPQjbe049Qe40EqCtz//2q4b5yK+lRi6wPnOXi4DBvDWxweXmbMNFo4jOwltxKSXEenykxkbQzwdKFl2htm+ep91LYSyw5AgCokdpbb9siPDfE5f6LvHlumKHJVTZ2YducRnRaE8VlhTx40k6WepqN7hdob7nAk2dXuBxykHDi89SdqOLB+kRy1Kv4Bs8yMjTyAe28haLiAj5dEkdeXBjtzjwzbREFBeewZKkx98nriR94x+9/t1Xz7Vtiyd+7zNK5p2hr6eOpzjBL5hKKH3iEkycKuNfhRzvTTeuzz3K+bZD3xObVFU/KgwBA04lE0lQ+ohYuM+Nspm9glHfHPEyuyeOGKS2P9KbPUFaUzW0pYfQr3Qy/9b4y2bLhw/XL4uJcTpcYSdqeYKXtZVpFArRthf6Y7I8IAPTw4zf0jCwZsSeZySoro+LOz1JZlE6VTZThXKLrhffovzjBMDvMe7z45pbxePyyAtxxPzu4gVpcRe2X/oqTdQWcShCwSdcHgzkRZYqC6hs8j/Ve4sWpeOb9uTj0ddRWFvPZhzPJTVmA8V8xOnCRV50wPCW8wzekcXd+1U9CfsV1AQCN1RZStmfxDg3S8Wor/SMzjO6Cy5hGlBgPSwt56FY7RYnR4Hexcukiw+feY3B4mv6NPZZJIspcTX5pEZ+9N5186yqK4TfobO3gh6+P0+eLk0Hz+hr+4pZ0yq1+wrNORoYu8mrrLMMzXnZEFbU5FWVaPYUlBXyuMYE87SqhS7/F2XaB/3h9hM5RURjxfkK9scZKSniBzfEh+t5ppv/iNAOiPUGx+5lCZmERp+5vpCRLTaK3n4kOJ0/97P19lsRrAQAT4QOFCLXJIYwrbUxcHOK/35vl4pRobxR7plQU6Sek9t7flEiOZoFA/2s4Wy/w+FszdI2L7/ujAQBHaTVNX/lrmmqLaLK5UUwN43zpPfqGphkJ7+GKshKtyCGrqIjb76+gKCMK23of084OXnrqPdr6ppmSi+w+mUdmCdzxME2NVfxflUaKNweZefsJmlu6eLYnzMDiNUs+IhshwuJLT0yMBqsxSrK9CPi9BAI6trbTSSuulhUh61OptHiIWrhE31vv0j80ycDaLstBoQ9sJj47n5LbT1FaEE+Z0cX2WCctv3qBFudFWpZgJjECADTU8N0iIzWqFdYmnfT1D/Na6xwjM0LBJQp1UhbmmrsoLcnjvjw18Rt9jL/5OC1dI7wwGcvsVjrJ5mIqKkv59BdLKc4Em7uf8YsX+eXZUYZERifkZ8MTZGYphMFRIBcS/YHfHS0dI5LSauCjrtN6hnlqMIqptZQPNY5dsVD4ZPbu47s+jsBxBP4EEbjRAIDKBrpcKBcAQDrkRoF3Dvon4LWLcHFVlrQ/bGFoNMm2AUk2SBJJ/U1wzyKp8U4EIcoEmblQlAaV8ZBmEHrI8iFV3otkdzSEBTzthrFpaBuSq+ctxZApHMti5d/pVbICs6icF5bRQaFQsAaLEyDqaH47B5PCd+DqQyTr7DLY8HAZlFshxgez4u/7oWcOpvywHuHyDEZIFPdjgkQFhLyyWoDGANV1kC9sA/VgFdXyQsEgDFsBWcpfJPTnp6HTKasTrKdDrANOCLsAk2ybrdgT9n2yl7SQzRcBDfhgZgq6u2FoEUQpjCIBCkqhNB2qzGBXylYBIl4xGvlaW0I1ICArLSh11xmnZfitH/aMcGselCbIdgdGcS/CzVvETinbAAiKc90Fk5MwOIukJDUrli+xkJ0Kp3OgNB5JBVMnYA6RWhKWDuJ5RkEoGlRKJHVO/9QxALDfLY8BgD/BAPoHn/IIAGDHu05wbgJRrL9mz0RptJCokuUupEFs5SJrg7+itcXJf52Zp/Oynx0UGHPLSLvnKzQ11vCVQgul+5LmYQ8E51jZCDO0FAdKI0UODXbzUQCAkK5LkqR/Tz14O1UVmWSZ5IFIHFHRO0RHb7Ex1s/467+is+sib83D+P6AaEyF5BNU1Nfx2IM1nCxNJl7QWfv57O118E5wscXJC//xGs2dlxgFIoJbsC8ZXF7BvbeXc6I4lWybjni9Gq0qGuUVr/kPfhJyJaOfTY+LNQEATI4xdnGQ0fE5Li34mFvxsrG2gdcvCPz3iSzhDwi3U9VYx7f+sYimRrsYfxCfs9IhRq3dLTamBpk6/7qU0H66Y4mBfQAgu4zs01+jsbGOL5SaKYrfV0yQf76zPkVw6l0JAPj+8320CbMX6ZCVD/al96pryri1MJG8JBMmrQqtWnHFy+UD71jMDOEQO8FNCQBw7wMAo4KGXmBydpnlDeEv7MflDbG5fahCPTEbKk5TWVnGY5WxVCXqJLWGKOl/FbC1CK4L9Pf08uzLQ3SNrESAgki78yso+NxDNDVUcl+egfxYdeT3cmLJN+dkoeOHkvLBT96F3qkb3L/Yl7Qtof7uW6mtLaA6y0a6XYc+RoVGGY3oYgf1F66KfCTe25te/O5VlhemmBwfYWRsit7LS0zPu/BtrOHxbrK2GSawj/z9wQPH8Q+PI3AcgeMIXF8ErgAANYWUqebZds/TMjjHjMiKf+AhVtohAu451sc6mZ5eoX9Biyq9ivqHH6GpLo/bYteJmu7i/K+ep9k5RMs8zEROZ0wpJFmysKnhwVsSyVaN4ev6Ge2tPTzx2z2WFFnUnD5NeYmDYpuX3ZmLdL/6Fj0D4/R5YWlHC0orSYWVVH3ufprqc7gzI4h+rIfeHz1Fc2s/b3jhclpkI/GoitLIPV6vFcL1KgCcrC+mzLBC4LKT9154lub2wQNxwJQFkhJTDd9+KIfq+HWiL75Ff+sFfn5mlAuX3fK8GZEUza2s4Z4v30lTaRylyhk2ei/wyuOvSpXmg+X3k32iju+cSqVSO4237xmcLU5++uYq3WPC8gCUidnoK09TUV7Mg+Vm0hhjqfc5enoH+XW3TKp/oo8r6+1qvnMqgQrNHOvdr3JxGhZPCQAAIABJREFUYIS3R2BCfPlfdagtKRgyaskryudTtYlk6tZRTLTS23aBJ1/uxblhxV99P1USAJBMrXGF7Uu/oaulg5++MkrHSOT57p8z51r9dZgzaAmUyO/XyfoibksIoFnsp/uNX9Hc3sdvhv2MrUYA37hM9AV3UFldyUOfSqfQtMzOpTN0dy7ys7cT2bUXHQEAHNFeYxYk3yEpiP31w4XUJq+hGH+NC61OfvjyBJNkUPjAY5w8UcF9GWFsq4MMnnme5rZeXhn2c+lKOzPQF9xGTX0dj3ymlLqsGCzhWRbanccKAAd6mryuNu9/t50o5Sv5EL/SR/+LP5MU3l6fggVLCQmfepiGxkoerdaStjnM1JmnaGnp5oXBIEMr++v4QwBAfSzpUUt4R7ppfvk1mtuHeG/Kz7QoLRGmValFJNc/xImGGr7UZCdHeZmNrp/RJo3XYVYMJR+qX9acqOPRzxRSYfeinHqTnraIslsoicDpR6g/ary+pgKAkx+/AV0RqYDrrmD/RA961775647fTTePHfwur8oRu7D/RpdQELyqf1wZdq+V4O4+qADQVKXHsTXCnNPJCz9+k5auManCae3QeNiUF43Jf5mpTiev/OLXNHdeZtgLq8ge7OUnavn6tyo5kRMidu48vW1O/uX5HoaC8bLVXEMVjxSqSd8c+8B9A4zCCFYo8NXytS/U05SpJMHby4jTyY9+ep6W3m02qCSnrk4a55uqDThCl1nsPtSebfm7Nreyjnu++QWaapIpVU7h7uo4sM9iuyYAsAOZDRSUFfNAo4Mi0xqKmXNc7B/khXeXGIoQRwprBursU1SeqONrny2mJnETw/w5utucfP+X/bQPifHtaAAgpyICaNYWUKadwd/v5K0fv8z5jmE6t2EhHLEmLC7lji81UFFoJC08iXtwgLMvtNJ9ceaTDQBcWV9U8N0SFYWr/Yz+8knOt/TwopBF/kPJCFUS6Kspra3jkccaaCjRkLjZz3yvk9efO0drz6Tc/7cj+z855RTc/UUaG0q4t1iB3TN4cJ4y7yvB1PDdEiMVgXGW3nuJ5tYLPNm+RM+sTLKpEwrRl3+BE401fOuuRIo0F3F3/JD2K/tG12ctsb+flpxd8BG/O4Z5w6slkPdR12k9/OztBfom7Af2F48ax46nseMIHEfgOAJ/7AjcaABAJxK5pVCVBZ9LgJQALIyCEGZ8bQpGNz74jlVq0BmR7B9Fole44gX94A2CKwzWRKivhEoHFOtAvwOra+AWFfy7EK2BWBtYRVV5WK7mb+uCCR9spYAlGQoTIVMoAIiK8r3I+TdhJQCrbnDNy/sqHcswf1gB4GprgwqoSoT4Pdh0w9AEjC7BpA/cQRDO0XuiSFcjK2NHbYN/Exa9YLJAbQmUZEBWHCTo5RzgbgDW3eAVlfs7ML8AFwdgTST4yyAjExpsEB8lwwprorI+BGE1GC1gE0oHQi5/AfqdSDY/HVsQioPSaqjMlCX0Rc4xtCUsjsElKux9sOmB5aAMDCiN1xen6U24qAZrPNybBwVGUPhhU9gp+MAnPl+F0rQBUsyg3gbvLAxMwOuXQPCoMZlQlAWfz4J8sbzdBL+wDLjq96LyP94IphgZlNiYOAYA9t+gYwDgjz16fpTzHQUAeBYIznRKg824sRqlKYlCC5InqDjCnhm2Z1rpaHHyn8920jq4ih89CRJJLTzNK7klWUWaMZJpD6zC2ggzGzu0eDNBG0ujQ4PjSABAcFNW7CmpFNfmkZYeK3l2aCPcgEIZhTommsD8LIvnWxkfn2FwC5b3kS2lCbSpFFXX8cWv3y9VHGQLuckIQMDOBmzNcLnFyRs/eJnmjhF6kP1FpEMZI0mLGVJySCqrp7ysmDsr0ilPt5FsVGEUmiS/79jbZW83zI5UvS0sALz4PGusrSywNDvO2PAIfRf6GZlcZsoL61fMNI8AAMJ+CC0z192F8+f/LSUAzroDTEiYFaiTC9FXiw+YOr75qWTqMoxifJNIMnHsbEwTnD7P+RYBAPTQFpHCk6cA4atnw2jPIKuolLrbTkgV9SUOC8mWGGIUSDYKH3zIigh74bBkASA8kbf8Xvwb62y4V1mcGuVy/wX6hsdpGd1gRuirXH1Y4iGjlLS0VG5J1ZNmVkWS3/IHniK8gip0gZnpCd5t9zAxG5QSELv77U4vxnjLF2gQH251CdSm6CWkQX5Ke5IEykrvDyTw4b/eFNIsN7h/SU8kBq0hCVtSEQWlxZy8vZSKUgdZCUbsRo1kOSFkg35fvHd3ZAuAYGATv9+LZ20V9/I8sxOXGO3rZnB0mu4pPwuRjdePMnQc//Y4AscROI7A9UTgSuL7RBVlpi2MbOHa2GIzeJip3j+bWIlv453rZ779ebp7Znl90AGpNdz7zftorIilKDzMbH8HTzx7lpaeCVxbsBk5nVKbgdZ2isr6Wr76dWEV4CFm8g262y7wg5cnGJjbwZqQQEKClTS7lr0tL1MXR1lcckvSagGlQYL+7LmlFN1yO03VOdxTqCFOVPf89xO0tHbzwihctN5gAKA6hzLlGHMDTn78szNSIuDqOJBcAEKJqaGS/32blZKdMRZ+8zztrd38st/HwNK2PG9Gi8orAwlFlZQ+8BBNtXnck7KF7nI3HY8/I3nNn827n4QaGQCoNi6yOfwqXa1OfvHqJJ2X1iWQYCcmFqUll5RUO9X5KnS4mRoZZG52RfKp833ShWiurLflBPiJBMA1i3fNw6JH3ji4+hBeyhpTHCZzDHZzmJ2lIabffZn2th5e7NpgiAx2qu+nrlEGCsqV46y1/UKqfPzFeR+905Hnu3/SawIAU5zBQVSl/H6drE6kRDHFylAnzz/9Buc7LzEhrCVE2YFQLNLEoTQWklWQz6duzybL5kM53cz4sIdfd6cT4yg7AgA4or3KFNDWU1Zfx9e+XUt9bgjr/Fl625386y8HWVSmcdujf0NTbSENFuEz3MXZn4pEzRAd3jBzV9ppRmlMp7i6jge+KsaNJDJVs6x3HgMAB3uavK6WK2Afpakuh1tsK4SHO3n7iV/R3HGRDiFVackjpviz1DbU8K27HZQYZtnsegGnsBA7u0LPhOzpDYcAgEod6UK5ovsCjz99lvNd46xuCv9uuT8ptZloY8V4XccjXyu8Ml53tY3wg5cDrOuyPlS/LKmp48FH7+BEgZ6UzT4mLkSU3fwmlk4/QvkxAHA90/af/G+uGwC46eaxPw0A0FCqJMndwSWnk/98qp3W/lkZ0Ds0HjYURmF3dzLsdPLjZ1tp7ZuVrFOCJIOyhtL6Or76tydoKIoiaaWd/nYn//x0B1N7idR++a85eaKY2xPWUY/1fOC+AUqttN+RU1HLZ778ME0VDikh7u3p4Nc/fJXmCx76qMQeAQAaypQkrXUy2nGoPbvyd21aaTUnv/oNTtZl02RZJNjfeWCfxXBNC4Al0MditNtJSUsgXr+NZXMc78oKg1MBltflBZ/WmoI1u46S2jo+c7qOqtRoUjzd9F/o4P/5+Xla+gRodJ0AwF/8PSfriigzLrE94qT5qedlYGkNpoW5K3osiUlkVhSQEqckbnMK/+ICgyMu5l2ysuEn1gLgyvqijO+WRJM31c/gD2WA7FU/XPpDA2PJgvQ7JSDw2w8UUJvoInryFQbanfz81SkuDG/I/V+oV4h9q4QCjKX3UddQzddPJ1Komz44Tyn2lWDKZVBhboiRJ56lubWXF10BhiP7Z9ExOSjNp6lprOVb38qhPHmM7d4fSCCivG90vQBAREnUYPqI3x1jvDDqYCfto67TLvHr7jUuL4j2v19gdAwA/MmnvOMLHEfgOAKHInCjAQBbIuSKRH0W3BYLFg/M9EPXBLy5BGOHE+uR9kdHg0IJSqFOLCTg92A3DDsKCBogOw3urYQKO8QGYGURzo/A6Cp49kA43iTnQF4S1JhA54XxYRiYB6cA2sQ2VA6UpMK9sZC6A64ZGJ2HtmWYWofglryvshaMVNdfHVsx7aggJRnqy6EyHYpEYjoKfH7wbcp7DuL3PgEl+MDliSgYuGDFh2S9qVKB1SzfT00JFCaBQwXbK3CxGy6Jyv1dWBROWBtgi4PKeihOgxwVBFeha1AGDuaFwp8JjGmQlwy3xcuxmb8EPRPwxix49AcBAAEt+F0wugC/nZQLJcJiny4sWwZEx15fnNQmiBXxToMmcd1tWB6X49nlhgWxnNRCWhKcLJKVC3QeWQXgTKfc9vhyyM+C+jiIDYFrWv69UygEiP2byO8bCyEvXrZK2DwGAK70ymMA4GYa/o8CAESCeKaZyY0wbVF1KM1p3OZQkSH078URSej3tzn5xU/f5HzfKjPKVJIr63jg6/fTVFdAvhFiBYnEHuGNKSnhPLERpjlyvlMODZlHAgDyh5fBZCLBYcNi0R5IQCs0GtQmI1Fb2+xMzrElvOY1KkJqFWqlEpVSi1JhID2/kKZ7T0vSwOnCi+UKACCUCWaZaD1iY9AYD8mlZOTmcVt5OuVZCTjsFuxmI3q9Fr02hhiNCo1KgUoRjSI6iqgPTNrKlejbfjf+5XGmhwfobWunu/cyF0bXmJb87IVCyhEAQGgdNqcYaXXy8r+/wvmOSwwjKgEihyUX0u+htrGOv30wi6YiK0bZxkQ6JABgplkGAIRH6xUAYP8EctxjUzPIra+nsCiPYoedtHgzVqses0GLIUaDTqNCrVKgVCh+zz2LWw5KujLrCxNMDbTT3dPP2Y5RBiZWWPaG8Uc2btEK8+YELBYz6SYVFo2YycQhI20a9RYm/RSBoI/pBQ2+TTUalRKV+E+pQJmQiaLwFopLC3iw3E5pwtUAAGwuO3EN/BvNVyo2bpL+FVECSErPovLWUgpLMshOjSM5zozVoMeki0EXo5b6mBzv368MsBfyE/avsDozyqU+J909g5zvmmB4Zk2iECPfuTfTiHTcluMIHEfgf1gEPjoAsMzrg4WoM+p46G/uoLHCRPrWCLOXhnnurSFp/jh4iMqWIrILC/j0F/IpTAtgXm6nS1TCPd1B64BQulFhslhxZKZiMOrYDgRgdwe1mLdj9EQZ7ZhTMnEUlFCcm0Jjlhbzei8zZ39ES0sXz3TBgP4GAwCVmZQxxGi3k+898Q7NAlm/6ojOLEF5h1BiquQfK7WUBKaYOfcG/YNjnD8g2S3/yODIJqHhNKUlWdzu2MU41cPIU0/SPLLBS4Y70BbV8s3T+dQlbaNd7WJmeJh3mmcYnlzDsxtmayeanZAWlXIXi9GH37/OyIRL8uo9Pq62AJBBiiaHDlVQrInCkg9fWNKgE0tlAVCG2dvbYTccIhjYwLsxz9xIH0PvvkX3wDjt8zBnKIDq+znRWMV3TtkpYZilsz+iTfTPThhYOBT1awIAC5yhEE2t/H41VehJ9/dKCZ0f/uQ9mnunDlk2yZZJcUlJFFQ7SLBso14ZYXUB+qbysOdXHgEAHNXea22sd/L95wZxqdO455vfpqk6i1LlOCvdTp79j9c53zl6qAJTXtflVtZyz2OPSQmoUv0c/p5jAOBAzxCAdEwqBQKUEN9tFcnkK+bwjQxx7sVmeocjla2GFEiolSty78ig0OYmeuotyTrtiV8O0zEkAHCRADsEAJQpcax1MuB08k8/b6W5b/ZQx0wB6iTg45F/qKOhdI/4lXb62if4l6e9eLSpH6pfShXHjz1EU3UKpeop3N2RiuMNDaOnH6HwGAC4KYbj6wUAbr557E8DAJy4hjf9YaDmev+usUyFY62bAWcH//Tzdhajk7jrGwKcyqFaJ/zrr7FvEOkdScXVVH3p2zTVF3NX8hoxg520f18orbg4SyWGCABw7fbIJzrqOWuvqZAgr2eidSaUcSnYrAbSTSEMij22thWEwwqio6LQmWzYUnLJyC+grLqUnLgokjeH6O1w8r0n36G556DSwrXam1JYSf0Xv0lDfRknU7YxuC9z+dxZhobG6XLtMucPEw6FiBL7DCYT0aFNdhfGWXevSepTniuFGzfF6/XxN+IAAKAgf6afof/4GedbennFC5f+0PjE54NI6DfW8g+nHVTqJvB1P0l7awdPvO2nZ+IQWWDIgoQ7qGqo45tfLaQ2dQ31+GsSsCoUhDp2hIbvIzQdNQ8c2n/73QT59QIA+49C7Jt+lO+OaZ7pKmQv9aOu0xbpm/KztJF6DAB8/G/J8RWPI3AcgasicKMBgPikgwlnvZDw74SucXhHOHtFChd0MWC3gkEIRIp1yaGnGA7BtkjIK8BlhZw0+EoxlAonJOF3PwvvDMsAgEClhfCiPQsKHXAyHuJ3YE3I4Y/Di6MwLKaLIhlM+GYS5AoVolG5XWdE4vkaygSHO5fVBpnZkJMC+bGQbASzUC8Q8ILYbhDKBUEZAFhxwbRI7C/CtFAY8IF/W2SrIDUVbmmAygzI10BgBtrPyZX7/cC+oWdyvKwYkCOS7Lvgc8HAKEyvw4a4oA0sAkZwwJ1CbGoP1megR9z3CLjVB5+HVVT+j8n3/fIkDB9WEpK3+46Mk7BrqK+X21+qB6UHxkbg4hz0rMOiAAA0kJYMt5RBkR3ihTLDFJx9D1b3IKkBMjKgQNSMumG4X1aKaF6BabG+0cigxGlxnTRwqCF0bAFwpUseAwA309B/nQBA/3KAF7wlKM0Ovlr8u5L+kxecnHvyRc4P+mg3nCCuso6/+HINTWXJksSHIVpOeG8u9rHa8wsmPLv02x5Cl1jG9QEAMkGrVKmI0apRHZKgj9IZibYnYTLHkqIzkGAxYYuzYLOZsJqMmPV69DFarDYL8SkisWxArwTV/gi+c50AgFIDWjN6gxG7RUecPR57SiYpjnSyMh2kp8STbLcQZ9YdlMq/BgSwu7PNTtCH3zWLe6qXAWcPv36lm56RBeYB71EAQMAFGyOSAsMPf/wm57vGECrIVwrJVFmgFxLAdXz7b/Jpqo3DKkNK0nE0ACDHXa3VY4y1YTTFYdbGYU9OxlGUQWZWMrlJdlJFrM06jDoNMVJi+hql6sIkZTdEKCDUAJaYH+1jsPkNnN3DvDPsZyIi3SphdeoYVCoVelUUqisWCzIAYDQbSHLosdkt6ESixmQlzmrAajJgNuowmK3E2BKk559q1mCOUUYsAOT7/l0A4CbpXxElgBidHqvdjDEuDkNcEokpDnKy0slKTSIj0UZirAmbWY9Bq0IlvHWupQywu8NeOEjQ78brnmFqsJPOt96go/eynEC4lgL3zTRGHbflOALHEfizjsBHtwAI079Qhr2wji//3a001SeSHuUlatPLzJKHDf+h0ukIKGYwGUlIMWJSrqNy9dLW6uSfpISmAADMxCWnUVBdSnZeGo5ECwlWHbYYFTqNmmgBFer06ExmTAYNcfpdtucvMH32R5KnqZRgvckBAHVOGfrTj3KysZa/KzFQqd9ma2WJDY+P1YAs23b1odQZiIlNwGzWEq8NsT15gfEzj9PcOc3z04VsJ1VzzwNNNJYnUWjcRLvjZ3nFx/qGj63AJj6hOrO+jntpntWpUcam5ume2mBx45Ne+h+J8qH1dkOShmivh51AkE1RObBvkSsM5cIBgpsbeNxLLMxOMnppmMtjk4xNLjG36pcBPvsfCwBY5gxlxNTJ79eJUgUprnaGnE7+v6c7aBuYjygsXb2RrUETo8Vo1RKj3iU66CW4ZWFjs5Scyto/EQDQz/efm8KtSeOz3/oqTVVJFO+NMNnl5F8ff5PmrvFDFZjyui6rvJa7vv5tyTqk2rxAoLfj2ALg6hffkAoJJ6g4EfluK7SSEHIRcq0yMbbC8ppfjqswW4yJw2qPIzs7jjitD9XaoAQgv/DEWVq6JyMAxsHESENJNEkrrRIA8C/PdNIqSlwOHElANaV1dXzlHxporFCTuiG+h6b4p59ssKFJ+FD9Mq20hpNf/QtO1mbTZL2q4nhNTc/pR8g+KvFzbAHwsaw3jkoMz0VacfPNY38eAEBTRQxp3n4G2rv5v3/SwXJUAvf85WOcrEqjNHqEqe5r7BtE4m7MryDlvsc42VDCo7lB4ke66f5/n+Z86yq/oRLtxwQAqI129MmFpGdnUVmUQlaqDbtBh1GrQaVQoNFo0OoNGIwmzFYzhigP2o0hab0ngZHXCQBoUwuwNXye2voavlSbQIktiqi1ZbY8HlybITy+Tba863g33KyvrzA/Mc1ozwhTc6tS9ZiwyvxEH1cAgEq+WxJD8Vo/Y688zvmWbn55CYYOWRxdd6zEeFz1eeolpaNEShWXcDU/TlvLBZ5qC9MvmfNedQjFjBhZQehRoSCUJysI9UUUhNq3E24QACD0Nz/Kd8ccz3SWgeOjrtMCbEhWkOnHAMB1d8LjPzyOwHEE/hQRuNkAAJ0LxttkBYCzPpiMgGvpSXBrNeQmIZXq7deP7sdkyyMJ+jEahHYjxCXAX6RDsUiWu2HZDZfXYHVLTqgLCwCNCRKskC+qxcU31pKcCH+6HwZE2uw6EttHPRO1GvQGMAi7Agsk2SA/DhwWiDWAOQZ0CojehVAIfEJ9YBUuzUDLKEy4ZWAh6ToBAK1GVgwwiPsTCm9RINQSNFowmsBihbg4SLNBgRX0IVifk8GHX10El+oQkOGCyVYZAHjbD4d5P64TAMhKgztukZUQMoSFgQ/GFmBhHdZDEBDxjgaTCRwCTDAjWYV7p6H3rGzbYL0FEtMhTUALc/CuE7qETUQQ3GIZogBHCjTUQlUmFBogevbYAmC/jx4DAEe9rR/nv18nAOCc8PDj0XSizGl8+1QqtZkm1EKSfC8Ae+usDF5g6JdP0zYW4E3D3ZiLhERkBidyLejFQCk2NPe2cF92Mvabx5nwwHTRX2HLqbtOAOBgUBRqLWqjFYPBiM2kxWC1oLYnYYtPJCMhAUeCqJq2EG+VAQCTXislS0VlvkLB71blXy8AcOjZqPUW9PHpJKSmkZ3pIE0AAHEyAGDWqdDrdGiNJvQGA0apDRq0GoVUZXh1znYvuE7YO8VYl5N3nnuFls5LdK3DQuAIBYCtFXAPSRX8H1QByBEAwdEAwOHOKH/AGO0JJBdmkJ6ZTF4EALAKAMCgJ0anRa/XYzIYMBh0GHQxxKiVEmxxJY8vTX8hfAsjLHWfwdlygeffmaFnYuPgBm60SuiDEqMzYLUaMRpMGGLM2GyxJKUlkJicQEKinfg4K3EWA1azAbO4pvb3gwi/CwDcnP0LtQ6MdqzxKWRnppPpSCI9wUZSrAmrAAAMOgnO0Ol0WIx6DPoY9Fo1GrVCnnT3b2svCGEvaxN9jJ17iea2Hp4XEsILhxNnH+fgc3yt4wgcR+CTEIErAEBVDmVRo6xMjPDs24MMjO8zw4ejIAODO5seAq551jf0LHkryaiIeM7WJeKI8qHe3sLtC7G1ve89fY1oBt2wfllSQPnxrzoZnA5itOeSkZtPdW0BRfkpZCSaiDOq0UXvEb27w3ZIqPAo2VSaidFrSDULT6BOSQHgzwcAKEd/99c42VjD3xXrqTTsseXysLkVlD7orq3IetiCYZLXB+149LmUnaqlvDyLcoeF1Fg9egFKiDXVboidbT+BzTXci3PMj1xi9NJlei5NMrbgPqjw80no9B90j4csAGpt22zPXMK97GJqA65wEvsAgH+dDdcS8zPTjI6OMr3oZskLvv1KuivnO6qiPtKYayoArHCGSgkAEJ7OR1V0XvvxHVER57Zcp2LBtc5zFQDwzQgAgAwA/OBxAcDKAMD7hYaihEJDtgQAfJOm+hyqTMcAwOHnp7RHpP0b66TvtvoMHfqAn91AEM9WmODOvjSF+GpRoBQJN5MejTKIZnue6U4nbz/5K5qdslXAfOjDVkYeUgyo0JLuH2KgfZrvPbHGhtr+ofplakk1DQ//taRAd5t9id2BThn4cKvoOP0IGccAwE0xAl8/AHCzzWMfLnF2Zf3zO4o911eZ/ocqADTtv0fObr73RDsr2PnsNx+jqTKV4r2LXO528s//9bakHCRb6B089HnlxN/7DU42lvFYQYikS730/fNTnG/5cPPFUc/5mgoA/QuSFYEtKZ3conKKCnOpKEwhM9lCrFZFjGKPvXBIqsoPBUMoNVr0cQnolVvoPUO0t+3vi1xnnIXpbmYtuUXF3FuZSWVmPAlWLWatEo0iiujdEOHAJlseF57VOWbHx7nYNcTw6AyjC2ss+faVG2+K1+vjb0RGMXzqyzQ21vB/VlsoCw+z2PIkLS0X+HlrkL6ZI9bpwnoiJhajyUiyXYtRHYJNF15DCvOZpymuKOM7t0WUjn57ldLRYZ5MWGEIoExYYfyvBk4U72JfbJasMCSly6D9YwYA9i017R/xu2OeZzorJQDgo63T9rvGhwOZPv4OdXzF4wgcR+B/egRuNAAQlwQFwgIgE5piwbQGkxfkyu6312E8Ur+QnQp3NUBRKrKSsizoQowaLMKnXuRsRIW+F86IhHusXLlfqobNDdnDfi0EW/sLLfE5FQ16LcRbQCssBNzQOwFPdUOfmC4/CgAgTzuSRYFWFAqqYFcNZiNk2CDJDHEmsOpkv3qLHmwG0IncgR8mp+G3vdA3B3PbYEm6PgUApUpO9ov7smhkyCBOJP3NYBPK23ow6cCmgwRRiR+E9QU5wf/CELiUBwGAmIUjEujXCQDkZsDdt0FVBiQJkcUgzInncigNohLqCMJ+QbRfDf5puPQ2ePfAdBvEOSApBHNT8FIzdM+AYBv3DfCSkqGyBqqyoNIM6vljAOAYALgZR/HrBABaulb4wZs2QqY0/vKxQhqq7FijQBsVhr0Q3plu5lp/Ts9CkDfV96F3VPJodRwVyTpZKmV3C3ZczHc66XjyaSa8Kryn/4qU6j8MANDGJmPNrSUnL5/6gmRyUm2IBLTJoEMnSdKLRLsKTcQCQClk4X+fJP8fCABEK1UoNXo0Wh0GvRadNka6rpBnFxYABls8tqwiHJnZFGY5yEqJxRGnx6JTSX63kxIRAAAgAElEQVT0VyCA3RBCrn11wsnouSdobu/mxW4YXrzZAAB5xtvfANTptRhj5FhLkvRaIwpTPPHJDgpyc8nNTiM7I4EkmwGTmBQizhHCDkJsN+z4lggs9jHY0sFLT71HW9/0QQlXYdpidJCUlkVlVT6FOalkJ1pJtAqgQiS7RRWahhiNGrVKKf0nWQAcYUVwFABws/QvosXsrUEdI0MVwmJCLywARL8W8TbYiI5NJzE1g7LcdPIyk8hw2Ii3aNELX6L3O5j0nm67p/BfbuZ8q/DC7sc5fK0E3M04WB236TgCxxH4c4zA+xvgWZRFDTM10M2/PtuMc2Dm99xOZHM3uEUoFEdgp5KCGnnjq6HCQJJvFO/iPBcurzPnPqLCPOSDzSWmp5d4r3MFvyaRglOnqa4u5mSuhQwzKAMeAr4N1tbWWHGtMr+0xOyOjkljKcnpDh4sN+HYGmDh7I9o/TNRAIjOKUP5GSF1Wsk/Fqsp2XYz0z7EzNwKIvLXVpATX6ghAu451sc6pbj1L2jY2DVitluxJyeQ7HCQmppCRkoSSfZYbCYDFqMWo16NKirE3pYb1+Qgo8436ewdOajw8+fYif8Ybb6y3haVbAmUq2dY63iJgb5h3hyB8f0KuYgFgJD/DwUDbG1t4vP62AxsS558V5QCPnEAQMQCQJXGPY99m6aaLErV47i6nTz/H6/T3DnKGLB25VnJVgV5lXXc980vcbIujSLdHL7uYwuAq7uzIbOEhFMP09BYx6NVcZTHa4gKbrO7s8NOeO99awrpR1FEK5Qo1GoUihAqNlgZcdL/kuz1/PoEjK7/EQAA7xADzmm+9+SHBwDSy2q57dG/lQCABus8ob6I4sMxAPDHGMX+aOc4KjG8rwBw881jH046+8YDABf43hPnWMbOPX/5NzRVZlAaJSsASOBU92FwSn7EtvwKsj//mAQAfDE3SOxwz8cLAFwOQHIl+WXlfP5UMXV5dhyGMJpwgA33BusuF27XEqvLLpYXN1DbUsi+9TSZqSbSQ0MMXPiQAIBK7FpbMZjsJFmTSE1JJj0/BYfDTmqsBbvFhNmkwxCjQK/YIexdYn12iKHOPt45003f6L5y4x/tFfnzOpFYj1TeT31jLd+5PZkq3Qz+/uclJYbH31iha2x/i/watyUp0dSTX1LAfbclk2/dgJl2RtzwynYdVkcu3/lUBAA49yPaWrt4pkP2TD54iPezgfITdXz9/6jmRPEO1vlmettuFAAgWxHFZRR8xO+OYwDgz+uFOG7tcQSOI3BUBG40AGBOgLRyuWL7LjvYt2BhRK5If11U9HvkO7DboCgbkq2yirJS1ENaINECFaKS3f/BAECFDsLbEIr41h/gqcV5FKARcgLbslKAAACe6YWBjwoAyNOOlMhOFlX+Qh06AMGdCCQfDWohtqwBsfQR0v2VOZATB4kKCAgrgAHomYI2F0THXh8AoDeB3QHZSVBhhzQT6NWgEZYDAkqIAhEDjQpidRAV+JgBgExIEooEuyDEQ0OHuEShViBEqMVzUUfLtgyXzoJvD8y3yfeWtA0Tk/CzVhkAEAzB/mkSkqCsWgYAaq2gOQYArgwBxwoAR42GH+e/XycAcL5lku8/t4NP7+DLf3cbJxszSI+JwiKy+2JQcQ3jGX2ZS+4Q7yruIiY2n3uz9eRZxQgk9pLX2fNPcqnFyWs/fJWJLQP6L/0VeY0fDgBQavVobQkkZBaQW9FAeUkhJwQAkGTCqlWgVe1nPAXes8teOEw4vMNOKMT2dogwCqI0epQqNTH7g5Fo37UAAIExmWIxGPQk6pQYVEqioqNRREejFOXs4QDhwBoej5d51xbezYM1dVqLHWtmEY6sbAoyHeTnpJOXn0VaYiyJegWGKx4Ecpg2l3pw9T8pe9P/xkfXmPDGvJ0qUZnzj0U0NdqJ/f/Zew/nuK47z/eDzrnRSI2cc86JpChK9FDRVrBsybIcxuPx7M7uTu2b92r+hlf13ttyjV2uGdtjr5Nsy7KksSVKlmWKYgCRASIDRI6NBtDohM7dr053gxIo0SRNSqIl3CoVVWTfe8/93XN/J/y+gVgijx53XAFgK2oQoNYKCXoDOp0SlVRYJUiQyITfngCsBfA7HbhWrTgce9HN1qvllzhjPSU9BgAoLSmmqLiIonwB0jCSZlSiksQkYaKHiLt3hdmLPbz53Ze50DPJALAuUYBMhzYlm7SiKsqqKuloLqO2JJNCs55UvRLxqqPS99HN8jCRcOxdBwQbIBjBH5IhkclQa2LF8vi4E4vzZg/bo9+JxfkNGLgSa85H3r+iIkJ6NDodKWY1ep0oniQglSQglYp4h0gI+fA6nGyvb+NweQ4qJKgTwSQUKGIAgLLSQvJKiyjKNVOSpiZVKz+oBODZhJ2xmGXEj85wfnDhoGXER5l7Du91GIHDCHwqInD9DfCDnvXXD0YKUE5lSyuf/68n6ajVkeMaZWtmkjfemWVicecg81doq8kMaDRqkk1SVJI9wk4L62suBqdAmVnOPc8+xpHWQtpMLtRuC1em5llaWseyvc36pjUKANiQp2Ep+AwVNVX8Q7uJ8uDYnQMAJEwwex0GXnZVE21f/HuOdtZwPMeNerQ/vvE+wmkRpBt45l6NY0E13P80Rzoa+L8a1FR6Vph/6wxj47P02kKseQ9y/qJAM1MyGrUctcRHcMeCbXoSi22PFVkqIaWOVF0COqVQUpKi0hrRJWeRmJRKqslIsikVU2IWGelJ5OWpUOzNsNP7Mpe6+vnJOQvDi4Kf/Sk+brVgf6NQ3er1rqsAsM5pylHsf181KnLsvVzp7eHff95N18jKNd+XCmRGdAYD6RlaDKowMp8dl13DirWE3OqGD8kCILaBv5qQxZEow7uSY8nbMDvEhV+8yvnecS7seFnyxLwtZKpU1KYqappbeezpE7TVJpMrW2Gn7xAAEOtaYn2mJq2ygZrPP82Rtmoezk4gI+JhfXmLXcdedG5/jVMISNUgT8Zg0pKdJUViG2PjnV9EgVE/73UzsipWKQ1UxxUlOmpkZOz0Mt1znf4kJJvVMcnm5/6+hSMVEsw7gwx3z/H//GybXWVGLO/fsF/G8r4Ybx74yleiUud1ynl2B3t45Xuvcn5XxeSpZymLKgAkUDI3wsi3f86Fi5d5LQgz++kwsxxaHqe9s5X/eTyLRvUkztHvcOma9cLNFrBv9Bl/Wv/9puN3141jabcknf3xAwBihfD1cAonv/pfOdpUQpNqga2RXn7xw9c43z/DchAcV6cDYmNHRWZVI01PPcfRjjLuz3KiHOun53/9iguXtjlDA9qbVIy50Xu+ngJA16oUWc2DNLe38M3P5NGcEka2OsP2yipjK9ssbljZ2rJgtTqxWCGpoILOp56kvjyFkuA4E/03CwDYie6Ua3R6UjIMGLQqlCEpEoWaiFGPITmRnJQkzMmmqI1kakYaGbk5mPVhkoPzrPX2cfrfX+di/xVG3+OF+6n7rhPzIe8Eje2t/N1jVbRmuVGu/SlqJfSzl8bpGbNiF0WQ91klxBny5nL0NY/S2tHEV05lUKlbxTv8Cj0zdn641oTcXMp/fzCTWvU89u6f0d3Vz0/Pubm8dHDfTaIsQGY8QWNHK1//RhXNBXaU82/Q39XDd1+aoSeY9RErAAgdVDN5tU23ue5Y4pf95YSz4+ugG46H15unOVixunHsHdxfbCyeh9HvMHDNOPep68eHD3wYgcMIfGQR+LgBAJoUSC6H+kJ4NAvyBTliBYbn4D+FR/xWrLirVkNqcqygLlZOGgMYcqA4A46kQKIADggFAAec1sYVALKgXg0BDzj2YHMP3PvDVVwBQBSaRT1KAAA8uzC5Cm9MwRUxLN6OAoAoFKVAhgmaEiE1Erv+2g5MbINVCCNFF8ox7/r0TKivjUnkNwnupRPWJmPM/NOr4DfcHAAg1QyVtVCXDy1JkCwFpwPcXvCEYkz5PRnoNVCUGLMAsK/HABcfpgJAcV5cAaAAMkUdygc2GzhEu96jiCkAAHIhPi34lwlgX4W5HgjKIPM4ZOVCZgAWF+GXcQWA9yoPijgKBYCGQmg6VAA4kEcOAQAfWVq9iRvdNABgmG//eh6rPJu/+dqXONpZR0OylHShFSK43K51AuuDrLnDXJbUItVl0GSWkqGNiZBH3BuErEP0Xezh339ynoVgCmVf+CYttwgA0GcVktlyktrGBu6ryaM6N5lUwTpTyVFIReE0/syREIQCBH0evG4nToeDnZ1dfAlqJMmF6I0mzHrQ7Zu4XA8AkJoNFW0UFxfyQK6OEpMWqUxI2svRKiVIPBY86wOMTkzxu4vLTC3HoWLxZkjlShRaA2qdLmpDkF5cSfE9D9FYV8m9eVryhW7Mew6/7Qru2Teikv7Rhcqk0B3+KAEAIo1lkplfSPOJSkqKUzErhUeMHIVGg0IejjJ+dicmmXnpLGMTiwyKgv3+M8QZ60qVBr1eh96UjdZcQ0VdNadO1VBXmoZZDrp9JYCIG0JWVi/2xDcWxjgDzCuSQF9CQWUN951qpaW+kDKznkyjYMDLUcokUTBCQpwpFwkKGUAvnj0Xjl07u+4QNo8GuVZPTl4iSUZVdMDev+31AAAfef+KwjnKyC0q5NipHEqKEzEmSNEq5Ki1KhQJXqReC2vjU3S/1s3ozMpBhQSh6aPQolJrMOq06DMK0RQfobauiieO5lCXZ0Cb8B4lgIAN3PNMXYxviPbNMAkI2MfhcRiBwwgcRuDDiMDtAwBiG2ilja08+ndPcaQpg3KusDs6yOs/P0vvyOJB5q8iFfSV5ORm0tmoJUPvxL9xhbkrbt4ZNKDOKudz37qPjjodhXujrE2N8qs3xhieXsfr8+P1+fB4vciyyzHe+wwtLfV8uUpJ3t7wnbEAaBRKCNdn4OVWN3PkmW9FmXdHxMb7SN9fBgDIroD2J+nobOZ/HkmjVrKItfsF+nqHeWnQzcT6wY1TU0Y2RQ1t5GankCl3EF5ZYOVcP2seBZuVx0ktL+R4kZxU7yqb/ReYm19nyK5mK6hEKZejUGSgkNdRVlPJA58voSzDjnLuTwx09/K9/5ykd+pTPtLcasH+Rh/jrV7vugCAOU5jRrL/fTWmU84U1oEeXvzBm1wcmL3m+zKDvo7iygoeeLCQygw/2s1hrozZePGsEYm55EMFAEz408h98MscaW/gmXI5OXtzzF94jQtdg/yq18LYqisaOX1GMZkND9DS3srjx4upy5GhC62weukQABDrWgYgh+KGZk59/RGONGdQL1/HMzvFW6/2MjK9ygZEwR8HDkUG6JsorS7jkYdzKDZtEh57jd6Lvfz76UX6rwhqzLsAgCONWnI8U6z2XKc/6Qsh836aOlr51tMVtOe4UC2dpa9rnG//xoJNlR/L+zfsl7G8X9XSyheeu48jVVoKPGNRIEsU8OrU4zz1LM2dtfxLtZTSpRHG/k0oFwzzeydM73tHiLzZIfJmK/98JING5QT20e/QdQgAuFFGuqV/v1FheF8BgLtuHBMCsO+uy29UOLtbAABLgaTovOJIWwXHUrcIT/dz9j9e5HzPBN1OWLnqnSIcbs0U1bdw6mtPcLQlm3rdOu6h3jhQf5cBGkj+kAEAvTYNWiEp39HA3zdpKXUtsPrqq1wemuDMlp8rDh8+nxdfJBGvrIzSukY+/+xR2irUZO+Nc7nnZgEAgr9VSG5JKcceqqS8QE7q3gJri4uc7lti0eJCoxTWegoUCjmmwjJy7nmA+socTmQ4kY8O0f3tF7jQPc5ZYOGWvoJP0I/lKaAtp7KplaeeO0lnrZHc8DTbIz28+Ys/ROcRl51gedejJ/7wcYZ8cR3lDz5JZ0cND1cpSd8bY+3sz+gasfP86jEUefV869kSmjO2YeJV+rp6+bdXF+mf3j04PKWVoa3+bBTA9Y1TuVTr5nGP/JjurjixJqHsIwYAxADM5U0tt7numOKX/Wb8GfF10A3Hw+vN0yZ48ewc44uJt5THPkE99fBRDiNwGIG7JAIfNwBAagRlDtQUwhdKoVIUzm0wITzpB0A4EYmidSTO1BeFYVFqSjNDVR3U5EKd8T0KAHY4rY4DAHKgSgqOTZheg3PLsLQvvRgvvOvUkK6NqQoIscqNHRjbBKtox+0AAER6z4OKHHgyA0qk4NmC8WU4PQMzAvcojpizG6o0SKyGhnx4Mg3y/GCdiwEAfjcPHu3NAQCKcuEzR6EhF4QWj8sK/aMwswmbEXBqIZQWUwh4KBfyJOBeh6GPAABw6ljs+US7BB/y8jBMW4gqYu5X75QqMBhjQA9dAvgEaGIetEaoOwYleZCdANuLcOYdGFgEQWXaVx7MzoaOthgAoEoHkpVDC4D9VHMIALhLkm60GTcNAIgxb+bDmdQ+/g2OdLbyQKGaEpMsJmPvc4JzDYcflhMyQaEnRw8GRczL1789h3v6LS5c7OU7v5tiVZZHyxe+ydGbBgDEmNLpFfU0PP4ERzrquL9IT5FJGZfSD0clzgMeN26bDfuug23nHg6XKwYAsLux7XiQ6M2Ya1rJzs2iIBESxT6VOK4HAMgsgeaHaGis5xsNKbRkGlHEAQA6hYSEvRU8yxfpudTLf7w4TM+EJYokeh9jJn4bfWENmSefpVNIbdaZqE1XH2CmB+1L+JYvRAEAUa+yMTEkfPQAgMLqOk4+/RlaGoso1hNlkkcBALIwCmxsD/cz+mOx4B3hdXuIK773QbpjTxwv5Fc2t/L5r5ziaFMxRRrYF4aI4a5sWC72HChwLCTmoso7Sp3YYPhsPe2V6VEgwj5wIBL0EfY5cTsdbG3bsDtcuPe8uFwu7HY7uwEVNmUeKRmZdNakkZ+mFQC3PwMA+Jj6FzGp1Ir6Oh7/eh0tjemYZVISlXJUAgAg2UPqWWOxv5e3f/IKF/qm6PfA2nU7WD5kxhD43/hCFUdr0qLoO80+MOYvtLq4m1LWYVsOI3AYgb+uCNw+ACC2QZhT3cSRp5/lSEsJR1JsSOZH6X7hj/QOTTHg9LHqCxMUFjWGXDSZrZRX5HOyVUOW0oJ98hKjI3ZO92ehyqnm6f92lKvM1P4evv+bbi6NrOP0y0GuQWtKJKu6nspTn6O1oZwT2Qkk2YZZeucndF3s59e9PkbVlQRPPUtHRy3/UiOlbGWCie+/SE/fOG8FIswGAoSiFgbBqHR7Tk0L933lv3C0qYwWzQq2yQFeeP51zvdNM++I4ESJymiiuL6J+x5/iramImqT7TD0FwIAkguh9CTN7a38w0PlNKbYCM++xsTgIL99e53hOSfuQIRgghyZSkdmYQkNx+6hLD+Z7IQ1XFMT9L/Sxeyenp3OJyhuq+fZVh0FgQU2zv6eoYFRXp/eY9IawB9KICLNQq5uo7q5gae+WkNDoRfD6jsMCunV31yme9zy19Vx73Rrb7Vgf6P73+r1rgsAmOQ0WnxVjRz54rN0iu8r1YZkcZzu37xF/9A0Q3YPq74QfuRIDQVos45S11LLE48WUJm0hXRSMOyW+d5rRrymDxcAMLCjR9vwIK1tTXz1WB61iW7Cq71MT0zxavc606uuqDCUPiOfrKYTVFSW014grD78KENrLHfHJeF7JukFrhYabxTvT9q/y9NBW0dNayvPfu0YHRUKMhyDzAnG5k8v0HV5CfHFxuAU7zkUmaBviTL2v/z1NtrLIMnazVR3Dz9+vpfukTB2GiiJFwiPtCSRF7HgGhumS+TrwSkGHB5WAxCQqJGnlZBYcT9NzdU8fU8qpao1XJdfpfviMD/84w5WTcnBvL8wFu2Xfe/rl7G8X9NUx2MPl1Gb7ka3IvJPL99+cYRLe6lwQnhUN/B/Nmmp2p1h6aUXuHRxkJfnnEw6EwgrDaiKakg6/gjtrXV8tSaJsoQRbKPf4eI1AADBkG556pscaavk/nQb0iuXufAfr9E9OM1gOMKaP0DA7Y3mf1HzuoED9ietd93weW4aAHDXjWNiZ/bddXlT6RrSyZ8w2jfIT88EuDwbIBLy4w8E8PhC5NU08+DX/xtHGwqoZZyZwZstTAv4jThu1lLj4O+O1KvJcwsrjdj9plwGyh/8Cp0dtTxcESZlZ4bZ37/OUP84b6+7uGIP4BU0J3kKKn0J5fX1PPDkERpKVGR4xlju6+XFH5+ha8jLIg1kf9gAAKcB7YPPcbSznn+sklK0OcHMr39F18VB/nPZw5Q7AZQ6VMnFJOZ00tBczxMPl9CQG8HkmORyXw/f/tkfuTC4h8ffQHnTvne6hAzrJaYG+/n3V4a5NOrF7SmgoKaeR/9WKMXoKQxOszYxwi9/10v/2ApOTwBfdI6jwFRaQ+EDT9LeXMbD+T4ME4MM/b/Pc6FrhDeAuKDgDfv/J+8HMcudnKomOr/4GJ3thRzNcKPemGL89bcYGpri0rqL+V0fbl+AQDyeMpUBjTaN3Moamk6dpKEqg3qjjchSHwOvvsDFIRtvWVvQlrby7NdbaSuTkLIzwMLlYX79+ij9E+vY9wJ4w0KuUo0hr4KszgdpaazgsUot6a4RFs98n4uXBnhhEMZ0NXcQAFAfU7qJriekZGz3MD04yPdfGaF/coNwOIA/kILbU0lZY/NtrjtG+HWvFHtiHW1ffJb2v3ie1sv3Xpujb+YgAOBGeSxw1Xvqk9dzD5/oMAKHEfh4IvBxAwCilfdkKMuDz9ZAQwokBWBzHd4ehbE1sHrBFYzN4SVx2fzcTGiuhspsyFOD1BFXANiC02FQJ8FzZVCpAq8AACzDH6Zhehv8ojSmBJURUoyQbwBdGDy2GABgcge2BA5TAAAK4BuZUBYEyxyMLMIfV2F2F8IhCIbAJziv4prvPQS+OxtqC+C5UqjVQcQOV1bg9QkQ2zFuYQcgzhNEwRTQlMcADY+lQLYPNmZjzPxXF8Crew8AQAV+wdrvgsvLMBkGi7hWIFYgf+x+qM+JqSKI4vmb3TC0CqsS8CeBsRBq8+CRHCiQwt4GjMzBy2OwJYXyJqgrgDYTqNZvUEBPvbk4ZWRASyvU5kK5AoKbMNQPIyswLsAOEaKuywYDZKVBirBPEDYBuzC3CMKRuq4DKvKhRAmhTRjrB+FketkHFlEGk0FOFnQ2QrXoFyoILh0CAPa75SEA4OPJsR9811sEAAy5UzGeeCZawP5mUzLNGepYAT4cjGqcBEQCS1BHM6RarCMlolLpw7k0xOq5X3G+q5+fdTvZNlbfIgAgxpQWE+jPfvMERzoKKTfKSVVJYgCEiA9CTnZX51ns72NkfJaLczaWtt1xCwAFfr+R7NJqjj1xiob6YkqMkHQjAIC5FGoeobmtif9yIpvOwkTUCRIUcQuABK+V0PYYly/28ov/fYau4QWEHZnzOu9Yll2JOs4s+YcjGbTn6A4w0z9+AEDMAqCgtpn7v/xVOtrqqE8W6DQJkqgkfRgJPuxzgyz8QSx4B/n1qJuxzYNMwquPH5fyjzI3v/Y1jrbXU2mE1P24XwcAsJFbgfnYk7S1t/J0Swb12foD1gEh9xaBzSnmpyc51zfG+JyFDUcIuyduAZCUh7/iPmrravhai5nGzFic9+vg71cA+Jj6F2LkqqCyqZkn//4eOtryyVMnYFLsWwB4SQjtYBntYeiF57lwaZQ31mD2uh1MSKm2xjZmv9nKkZYsshRg2Jc+OAQA3E3Z97AthxH4VETg9gEAMYlQY2ENuZ/5Ip3t9XyhWkMBVqwjPUyOT9M1ZWF2O4gbIxpzAfl1TVSUZdKUn4DWPsHKud/Q07PJS5fLkOU28vQ/3sORRh053inWRnp45aU3uTCwyozNSDgxn6KGOmpbauhsq6KyIJksbYDIxjirXS/Tc7Gfly9auawown3qWVo6GviXGhXVrkUW//AHRsevcMkRYsHmwLu9xq7dicUJhpLG2LynvZb7MnyoNscZfPM/o8yxP4wFsCSYMVc3UN/awIP31lFfZMSssuHq6f3LFAAUaaCvorq5lae/fIKOaiMZwTkcC5P0XhhhdGadOXsAt8yI1lxCQUkpbU1lFKVEMLgnmesf4DfPX2BgS4Ot4XNUdTTxrROZNJhchBYGmZ+Y5J3+RcaX7Gx5pITVmRiymqisreAzJ/IoTtxBMvcWPV09/OtLE/RMHioA0PQY7Z2N/NOJuJftme9z6eIAvxQLyatSSjeZFu4YAGCM00ix5leTe++TtHc08Pl6PQWyHbYnhpkdn6ZvbJk5q48djKjTiyhsbKO6Ko+WEiVG5zib557nUtcaP+8pIZz14VoA9MxGkJlqqGho4tEn22mrTqNA7kTmc7Fu3cPhDhCOCEsnNdrUZNQaPYqIHI3Eg1FpYb2/nzP/+jLnP+0AgMQCKIgx7//+sQpa0x3IF95kWDAlX5qid3L7gy0AJHqQZcUUWb76OJ2CiSidxTbYw+l/O83FPidjNJC2DwBozyRP5kW2tcTGSA8To1N0TaxxRcgvqjJJzCujtqWZ2rJ06jKDKDZHmHvzBS5eusxvR/2s6coP5n3JNtaJYWau6ZeqeN6vqsqntVRPsm+G3b5fcqmrjx+/Y2fIX4D4/to6m/mnExk0q614h88wfLGXX785xYhFgj+tkvS6JtpOHaWltoBmswKTu5+dD7AMy6gUEumxfH4y241m4wpDr77D6MQ8U4EAq9t2HIsWdnddUXbIvuLmTX7dn/if3TQA4K4bxw4qALRWulAv/om58Ul+1+tkcnGXkGeH3V0Hy5tu0kob7goAQN+6En394zGJ9fvTqDHtEZwfY3Vqir6RGaZWnay5tVFd28zSOsqrimmrSydTaSU8f4ahS7385JVJ+qZkuGmg7EMGAHQ59MhOPcuRzib+uUZDtXeRlXOn6e3q5+XuZSZtMkgrIaOslvqODppqi2kpMpKjcaOwzzA61MNPX3qDCwMu1mwN5NXEAAAdNXKydgZZnrjMi2+P0XV5m8U1BclFNXxG5LPWQur0drDMMnyhh9GxOSZXnWx6JKvj7IoAACAASURBVITUSaQUl1N5z3HqKjJoSnYQGe6n/3/9kvOXRnkLmPvEf7nXe0Cx0aBEk1dN8vHH6Ois4ytNRiq1HrzLc6zOzTE6Ocf0goUFixObLxZPfVo2OUWllJQVUlORQ67Bi95+mbmhXl5+8RxdozbmfVmkVLZw6rnP0dmUQ412G4l1nom+YUYnF7i8bMfiE3KVOWQUldHY1kB1oYlynR3vZD89P/sVF7rHeHsXFrLvFADADNRS3dIaW0/Uq8lxj7E2Pckrb19hbHYdf8DJ9q6axbU8sstrb3PdMcjLF20sSgtIvvdJGv/iedoAP+9xc3n1oAXAjfKYmFcdHocROIzAYQTuZAQ+dgCAGLYUIJjb7fXQkBNTAVD7Yd0CCxaYsYDFFVMCkGshORXyzFBthkzhcS8Dry0OABAMeytITfBYG9Slg0HIzVth8ArMbcN2ECQ6SM+G7GTI14JiD7YWYWIF3lmDRVEnqYgxyQUAoDICu6swswGXNmHBBj43OD2w7YO9a4mBMYc3yvPhsVaozwRTGPZsMLMEs5sw5wKbSOsySBTtKIJiM1RoQGaD+dGYAsAZC4RMcKw9Bkgo00BEABVG4coGzAdg3Q27NsjOhAfvh5o4AGB9Cc6IQrsFNhSgNUNtBVRlQZUBEoMxNv74PLx2GawSyG2CylsBANxEnOQGSCqH8hy4JxlSBMhjKRbPAVsMwCDXQHpyrG0ZalB4YW0FLg6DLQHSm6C0AFqE+7IfdoQ9gDjfCusi/jrISofWQihMitVeXPOHAIBDAMCdzJh36lq3CAC4tGmAqkdo62jlf5zK50iJKIgT9WP/wCPihZCdzYkeRl/+Kee7LvPqPOxlxTfCb1oBQAh2tFHX3spX/6mFI52ZZMhAd5XZ7AKfhcWJYc69+mZ0Q/3ivJ3l3bg7fVyaTEzUv/jcSY62FJKnhasK/NcrjCYWQt7J2AbZ4+UcrUzBJKRS9p834AT3GvNDw/zpxTfp6h1n2Opkbc9/DeNDjDBylLmVGI8+RntHM99oN9OSrb0GALCIZ/GdqDf9t18QjLmDTIMjnalR0Xjxt9HDY4Wd8ahigED4Xxi81lO54M8qCLwfcBBjHGRWNdHyRSFB3Mp9OXIKrlaQY4oOe5vTbI2epr+vn9++s8zglV1seyE8AgHynkMiVyPTmKLI+0eefZaO5hrKBOJN0PFjDwCRbTYu9hxA0O+U1VPy2a9xpKOVJ0t1VCTvezWI+4fxbc/jnH6bob5efntmnN5pa7TA4vLHCkWqwhpMJ5+is6OFv6tPpik9DlTZv+tmHztj34vG7fuvhxi4kvnx9K+4BGtJQzMPf+NRjnaWU22SkvZuB4sKsDoWRlk++zt6uwd59fIWI2t72P0x1N97D6kyG4Whg7q2Vp7+WhPtTZlkyEH/XgCAd5m5iz28+d1XuNAzSf97LRzuVF45vM5hBA4jcBiBeARuHwAQu5AirQBt9f00NDfx1NFiGjNkGH3L2C1rjE5bWNkK4hIAgNQM8isLyDarSJfs4JofYOjNl7jUt8HZ+ULk+U08/NWTdLZkUKmxEdyYZvBCF2NTVqZtRiLGXArrqyktyqI8TUNGsgpVooKQYxXH+DuMdvXx2ukJBrwprHc8RlV7E//UlkaD2oV7epj19XWmHQFW11fZne1naWktKiPnT6mi6L6naGtv4pFaE7mSTRyT55kYX+BP4wGspGKurqGotIDa/FQK0mSkaJ04e/9CBQCxGsFMbkUdxx4/RVtbMY3ZUoz+baxTE6yuWpiNAwB05hIyM9OpzNWSGLayN9/DYM8gv3p1hAGrEndBB2XNTTzzmRo6inSks4XXusbE+CJLazEAQEidjCGrhNycNKrzlei8i2xd/iOXuof4+dllLi8ctEj61H0gt1qwv1GAbvV611UAGOE0sJSSj7b8OHUCkHhvGY25KkwhC3uWNabGl1nZ9GHDiMqcSVF1MdlpSlLZwjnXH/++bJydb0BXus+0BLPlQpSBGlW02kmMFmBvDIC4EeNVcNLNZBaV03yqnYbGEurzkshN0qKRS1EkRCAsbKHc+H277AWlOCJpKOUJ5Og32R7q563vvByd/wgFAAHa/TQeiqwKtC1P0N7ZzDfuMVMlX8TR/yKXLvbyo7etDC2I7a4POmKKLNlVTbR98cscbS/neIYDxUw/vT96nvOXrPzJ0YC2Ll5wa0knM+xG47Phd1nYWNtgcmqNld04ACAzm9qqPHJMYbSeeTYn+rj02ht0D16h2yKkMK/J+1lKjCELrmv6pfJq3leTLtnFvTjAyNsvcql/nD9Nw3woFwqOUdfawlcfqqI9V0qSY4qNqSnOvD3FFauEQFoFaYXFNNTkUZKfgjlZjcw1gOMDLACSi2speeBZOtoaeKRcQUZ4h7XL46ytrbEW8LA2v8LaucssLlmiFhr7ipufxr72Qc980wCAu24cE+NqC9UtLTzzj02016lId83isKzTP+dkZc1CcHeexcUVusYsqLKq7goAwIUrAchso7KpkScfqqG9LJEcmZOIbZ3FqRlWNuIAAH06maWlZGcYyNV5iGxNMd/7Jpf6Rnil18rUmqCWvWvx0V51TZ4f21cuiL31G71ndUPrB8fHqoSOz9HW3sx/b82gSefCuzDI3MQ05/uXWXLEAADmwgLqavPIy04lUa3FKPVH88PalV7++NZvOd9npX+2HGOBkGA/QWe9iZLgIp61GbqHx7k4uMC5fit+XQ4ND3+O1rZajpXoyJDYcc9Psr60ysSqE2scAGDMzKKospisJAmpwQWs/QOc+w+Rr2YPWiJ+Wj/05FwoPUp1YwNfPFpGR5GJLHWIBNc2G3NzrKxYWDwAAMgkp7CA7HQj2YYQst0FtsbO098zzMtnZhhecOJGi6m4mtpTj9LSVsOxUj05Cjfh9Vk2VtcPAADMGRnUlKSSrt4jYWeChd4Bzjx/nt7RpZjl4Q3mQe8qOBzcP3u/1Ycpah1RUt/Mw18/SWeTmSqFheDOBgPjG6ysbeDfszC/5OZcvwSFueiOrDtGd3U4y49T+BfP0yY4Ow8Lu2Lf6+bz2Mrm+8yAPq09/PC5DyNwGIE7FIGPHQAQfw5TMhSUQnUetGZCngYUQXA4YH4DrNcAAFJ0YJaCViyHlOBxwPYMDM/D6aUYY/5IC9TlQ7EG5IJRvw5W8TsBANBCegak6aICBOztwNQ0DC8RXfesiLJHAdTmw5cLoFoF4V2w2mHaAWs74NyK/Tljj4EAPugQBfm2ppgSQJkejHGlAXGdAwAAPeRlQKoGNEHYEbL8IzGG/4gDEpKgoRHqC6AuEXQBsKzApg02/bC2DUtxqfzm41CeCxmCQb8NQzOwYAebqEeYYqoJOUIJQAUqUcdwwsI8vNMHGxEwNkHRzQIAxDB8E3HaDcO2CTLS4f68+DvxwI4jpriwE4oBANKMUJoC+gjsWWF6Ad4egdUgaIqgKB+OCOUC0T+8sOuAKStsCyCFDowGyE+ENG0MGOJcOAQA7PfLQwWAO5Q078hlbhUAcEXQiY/S0N7K3369nqNN6aTK3iMxfm2jgk7wrrHQ28PZH/825jXnhkjprQIA8oDjNHS08rf/Rw1HO82kJoBmvxDv2wH7FQb6+vnBL97iQv8Vtt0B9gLxCmliPhScoKm9lW9+roojlWkkSUF9I2l0eQZom6hpEdJjHRxpySFH+IMI7xZxCOWDkAf76hzLg+fovzTA62enGFncvobxIaBcRtLK6ql69DE6O+t4qFRHabLigAVAwDbH3vxb0cL0v/52gp6Jg0yDjwoAYCiuJVt4rHa28mxVIrXvUvaF3AIhzxa+nWnmxgY5/9ZFLg3N0bfoZs1+ECGsMGaizWuJSvk/8dk2WiqzyVSCfj9+kT2IbLF2sYf+/++XnO+KIej3KhupfzJmNXEqX01x4v4J4n0GcK4Ms37pebq7+/n1JQfDS76oxHIwHNuYzKhqoOGpZzjS2cBnctUUGeNWFfHX5rUOYhv7URRo8W+n3fRHAQAfQ/+Kwj/UZFc30vb0sxztbOR4lpL8dztYFHARcGzgWR5herCPt948T8/oEmNi0L2GUqROLcZUFfO8ffqBYpqKk9BLQHkVsGKHvUVmLvbw2vd+x/neKUaAzTuSTA4vchiBwwgcRuD9EbhTAACJMhGZMY/c8lraTxyjta6ApiwZqeowey4ffn/MAkCqkKHVSYjsWXAuDDE6OMRrZ4YYmt7B6taiz6+h/kGxsVzN8RINWZognu1t3C4fLr+ciFSOTi8nwetnb8VGglKJpjIfrT6ExjbFyqUe3vzRW1yaDzKae5SM5iaee7iG9uJEkkNOpME9XEE/W0sjrHW/wODQOK+NwWIgF60oQLU08/ipKhoLdSQFbYQ9e2w6IvgiCah00qgkv92tRKuSUJIdIDg6/JcpAAhYNyo0qQWkVHVS11zHg8eKqc7RYQq6kQR9uAIRQhI5MqUOhSSAOmRlZ26M0bNn6BmY5J0rduadUoLaZNJLa2g5cYq2xnI6CtVkaiL4XHv4ve/K48rVepQSLxr/Cpuzl+n90xm6B2e4sOBhefdTziC61YL9jZLJrV7vBhvfc0ojMn0eOeL7uu8eWusLac5RkKYO43V68PlCBJAjUcrQ6aTR78sxP/ie7wus7gYKGj5sAIBQklCh1iVhMmeTW1JIdUMFpcU55KeaSNEkoArZ8diWWZ8fw46OYP5JUtPTqDda2Lvcxx+/+zLnez/dAEhTcS1FDz4XlcR/okpO+u4YC6d/HlX2enHMx7j1eqL1MaCtWCfkPPhMVKL7SxVKsnYvM/vGD7nQtcZvxhqQFMT6QXO1HpN1DkXYTyDRTESqROL1ROUrA1I1CqUcoy6BsH2B7fEzDPcP8er5eYbnbOx4wSe9Nu8X0vRB/fJA3h9mbGiI184OMjS9wabAakeEUWcOhTUN3P/Zk3Q05FOXHMIQ9rBtdeL2QVipJSGUgMzhRqFRoSrOJCE4QWD0O/RdYwGgSC9GX/cATa3NPHOsgPpMNUqPg4jfgSdsZ2NwhKkf/Z6BwWnOCYDNjb7nT9m/36gw/K41x902jon1fBYFNQ2ceOYUHS2FNCSFSJKFolLkbtsq/rV+BoZG+Onrk7j1hXcHAGBkA9TJpBVXUnXPfVGJ9OMlJvINEvC4CPoCeEIykCpQ61RI/TZClklmRy/z1lu99I0vMmPzseMRynUfAQBgLgC5HdQ0NfOlh+rpKDZhTnCQ4HWxZfOwF4hZAChkQTRssReSsejPQqXWU2uOIHcMMNv3Q85fmuLFC2bcxkbu+dJnOdJWQntykOSghZ3VcS50X+YHv+1n3CLBVCzu18iD91VTX5iIOcGFLOjD8R4LAHl8/As7lrFNX+ByzxC/e2OGy7OxfZ847eRT9jW/53EVGtCnkJJfTlnzEVrqKjlRlU5RkhJZwEXI72PPG8AfjlkqyBVK1Bo1soibiGORtbHL9L5+gf7hKwxYXay6gwSRojBlYyxqoqKhnvuO19FQlEyB0oc64mc3+n5iFgAKWQS9xM2eZZL5gbcY7BvjT71bTK3tRdU5fXcMACAqNFrSS2upf+Rx2tuqua9QQZYmgsvlxefYJLx7hYGhKX7w21HWgkl3ZN3RM7HDpD4P5V88T9vA6gZ3QOwv3nweG77yKVfw+vR+0YdPfhiBDy0CdwsAQCHY6XrIz4K2SqjMhFxRDE8Ajxf8cQuABCkoFRD2w942BMX+eiqEfOCbhcmFGADAIoHsAqjKh3bhda8DmdgCCYIvAuI6KhUk+MEvivjLRIHKQppfFPM9ojxgilkTPFoF9WmQlADSMDgDYNsB6wKML8O5dVh8n1db7JWpjZCcBxV5cG8+lBpjdgOI4ryQ7Rf/L4i8MtAqIewDpxUml+DtKZjcBFHakYnieQnUFMC92VCghQTB8RXPHYTVZRjuBUHzMLVAfgHUCEEpYNclxhth+RYtISGPqw4EtLFYCgCEYwmGz8KaHwJNkH6zAABh4XATcZqyQLedaINaq6A6EwrVoJWAW9xTvBMZKCWxdy7AFdOTMLIE/VbYEDHQQW42HKmJnZ+jjIos4BQxEHGUQDACniCoZGDWg3flEABwCAD40NLnbVz4VgEAY+KrLaO8uYXHv3U/RzsKKdVLSVZ8sARAxGMlZJtgvKuH3/7wLS4OzkeZEBrhnSikcG9aAeDPM9nxCS3JOQYHhvjRC2fpGVnAHS8GyJRalJml6KqOU99QzVNtZuqydIgl/H5ZmZAbApusDg/T84vX6ekeo9fqYH5PjZs8cuubOfW1BzjSWUpdspx0Tdx6IB76oMuK1zLOldEJ3n57gvG5TbZCYdzhCEI0H4kGqTSJ9KIyak4cpba6gNo0OWbtPjVbZI4Qno1Jtod/z/mLffzgj8sMzIm0+K7X4EcFAFBklKFteJT2jlb+7t48WgqMByT4CXshuMv2yiwzfd2MjM3Ru+BgZcdHMCSeOYEEqRRVUg6J+S2UVVVwb2sOZdmGqCTK1YJ00E7Eu8RslJH+n1zomYoi6BP2vTU7W7k/V0mB8SAAwLU2wkbvC/T2DvNyn5fx9TBBiSj86FHr0iiqqqHzkb+hsbaY8kQpKVcZ9bEX5rdN4577Hf19Azz/x3V6Jk3sOI9Q0dTE3/1zJe+L84fWv3wITLW2qIaiv/kSHR2tPFaTRKVZHVXV2MenEHSD14pldpLL585xeWKeka0QG+4woajoggSJTIrWXEBK9TGqasq5vzqV4rSDChNhzybB7TFGu3p48UdnosyHRTE430YKOTz1MAKHETiMwJ+LQFZJOW0PPk5NcQaFLLJ6ZYLnTw8yMnOrmucxgFdiRj55TW1UVpXSXJhKgVmHUSdHpUhAEgkR8u3hd9mwrS+wOjPM8PgV/jRsYV5ouAF6cx6Zdccpr6qmrdRMcYYek06O5r3nO2xsr1pZnrTgTpCjrihEn6LAFLKyOz7J4EvnGZl1MakvQVdSxvF7K6kpSSNTK0UnF0k5gHtjEsvQ7xkZnY4xUJ1JoC8hP/77+oos8lJ0JGnkyBNCRPxu/K4tLDt7TK9DOAEKhfjR0hxzv/pjdJztFg9wq/FUJ4OpjPzSco53llFXlkFOko5krQKFNAFpJEA44MHr2sZuXWZpcpLL53sZn11jxgnbwsD6QNyqaCtNpTjDQKJWgVohRSpY16EAIb8Hr8OKc3OO+akJ+rqGoxY9i07YjV/nU/u1xJlxldWlPFmfSAFL2IZ+z/h+/9i+xcjc6vWyCqHlJDXVhTxTAFmrB/vVahSQeDvfl9gQL6Ggopz7Hq+hMh9MthHmJyd58cwM405dlBl44+dP+rPXmbL4UCaZMRqSMGv1mFOMpOeYMCUlolEbo/Zj6rAdz66FtaUlwsYs0o4+QUlRJk2qJXaHe3np317lfN8MM8Cthv0W39Jd+3NTXglF9zxIdVURbRkhdNtXWDj7BqOjs1y0wPJ1NpT2H0iRUYC24QQ11WV8tkRPTnCBrdFXGBmz8uZYCeGUWD8oyZWj3pxDioRQWgnapDQyjAoMSglSQoT9sXy9vTLF8uh5hsdnOTvpZmFrHzB0u/1y/0Fi10nJLaL82FGqasuoy08mN0mNXp6APCLylwvXpo3NGQtukYALBDh4BeZfYnp0kld7YWa/Mq0X+p91FJdX8EBrITW5JkzC11MqqDhObGOTB/L2uwXtu7ZLfKQNS8kvpfzEI9SU59JgEtrc07FxdSLO1L22NXfNOHZNP6osoi5DS4ZejiQBInub+DdHGBmL5T27PO068x/RT/5MvlzY14z48/lw/Dq/qylRYPYsMj95cL6lTs3BVNVBWUUlR8uzKM8ykWxQoBXfY0KEiN9LwOXEZV1la2mc8fFpznbPMb1ii65X/dxse2Iv8EbvWXm9+cyiF/SF5JaUceyeGmrLsyhI0ZGiu2be4tjEbplj1RZkYi8LqdpEbbaSxNAMjvmXGBmd5dVeLTZZMeXHj1NTXUyDWUm63AXORUbH4vHZv19xGceO1VBdnkVOsoYUnRKNyA9ijhMJEPDtsee2s7N6hbWJ7qjl5NkxOwvCKPjwuBoBRVIm2qIWSsvLOV6TQ2VOMimJanRqMd8FiYgnEcJ+HwHXHu7dTWzWOWbHp+g/M8LUwuZBS01hwqvPIbOwlOaOOqrLcyk160k3qOLvJ0wk5MfvtuPcWWd9bpyZgfOMTS8xuAbr+9aJN5wH7T9CRhToUlJVwcNfzKM0a/0DxwF9RgGZDSeorCqnoyiR/GQVYktU4t890L8WHIo7s+6YWGcSLcHbXAcJVdID4+EN8ti7eeawkx9G4DAChxG4MxG4WwAA+0+TkgwVpVAsVACEZbEAAciI5nRR6RLA5aAXHHbYsIJLDGMpsYI667C6EWPwC094jQly06ExFwqTIVkFOjnIxIXEdXzgEooAVphah/PLsLQvlCjKHkrITIOWEihJgzQFaOJlo6jiwAqIbbSoYsD1BFpi/FNyzNApxHlSIEUNeoWw6RZQ7tgREk7evthzWQTzXVx3FVbi7ZHrQGOG/HRoy4R8Q6xQHq3OhGBrDSaGYUvs85RAShZUJEGGsFOI30fcwyOsAnbAEQS3sBpQQZocgpuw3B8731UKhgyo0INiO/b34jkFYdFybbe7xTjtKaG4OPZ+i01g1sbeb1TJPByLwd4ebGzA1Axc2YR5YeEQt1hIS4GqcijNhiIDpKhicRQxEOfaPbDuiu3fpekheKP235nP6IZX2dvoYWvoO4g/P67jUAHg44r8B933lgEAYkGqJ6emiY5nvhhlfhzLVJJ3ldJ98CZCYt67fC7qAfvDXw1zaWwjuoBMvdMAgJAnCqFanZ+h9/wlxqYWmd0J4E4woE0twpxfTFFVCSV5aZSmqkjVyKJJ7ypsIRKAsAf72jyLfV2Mdw3S8844o4u7zKJFXlZHzeeeorOzngdK9JQkKQ+cHwn6CHkduHZ3sVp22LE5cbi97Pkj+JGToFCj1uoxmBJJSU8hKVGLUSlBFR0FxCE2utzYrgwy97pgwg/ywqiH8U2x+//RAwAkqhxkpk7qW1v58pcb6WjMwKwE3f5IEQlFF8J+jwvnzg67tl22bA52XV7cHsESkyFVa1DrEjGaUkg2GUkVm2zRQse7he3I3gYh6zD9glnzv89xcXgpiqA37XtrdrRyMk9J4VUFgJgFQMC+inu5h+nxKc50bzC1EcAt16NKySSnqISS4nxqy7LJSTNGN/aU++2ORzvssRLcnmBhepTzXSNcHIrQPVmDubT6gwEAH1r/skYBMW6xKVr9EC0drTx3spDWYtNBoEREQA99eF0O7JsWdnZsbDn2oqwEjx8iEjkKjQaNwYQhxUySyUCaUYlOKTugMOG3zeGe/yPdXT386MVJeie2ot/jp5yXeTdl5MO2HEbgExcBtU5PUkYWRp0aHW48LidL6zbsrlvdMI0xT+UqLVpTEgZjCiZtCuY0E1n5ekwGKYqwD9/uLltL62xZt9h22rE6XGzavbiFTIwA/qk0qI2p6I1pJOtSMZtN5Lz3fDGeifM3d7E6vXiRIDVokSklKCI+/A4nu6tb2F1BnDIdMr2e1FQDRp0qOqbLJLFxKuR14t1dx253xhioQUUUQqyN/96ckUZmbg4pJi0GiY+w0xa97+a2E4tAnAtFMQEv3nPjWrZgd7hjMtK3Gk+pAhR6tDoDqSl6UtJSSM3MJCXJSIpaijLsxC/YbDvbrFo8bFod2LdsOFwenPsI8QNxSyZZZyIt1URmbhKmRBUqSQi8Drzba9i2t1nfcWPdcWATPthiXiAWlwcdgj5x/fyGDxRnxhmMerIT5WjZw7+7jmO/f9wqQOJWr6fWQrRwriVXC2rPwX7lic4Wbuf7Eufr0BoMpGUZMQiJvIAdt8PBitWFIyCLMgNv/PwCSHD96wQTs0lpOUl1dRl/U6AjGyvOhT7mFlbong+wthuMglpCqPAkmMmprOa+x0/SXKKjxD/GXF8v3/3RGS4MLkQZgbca9hu+57+SHyg0OrSpGdH+kKSOIPO52LOKPONi2/sBnpLXPJdEpUVmSsNo0JOpl6EOu/E71rDbfVgcOiLKWD/QaRKQet0kICeiSsOQnEJObhLJRjkqfAQc+/l2E6t9iy2HC6szhDtKqRDH7fbLfXPM2HWUGh36lBQM5nQSs7JITzGQb5CiCzmj+WvHusPKhg+H6BjaaAIG9ypOh5P1HXDtK2+JnSu1EZ3eQHqSFqNGFCZFYSsGAAvYnQfy9jWCXX8lveTDa6ZSq0cf7X8aEgUlaC8+rjriTN1rb33XjGPX9CODjkS1FJUsTgwI+Qj77NjtsbwXSFBeZ/4j+smfyZeClhQ9/nw+dFznd0adBFXIjdt5cL4lVWpQGJLRG5JI0SdjTksiKzeJJJMSlSRAyGHHsSC+g2029xxsOpxYt924PH5BXiN80+2Jtf5G71lyvfnMXhhkWjR6PSkpRlLTU6PzltRr5y3bW6xa3FgdERwhNQlSefR9yCNOAu7V6LxpfUdKIEGHPjUVo1FHokqKKkHIBrpxOOLx2b+fTk9KqhFjajKatIzoPCnfIMco6HsBJ/bdXRZWt9my7uB1bEevb3UEcF/ryffhfTp/FVeWKNTIdKZofkw1qklLTSYtJye6P2GQg1JQGQng2xX9bZ2dLRtWn4tthxOb1Y7T7RMmkdE+FxsGROVEjVhPmJITMaamoDNnkpYcez/RObRnB", "<p>asdasd</p>", "<p>asdasd<mark class=\"marker-yellow\">asd asdasd sd zxc weqw zx ty uty</mark> gyh yuo uiojhkjhk yuihmbgh</p>", NULL, NULL, 61545);

-- --------------------------------------------------------

--
-- Table structure for table `quiz_submissions`
--

CREATE TABLE `quiz_submissions` (
  `submission_id` bigint(20) NOT NULL,
  `quiz_id` bigint(20) NOT NULL,
  `form_id` bigint(20) NOT NULL,
  `question_id` bigint(20) NOT NULL,
  `enrollment_id` bigint(20) NOT NULL,
  `option1` text DEFAULT NULL,
  `option2` text DEFAULT NULL,
  `option3` text DEFAULT NULL,
  `option4` text DEFAULT NULL,
  `submitted_answer` text DEFAULT NULL,
  `service_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `quiz_submissions`
--

INSERT INTO `quiz_submissions` (`submission_id`, `quiz_id`, `form_id`, `question_id`, `enrollment_id`, `option1`, `option2`, `option3`, `option4`, `submitted_answer`, `service_id`) VALUES
(63, 1, 0, 3, 1, NULL, NULL, NULL, NULL, "<pre><code class=\"language-php\">asd d sa das as as asd ds &lt;?php echo \"correct option\"; ?&gt;</code></pre>", 61545),
(64, 1, 0, 2, 1, NULL, NULL, NULL, NULL, "<h2>01320230</h2>", 61545),
(65, 1, 0, 3, 1, NULL, NULL, NULL, NULL, "<pre><code class=\"language-php\">asd d sa das as as asd ds &lt;?php echo \"correct option\"; ?&gt;</code></pre>", 61545),
(66, 1, 0, 2, 1, NULL, NULL, NULL, NULL, "<h2>01320230</h2>", 61545),
(67, 1, 0, 3, 1, NULL, NULL, NULL, NULL, "<pre><code class=\"language-php\">asd d sa das as as asd ds &lt;?php echo \"correct option\"; ?&gt;</code></pre>", 61545),
(68, 1, 0, 2, 1, NULL, NULL, NULL, NULL, "<h2>01320230</h2>", 61545),
(69, 1, 0, 3, 1, NULL, NULL, NULL, NULL, "<pre><code class=\"language-php\">asd d sa das as as asd ds &lt;?php echo \"correct option\"; ?&gt;</code></pre>", 61545),
(70, 1, 0, 2, 1, NULL, NULL, NULL, NULL, "<h2>01320230</h2>", 61545),
(71, 1, 0, 3, 1, NULL, NULL, NULL, NULL, "<pre><code class=\"language-php\">asd d sa das as as asd ds &lt;?php echo \"correct option\"; ?&gt;</code></pre>", 61545),
(72, 1, 0, 2, 1, NULL, NULL, NULL, NULL, "<h2>01320230</h2>", 61545),
(73, 1, 0, 4, 1, NULL, NULL, NULL, NULL, "<h2>0a5s1d32a</h2><figure class=\"table\"><table><tbody><tr><td>asd</td><td>asdasdasdasd</td></tr></tbody></table></figure>", 61545),
(74, 1, 0, 2, 1, NULL, NULL, NULL, NULL, "<h2>01320230</h2>", 61545),
(75, 1, 0, 4, 1, NULL, NULL, NULL, NULL, "<h2>0a5s1d32a</h2><figure class=\"table\"><table><tbody><tr><td>asd</td><td>asdasdasdasd</td></tr></tbody></table></figure>", 61545),
(76, 1, 0, 2, 1, NULL, NULL, NULL, NULL, "<h2>01320230</h2>", 61545),
(77, 1, 0, 4, 1, NULL, NULL, NULL, NULL, "<h2>0a5s1d32a</h2><figure class=\"table\"><table><tbody><tr><td>asd</td><td>asdasdasdasd</td></tr></tbody></table></figure>", 61545),
(78, 1, 0, 2, 1, NULL, NULL, NULL, NULL, "<h2>01320230</h2>", 61545),
(79, 1, 0, 2, 1, NULL, NULL, NULL, NULL, "<h2>01320230</h2>", 61545),
(80, 1, 0, 2, 1, NULL, NULL, NULL, NULL, "<h2>01320230</h2>", 61545),
(81, 1, 0, 2, 1, NULL, NULL, NULL, NULL, "<h2>01320230</h2>", 61545),
(82, 1, 0, 2, 1, NULL, NULL, NULL, NULL, "<h2>01320230</h2>", 61545),
(83, 1, 0, 2, 1, NULL, NULL, NULL, NULL, "<h2>01320230</h2>", 61545),
(84, 1, 0, 2, 1, NULL, NULL, NULL, NULL, "<h2>01320230</h2>", 61545),
(85, 1, 0, 2, 1, NULL, NULL, NULL, NULL, "<h2>01320230</h2>", 61545),
(86, 1, 0, 3, 1, NULL, NULL, NULL, NULL, "<pre><code class=\"language-php\">asd d sa das as as asd ds &lt;?php echo \"correct option\"; ?&gt;</code></pre>", 61545),
(87, 1, 0, 4, 1, NULL, NULL, NULL, NULL, "<pre><code class=\"language-php\">asd d sa das as as asd ds &lt;?php echo \"correct option\"; ?&gt;</code></pre>", 61545),
(88, 1, 0, 3, 1, NULL, NULL, NULL, NULL, "<pre><code class=\"language-php\">asd d sa das as as asd ds &lt;?php echo \"correct option\"; ?&gt;</code></pre>", 61545),
(89, 1, 0, 4, 1, NULL, NULL, NULL, NULL, "<pre><code class=\"language-php\">asd d sa das as as asd ds &lt;?php echo \"correct option\"; ?&gt;</code></pre>", 61545),
(90, 1, 0, 3, 1, NULL, NULL, NULL, NULL, "<pre><code class=\"language-php\">asd d sa das as as asd ds &lt;?php echo \"correct option\"; ?&gt;</code></pre>", 61545),
(91, 1, 0, 4, 1, NULL, NULL, NULL, NULL, "<pre><code class=\"language-php\">asd d sa das as as asd ds &lt;?php echo \"correct option\"; ?&gt;</code></pre>", 61545),
(92, 1, 0, 2, 1, NULL, NULL, NULL, NULL, "<h2>01320230</h2>", 61545),
(93, 1, 0, 3, 1, NULL, NULL, NULL, NULL, "<pre><code class=\"language-php\">asd d sa das as as asd ds &lt;?php echo \"correct option\"; ?&gt;</code></pre>", 61545),
(94, 1, 0, 4, 1, NULL, NULL, NULL, NULL, "<pre><code class=\"language-php\">asd d sa das as as asd ds &lt;?php echo \"correct option\"; ?&gt;</code></pre>", 61545),
(95, 1, 0, 2, 1, NULL, NULL, NULL, NULL, "<h2>01320230</h2>", 61545),
(96, 1, 0, 4, 1, NULL, NULL, NULL, NULL, "<pre><code class=\"language-php\">asd d sa das as as asd ds &lt;?php echo \"correct option\"; ?&gt;</code></pre>", 61545),
(97, 1, 1731901604, 2, 1, NULL, NULL, NULL, NULL, "a", 61545),
(98, 1, 1731901604, 4, 1, NULL, NULL, NULL, NULL, "c", 61545),
(99, 1, 1731901604, 3, 1, NULL, NULL, NULL, NULL, "b", 61545),
(100, 1, 1731633845, 2, 1, NULL, NULL, NULL, NULL, "c", 61545),
(101, 1, 1731633845, 3, 1, NULL, NULL, NULL, NULL, "b", 61545),
(102, 1, 1731633845, 4, 1, NULL, NULL, NULL, NULL, "c", 61545),
(103, 1, 1731858777, 2, 1, NULL, NULL, NULL, NULL, "<h2>01320230</h2>", 61545),
(104, 1, 1731858777, 3, 1, NULL, NULL, NULL, NULL, "<pre><code class=\"language-php\">asd d sa das as as asd ds &lt;?php echo \"correct option\"; ?&gt;</code></pre>", 61545),
(105, 1, 1731504885, 2, 1, NULL, NULL, NULL, NULL, "<h2>01320230</h2>", 61545),
(106, 1, 1731504885, 3, 1, NULL, NULL, NULL, NULL, "<pre><code class=\"language-php\">asd d sa das as as asd ds &lt;?php echo \"correct option\"; ?&gt;</code></pre>", 61545),
(107, 1, 1731549856, 2, 1, NULL, NULL, NULL, NULL, "<h2>01320230</h2>", 61545),
(108, 1, 1731549856, 3, 1, NULL, NULL, NULL, NULL, "<pre><code class=\"language-php\">asd d sa das as as asd ds &lt;?php echo \"correct option\"; ?&gt;</code></pre>", 61545),
(109, 1, 1732033006, 2, 1, NULL, NULL, NULL, NULL, "<h2>01320230</h2>", 61545),
(110, 1, 1732033006, 3, 1, NULL, NULL, NULL, NULL, "<h2>03a2s0d32a<mark class=\"marker-green\">0sd as3d032</mark>sad0230as2d</h2>", 61545),
(111, 1, 1732033006, 4, 1, NULL, NULL, NULL, NULL, "<ul style=\"list-style-type:circle;\"><li><h2>0as32d032as0d32asd2&nbsp;</h2></li><li>202020</li></ul><blockquote><ul style=\"list-style-type:circle;\"><li><h2>asdasdasd</h2></li></ul></blockquote>", 61545),
(112, 1, 1731862688, 2, 1, NULL, NULL, NULL, NULL, "<h2>01320230</h2>", 61545),
(113, 1, 1731862688, 3, 1, NULL, NULL, NULL, NULL, "<h2>03a2s0d32a<mark class=\"marker-green\">0sd as3d032</mark>sad0230as2d</h2>", 61545),
(114, 1, 1731862688, 4, 1, NULL, NULL, NULL, NULL, "<ul style=\"list-style-type:circle;\"><li><h2>0as32d032as0d32asd2&nbsp;</h2></li><li>202020</li></ul><blockquote><ul style=\"list-style-type:circle;\"><li><h2>asdasdasd</h2></li></ul></blockquote>", 61545),
(115, 1, 1731943715, 2, 1, NULL, NULL, NULL, NULL, "<h2>01320230</h2>", 61545),
(116, 1, 1731943715, 3, 1, NULL, NULL, NULL, NULL, "<h2>03a2s0d32a<mark class=\"marker-green\">0sd as3d032</mark>sad0230as2d</h2>", 61545),
(117, 1, 1731943715, 4, 1, NULL, NULL, NULL, NULL, "<ul style=\"list-style-type:circle;\"><li><h2>0as32d032as0d32asd2&nbsp;</h2></li><li>202020</li></ul><blockquote><ul style=\"list-style-type:circle;\"><li><h2>asdasdasd</h2></li></ul></blockquote>", 61545),
(118, 1, 1731687708, 2, 1, NULL, NULL, NULL, NULL, "<h2>320303120</h2>", 61545),
(119, 1, 1731687708, 3, 1, NULL, NULL, NULL, NULL, "<h2>03a2s0d32a<mark class=\"marker-green\">0sd as3d032</mark>sad0230as2d</h2>", 61545),
(120, 1, 1731640724, 2, 1, NULL, NULL, NULL, NULL, "<h2>320303120</h2>", 61545),
(121, 1, 1731640724, 3, 1, NULL, NULL, NULL, NULL, "<h2>03a2s0d32a<mark class=\"marker-green\">0sd as3d032</mark>sad0230as2d</h2>", 61545),
(122, 1, 1731640724, 4, 1, NULL, NULL, NULL, NULL, "<h2>03a2s0d32a<mark class=\"marker-green\">0sd as3d032</mark>sad0230as2d</h2>", 61545),
(123, 1, 1732182523, 2, 1, NULL, NULL, NULL, NULL, "<h2>320303120</h2>", 61545),
(124, 1, 1732182523, 3, 1, NULL, NULL, NULL, NULL, "<h2>03a2s0d32a<mark class=\"marker-green\">0sd as3d032</mark>sad0230as2d</h2>", 61545),
(125, 1, 1732182523, 4, 1, NULL, NULL, NULL, NULL, "<h2>03a2s0d32a<mark class=\"marker-green\">0sd as3d032</mark>sad0230as2d</h2>", 61545),
(126, 1, 1731953368, 2, 1, NULL, NULL, NULL, NULL, "<h2>0132033</h2>", 61545),
(127, 1, 1731953368, 3, 1, NULL, NULL, NULL, NULL, "<h2>03a2s0d32a<mark class=\"marker-green\">0sd as3d032</mark>sad0230as2d</h2>", 61545),
(128, 1, 1731727980, 2, 1, NULL, NULL, NULL, NULL, "<h2>0132033</h2>", 61545),
(129, 1, 1731727980, 3, 1, NULL, NULL, NULL, NULL, "<h2>03a2s0d32a<mark class=\"marker-green\">0sd as3d032</mark>sad0230as2d</h2>", 61545),
(130, 1, 1731679592, 2, 1, NULL, NULL, NULL, NULL, "<h2>0132033</h2>", 61545),
(131, 1, 1731679592, 3, 1, NULL, NULL, NULL, NULL, "<h2>03a2s0d32a<mark class=\"marker-green\">0sd as3d032</mark>sad0230as2d</h2>", 61545),
(132, 1, 1731865703, 2, 1, NULL, NULL, NULL, NULL, "<h2>0132033</h2>", 61545),
(133, 1, 1731579817, 2, 1, NULL, NULL, NULL, NULL, "<h2>0132033</h2>", 61545),
(134, 1, 1731865703, 3, 1, NULL, NULL, NULL, NULL, "<h2>03a2s0d32a<mark class=\"marker-green\">0sd as3d032</mark>sad0230as2d</h2>", 61545),
(135, 1, 1731579817, 3, 1, NULL, NULL, NULL, NULL, "<h2>03a2s0d32a<mark class=\"marker-green\">0sd as3d032</mark>sad0230as2d</h2>", 61545),
(136, 1, 1732041257, 2, 1, NULL, NULL, NULL, NULL, "<h2>0132033</h2>", 61545),
(137, 1, 1732041257, 3, 1, NULL, NULL, NULL, NULL, "<h2>03a2s0d32a<mark class=\"marker-green\">0sd as3d032</mark>sad0230as2d</h2>", 61545),
(138, 1, 1732121357, 2, 1, NULL, NULL, NULL, NULL, "<h2>0132033</h2>", 61545),
(139, 1, 1732121357, 3, 1, NULL, NULL, NULL, NULL, "<h2>03a2s0d32a<mark class=\"marker-green\">0sd as3d032</mark>sad0230as2d</h2>", 61545),
(140, 1, 1732105928, 2, 1, NULL, NULL, NULL, NULL, "<h2>0132033</h2>", 61545),
(141, 1, 1732105928, 3, 1, NULL, NULL, NULL, NULL, "<h2>03a2s0d32a<mark class=\"marker-green\">0sd as3d032</mark>sad0230as2d</h2>", 61545),
(142, 1, 1731672154, 2, 1, NULL, NULL, NULL, NULL, "<h2>01320230</h2>", 61545),
(143, 1, 1731672154, 4, 1, NULL, NULL, NULL, NULL, "<h2>03a2s0d32a<mark class=\"marker-green\">0sd as3d032</mark>sad0230as2d</h2>", 61545),
(144, 1, 1731589798, 4, 1, NULL, NULL, NULL, NULL, "b", 61545),
(145, 1, 1731589798, 2, 1, NULL, NULL, NULL, NULL, "b", 61545),
(146, 1, 1731589798, 3, 1, NULL, NULL, NULL, NULL, "b", 61545),
(147, 1, 1732290127, 4, 1, "a. <pre><code class=\"language-php\">asd d sa das as as asd ds &lt;?php echo \"correct option\"; ?&gt;</code></pre>", "b. <h2>03a2s0d32a<mark class=\"marker-green\">0sd as3d032</mark>sad0230as2d</h2>", "c. <h2>0a5s1d32a</h2><figure class=\"table\"><table><tbody><tr><td>asd</td><td>asdasdasdasd</td></tr></tbody></table></figure>", "d. <ul style=\"list-style-type:circle;\"><li><h2>0as32d032as0d32asd2&nbsp;</h2></li><li>202020</li></ul><blockquote><ul style=\"list-style-type:circle;\"><li><h2>asdasdasd</h2></li></ul></blockquote>", "b. <h2>03a2s0d32a<mark class=\"marker-green\">0sd as3d032</mark>sad0230as2d</h2>", 61545),
(148, 1, 1732290127, 3, 1, "a. <pre><code class=\"language-php\">asd d sa das as as asd ds &lt;?php echo \"correct option\"; ?&gt;</code></pre>", "b. <ul style=\"list-style-type:circle;\"><li><h2>0as32d032as0d32asd2&nbsp;</h2></li><li>202020</li></ul><blockquote><ul style=\"list-style-type:circle;\"><li><h2>asdasdasd</h2></li></ul></blockquote>", "c. <h2>0a5s1d32a</h2><figure class=\"table\"><table><tbody><tr><td>asd</td><td>asdasdasdasd</td></tr></tbody></table></figure>", "d. <h2>03a2s0d32a<mark class=\"marker-green\">0sd as3d032</mark>sad0230as2d</h2>", "c. <h2>0a5s1d32a</h2><figure class=\"table\"><table><tbody><tr><td>asd</td><td>asdasdasdasd</td></tr></tbody></table></figure>", 61545),
(149, 1, 1732290127, 2, 1, "a. <h2>0132033</h2>", "b. <h2>12320320</h2>", "c. <h2>320303120</h2>", "d. <h2>01320230</h2>", "d. <h2>01320230</h2>", 61545);

-- --------------------------------------------------------

--
-- Table structure for table `routine`
--

CREATE TABLE `routine` (
  `routine_id` int(11) NOT NULL,
  `routine_name` varchar(20) NOT NULL,
  `course_id` varchar(500) NOT NULL,
  `batch_id` varchar(500) NOT NULL,
  `file_address` varchar(200) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_by` bigint(20) NOT NULL,
  `service_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `routine`
--

INSERT INTO `routine` (`routine_id`, `routine_name`, `course_id`, `batch_id`, `file_address`, `created_at`, `created_by`, `service_id`) VALUES
(1, "zaz", "1", "1,2", "../uploads/ice_screenshot_20220214-115235.png", "2024-10-09 12:24:55", 1, 61545),
(2, "CMS", "2,1", "1,3,2", "../uploads/logo-light-opt-1920.webp", "2024-10-09 12:39:36", 1, 61545),
(6, "asdasd", "2", "3", "../uploads/Untitled design (5).png", "2024-10-12 17:31:48", 1, 61545);

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `service_id` bigint(20) DEFAULT NULL,
  `company_name` varchar(255) NOT NULL,
  `sub_domain` varchar(255) NOT NULL,
  `ad_phone` bigint(20) DEFAULT NULL,
  `ad_pass` varchar(500) DEFAULT NULL,
  `address` varchar(500) DEFAULT NULL,
  `logo` varchar(500) DEFAULT NULL,
  `favicon` varchar(500) DEFAULT NULL,
  `primary_color` varchar(100) DEFAULT NULL,
  `background_color` varchar(100) DEFAULT NULL,
  `text_color` varchar(50) DEFAULT NULL,
  `accent_color` varchar(50) DEFAULT NULL,
  `facebook` varchar(200) DEFAULT NULL,
  `instagram` varchar(200) DEFAULT NULL,
  `twitter` varchar(200) DEFAULT NULL,
  `linkedin` varchar(100) NOT NULL,
  `youtube` varchar(200) DEFAULT NULL,
  `u_id` bigint(20) NOT NULL,
  `sms_api_key` varchar(200) NOT NULL,
  `sms_sender_id` varchar(200) NOT NULL,
  `sms_credit` bigint(20) NOT NULL,
  `status` enum("active","inactive") NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `service_id`, `company_name`, `sub_domain`, `ad_phone`, `ad_pass`, `address`, `logo`, `favicon`, `primary_color`, `background_color`, `text_color`, `accent_color`, `facebook`, `instagram`, `twitter`, `linkedin`, `youtube`, `u_id`, `sms_api_key`, `sms_sender_id`, `sms_credit`, `status`, `created_at`) VALUES
(1, 97897, "Ennovat", "lms", 12, "$2y$10$8Pco2Ozdp6rIceYAhxo4FOYD8fyrPHWtH3aJTiM57W2FX1gSKPaf.", NULL, "", "", "", "", NULL, NULL, NULL, NULL, NULL, "", NULL, 16976312243384, "", "", 0, "active", "2024-09-30 22:35:01"),
(2, 70791, "মাশরাফ", "mashraf", 18, "$2y$10$CJiK4h3VLWu4UxVerpbPH.442ArcQswvVNnvIhlbADgKcHhpOtuG6", NULL, "", "", "", "", NULL, NULL, NULL, NULL, NULL, "", NULL, 16976312243384, "", "", 0, "active", "2024-10-03 21:49:59"),
(4, 61545, "Ennovat", "enno", 31230123, NULL, "asd0a3sd03as01d3s01d31a0s3d1as30d", "uploads/logo_6717c603efec98.78751774.webp", "uploads/favicon_671a1a776bef83.25833851.jpg", "#30d1a0", "#ffffff", "#000000", "#27b78c", "https://facebook.com/", "https://facebook.com/", "https://facebook.com/", "https://facebook.com/", "https://facebook.com/", 16976312243384, "", "", 1057, "active", "2024-10-03 21:51:46"),
(5, 40781, "new", "new", 0, "$2y$10$KX8cM0aSqnQVbR0UbOATFeUJikZ2OFnEYWhuE4ZU0Xo6vzpNBvGVm", NULL, "", "", "", "", NULL, NULL, NULL, NULL, NULL, "", NULL, 16976312243384, "", "", 0, "active", "2024-10-03 21:53:23");

-- --------------------------------------------------------

--
-- Table structure for table `sms`
--

CREATE TABLE `sms` (
  `sms_id` int(11) NOT NULL,
  `sms_text` text NOT NULL,
  `receiver` text NOT NULL,
  `sms_time` datetime DEFAULT NULL,
  `used_credit` bigint(20) NOT NULL,
  `sms_type` varchar(20) NOT NULL,
  `service_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sms`
--

INSERT INTO `sms` (`sms_id`, `sms_text`, `receiver`, `sms_time`, `used_credit`, `sms_type`, `service_id`) VALUES
(1, "This is an SMS ", "017201010, 032013, 120120", "2024-10-26 16:13:44", 0, "student", 61545),
(2, "১ Hi, Mash. Your password for the Admin Panel is: m6KT1k. Please change it after logging in. - Ennovat", "8801724373117", "2024-10-27 15:41:47", 0, "admin", 61545),
(3, "১ Hi, Mash. Your password for the Admin Panel is: ALlH3s. Please change it after logging in. - Ennovat", "8801724373117", "2024-10-27 16:04:10", 2, "admin", 61545),
(4, "হায়, . আপনার এডমিন প্যানেল পাসওয়ার্ডঃ . এডমিন প্যানেল \".ennovat.com\" - Ennovat", "032013", "2024-10-28 00:19:23", 1, "student", 61545),
(5, "হায়, . আপনার এডমিন প্যানেল পাসওয়ার্ডঃ . এডমিন প্যানেল \".ennovat.com\" - Ennovat", "032013", "2024-10-28 00:19:57", 1, "student", 61545),
(6, "Hi Mashraf, your OTP is 445218 - Ennovat", "8801724373117", "2024-11-09 03:26:11", 1, "student", 61545),
(7, "Hi Mashraf, your OTP is 730190 - Ennovat", "8801724373117", "2024-11-09 06:12:57", 1, "student", 61545),
(8, "Hi Mashraf, your OTP is 930553 - Ennovat", "8801724373117", "2024-11-19 21:25:01", 1, "student", 61545);

-- --------------------------------------------------------

--
-- Table structure for table `sms_transactions`
--

CREATE TABLE `sms_transactions` (
  `sms_transaction_id` int(11) NOT NULL,
  `sms_amount` bigint(20) NOT NULL,
  `sms_rate` float NOT NULL,
  `created_by` bigint(20) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `service_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sms_transactions`
--

INSERT INTO `sms_transactions` (`sms_transaction_id`, `sms_amount`, `sms_rate`, `created_by`, `created_at`, `service_id`) VALUES
(1, 1000, 0.33, 1, "2024-10-26 20:14:20", 61545),
(2, 10, 0.33, 1, "2024-10-27 02:19:26", 61545),
(3, 10, 0.33, 1, "2024-10-27 02:14:09", 61545),
(4, 10, 0.33, 1, "2024-10-27 02:14:31", 61545),
(5, 10, 0.33, 1, "2024-10-27 02:15:23", 61545),
(6, 11, 0.33, 1, "2024-10-27 02:17:40", 61545),
(7, 5, 0.33, 1, "2024-10-27 02:19:48", 61545),
(8, 5, 0.33, 1, "2024-10-27 02:23:01", 61545),
(9, 5, 0.33, 1, "2024-10-27 02:31:30", 61545);

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `student_id` bigint(20) NOT NULL,
  `student_name` varchar(100) NOT NULL,
  `student_image` varchar(200) DEFAULT NULL,
  `student_number` varchar(20) NOT NULL,
  `student_password` varchar(200) DEFAULT NULL,
  `student_otp` varchar(200) DEFAULT NULL,
  `student_otp_expiry_time` datetime DEFAULT NULL,
  `father_name` varchar(100) DEFAULT NULL,
  `father_number` varchar(20) DEFAULT NULL,
  `mother_name` varchar(100) DEFAULT NULL,
  `mother_number` varchar(20) DEFAULT NULL,
  `student_institution` varchar(100) DEFAULT NULL,
  `student_address` varchar(200) DEFAULT NULL,
  `student_date_of_birth` date DEFAULT NULL,
  `request_status` enum("pending","approved") NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_by` bigint(20) NOT NULL,
  `service_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`student_id`, `student_name`, `student_image`, `student_number`, `student_password`, `student_otp`, `student_otp_expiry_time`, `father_name`, `father_number`, `mother_name`, `mother_number`, `student_institution`, `student_address`, `student_date_of_birth`, `request_status`, `created_at`, `created_by`, `service_id`) VALUES
(1, "Mashcatg", "profile_673416d74756a6.53488148.jpg", "017", "$2y$10$gMYP8DQtAqrIFI7F6qrmqubl58Nz2ATwiW1OzfCHvEhP3IZdna2am", "1234", "2024-11-11 23:25:42", "asdasd", "", "asdasd", "", "asdasd", "123", "2024-11-22", "pending", NULL, 0, 61545),
(2, "Rana", "", "032013", "", NULL, NULL, "", "", "", "", "", "", "0000-00-00", "pending", NULL, 0, 61545),
(3, "Galib", "", "120120", "", NULL, NULL, "120120", "", "1201021", "", "2010", "", "2024-10-09", "pending", NULL, 0, 61545),
(5, "John Doe", "path/to/image.jpg", "1234567890", NULL, NULL, NULL, "James Doe", "0987654321", "Jane Doe", "1122334455", "Example School", "123 Main St, Cityville", "2010-05-15", "pending", "2024-10-14 03:54:49", 0, 61545),
(7, "Mashraf", NULL, "8801724373117", "$2y$10$A.ouVli35sojaRCxskHrWu3Lycc7Dbc90IpiKmvfLU23ev0mXDBZu", "930553", "2024-11-20 05:35:00", "120102", "120120", "120102", "102", "1203", "120102", "2024-10-23", "pending", NULL, 0, 61545),
(8, "asdasd", NULL, "12012010", NULL, NULL, NULL, "12012012", "", "1201012", "", "10221302", "", "2024-10-15", "pending", NULL, 0, 61545),
(9, "asd10a2sd", NULL, "02212021", NULL, NULL, NULL, "asdasd", "", "asdasd", "", "asdasd", "", "2024-10-16", "pending", NULL, 0, 61545);

-- --------------------------------------------------------

--
-- Table structure for table `student_logins`
--

CREATE TABLE `student_logins` (
  `login_id` bigint(20) NOT NULL,
  `student_id` bigint(20) NOT NULL,
  `auth_token` varchar(255) NOT NULL,
  `expiry_date` datetime NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `service_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `student_logins`
--

INSERT INTO `student_logins` (`login_id`, `student_id`, `auth_token`, `expiry_date`, `created_at`, `service_id`) VALUES
(66, 1, "b65f958057ed8b62d2ea26218a860b127a924a120caed0197be860e1cdab8924b65f958057ed8b62d2ea26218a860b127a924a120caed0197be860e1cdab8924", "2025-05-09 16:34:54", "2024-11-09 11:34:54", 61545),
(72, 7, "1d3346e6bfd4cb46710fd07a948691bea097f617c813dc49343c1f97ff5356c2", "2025-05-20 02:40:02", "2024-11-19 21:40:02", 61545),
(73, 7, "373ce456ecda90a11bcc25eaa1b16135ce9ab494256855485fa47c4faccbcddd", "2025-05-20 02:40:52", "2024-11-19 21:40:52", 61545),
(74, 7, "ce1815c335d31981451a74738bc2ed3250a2fedc7a1cc1aa4af5ad0db92fa6ac", "2025-05-20 02:50:08", "2024-11-19 21:50:08", 61545),
(75, 7, "0bd928717f0e15b45494d515b9b36763c66e018df4c6240a063c6eb6fd9924e1", "2025-05-20 02:58:06", "2024-11-19 21:58:06", 61545),
(76, 7, "09a217c2987ac72e0ba07b66415506be3bcb3fb0fb9889d75e2a77afdc2cf5e4", "2025-05-20 02:58:57", "2024-11-19 21:58:57", 61545),
(77, 7, "2976489479f7bdbe59dc5ce4a909687c93775aab61b05bc9464185381bcf8f1e", "2025-05-20 03:00:06", "2024-11-19 22:00:06", 61545),
(78, 7, "e391e42f4a98ecba236f7aaf2a21c66efebdd936bf99c4613b925cb260425853", "2025-05-20 03:01:00", "2024-11-19 22:01:00", 61545);

-- --------------------------------------------------------

--
-- Table structure for table `tickets`
--

CREATE TABLE `tickets` (
  `id` int(11) NOT NULL,
  `t_id` bigint(20) DEFAULT NULL,
  `u_id` bigint(20) NOT NULL,
  `service_id` int(11) NOT NULL,
  `status` varchar(50) NOT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp(),
  `priority` varchar(50) NOT NULL,
  `problem_statement` varchar(255) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tickets`
--

INSERT INTO `tickets` (`id`, `t_id`, `u_id`, `service_id`, `status`, `time`, `priority`, `problem_statement`, `description`) VALUES
(1, 120305, 16976312243384, 97897, "resolved", "2024-10-02 01:19:24", "Medium", "Login Issue", "This is my details of everything "),
(2, 67629, 16976312243384, 1, "open", "2024-10-04 01:43:29", "High", "asd", "asd");

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `u_id` bigint(20) DEFAULT NULL,
  `u_name` varchar(100) DEFAULT NULL,
  `u_email` varchar(100) DEFAULT NULL,
  `u_phone` bigint(100) DEFAULT NULL,
  `u_pass` varchar(500) DEFAULT NULL,
  `u_address` varchar(500) DEFAULT NULL,
  `token` varchar(200) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `verified` tinyint(1) DEFAULT 0,
  `otp` varchar(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `u_id`, `u_name`, `u_email`, `u_phone`, `u_pass`, `u_address`, `token`, `created_at`, `verified`, `otp`) VALUES
(4, 7824718743730, "Masruf Aiman", "masrufaiman@gmail.com", NULL, "$2y$10$qEbcBQ/kR9F8EkCn3QwYQ.TO9MUeWNRt/tYmov06jDoIMrlDuonb6", NULL, "e19b0dbf4967afaeca6aeb42dff9160e88dc05f33f372bccf453b37ec64ff208", NULL, 1, NULL),
(8, 16976312243384, "Mash Catg", "mashcatg@gmail.com", 1720602864, "$2y$10$AjkYsScGtBEFE3yxBl98t.I6JOkXxP2E5KFsowkpDHr7rCS3N8p3W", "120 Nur Ahmed Road,Kazir Dhawri,Chattogram, 120 Nur Ahmed Road,Kazir Dhawri,Chattogram", "01003234208b514c1ec658528422a234b856fd01814f4c6b4af48a321751e1f7", "2024-09-30 16:44:44", 1, NULL),
(9, 12040391915847, "John Doe", "john@gmail.com", NULL, "$2y$10$bIkEnFSIMBZeR5wMrJpROu0AofmcNBQb2CzvlLkyRilgBQjWKQPri", NULL, NULL, "2024-09-30 20:41:03", 0, "849202"),
(10, 9889082687820, "asd", "asd@gmail.com", NULL, "$2y$10$cuQuSF2s5lMf0cFtefvKxOONovLTCuwU48EWZx0xacuCdLnvSADkW", NULL, NULL, "2024-10-03 17:19:00", 0, "568193"),
(11, 9004370097006, "User Name", "user@example.com", NULL, "$2y$10$sBOVMmJBwwGAdoDcUx0P6u4QJCRu5iDqNiHBjLVVEe7OwpawVWx1a", NULL, NULL, "2024-10-03 17:19:06", 0, "842531"),
(12, 16597002713165, "register", "register@gmail.com", NULL, "$2y$10$i9APVF5GlY5VrEwYCCsBn.dK1XiJc3rQ1sX33MTYAT4IVc6Wimpg2", NULL, "edef1da29ccaf19529114980314471bb496e7006b7cc542d5b", "2024-10-03 17:21:13", 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `visits`
--

CREATE TABLE `visits` (
  `visit_id` int(11) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `ip` varchar(50) NOT NULL,
  `from_page` varchar(300) NOT NULL,
  `visit_time` datetime DEFAULT NULL,
  `user_type` enum("admin","student") DEFAULT "admin",
  `service_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `visits`
--

INSERT INTO `visits` (`visit_id`, `user_id`, `ip`, `from_page`, `visit_time`, `user_type`, `service_id`) VALUES
(2063, 1, "::1", "http://localhost:3000/admin/courses", "2024-10-27 08:06:14", "admin", 61545),
(2064, 1, "::1", "http://localhost:3000/admin/courses", "2024-10-27 08:06:14", "admin", 61545),
(2065, 1, "::1", "http://localhost:3000/admin/courses", "2024-10-27 08:06:14", "admin", 61545),
(2066, 1, "::1", "http://localhost:3000/admin/courses", "2024-10-27 08:06:14", "admin", 61545),
(2067, 1, "::1", "/admin/finance", "2024-10-27 08:20:01", "admin", 61545),
(2068, 1, "::1", "/admin/students", "2024-10-27 08:20:13", "admin", 61545),
(2069, 1, "::1", "/admin/under-development", "2024-10-27 08:20:20", "admin", 61545),
(2070, 1, "::1", "/admin/exams", "2024-10-27 08:20:22", "admin", 61545),
(2071, 1, "::1", "/admin", "2024-10-27 08:21:09", "admin", 61545),
(2072, 1, "::1", "/admin/students", "2024-10-27 08:21:11", "admin", 61545),
(2073, 1, "::1", "/admin/finance", "2024-10-27 08:21:47", "admin", 61545),
(2074, 1, "::1", "/admin", "2024-10-27 08:21:50", "admin", 61545),
(2075, 1, "::1", "/admin/courses", "2024-10-27 08:22:35", "admin", 61545),
(2076, 1, "::1", "/admin/courses", "2024-10-27 08:24:05", "admin", 61545),
(2077, 1, "::1", "/admin/courses", "2024-10-27 08:24:05", "admin", 61545),
(2078, 1, "::1", "/admin/courses", "2024-10-27 08:24:45", "admin", 61545),
(2079, 1, "::1", "/admin/courses", "2024-10-27 08:24:45", "admin", 61545),
(2080, 1, "::1", "/admin/courses", "2024-10-27 08:27:49", "admin", 61545),
(2081, 1, "::1", "/admin/courses", "2024-10-27 08:27:49", "admin", 61545),
(2082, 1, "::1", "/admin/admins", "2024-10-27 08:28:03", "admin", 61545),
(2083, 1, "::1", "/admin/admins", "2024-10-27 08:28:50", "admin", 61545),
(2084, 1, "::1", "/admin/admins", "2024-10-27 08:28:50", "admin", 61545),
(2085, 1, "::1", "/admin/admins", "2024-10-27 13:37:54", "admin", 61545),
(2086, 1, "::1", "/admin/admins", "2024-10-27 13:37:54", "admin", 61545),
(2087, 1, "::1", "/admin/admins", "2024-10-27 13:52:40", "admin", 61545),
(2088, 1, "::1", "/admin/admins", "2024-10-27 13:52:40", "admin", 61545),
(2089, 1, "::1", "/admin/admins", "2024-10-27 13:53:24", "admin", 61545),
(2090, 1, "::1", "/admin/admins", "2024-10-27 13:53:24", "admin", 61545),
(2091, 1, "::1", "/admin/admins", "2024-10-27 13:54:31", "admin", 61545),
(2092, 1, "::1", "/admin/admins", "2024-10-27 13:54:31", "admin", 61545),
(2093, 1, "::1", "/admin/admins", "2024-10-27 13:54:38", "admin", 61545),
(2094, 1, "::1", "/admin/admins", "2024-10-27 13:54:38", "admin", 61545),
(2095, 1, "::1", "/admin/admins", "2024-10-27 14:00:01", "admin", 61545),
(2096, 1, "::1", "/admin/admins", "2024-10-27 14:00:01", "admin", 61545),
(2097, 1, "::1", "/admin/admins", "2024-10-27 14:04:27", "admin", 61545),
(2098, 1, "::1", "/admin/admins", "2024-10-27 14:04:27", "admin", 61545),
(2099, 1, "::1", "/admin/admins", "2024-10-27 15:11:16", "admin", 61545),
(2100, 1, "::1", "/admin/admins", "2024-10-27 15:11:16", "admin", 61545),
(2101, 1, "::1", "/admin/sms", "2024-10-27 15:44:17", "admin", 61545),
(2102, 1, "::1", "/admin/sms", "2024-10-27 15:44:17", "admin", 61545),
(2103, 1, "::1", "/admin/sms", "2024-10-27 15:55:12", "admin", 61545),
(2104, 1, "::1", "/admin/sms", "2024-10-27 15:55:12", "admin", 61545),
(2105, 1, "::1", "/admin/sms", "2024-10-27 15:57:20", "admin", 61545),
(2106, 1, "::1", "/admin/sms", "2024-10-27 15:57:20", "admin", 61545),
(2107, 1, "::1", "/admin/sms", "2024-10-27 15:58:10", "admin", 61545),
(2108, 1, "::1", "/admin/sms", "2024-10-27 15:58:10", "admin", 61545),
(2109, 1, "::1", "/admin/sms", "2024-10-27 19:08:26", "admin", 61545),
(2110, 1, "::1", "/admin/sms", "2024-10-27 19:08:26", "admin", 61545),
(2111, 1, "::1", "/admin", "2024-10-27 19:11:17", "admin", 61545),
(2112, 1, "::1", "/admin/students", "2024-10-27 19:13:40", "admin", 61545),
(2113, 1, "::1", "/admin", "2024-10-27 19:16:21", "admin", 61545),
(2114, 1, "::1", "/admin/courses", "2024-10-27 19:16:50", "admin", 61545),
(2115, 1, "::1", "/admin/students", "2024-10-27 19:40:00", "admin", 61545),
(2116, 1, "::1", "/admin/students", "2024-10-27 20:41:15", "admin", 61545),
(2117, 1, "::1", "/admin/students", "2024-10-27 20:41:15", "admin", 61545),
(2118, 1, "::1", "/admin/sms", "2024-10-27 22:58:53", "admin", 61545),
(2119, 1, "::1", "/admin/sms", "2024-10-27 22:58:53", "admin", 61545),
(2120, 1, "::1", "/admin/courses", "2024-10-27 23:00:14", "admin", 61545),
(2121, 1, "::1", "/admin/courses", "2024-10-27 23:01:55", "admin", 61545),
(2122, 1, "::1", "/admin/courses", "2024-10-27 23:01:55", "admin", 61545),
(2123, 1, "::1", "/admin/students", "2024-10-27 23:26:17", "admin", 61545),
(2124, 1, "::1", "/admin/students", "2024-10-28 00:20:50", "admin", 61545),
(2125, 1, "::1", "/admin/students", "2024-10-28 00:20:50", "admin", 61545),
(2126, 1, "::1", "/admin/students", "2024-10-28 00:21:14", "admin", 61545),
(2127, 1, "::1", "/admin/students", "2024-10-28 00:21:14", "admin", 61545);

-- --------------------------------------------------------

--
-- Table structure for table `withdrawal_history`
--

CREATE TABLE `withdrawal_history` (
  `id` int(11) NOT NULL,
  `withdrawal_id` bigint(20) DEFAULT NULL,
  `amount` decimal(10,2) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `trx_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `admin_logins`
--
ALTER TABLE `admin_logins`
  ADD PRIMARY KEY (`login_id`);

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`attendance_id`);

--
-- Indexes for table `batches`
--
ALTER TABLE `batches`
  ADD PRIMARY KEY (`batch_id`);

--
-- Indexes for table `branches`
--
ALTER TABLE `branches`
  ADD PRIMARY KEY (`branch_id`);

--
-- Indexes for table `cards`
--
ALTER TABLE `cards`
  ADD PRIMARY KEY (`card_id`);

--
-- Indexes for table `chats`
--
ALTER TABLE `chats`
  ADD PRIMARY KEY (`message_id`);

--
-- Indexes for table `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`class_id`);

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`contact_id`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`course_id`);

--
-- Indexes for table `enrollments`
--
ALTER TABLE `enrollments`
  ADD PRIMARY KEY (`enrollment_id`);

--
-- Indexes for table `exams`
--
ALTER TABLE `exams`
  ADD PRIMARY KEY (`exam_id`);

--
-- Indexes for table `exam_marks`
--
ALTER TABLE `exam_marks`
  ADD PRIMARY KEY (`marks_id`);

--
-- Indexes for table `expenses`
--
ALTER TABLE `expenses`
  ADD PRIMARY KEY (`expense_id`);

--
-- Indexes for table `expense_sectors`
--
ALTER TABLE `expense_sectors`
  ADD PRIMARY KEY (`sector_id`);

--
-- Indexes for table `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `live_classes`
--
ALTER TABLE `live_classes`
  ADD PRIMARY KEY (`live_class_id`),
  ADD KEY `idx_service_id` (`service_id`);

--
-- Indexes for table `login_logs`
--
ALTER TABLE `login_logs`
  ADD PRIMARY KEY (`log_id`);

--
-- Indexes for table `marks`
--
ALTER TABLE `marks`
  ADD PRIMARY KEY (`marks_id`);

--
-- Indexes for table `materials`
--
ALTER TABLE `materials`
  ADD PRIMARY KEY (`material_id`);

--
-- Indexes for table `material_receivers`
--
ALTER TABLE `material_receivers`
  ADD PRIMARY KEY (`material_receiver_id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`note_id`);

--
-- Indexes for table `notices`
--
ALTER TABLE `notices`
  ADD PRIMARY KEY (`notice_id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`payment_id`);

--
-- Indexes for table `playlists`
--
ALTER TABLE `playlists`
  ADD PRIMARY KEY (`playlist_id`);

--
-- Indexes for table `quizzes`
--
ALTER TABLE `quizzes`
  ADD PRIMARY KEY (`quiz_id`);

--
-- Indexes for table `quiz_questions`
--
ALTER TABLE `quiz_questions`
  ADD PRIMARY KEY (`question_id`);

--
-- Indexes for table `quiz_submissions`
--
ALTER TABLE `quiz_submissions`
  ADD PRIMARY KEY (`submission_id`);

--
-- Indexes for table `routine`
--
ALTER TABLE `routine`
  ADD PRIMARY KEY (`routine_id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sms`
--
ALTER TABLE `sms`
  ADD PRIMARY KEY (`sms_id`);

--
-- Indexes for table `sms_transactions`
--
ALTER TABLE `sms_transactions`
  ADD PRIMARY KEY (`sms_transaction_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`student_id`);

--
-- Indexes for table `student_logins`
--
ALTER TABLE `student_logins`
  ADD PRIMARY KEY (`login_id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `visits`
--
ALTER TABLE `visits`
  ADD PRIMARY KEY (`visit_id`);

--
-- Indexes for table `withdrawal_history`
--
ALTER TABLE `withdrawal_history`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `admin_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `admin_logins`
--
ALTER TABLE `admin_logins`
  MODIFY `login_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `attendance`
--
ALTER TABLE `attendance`
  MODIFY `attendance_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `batches`
--
ALTER TABLE `batches`
  MODIFY `batch_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `branches`
--
ALTER TABLE `branches`
  MODIFY `branch_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3251032015407;

--
-- AUTO_INCREMENT for table `cards`
--
ALTER TABLE `cards`
  MODIFY `card_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `chats`
--
ALTER TABLE `chats`
  MODIFY `message_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `classes`
--
ALTER TABLE `classes`
  MODIFY `class_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `contact_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `course_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `enrollments`
--
ALTER TABLE `enrollments`
  MODIFY `enrollment_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `exams`
--
ALTER TABLE `exams`
  MODIFY `exam_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `exam_marks`
--
ALTER TABLE `exam_marks`
  MODIFY `marks_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `expenses`
--
ALTER TABLE `expenses`
  MODIFY `expense_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `expense_sectors`
--
ALTER TABLE `expense_sectors`
  MODIFY `sector_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `invoices`
--
ALTER TABLE `invoices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `live_classes`
--
ALTER TABLE `live_classes`
  MODIFY `live_class_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `login_logs`
--
ALTER TABLE `login_logs`
  MODIFY `log_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `marks`
--
ALTER TABLE `marks`
  MODIFY `marks_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `materials`
--
ALTER TABLE `materials`
  MODIFY `material_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `material_receivers`
--
ALTER TABLE `material_receivers`
  MODIFY `material_receiver_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `notes`
--
ALTER TABLE `notes`
  MODIFY `note_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `notices`
--
ALTER TABLE `notices`
  MODIFY `notice_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `payment_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `playlists`
--
ALTER TABLE `playlists`
  MODIFY `playlist_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `quizzes`
--
ALTER TABLE `quizzes`
  MODIFY `quiz_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `quiz_questions`
--
ALTER TABLE `quiz_questions`
  MODIFY `question_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `quiz_submissions`
--
ALTER TABLE `quiz_submissions`
  MODIFY `submission_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=150;

--
-- AUTO_INCREMENT for table `routine`
--
ALTER TABLE `routine`
  MODIFY `routine_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `sms`
--
ALTER TABLE `sms`
  MODIFY `sms_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `sms_transactions`
--
ALTER TABLE `sms_transactions`
  MODIFY `sms_transaction_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `student_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `student_logins`
--
ALTER TABLE `student_logins`
  MODIFY `login_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- AUTO_INCREMENT for table `tickets`
--
ALTER TABLE `tickets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `visits`
--
ALTER TABLE `visits`
  MODIFY `visit_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2128;

--
-- AUTO_INCREMENT for table `withdrawal_history`
--
ALTER TABLE `withdrawal_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `student_logins`
--
ALTER TABLE `student_logins`
  ADD CONSTRAINT `student_logins_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
