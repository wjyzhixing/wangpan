/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : wp

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2019-04-29 20:54:06
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `allfiles`
-- ----------------------------
DROP TABLE IF EXISTS `allfiles`;
CREATE TABLE `allfiles` (
  `ID` int(255) NOT NULL AUTO_INCREMENT,
  `LastName` varchar(255) NOT NULL,
  `hashName` varchar(255) NOT NULL,
  `lastTime` varchar(255) NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `size` varchar(255) NOT NULL,
  `download` varchar(255) NOT NULL,
  `user` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of allfiles
-- ----------------------------
INSERT INTO `allfiles` VALUES ('5', 'Cargo - Frontier (Cargo Remix).mp3', '497b3d00ab2944012e4abf2ff23438e5.mp3', '2019-4-29 15:33:05', '.mp3', '3032340', '6', 'zhixing');
INSERT INTO `allfiles` VALUES ('9', 'Cargo - Frontier (Cargo Remix).mp3', '3a233c42b40c2bb23696768a39b93950.mp3', '2019-4-29 15:35:47', '.mp3', '3032340', '2', 'root');
INSERT INTO `allfiles` VALUES ('10', '课外作业.txt', 'fec908c0ec3b09005f09314db367e691.txt', '2019-4-29 16:21:22', '.txt', '12003', '20', 'root');
INSERT INTO `allfiles` VALUES ('11', '照片.jpg', '7b23aa4db3c771ae37bb8d2e736345c7.jpg', '2019-4-29 17:32:28', '.jpg', '58815', '1', 'root');
INSERT INTO `allfiles` VALUES ('13', '心得体会.docx', '00412e7ffa664c4d678ae4b04c8b0245.docx', '2019-4-29 18:19:24', '.docx', '14657', '0', 'zhixing');
INSERT INTO `allfiles` VALUES ('14', '西农故事.docx', '5644a6a741d3ec046b5b873c47d909f8.docx', '2019-4-29 18:29:42', '.docx', '15403', '0', 'zhixing');
INSERT INTO `allfiles` VALUES ('15', '电商161-王竟宇.docx', 'abc6b09a21f11623c32ce2bf901a7ded.docx', '2019-4-29 18:39:14', '.docx', '14601', '0', 'zhixing');

-- ----------------------------
-- Table structure for `root`
-- ----------------------------
DROP TABLE IF EXISTS `root`;
CREATE TABLE `root` (
  `ID` int(255) NOT NULL AUTO_INCREMENT,
  `LastName` varchar(255) NOT NULL,
  `hashName` varchar(255) NOT NULL,
  `lastTime` varchar(255) NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `size` varchar(255) NOT NULL,
  `download` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of root
-- ----------------------------
INSERT INTO `root` VALUES ('4', 'Cargo - Frontier (Cargo Remix).mp3', '3a233c42b40c2bb23696768a39b93950.mp3', '2019-4-29 15:35:47', '.mp3', '3032340', '2');
INSERT INTO `root` VALUES ('5', '课外作业.txt', 'fec908c0ec3b09005f09314db367e691.txt', '2019-4-29 16:21:22', '.txt', '12003', '20');
INSERT INTO `root` VALUES ('6', '照片.jpg', '7b23aa4db3c771ae37bb8d2e736345c7.jpg', '2019-4-29 17:32:28', '.jpg', '58815', '1');

-- ----------------------------
-- Table structure for `usertab`
-- ----------------------------
DROP TABLE IF EXISTS `usertab`;
CREATE TABLE `usertab` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `user` varchar(255) DEFAULT NULL,
  `pass` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of usertab
-- ----------------------------
INSERT INTO `usertab` VALUES ('6', 'zhixing', 'wjy19971220');
INSERT INTO `usertab` VALUES ('8', 'root', '111111jy1997122');

-- ----------------------------
-- Table structure for `zhixing`
-- ----------------------------
DROP TABLE IF EXISTS `zhixing`;
CREATE TABLE `zhixing` (
  `ID` int(255) NOT NULL AUTO_INCREMENT,
  `LastName` varchar(255) NOT NULL,
  `hashName` varchar(255) NOT NULL,
  `lastTime` varchar(255) NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `size` varchar(255) NOT NULL,
  `download` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of zhixing
-- ----------------------------
INSERT INTO `zhixing` VALUES ('15', 'Cargo - Frontier (Cargo Remix).mp3', '497b3d00ab2944012e4abf2ff23438e5.mp3', '2019-4-29 15:33:05', '.mp3', '3032340', '6');
INSERT INTO `zhixing` VALUES ('17', '心得体会.docx', '00412e7ffa664c4d678ae4b04c8b0245.docx', '2019-4-29 18:19:24', '.docx', '14657', '0');
INSERT INTO `zhixing` VALUES ('18', '西农故事.docx', '5644a6a741d3ec046b5b873c47d909f8.docx', '2019-4-29 18:29:42', '.docx', '15403', '0');
INSERT INTO `zhixing` VALUES ('19', '电商161-王竟宇.docx', 'abc6b09a21f11623c32ce2bf901a7ded.docx', '2019-4-29 18:39:14', '.docx', '14601', '0');
