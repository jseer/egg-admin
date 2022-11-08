/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80030
 Source Host           : localhost:3306
 Source Schema         : egg_admin

 Target Server Type    : MySQL
 Target Server Version : 80030
 File Encoding         : 65001

 Date: 22/10/2022 08:13:17
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- 创建数据库
DROP DATABASE IF EXISTS `egg_admin`;
CREATE DATABASE `egg_admin`;
use egg_admin;

-- ----------------------------
-- Table structure for api_items
-- ----------------------------
DROP TABLE IF EXISTS `api_items`;
CREATE TABLE `api_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `code` varchar(255) NOT NULL,
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `parent_id` int DEFAULT NULL,
  `type` varchar(255) NOT NULL,
  `create_time` varchar(255) NOT NULL,
  `update_time` varchar(255) NOT NULL,
  `need_login` tinyint DEFAULT '1',
  `method` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `status` tinyint NOT NULL DEFAULT '1',
  `need_login_check` tinyint DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of api_items
-- ----------------------------
BEGIN;
INSERT INTO `api_items` VALUES (15, '用户模块', '/api/user', NULL, NULL, '1', '2022-09-17 11:21:04', '2022-10-21 18:16:00', 1, '', 1, 0);
INSERT INTO `api_items` VALUES (16, '创建用户', '/api/user/create', '/api/user/create', 15, '2', '2022-09-17 11:22:57', '2022-09-24 21:21:33', 1, 'post', 1, 1);
INSERT INTO `api_items` VALUES (18, '用户分页列表', '/api/user/page', '/api/user/page', 15, '2', '2022-09-17 11:23:32', '2022-09-24 21:21:33', 1, 'get', 1, 1);
INSERT INTO `api_items` VALUES (19, '用户列表', '/api/user/list', '/api/user/list', 15, '2', '2022-09-17 11:24:00', '2022-09-24 21:21:33', 1, 'get', 1, 1);
INSERT INTO `api_items` VALUES (20, '更新用户', '/api/user/update', '/api/user/update', 15, '2', '2022-09-17 11:24:41', '2022-09-24 21:21:33', 1, 'post', 1, 1);
INSERT INTO `api_items` VALUES (21, '根据ids删除用户', '/api/user/removeByIds', '/api/user/removeByIds', 15, '2', '2022-09-17 11:27:29', '2022-09-24 21:21:33', 1, 'post', 1, 1);
INSERT INTO `api_items` VALUES (22, '退出登录', '/api/user/logout', '/api/user/logout', 15, '2', '2022-09-17 11:27:43', '2022-09-24 21:21:33', 1, 'post', 1, 0);
INSERT INTO `api_items` VALUES (23, '获取当前登录用户信息', '/api/user/getCurrent', '/api/user/getCurrent', 15, '2', '2022-09-17 11:28:05', '2022-09-24 21:21:33', 1, 'get', 1, 0);
INSERT INTO `api_items` VALUES (24, '根据角色id查询用户列表', '/api/user/getListByRoleId', '/api/user/getListByRoleId', 15, '2', '2022-09-17 11:28:35', '2022-09-24 21:21:33', 1, 'get', 1, 1);
INSERT INTO `api_items` VALUES (25, '角色模块', '/api/role', NULL, NULL, '1', '2022-09-17 11:28:56', '2022-09-17 11:28:56', 1, '', 1, 0);
INSERT INTO `api_items` VALUES (26, '创建角色', '/api/role/create', '/api/role/create', 25, '2', '2022-09-17 11:29:09', '2022-09-22 18:35:45', 1, 'post', 1, 1);
INSERT INTO `api_items` VALUES (27, '分页查询角色列表', '/api/role/page', '/api/role/page', 25, '2', '2022-09-17 11:29:34', '2022-09-22 18:35:47', 1, 'get', 1, 1);
INSERT INTO `api_items` VALUES (28, '更新角色信息', '/api/role/update', '/api/role/update', 25, '2', '2022-09-17 11:29:48', '2022-09-22 18:35:48', 1, 'post', 1, 1);
INSERT INTO `api_items` VALUES (29, '根据Ids删除角色', '/api/role/removeByIds', '/api/role/removeByIds', 25, '2', '2022-09-17 11:30:06', '2022-09-22 18:35:49', 1, 'post', 1, 1);
INSERT INTO `api_items` VALUES (30, '不分页查询角色列表', '/api/role/list', '/api/role/list', 25, '2', '2022-09-17 11:30:20', '2022-09-22 18:35:50', 1, 'get', 1, 1);
INSERT INTO `api_items` VALUES (31, '根据角色分配用户', '/api/role/distributionUser', '/api/role/distributionUser', 25, '2', '2022-09-17 11:30:57', '2022-09-22 18:35:51', 1, 'post', 1, 1);
INSERT INTO `api_items` VALUES (32, '菜单模块', '/api/menu', '', NULL, '1', '2022-09-17 11:31:15', '2022-09-17 11:32:19', 1, '', 1, 0);
INSERT INTO `api_items` VALUES (34, '创建模块', '/api/menu/create', '/api/menu/create', 32, '2', '2022-09-17 11:31:54', '2022-09-22 18:35:57', 1, 'post', 1, 1);
INSERT INTO `api_items` VALUES (35, '不分页查询菜单列表', '/api/menu/list', '/api/menu/list', 32, '2', '2022-09-17 11:32:14', '2022-09-22 18:35:58', 1, 'get', 1, 1);
INSERT INTO `api_items` VALUES (36, '更新菜单', '/api/menu/update', '/api/menu/update', 32, '2', '2022-09-17 11:32:45', '2022-09-22 18:35:59', 1, 'post', 1, 1);
INSERT INTO `api_items` VALUES (37, '根据ids删除菜单', '/api/menu/removeByIds', '/api/menu/removeByIds', 32, '2', '2022-09-17 11:32:59', '2022-09-22 18:36:00', 1, 'post', 1, 1);
INSERT INTO `api_items` VALUES (38, 'api接口模块', '/api/apiItem', NULL, NULL, '1', '2022-09-17 11:33:19', '2022-09-17 11:33:19', 1, '', 1, 0);
INSERT INTO `api_items` VALUES (39, '创建api接口', '/api/apiItem/create', '/api/apiItem/create', 38, '2', '2022-09-17 11:33:35', '2022-09-22 18:36:07', 1, 'post', 1, 1);
INSERT INTO `api_items` VALUES (40, '更新api接口', '/api/apiItem/update', '/api/apiItem/update', 38, '2', '2022-09-17 11:33:50', '2022-09-22 18:36:07', 1, 'post', 1, 1);
INSERT INTO `api_items` VALUES (41, '不分页查询api接口列表', '/api/apiItem/list', '/api/apiItem/list', 38, '2', '2022-09-17 11:34:05', '2022-09-22 18:36:15', 1, 'get', 1, 1);
INSERT INTO `api_items` VALUES (42, '根据ids删除api接口', '/api/apiItem/removeByIds', '/api/apiItem/removeByIds', 38, '2', '2022-09-17 11:34:25', '2022-09-22 18:36:16', 1, 'post', 1, 1);
INSERT INTO `api_items` VALUES (43, '字典模块', '/api/dictionaries', NULL, NULL, '1', '2022-09-17 11:34:54', '2022-09-17 11:34:54', 1, '', 1, 0);
INSERT INTO `api_items` VALUES (44, '创建字典', '/api/dictionaries/create', '/api/dictionaries/create', 43, '2', '2022-09-17 11:35:06', '2022-09-22 18:36:22', 1, 'post', 1, 1);
INSERT INTO `api_items` VALUES (45, '分页查询字典列表', '/api/dictionaries/page', '/api/dictionaries/page', 43, '2', '2022-09-17 11:35:21', '2022-09-22 18:36:24', 1, 'get', 1, 1);
INSERT INTO `api_items` VALUES (46, '更新字典基本信息', '/api/dictionaries/update', '/api/dictionaries/update', 43, '2', '2022-09-17 11:35:47', '2022-09-22 18:36:25', 1, 'post', 1, 1);
INSERT INTO `api_items` VALUES (47, '根据ids删除字典', '/api/dictionaries/removeByIds', '/api/dictionaries/removeByIds', 43, '2', '2022-09-17 11:36:01', '2022-09-22 18:36:27', 1, 'post', 1, 1);
INSERT INTO `api_items` VALUES (48, '更新字典枚举值', '/api/dictionaries/updateDictionariesItems', '/api/dictionaries/updateDictionariesItems', 43, '2', '2022-09-17 11:36:33', '2022-09-22 18:36:28', 1, 'post', 1, 1);
INSERT INTO `api_items` VALUES (49, '根据id获取字典枚举值', '/api/dictionaries/getDictionariesItemsById', '/api/dictionaries/getDictionariesItemsById', 43, '2', '2022-09-17 11:37:11', '2022-09-22 18:36:31', 1, 'get', 1, 1);
INSERT INTO `api_items` VALUES (50, '获取所有字典映射', '/api/dictionaries/getAllDictionaries', '/api/dictionaries/getAllDictionaries', 43, '2', '2022-09-17 11:37:46', '2022-09-22 18:36:30', 1, 'get', 1, 1);
INSERT INTO `api_items` VALUES (51, '分配资源', '/api/role/distributionResource', '/api/role/distributionResource', 25, '2', '2022-09-19 14:42:51', '2022-09-22 18:35:52', 1, 'post', 1, 1);
INSERT INTO `api_items` VALUES (52, '根据角色id查询菜单列表', '/api/menu/listByRoleId', '/api/menu/listByRoleId', 32, '2', '2022-09-19 14:44:11', '2022-09-22 18:36:00', 1, 'get', 1, 1);
INSERT INTO `api_items` VALUES (53, '根据角色id查询api接口列表', '/api/apiItem/listByRoleId', '/api/apiItem/listByRoleId', 38, '2', '2022-09-19 14:44:47', '2022-09-22 18:36:17', 1, 'get', 1, 1);
INSERT INTO `api_items` VALUES (57, '用户注册', '/api/user/register', '/api/user/register', 15, '2', '2022-09-19 21:13:19', '2022-09-24 21:21:33', 0, 'post', 1, 0);
INSERT INTO `api_items` VALUES (66, '根据当前用户查询有权限的菜单列表', '/api/menu/authList', '/api/menu/authList', 32, '2', '2022-09-22 18:06:33', '2022-09-22 18:06:33', 1, 'get', 1, 1);
INSERT INTO `api_items` VALUES (67, '更新菜单状态', '/api/menu/updateStatus', '/api/menu/updateStatus', 32, '2', '2022-09-22 18:07:03', '2022-09-22 18:07:03', 1, 'post', 1, 1);
INSERT INTO `api_items` VALUES (68, '获取可分配的api接口列表', '/api/apiItem/getDistributableList', '/api/apiItem/getDistributableList', 38, '2', '2022-09-22 18:07:39', '2022-09-22 18:07:39', 1, 'get', 1, 1);
INSERT INTO `api_items` VALUES (69, '更新api接口状态', '/api/apiItem/updateStatus', '/api/apiItem/updateStatus', 38, '2', '2022-09-22 18:07:59', '2022-09-22 18:08:08', 1, 'post', 1, 1);
INSERT INTO `api_items` VALUES (70, '更新api接口校验状态', '/api/apiItem/updateCheckStatus', '/api/apiItem/updateCheckStatus', 38, '2', '2022-09-22 18:37:44', '2022-09-22 18:37:44', 1, 'post', 1, 1);
INSERT INTO `api_items` VALUES (71, '系统管理', '/system', NULL, NULL, '1', '2022-09-22 20:45:58', '2022-09-22 20:45:58', 1, NULL, 1, 0);
INSERT INTO `api_items` VALUES (72, '查询登录记录', '/api/system/getLoginRecords', '/api/system/getLoginRecords', 71, '2', '2022-09-22 20:51:03', '2022-09-22 20:51:03', 1, 'get', 1, 1);
INSERT INTO `api_items` VALUES (73, '登录历史', '/api/user/getLoginHistory', '/api/user/getLoginHistory', 15, '2', '2022-09-22 21:16:29', '2022-09-24 21:21:33', 1, 'get', 1, 1);
INSERT INTO `api_items` VALUES (75, '根据账号或邮箱验证用户是否存在', '/api/user/validateByNameOrEmail', '/api/user/validateByNameOrEmail', 15, '2', '2022-09-23 09:33:07', '2022-10-22 08:05:50', 0, 'get', 1, 0);
INSERT INTO `api_items` VALUES (76, '连续登录天数', '/api/system/continuousLoginDays', '/api/system/continuousLoginDays', 71, '2', '2022-10-04 13:08:32', '2022-10-04 13:08:32', 1, 'get', 1, 1);
INSERT INTO `api_items` VALUES (77, '用户相关数据汇总', '/api/system/getCountMap', '/api/system/getCountMap', 71, '2', '2022-10-04 13:09:17', '2022-10-04 13:18:57', 1, 'get', 1, 1);
INSERT INTO `api_items` VALUES (81, '游客登录', '/api/user/touristLogin', '/api/user/touristLogin', 15, '2', '2022-10-06 08:54:20', '2022-10-06 08:54:20', 0, 'post', 1, 0);
INSERT INTO `api_items` VALUES (82, '通用模块', '/api/common', NULL, NULL, '1', '2022-10-06 19:09:22', '2022-10-06 19:09:22', 1, NULL, 1, 0);
INSERT INTO `api_items` VALUES (83, '获取公钥', '/api/common/rsa/public', '/api/common/rsa/public', 82, '2', '2022-10-06 19:10:04', '2022-10-06 19:10:04', 0, 'get', 1, 0);
COMMIT;

-- ----------------------------
-- Table structure for dictionaries
-- ----------------------------
DROP TABLE IF EXISTS `dictionaries`;
CREATE TABLE `dictionaries` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `code` varchar(20) NOT NULL,
  `create_time` varchar(255) NOT NULL,
  `update_time` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of dictionaries
-- ----------------------------
BEGIN;
INSERT INTO `dictionaries` VALUES (5, '菜单类型', 'MENU_TYPE', '', '');
INSERT INTO `dictionaries` VALUES (6, 'api接口类型', 'API_ITEM_TYPE', '2022-09-17 11:14:25', '2022-09-17 11:18:19');
INSERT INTO `dictionaries` VALUES (7, '资源类型', 'RESOURCE_TYPE', '2022-09-17 14:06:00', '2022-09-17 14:06:00');
INSERT INTO `dictionaries` VALUES (9, '角色级别', 'ROLE_LEVEL', '2022-09-20 10:11:25', '2022-09-20 10:12:49');
COMMIT;

-- ----------------------------
-- Table structure for dictionaries_items
-- ----------------------------
DROP TABLE IF EXISTS `dictionaries_items`;
CREATE TABLE `dictionaries_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `label` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL,
  `dictionaries_id` int NOT NULL,
  `create_time` varchar(255) NOT NULL,
  `update_time` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `value` (`value`,`dictionaries_id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of dictionaries_items
-- ----------------------------
BEGIN;
INSERT INTO `dictionaries_items` VALUES (11, 'aa', '1', 3, '', '');
INSERT INTO `dictionaries_items` VALUES (12, 'aa', 'aa', 3, '', '');
INSERT INTO `dictionaries_items` VALUES (16, '目录', '1', 5, '', '');
INSERT INTO `dictionaries_items` VALUES (17, '页面', '2', 5, '', '');
INSERT INTO `dictionaries_items` VALUES (18, '男', '1', 4, '', '');
INSERT INTO `dictionaries_items` VALUES (19, '女', '2', 4, '', '');
INSERT INTO `dictionaries_items` VALUES (20, '模块', '1', 6, '2022-09-17 11:17:50', '2022-09-17 11:17:50');
INSERT INTO `dictionaries_items` VALUES (21, '接口', '2', 6, '2022-09-17 11:17:50', '2022-09-17 11:17:50');
INSERT INTO `dictionaries_items` VALUES (22, '菜单', 'menu', 7, '2022-09-17 14:06:23', '2022-09-17 14:06:23');
INSERT INTO `dictionaries_items` VALUES (23, 'api接口', 'api', 7, '2022-09-17 14:06:23', '2022-09-17 14:06:23');
INSERT INTO `dictionaries_items` VALUES (24, '系统级别', '0', 9, '2022-09-20 10:12:39', '2022-09-20 10:12:39');
INSERT INTO `dictionaries_items` VALUES (25, '用户级别', '1', 9, '2022-09-20 10:12:39', '2022-09-20 10:12:39');
INSERT INTO `dictionaries_items` VALUES (26, '游客级别', '2', 9, '2022-09-20 10:12:39', '2022-09-20 10:12:39');
COMMIT;

-- ----------------------------
-- Table structure for login_records
-- ----------------------------
DROP TABLE IF EXISTS `login_records`;
CREATE TABLE `login_records` (
  `id` int NOT NULL AUTO_INCREMENT,
  `login_time` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `user_id` int DEFAULT NULL,
  `type` varchar(255) NOT NULL,
  `country` varchar(255) DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `ip` varchar(255) DEFAULT NULL,
  `browser` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of login_records
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `code` varchar(255) NOT NULL,
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `parent_id` int DEFAULT NULL,
  `type` varchar(255) NOT NULL,
  `sort` smallint DEFAULT '0',
  `create_time` varchar(255) NOT NULL,
  `update_time` varchar(255) NOT NULL,
  `status` tinyint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of menu
-- ----------------------------
BEGIN;
INSERT INTO `menu` VALUES (2, '权限管理', '/authorityManage', NULL, NULL, '1', 1, '', '2022-09-22 17:45:56', 1);
INSERT INTO `menu` VALUES (4, '用户列表', '/authManage/user', '/authManage/user', 2, '2', 0, '', '2022-09-22 17:45:56', 1);
INSERT INTO `menu` VALUES (5, '角色列表', '/authManage/role', '/authManage/role', 2, '2', 0, '', '2022-09-22 17:45:56', 1);
INSERT INTO `menu` VALUES (7, '基础数据', '/baseData', '/baseData', NULL, '1', 0, '', '2022-09-22 17:45:38', 1);
INSERT INTO `menu` VALUES (8, '字典', '/baseData/dictionaries', '/baseData/dictionaries', 7, '2', 0, '', '2022-09-22 17:45:38', 1);
INSERT INTO `menu` VALUES (9, '首页', '/overview', '/overview', NULL, '2', 2, '', '2022-09-22 15:19:58', 1);
INSERT INTO `menu` VALUES (11, '资源列表', '/authManage/resource', NULL, 2, '1', 1, '2022-09-17 09:22:50', '2022-09-22 17:45:56', 1);
INSERT INTO `menu` VALUES (12, '菜单', '/authManage/resource/menu', '/authManage/resource/menu', 11, '2', 1, '2022-09-17 09:26:28', '2022-09-22 17:45:56', 1);
INSERT INTO `menu` VALUES (15, 'api接口', '/authManage/resource/apiItem', '/authManage/resource/apiItem', 11, '2', 0, '2022-09-17 11:07:34', '2022-09-22 17:53:46', 1);
INSERT INTO `menu` VALUES (24, '系统管理', '/system', NULL, NULL, '1', 1, '2022-09-22 20:36:16', '2022-09-22 20:37:42', 1);
INSERT INTO `menu` VALUES (25, '登录记录', '/system/loginRecords', '/system/loginRecords', 24, '2', 1, '2022-09-22 20:37:58', '2022-09-22 20:37:58', 1);
INSERT INTO `menu` VALUES (26, '登录历史', 'loginHistory', '/loginHistory', NULL, '2', 1, '2022-09-22 21:14:21', '2022-09-22 21:14:29', 1);
COMMIT;

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `code` varchar(20) NOT NULL,
  `create_time` varchar(255) NOT NULL,
  `update_time` varchar(255) NOT NULL,
  `status` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`) USING BTREE,
  UNIQUE KEY `code` (`code`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of role
-- ----------------------------
BEGIN;
INSERT INTO `role` VALUES (1, '管理员', 'admin', '2022-10-21 17:58:39', '2022-10-21 17:58:39', 1);
INSERT INTO `role` VALUES (2, '普通账号', 'normal_user', '2022-10-21 18:00:21', '2022-10-21 18:01:08', 1);
INSERT INTO `role` VALUES (3, '游客', 'tourist', '2022-10-21 18:04:09', '2022-10-21 18:04:09', 1);
COMMIT;

-- ----------------------------
-- Table structure for role_api_item
-- ----------------------------
DROP TABLE IF EXISTS `role_api_item`;
CREATE TABLE `role_api_item` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_id` int NOT NULL,
  `api_item_id` int NOT NULL,
  `create_time` varchar(255) NOT NULL,
  `update_time` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of role_api_item
-- ----------------------------
BEGIN;
INSERT INTO `role_api_item` VALUES (1, 1, 26, '2022-10-21 17:58:59', '2022-10-21 17:58:59');
INSERT INTO `role_api_item` VALUES (2, 1, 25, '2022-10-21 17:58:59', '2022-10-21 17:58:59');
INSERT INTO `role_api_item` VALUES (3, 1, 27, '2022-10-21 17:58:59', '2022-10-21 17:58:59');
INSERT INTO `role_api_item` VALUES (4, 1, 28, '2022-10-21 17:58:59', '2022-10-21 17:58:59');
INSERT INTO `role_api_item` VALUES (5, 1, 29, '2022-10-21 17:58:59', '2022-10-21 17:58:59');
INSERT INTO `role_api_item` VALUES (6, 1, 30, '2022-10-21 17:58:59', '2022-10-21 17:58:59');
INSERT INTO `role_api_item` VALUES (7, 1, 31, '2022-10-21 17:58:59', '2022-10-21 17:58:59');
INSERT INTO `role_api_item` VALUES (8, 1, 34, '2022-10-21 17:58:59', '2022-10-21 17:58:59');
INSERT INTO `role_api_item` VALUES (9, 1, 32, '2022-10-21 17:58:59', '2022-10-21 17:58:59');
INSERT INTO `role_api_item` VALUES (10, 1, 36, '2022-10-21 17:58:59', '2022-10-21 17:58:59');
INSERT INTO `role_api_item` VALUES (11, 1, 35, '2022-10-21 17:58:59', '2022-10-21 17:58:59');
INSERT INTO `role_api_item` VALUES (12, 1, 37, '2022-10-21 17:58:59', '2022-10-21 17:58:59');
INSERT INTO `role_api_item` VALUES (13, 1, 40, '2022-10-21 17:58:59', '2022-10-21 17:58:59');
INSERT INTO `role_api_item` VALUES (14, 1, 38, '2022-10-21 17:58:59', '2022-10-21 17:58:59');
INSERT INTO `role_api_item` VALUES (15, 1, 39, '2022-10-21 17:58:59', '2022-10-21 17:58:59');
INSERT INTO `role_api_item` VALUES (16, 1, 41, '2022-10-21 17:58:59', '2022-10-21 17:58:59');
INSERT INTO `role_api_item` VALUES (17, 1, 42, '2022-10-21 17:58:59', '2022-10-21 17:58:59');
INSERT INTO `role_api_item` VALUES (18, 1, 44, '2022-10-21 17:58:59', '2022-10-21 17:58:59');
INSERT INTO `role_api_item` VALUES (19, 1, 43, '2022-10-21 17:58:59', '2022-10-21 17:58:59');
INSERT INTO `role_api_item` VALUES (20, 1, 46, '2022-10-21 17:58:59', '2022-10-21 17:58:59');
INSERT INTO `role_api_item` VALUES (21, 1, 45, '2022-10-21 17:58:59', '2022-10-21 17:58:59');
INSERT INTO `role_api_item` VALUES (22, 1, 47, '2022-10-21 17:58:59', '2022-10-21 17:58:59');
INSERT INTO `role_api_item` VALUES (23, 1, 48, '2022-10-21 17:58:59', '2022-10-21 17:58:59');
INSERT INTO `role_api_item` VALUES (24, 1, 49, '2022-10-21 17:58:59', '2022-10-21 17:58:59');
INSERT INTO `role_api_item` VALUES (25, 1, 51, '2022-10-21 17:58:59', '2022-10-21 17:58:59');
INSERT INTO `role_api_item` VALUES (26, 1, 50, '2022-10-21 17:58:59', '2022-10-21 17:58:59');
INSERT INTO `role_api_item` VALUES (27, 1, 52, '2022-10-21 17:58:59', '2022-10-21 17:58:59');
INSERT INTO `role_api_item` VALUES (28, 1, 53, '2022-10-21 17:58:59', '2022-10-21 17:58:59');
INSERT INTO `role_api_item` VALUES (29, 1, 66, '2022-10-21 17:58:59', '2022-10-21 17:58:59');
INSERT INTO `role_api_item` VALUES (30, 1, 68, '2022-10-21 17:58:59', '2022-10-21 17:58:59');
INSERT INTO `role_api_item` VALUES (31, 1, 67, '2022-10-21 17:58:59', '2022-10-21 17:58:59');
INSERT INTO `role_api_item` VALUES (32, 1, 69, '2022-10-21 17:58:59', '2022-10-21 17:58:59');
INSERT INTO `role_api_item` VALUES (33, 1, 70, '2022-10-21 17:58:59', '2022-10-21 17:58:59');
INSERT INTO `role_api_item` VALUES (34, 1, 71, '2022-10-21 17:58:59', '2022-10-21 17:58:59');
INSERT INTO `role_api_item` VALUES (35, 1, 72, '2022-10-21 17:58:59', '2022-10-21 17:58:59');
INSERT INTO `role_api_item` VALUES (36, 1, 76, '2022-10-21 17:58:59', '2022-10-21 17:58:59');
INSERT INTO `role_api_item` VALUES (37, 1, 77, '2022-10-21 17:58:59', '2022-10-21 17:58:59');
INSERT INTO `role_api_item` VALUES (38, 1, 15, '2022-10-21 17:59:06', '2022-10-21 17:59:06');
INSERT INTO `role_api_item` VALUES (39, 1, 19, '2022-10-21 17:59:06', '2022-10-21 17:59:06');
INSERT INTO `role_api_item` VALUES (40, 1, 18, '2022-10-21 17:59:06', '2022-10-21 17:59:06');
INSERT INTO `role_api_item` VALUES (41, 1, 16, '2022-10-21 17:59:06', '2022-10-21 17:59:06');
INSERT INTO `role_api_item` VALUES (42, 1, 20, '2022-10-21 17:59:06', '2022-10-21 17:59:06');
INSERT INTO `role_api_item` VALUES (43, 1, 24, '2022-10-21 17:59:06', '2022-10-21 17:59:06');
INSERT INTO `role_api_item` VALUES (44, 1, 21, '2022-10-21 17:59:06', '2022-10-21 17:59:06');
INSERT INTO `role_api_item` VALUES (45, 1, 73, '2022-10-21 17:59:06', '2022-10-21 17:59:06');
INSERT INTO `role_api_item` VALUES (46, 2, 16, '2022-10-21 18:03:46', '2022-10-21 18:03:46');
INSERT INTO `role_api_item` VALUES (47, 2, 15, '2022-10-21 18:03:46', '2022-10-21 18:03:46');
INSERT INTO `role_api_item` VALUES (48, 2, 19, '2022-10-21 18:03:46', '2022-10-21 18:03:46');
INSERT INTO `role_api_item` VALUES (49, 2, 18, '2022-10-21 18:03:46', '2022-10-21 18:03:46');
INSERT INTO `role_api_item` VALUES (50, 2, 24, '2022-10-21 18:03:46', '2022-10-21 18:03:46');
INSERT INTO `role_api_item` VALUES (51, 2, 25, '2022-10-21 18:03:46', '2022-10-21 18:03:46');
INSERT INTO `role_api_item` VALUES (52, 2, 26, '2022-10-21 18:03:46', '2022-10-21 18:03:46');
INSERT INTO `role_api_item` VALUES (53, 2, 27, '2022-10-21 18:03:46', '2022-10-21 18:03:46');
INSERT INTO `role_api_item` VALUES (54, 2, 35, '2022-10-21 18:03:46', '2022-10-21 18:03:46');
INSERT INTO `role_api_item` VALUES (55, 2, 30, '2022-10-21 18:03:46', '2022-10-21 18:03:46');
INSERT INTO `role_api_item` VALUES (56, 2, 32, '2022-10-21 18:03:46', '2022-10-21 18:03:46');
INSERT INTO `role_api_item` VALUES (57, 2, 38, '2022-10-21 18:03:46', '2022-10-21 18:03:46');
INSERT INTO `role_api_item` VALUES (58, 2, 41, '2022-10-21 18:03:46', '2022-10-21 18:03:46');
INSERT INTO `role_api_item` VALUES (59, 2, 45, '2022-10-21 18:03:46', '2022-10-21 18:03:46');
INSERT INTO `role_api_item` VALUES (60, 2, 43, '2022-10-21 18:03:46', '2022-10-21 18:03:46');
INSERT INTO `role_api_item` VALUES (61, 2, 49, '2022-10-21 18:03:46', '2022-10-21 18:03:46');
INSERT INTO `role_api_item` VALUES (62, 2, 50, '2022-10-21 18:03:46', '2022-10-21 18:03:46');
INSERT INTO `role_api_item` VALUES (63, 2, 52, '2022-10-21 18:03:46', '2022-10-21 18:03:46');
INSERT INTO `role_api_item` VALUES (64, 2, 66, '2022-10-21 18:03:46', '2022-10-21 18:03:46');
INSERT INTO `role_api_item` VALUES (65, 2, 53, '2022-10-21 18:03:46', '2022-10-21 18:03:46');
INSERT INTO `role_api_item` VALUES (66, 2, 68, '2022-10-21 18:03:46', '2022-10-21 18:03:46');
INSERT INTO `role_api_item` VALUES (67, 2, 73, '2022-10-21 18:03:46', '2022-10-21 18:03:46');
INSERT INTO `role_api_item` VALUES (68, 2, 72, '2022-10-21 18:03:46', '2022-10-21 18:03:46');
INSERT INTO `role_api_item` VALUES (69, 2, 71, '2022-10-21 18:03:46', '2022-10-21 18:03:46');
INSERT INTO `role_api_item` VALUES (70, 2, 76, '2022-10-21 18:03:46', '2022-10-21 18:03:46');
INSERT INTO `role_api_item` VALUES (71, 2, 77, '2022-10-21 18:03:46', '2022-10-21 18:03:46');
INSERT INTO `role_api_item` VALUES (72, 3, 18, '2022-10-21 18:05:58', '2022-10-21 18:05:58');
INSERT INTO `role_api_item` VALUES (73, 3, 15, '2022-10-21 18:05:58', '2022-10-21 18:05:58');
INSERT INTO `role_api_item` VALUES (74, 3, 27, '2022-10-21 18:05:58', '2022-10-21 18:05:58');
INSERT INTO `role_api_item` VALUES (75, 3, 32, '2022-10-21 18:05:58', '2022-10-21 18:05:58');
INSERT INTO `role_api_item` VALUES (76, 3, 25, '2022-10-21 18:05:58', '2022-10-21 18:05:58');
INSERT INTO `role_api_item` VALUES (77, 3, 35, '2022-10-21 18:05:58', '2022-10-21 18:05:58');
INSERT INTO `role_api_item` VALUES (78, 3, 38, '2022-10-21 18:05:58', '2022-10-21 18:05:58');
INSERT INTO `role_api_item` VALUES (79, 3, 41, '2022-10-21 18:05:58', '2022-10-21 18:05:58');
INSERT INTO `role_api_item` VALUES (80, 3, 43, '2022-10-21 18:05:58', '2022-10-21 18:05:58');
INSERT INTO `role_api_item` VALUES (81, 3, 45, '2022-10-21 18:05:58', '2022-10-21 18:05:58');
COMMIT;

-- ----------------------------
-- Table structure for role_menu
-- ----------------------------
DROP TABLE IF EXISTS `role_menu`;
CREATE TABLE `role_menu` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_id` int NOT NULL,
  `menu_id` int NOT NULL,
  `create_time` varchar(255) NOT NULL,
  `update_time` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of role_menu
-- ----------------------------
BEGIN;
INSERT INTO `role_menu` VALUES (1, 1, 4, '2022-10-21 17:59:58', '2022-10-21 17:59:58');
INSERT INTO `role_menu` VALUES (2, 1, 2, '2022-10-21 17:59:58', '2022-10-21 17:59:58');
INSERT INTO `role_menu` VALUES (3, 1, 8, '2022-10-21 17:59:58', '2022-10-21 17:59:58');
INSERT INTO `role_menu` VALUES (4, 1, 5, '2022-10-21 17:59:58', '2022-10-21 17:59:58');
INSERT INTO `role_menu` VALUES (5, 1, 7, '2022-10-21 17:59:58', '2022-10-21 17:59:58');
INSERT INTO `role_menu` VALUES (6, 1, 9, '2022-10-21 17:59:58', '2022-10-21 17:59:58');
INSERT INTO `role_menu` VALUES (7, 1, 11, '2022-10-21 17:59:58', '2022-10-21 17:59:58');
INSERT INTO `role_menu` VALUES (8, 1, 15, '2022-10-21 17:59:58', '2022-10-21 17:59:58');
INSERT INTO `role_menu` VALUES (9, 1, 24, '2022-10-21 17:59:58', '2022-10-21 17:59:58');
INSERT INTO `role_menu` VALUES (10, 1, 12, '2022-10-21 17:59:58', '2022-10-21 17:59:58');
INSERT INTO `role_menu` VALUES (11, 1, 25, '2022-10-21 17:59:58', '2022-10-21 17:59:58');
INSERT INTO `role_menu` VALUES (12, 1, 26, '2022-10-21 17:59:58', '2022-10-21 17:59:58');
INSERT INTO `role_menu` VALUES (13, 2, 4, '2022-10-21 18:03:57', '2022-10-21 18:03:57');
INSERT INTO `role_menu` VALUES (14, 2, 2, '2022-10-21 18:03:57', '2022-10-21 18:03:57');
INSERT INTO `role_menu` VALUES (15, 2, 5, '2022-10-21 18:03:57', '2022-10-21 18:03:57');
INSERT INTO `role_menu` VALUES (16, 2, 7, '2022-10-21 18:03:57', '2022-10-21 18:03:57');
INSERT INTO `role_menu` VALUES (17, 2, 8, '2022-10-21 18:03:57', '2022-10-21 18:03:57');
INSERT INTO `role_menu` VALUES (18, 2, 9, '2022-10-21 18:03:57', '2022-10-21 18:03:57');
INSERT INTO `role_menu` VALUES (19, 2, 12, '2022-10-21 18:03:57', '2022-10-21 18:03:57');
INSERT INTO `role_menu` VALUES (20, 2, 11, '2022-10-21 18:03:57', '2022-10-21 18:03:57');
INSERT INTO `role_menu` VALUES (21, 2, 24, '2022-10-21 18:03:57', '2022-10-21 18:03:57');
INSERT INTO `role_menu` VALUES (22, 2, 15, '2022-10-21 18:03:57', '2022-10-21 18:03:57');
INSERT INTO `role_menu` VALUES (23, 2, 25, '2022-10-21 18:03:57', '2022-10-21 18:03:57');
INSERT INTO `role_menu` VALUES (24, 2, 26, '2022-10-21 18:03:57', '2022-10-21 18:03:57');
INSERT INTO `role_menu` VALUES (25, 3, 4, '2022-10-21 18:06:36', '2022-10-21 18:06:36');
INSERT INTO `role_menu` VALUES (26, 3, 2, '2022-10-21 18:06:36', '2022-10-21 18:06:36');
INSERT INTO `role_menu` VALUES (27, 3, 5, '2022-10-21 18:06:36', '2022-10-21 18:06:36');
INSERT INTO `role_menu` VALUES (28, 3, 8, '2022-10-21 18:06:36', '2022-10-21 18:06:36');
INSERT INTO `role_menu` VALUES (29, 3, 9, '2022-10-21 18:06:36', '2022-10-21 18:06:36');
INSERT INTO `role_menu` VALUES (30, 3, 7, '2022-10-21 18:06:36', '2022-10-21 18:06:36');
INSERT INTO `role_menu` VALUES (31, 3, 11, '2022-10-21 18:06:36', '2022-10-21 18:06:36');
INSERT INTO `role_menu` VALUES (32, 3, 15, '2022-10-21 18:06:36', '2022-10-21 18:06:36');
INSERT INTO `role_menu` VALUES (33, 3, 12, '2022-10-21 18:06:36', '2022-10-21 18:06:36');
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `gender` int NOT NULL,
  `create_time` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `update_time` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `code` varchar(255) DEFAULT '',
  `type` varchar(255) NOT NULL DEFAULT 'account',
  `delete_at` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`) USING BTREE,
  UNIQUE KEY `email` (`email`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES (1, 'admin', 'admin@qq.com', 'admin', 1, '2022-10-21 18:15:02', '2022-10-21 18:15:02', '', 'account', NULL);
INSERT INTO `user` VALUES (2, 'normal_user', 'normal_user@qq.com', 'normal_user', 1, '2022-10-21 18:15:49', '2022-10-21 18:15:49', '', 'account', NULL);
COMMIT;

-- ----------------------------
-- Table structure for user_role
-- ----------------------------
DROP TABLE IF EXISTS `user_role`;
CREATE TABLE `user_role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `role_id` int NOT NULL,
  `create_time` varchar(255) NOT NULL,
  `update_time` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of user_role
-- ----------------------------
BEGIN;
INSERT INTO `user_role` VALUES (1, 1, 1, '2022-10-21 17:58:43', '2022-10-21 17:58:43');
INSERT INTO `user_role` VALUES (2, 2, 2, '2022-10-21 18:09:12', '2022-10-21 18:09:12');
INSERT INTO `user_role` VALUES (3, 3, 2, '2022-10-21 18:13:26', '2022-10-21 18:13:26');
INSERT INTO `user_role` VALUES (4, 2, 2, '2022-10-21 18:15:49', '2022-10-21 18:15:49');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
