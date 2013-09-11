-- MySQL dump 10.13  Distrib 5.1.69, for redhat-linux-gnu (i386)
--
-- Host: localhost    Database: phantomrunner_development
-- ------------------------------------------------------
-- Server version	5.1.69

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `active_admin_comments`
--

DROP TABLE IF EXISTS `active_admin_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `active_admin_comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `resource_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `resource_type` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `author_id` int(11) DEFAULT NULL,
  `author_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `body` text COLLATE utf8_unicode_ci,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `namespace` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_active_admin_comments_on_author_type_and_author_id` (`author_type`,`author_id`),
  KEY `index_active_admin_comments_on_namespace` (`namespace`),
  KEY `index_admin_notes_on_resource_type_and_resource_id` (`resource_type`,`resource_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `active_admin_comments`
--

LOCK TABLES `active_admin_comments` WRITE;
/*!40000 ALTER TABLE `active_admin_comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `active_admin_comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ckeditor_assets`
--

DROP TABLE IF EXISTS `ckeditor_assets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ckeditor_assets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `data_file_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `data_content_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `data_file_size` int(11) DEFAULT NULL,
  `assetable_id` int(11) DEFAULT NULL,
  `assetable_type` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `type` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `width` int(11) DEFAULT NULL,
  `height` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_ckeditor_assetable` (`assetable_type`,`assetable_id`),
  KEY `idx_ckeditor_assetable_type` (`assetable_type`,`type`,`assetable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ckeditor_assets`
--

LOCK TABLES `ckeditor_assets` WRITE;
/*!40000 ALTER TABLE `ckeditor_assets` DISABLE KEYS */;
/*!40000 ALTER TABLE `ckeditor_assets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `identities`
--

DROP TABLE IF EXISTS `identities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `identities` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `provider` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `token` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_identities_on_user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `identities`
--

LOCK TABLES `identities` WRITE;
/*!40000 ALTER TABLE `identities` DISABLE KEYS */;
INSERT INTO `identities` VALUES (1,'20806709','runkeeper',1,'e39a8c5a06a944de857526f25df4e6b1');
/*!40000 ALTER TABLE `identities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `race_id` int(11) DEFAULT NULL,
  `stripe_charge_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `amount` float DEFAULT NULL,
  `currency` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `race_user_id` int(11) DEFAULT NULL,
  `amount_after_fees` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_payments_on_race_id` (`race_id`),
  KEY `index_payments_on_race_user_id` (`race_user_id`),
  KEY `index_payments_on_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `race_kinds`
--

DROP TABLE IF EXISTS `race_kinds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `race_kinds` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `race_kind` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `mileage` float DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `race_kinds`
--

LOCK TABLES `race_kinds` WRITE;
/*!40000 ALTER TABLE `race_kinds` DISABLE KEYS */;
INSERT INTO `race_kinds` VALUES (1,'5k',3.1,NULL,'0.00'),(2,'10k',6.2,NULL,'0.00'),(3,'Half Marathon',13.1,NULL,'0.00'),(4,'Marathon',26.2,NULL,'0.00'),(11,'TEST',1,2,'0.00'),(12,'Without Price',1,2,'0.00'),(13,'Test',1,2,'20.00');
/*!40000 ALTER TABLE `race_kinds` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `race_kinds_races`
--

DROP TABLE IF EXISTS `race_kinds_races`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `race_kinds_races` (
  `race_id` int(11) NOT NULL,
  `race_kind_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `race_kinds_races`
--

LOCK TABLES `race_kinds_races` WRITE;
/*!40000 ALTER TABLE `race_kinds_races` DISABLE KEYS */;
INSERT INTO `race_kinds_races` VALUES (1,1),(1,2),(1,3),(1,4),(2,1),(2,11),(2,12),(2,13),(1,13);
/*!40000 ALTER TABLE `race_kinds_races` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `race_users`
--

DROP TABLE IF EXISTS `race_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `race_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `race_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `race_kind_id` int(11) DEFAULT NULL,
  `remain_anonymous` tinyint(1) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `run_time_secs` float DEFAULT NULL,
  `run_state` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `run_distance_mi` float DEFAULT NULL,
  `run_submission_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `run_time_submitted_at` datetime DEFAULT NULL,
  `run_submission_uri` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `registered_by_user_id` int(11) DEFAULT NULL,
  `terms_signature` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `run_starting_altitude_ft` float DEFAULT NULL,
  `run_starting_lat` float DEFAULT NULL,
  `run_starting_lng` float DEFAULT NULL,
  `run_starting_temp_f` float DEFAULT NULL,
  `run_uphill_ft` float DEFAULT NULL,
  `run_downhill_ft` float DEFAULT NULL,
  `run_started_at` datetime DEFAULT NULL,
  `run_time_flat_secs` float DEFAULT NULL,
  `run_time_normalized_secs` float DEFAULT NULL,
  `normalization_exceptions` int(11) DEFAULT NULL,
  `paid` tinyint(1) DEFAULT NULL,
  `ru_shipping_first_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ru_shipping_last_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ru_shipping_address1` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ru_shipping_address2` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ru_shipping_city` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ru_shipping_state` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ru_shipping_zip` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `tshirt_size` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `confirmed` tinyint(1) DEFAULT '0',
  `accepted_u18_waiver` tinyint(1) DEFAULT '0',
  `user_under_18` tinyint(1) DEFAULT '0',
  `accepted_custom_waviers` tinyint(1) DEFAULT '0',
  `share` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `race_users`
--

LOCK TABLES `race_users` WRITE;
/*!40000 ALTER TABLE `race_users` DISABLE KEYS */;
INSERT INTO `race_users` VALUES (7,2,2,13,0,'2013-09-01 01:33:27','2013-09-01 01:33:27',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'ww',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'womens_small',0,0,0,0,0);
/*!40000 ALTER TABLE `race_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `race_waivers`
--

DROP TABLE IF EXISTS `race_waivers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `race_waivers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `waiver` text COLLATE utf8_unicode_ci,
  `race_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `race_waivers`
--

LOCK TABLES `race_waivers` WRITE;
/*!40000 ALTER TABLE `race_waivers` DISABLE KEYS */;
/*!40000 ALTER TABLE `race_waivers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `races`
--

DROP TABLE IF EXISTS `races`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `races` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `registration_opens_at` date DEFAULT NULL,
  `registration_closes_at` date DEFAULT NULL,
  `event_starts_at` datetime DEFAULT NULL,
  `event_ends_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `results_manually_published_at` datetime DEFAULT NULL,
  `autopublish_results_after_days` int(11) DEFAULT NULL,
  `main_image_file_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `main_image_content_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `main_image_file_size` int(11) DEFAULT NULL,
  `main_image_updated_at` datetime DEFAULT NULL,
  `description` text COLLATE utf8_unicode_ci,
  `show_normalized_results` int(11) DEFAULT NULL,
  `course_uphill_ft` float DEFAULT '0',
  `course_downhill_ft` float DEFAULT '0',
  `course_starting_altitude_ft` float DEFAULT '0',
  `course_temp_f` float DEFAULT '60',
  `early_registration_fee` decimal(10,2) DEFAULT NULL,
  `registration_fee` decimal(10,2) DEFAULT NULL,
  `early_registration_deadline` date DEFAULT NULL,
  `manager_id` int(11) DEFAULT NULL,
  `wizard_step` int(11) DEFAULT NULL,
  `custom_waiver` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `public` tinyint(1) DEFAULT NULL,
  `organizer_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `organizer_email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `organizer_website` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `facebook_url` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `twitter_url` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `short_description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `charity_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `direct_donation_url` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `third_party` tinyint(1) DEFAULT '0',
  `credit_card_fee_included` tinyint(1) DEFAULT '0',
  `conversion_credit` decimal(10,2) DEFAULT '0.00',
  PRIMARY KEY (`id`),
  KEY `index_races_on_manager_id` (`manager_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `races`
--

LOCK TABLES `races` WRITE;
/*!40000 ALTER TABLE `races` DISABLE KEYS */;
INSERT INTO `races` VALUES (1,'PhantomRunner Demo Race','2013-07-01','2013-11-01','2013-08-01 06:00:00','2013-12-01 05:00:00','2013-07-25 02:07:49','2013-09-01 01:34:57',NULL,0,NULL,NULL,NULL,NULL,'<p>This is a demo race created by the system by default.</p>\r\n',0,0,0,0,60,NULL,NULL,NULL,NULL,NULL,NULL,1,'','','','','','',NULL,NULL,0,0,'0.00'),(2,'Race Manger Test Race','2013-08-12','2013-09-30','2013-08-13 18:00:00','2013-10-31 18:00:00','2013-08-12 18:37:17','2013-09-01 01:32:59',NULL,0,NULL,NULL,NULL,NULL,'',2,0,0,0,60,NULL,'10.00',NULL,2,1,'',1,'Test','warren@phantomrunner.com','','','','Test','','',1,1,'0.00');
/*!40000 ALTER TABLE `races` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `races_tshirts`
--

DROP TABLE IF EXISTS `races_tshirts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `races_tshirts` (
  `race_id` int(11) DEFAULT NULL,
  `tshirt_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `races_tshirts`
--

LOCK TABLES `races_tshirts` WRITE;
/*!40000 ALTER TABLE `races_tshirts` DISABLE KEYS */;
INSERT INTO `races_tshirts` VALUES (1,1),(1,2),(1,3),(1,4),(1,5),(1,6),(1,7),(1,8),(1,9),(1,10),(1,11),(1,12),(1,13),(1,14),(1,15),(2,6),(2,1);
/*!40000 ALTER TABLE `races_tshirts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schema_migrations`
--

DROP TABLE IF EXISTS `schema_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `schema_migrations` (
  `version` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schema_migrations`
--

LOCK TABLES `schema_migrations` WRITE;
/*!40000 ALTER TABLE `schema_migrations` DISABLE KEYS */;
INSERT INTO `schema_migrations` VALUES ('20130713191209'),('20130613051549'),('20121202222840'),('20130612034555'),('20130702150147'),('20121014200536'),('20130209014534'),('20130713185547'),('20130404200856'),('20130426175252'),('20130402215028'),('20130711023509'),('20130624051221'),('20130429180303'),('20130424193041'),('20121012032003'),('20130402175124'),('20130131003830'),('20130224232412'),('20130613051804'),('20130202220100'),('20121012031921'),('20130602172608'),('20130711021456'),('20130613042509'),('20120929220342'),('20130530025829'),('20130429134841'),('20121014231951'),('20130624053407'),('20130627035659'),('20130430013919'),('20130622194403'),('20130713174740'),('20120929222310'),('20130713181848'),('20130318024257'),('20130611040802'),('20121002192505'),('20121002183745'),('20120929220343'),('20130216130243'),('20121203225107'),('20121008045306'),('20120929222326'),('20130602180238'),('20130511195350'),('20130322231016'),('20121002195240'),('20130613021253'),('20130626234249'),('20130107002206'),('20130327204930'),('20130403213028'),('20130624054255'),('20130318043224'),('20130702152842'),('20130624051439'),('20130105235601'),('20130105195638'),('20130715000123'),('20130715011438'),('20130715033749'),('20130715034821'),('20130719153233'),('20130720094152'),('20130720094307'),('20130802142510'),('20130826165844');
/*!40000 ALTER TABLE `schema_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shipping_addresses`
--

DROP TABLE IF EXISTS `shipping_addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shipping_addresses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `shipping_first_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `shipping_last_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `shipping_address1` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `shipping_address2` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `shipping_city` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `shipping_state` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `shipping_zip` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipping_addresses`
--

LOCK TABLES `shipping_addresses` WRITE;
/*!40000 ALTER TABLE `shipping_addresses` DISABLE KEYS */;
INSERT INTO `shipping_addresses` VALUES (1,2,'Warren','Wang','1234 T','','A','VA','22003','2013-08-26 17:29:03','2013-08-26 17:29:03'),(2,1,'Warren','Wang','4801 Thiban Ter','','Annandale','VA','22003','2013-09-01 02:17:05','2013-09-01 02:17:05');
/*!40000 ALTER TABLE `shipping_addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tshirts`
--

DROP TABLE IF EXISTS `tshirts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tshirts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `size` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `slug` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `sex` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `size_value` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tshirts`
--

LOCK TABLES `tshirts` WRITE;
/*!40000 ALTER TABLE `tshirts` DISABLE KEYS */;
INSERT INTO `tshirts` VALUES (1,'Mens Small','mens_small','2013-07-25 02:08:27','2013-07-25 02:08:27','m',0),(2,'Mens Medium','mens_medium','2013-07-25 02:08:27','2013-07-25 02:08:27','m',1),(3,'Mens Large','mens_large','2013-07-25 02:08:27','2013-07-25 02:08:27','m',2),(4,'Mens X Large','menx_xlarge','2013-07-25 02:08:27','2013-07-25 02:08:27','m',3),(5,'Mens XX Large','mens_xxlarge','2013-07-25 02:08:27','2013-07-25 02:08:27','m',4),(6,'Womens Small','womens_small','2013-07-25 02:08:27','2013-07-25 02:08:27','w',0),(7,'Womens Medium','womens_medium','2013-07-25 02:08:27','2013-07-25 02:08:27','w',1),(8,'Womens Large','womens_large','2013-07-25 02:08:27','2013-07-25 02:08:27','w',2),(9,'Womens X Large','womens_xlarge','2013-07-25 02:08:27','2013-07-25 02:08:27','w',3),(10,'Womens XX Large','womens_xxlarge','2013-07-25 02:08:27','2013-07-25 02:08:27','w',4),(11,'Unisex Small','unisex_small','2013-07-25 02:08:27','2013-07-25 02:08:27','z',0),(12,'Unisex Medium','unisex_medium','2013-07-25 02:08:27','2013-07-25 02:08:27','z',1),(13,'Unisex Large','unisex_large','2013-07-25 02:08:27','2013-07-25 02:08:27','z',2),(14,'Unisex X Large','unisex_xlarge','2013-07-25 02:08:27','2013-07-25 02:08:27','z',3),(15,'Unisex XX Large','unisex_xxlarge','2013-07-25 02:08:27','2013-07-25 02:08:27','z',4);
/*!40000 ALTER TABLE `tshirts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `encrypted_password` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `reset_password_token` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `reset_password_sent_at` datetime DEFAULT NULL,
  `remember_created_at` datetime DEFAULT NULL,
  `sign_in_count` int(11) DEFAULT '0',
  `current_sign_in_at` datetime DEFAULT NULL,
  `last_sign_in_at` datetime DEFAULT NULL,
  `current_sign_in_ip` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `last_sign_in_ip` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT '0',
  `first_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `gender` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `state` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `time_zone` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `vagrant` tinyint(1) DEFAULT NULL,
  `favorite_shoe` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `shipping_address_id` int(11) DEFAULT NULL,
  `race_manager` tinyint(1) DEFAULT '0',
  `auto_submission` tinyint(1) DEFAULT '1',
  `confirmation_token` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `confirmed_at` datetime DEFAULT NULL,
  `confirmation_sent_at` datetime DEFAULT NULL,
  `unconfirmed_email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `referral_credit` decimal(10,2) DEFAULT '0.00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `index_users_on_confirmation_token` (`confirmation_token`),
  UNIQUE KEY `index_users_on_reset_password_token` (`reset_password_token`),
  KEY `index_users_on_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'mmb@ms6.url.com.tw','$2a$10$rRRfdeXfDQcX9hGobzxNBeu1CcYDUc9OnoA1bozTgGWiMpJDVzWw.',NULL,NULL,'2013-08-19 04:02:54',15,'2013-09-01 01:34:21','2013-08-19 04:02:54','108.18.250.243','72.83.48.10','2013-07-25 02:00:13','2013-09-01 01:34:21',1,'Warren','Wang','m','DC','1980-10-17','Eastern Time (US & Canada)',NULL,'',NULL,1,1,'ysiRBNyvgbC7fAjk1L5o','2013-07-25 02:00:30','2013-07-25 02:00:13',NULL,'0.00'),(2,'warren@phantomrunner.com','$2a$10$GUru5h.jF4e5ygMrzAthIulL8kXu0krdu95KX0FOztQumR3Eh3Tb6',NULL,NULL,NULL,9,'2013-09-01 01:29:32','2013-08-26 16:31:17','108.18.250.243','12.14.12.21','2013-08-02 14:59:44','2013-09-01 01:34:10',0,'Warren','Wang','m','DC','1980-10-10','Eastern Time (US & Canada)',NULL,'',NULL,1,1,'pAADxoDp6ACifD8cBpsb','2013-08-02 15:00:00','2013-08-02 14:59:44',NULL,'0.00'),(3,'test@test.com','$2a$10$eoO6p8Y1Qp4gXjrWeuhz9uCEaWXMRca6JZksybc4SmnqJ9Ep26i86',NULL,NULL,NULL,1,'2013-08-02 17:24:40','2013-08-02 17:24:40','12.14.12.21','12.14.12.21','2013-08-02 17:23:01','2013-08-02 17:24:40',0,'1','Test','m','DC','1980-10-10','Eastern Time (US & Canada)',NULL,'',NULL,0,1,NULL,'2013-08-02 17:24:40','2013-08-02 17:23:01',NULL,'0.00');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2013-09-10  7:11:53
