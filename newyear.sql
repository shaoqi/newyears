-- phpMyAdmin SQL Dump
-- version 4.0.10.10
-- http://www.phpmyadmin.net
--
-- 主机: 127.0.0.1
-- 生成日期: 2017-01-22 18:09:35
-- 服务器版本: 5.1.73
-- PHP 版本: 5.6.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `newyear`
--

-- --------------------------------------------------------

--
-- 表的结构 `wx_lottery`
--

CREATE TABLE IF NOT EXISTS `wx_lottery` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `awardname` varchar(50) NOT NULL COMMENT '奖品名称',
  `prizename` varchar(100) NOT NULL,
  `prizenum` int(11) NOT NULL DEFAULT '1',
  `singlenum` tinyint(2) NOT NULL DEFAULT '1',
  `status` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COMMENT='奖品池' AUTO_INCREMENT=8 ;

-- --------------------------------------------------------

--
-- 表的结构 `wx_msg`
--

CREATE TABLE IF NOT EXISTS `wx_msg` (
  `seq` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `id` char(32) NOT NULL,
  `open_id` varchar(60) NOT NULL,
  `msgtype` varchar(10) NOT NULL,
  `contents` text NOT NULL,
  `intime` int(11) NOT NULL,
  PRIMARY KEY (`seq`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='消息处理' AUTO_INCREMENT=3532 ;

-- --------------------------------------------------------

--
-- 表的结构 `wx_top`
--

CREATE TABLE IF NOT EXISTS `wx_top` (
  `id` char(32) NOT NULL,
  `tid` tinyint(4) NOT NULL,
  `openid` varchar(60) NOT NULL,
  `intime` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='投票报表';

-- --------------------------------------------------------

--
-- 表的结构 `wx_true_user`
--

CREATE TABLE IF NOT EXISTS `wx_true_user` (
  `id` int(11) NOT NULL,
  `loginname` varchar(50) NOT NULL,
  `truename` varchar(60) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `position` varchar(90) NOT NULL,
  `department` varchar(90) NOT NULL,
  `lotteryId` tinyint(1) NOT NULL DEFAULT '0',
  `pic` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `lotteryId` (`lotteryId`),
  KEY `pic` (`pic`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `wx_user`
--

CREATE TABLE IF NOT EXISTS `wx_user` (
  `seq` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id` char(32) NOT NULL,
  `open_id` varchar(60) NOT NULL,
  `nickname` varchar(200) NOT NULL,
  `binduid` int(11) NOT NULL DEFAULT '0',
  `gender` tinyint(1) NOT NULL DEFAULT '0',
  `avatar` varchar(255) NOT NULL,
  `bindtime` int(10) unsigned NOT NULL DEFAULT '0',
  `subscribe` tinyint(1) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`seq`),
  UNIQUE KEY `id` (`id`),
  KEY `open_id` (`open_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=314 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
