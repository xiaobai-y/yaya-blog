/*
Navicat MySQL Data Transfer

Source Server         : 22
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : blog

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2018-11-10 14:22:01
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for articleinfo
-- ----------------------------
DROP TABLE IF EXISTS `articleinfo`;
CREATE TABLE `articleinfo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `ctime` varchar(255) NOT NULL,
  `authod_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=76 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of articleinfo
-- ----------------------------
INSERT INTO `articleinfo` VALUES ('70', 'vue', 'vue', '2018-11-09 18:50:38', '1');
INSERT INTO `articleinfo` VALUES ('71', 'html', 'html', '2018-11-09 18:50:54', '1');
INSERT INTO `articleinfo` VALUES ('72', 'css', 'css', '2018-11-09 18:51:02', '1');
INSERT INTO `articleinfo` VALUES ('73', 'javascript', 'javascript', '2018-11-09 18:51:14', '1');
INSERT INTO `articleinfo` VALUES ('74', 'mui', 'mui', '2018-11-09 18:51:30', '1');
INSERT INTO `articleinfo` VALUES ('75', 'vue', '#学习vue2', '2018-11-09 23:04:49', '24');
INSERT INTO `articleinfo` VALUES ('69', '移动web', '移动web', '2018-11-09 18:50:28', '1');
INSERT INTO `articleinfo` VALUES ('68', 'git', 'git', '2018-11-09 18:50:13', '1');
INSERT INTO `articleinfo` VALUES ('67', 'node', 'npm', '2018-11-09 18:50:03', '1');
INSERT INTO `articleinfo` VALUES ('66', 'ff', 'ffffff', '2018-11-09 18:46:25', '1');

-- ----------------------------
-- Table structure for userinfo
-- ----------------------------
DROP TABLE IF EXISTS `userinfo`;
CREATE TABLE `userinfo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nickname` varchar(255) NOT NULL,
  `ctime` varchar(255) NOT NULL,
  `isdel` tinyint(4) NOT NULL COMMENT '表示用户是否被删除,0未删除,1删除',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of userinfo
-- ----------------------------
INSERT INTO `userinfo` VALUES ('24', 'yaya2', '$2b$10$DvFnOt0Ok08c8DNiLvPjJ..3bdVMyufu55O6WF.3Nr9JO0oB/KtK.', 'ya', '2018-11-09 22:49:12', '0');
INSERT INTO `userinfo` VALUES ('23', 'yaya7', '$2b$10$R5FyYStloAg99ULlk8mVEOeCOhbkYnLg.ynWV9sGhBLPXnJmlSSI6', '11', '2018-11-09 21:54:52', '0');
INSERT INTO `userinfo` VALUES ('1', 'yaya', '123456', 'yy', '2018-11-09 22:51:50', '0');
