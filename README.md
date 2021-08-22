# 소설 추천 시스템

![Node](https://img.shields.io/badge/node-v14.17.1-blue)
![NPM](https://img.shields.io/badge/npm-v7.19.0-blue)

![Node.js](https://img.shields.io/badge/Node.js-339933.svg?&style=for-the-badge&logo=Node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000.svg?&style=for-the-badge&logo=Express&logoColor=white)
![Mysql](https://img.shields.io/badge/MySQL-4479A1.svg?&style=for-the-badge&logo=MySQL&logoColor=white)
![js](https://img.shields.io/badge/JavaScript-F7DF1E.svg?&style=for-the-badge&logo=JavaScript&logoColor=white)


# DB Table Info
``` MySQL
--
-- 1. 유저 정보 테이블
--

CREATE TABLE `userdata` (
	`idx` INT(10) NOT NULL AUTO_INCREMENT,
	`id` VARCHAR(32) NOT NULL COLLATE 'utf8_general_ci',
	`password` VARCHAR(1024) NOT NULL COLLATE 'utf8_general_ci',
	`nickname` VARCHAR(64) NOT NULL COLLATE 'utf8_general_ci',
	`createdate` DATETIME NOT NULL,
	`is_joinout` INT(10) NOT NULL DEFAULT '0',
	PRIMARY KEY (`idx`) USING BTREE
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
;


--
-- 2. 소설 정보 테이블
--

CREATE TABLE `novel_data` (
	`id` INT(10) NOT NULL AUTO_INCREMENT,
	`title` VARCHAR(30) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`imgurl` VARCHAR(150) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`genre` VARCHAR(30) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`description` TEXT NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`author_id` INT(10) NULL DEFAULT NULL,
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `FK_noveldata_author` (`author_id`) USING BTREE,
	CONSTRAINT `FK_noveldata_author` FOREIGN KEY (`author_id`) REFERENCES `novelrec`.`author` (`id`) ON UPDATE CASCADE ON DELETE RESTRICT
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
;


--
-- 3. 작가 정보 테이블
--

CREATE TABLE `author` (
	`id` INT(10) NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(20) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`profile` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
;


--
-- 4. 호감도 정보 테이블
--

CREATE TABLE `novel_scoredata` (
	`uid` INT(10) NOT NULL,
	`nid` INT(10) NOT NULL,
	`score` FLOAT(1,1) NOT NULL,
	INDEX `FK_likenovel_userdata` (`uid`) USING BTREE,
	INDEX `FK_likenovel_noveldata` (`nid`) USING BTREE,
	CONSTRAINT `FK_likenovel_userdata` FOREIGN KEY (`uid`) REFERENCES `novelrec`.`userdata` (`idx`) ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT `FK_likenovel_noveldata` FOREIGN KEY (`nid`) REFERENCES `novelrec`.`novel_data` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
;



--
-- 5. 찜목록 정보 테이블
--

CREATE TABLE `wishlist` (
	`uid` INT(10) NOT NULL,
	`nid` INT(10) NOT NULL,
	INDEX `FK_wishlist_userdata` (`uid`) USING BTREE,
	INDEX `FK_wishlist_noveldata` (`nid`) USING BTREE,
	CONSTRAINT `FK_wishlist_userdata` FOREIGN KEY (`uid`) REFERENCES `novelrec`.`userdata` (`idx`) ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT `FK_wishlist_noveldata` FOREIGN KEY (`nid`) REFERENCES `novelrec`.`novel_data` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
;


- novel, author JOIN으로 작가 작품 목록 추출
- user, wishlist, novel JOIN으로 찜 목록 추출
- 


INSERT INTO author VALUES (1,'egoing','developer');
```
