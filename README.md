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
	`genre` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	`createdate` DATETIME NOT NULL,
	`is_joinout` INT(10) NOT NULL DEFAULT '0',
	PRIMARY KEY (`idx`) USING BTREE,
	UNIQUE INDEX `id` (`id`) USING BTREE
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
;


--
-- 2. 소설 정보 테이블
--

CREATE TABLE `novel_data` (
	`id` INT(10) NOT NULL AUTO_INCREMENT,
	`title` VARCHAR(100) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`imgurl` VARCHAR(300) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
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
	`name` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
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
	`score` INT(10) NOT NULL DEFAUTL '0',
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



--
-- 6. 소설 링크 정보 테이블
--

CREATE TABLE `novel_link` (
	`linkId` INT(10) NOT NULL AUTO_INCREMENT,
	`nid` INT(10) NOT NULL,
	`url` VARCHAR(300) NOT NULL COLLATE 'utf8_general_ci',
	PRIMARY KEY (`linkId`) USING BTREE,
	INDEX `FK_novelurl_noveldata` (`nid`) USING BTREE,
	CONSTRAINT `FK_novelurl_noveldata` FOREIGN KEY (`nid`) REFERENCES `novelrec`.`novel_data` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
;


--
-- 7. 소설 태그 정보 테이블
--

CREATE TABLE `novel_tag` (
	`nid` INT(10) UNSIGNED NOT NULL,
	`tag` VARCHAR(30) NOT NULL DEFAULT '' COLLATE 'utf8mb4_0900_ai_ci'
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
;

```

# Run

## Crawler

### crawler_run.js

- 위 파일을 실행하면 네이버, 카카오페이지, 조아라, 리디북스 사이트의 소설 데이터를 크롤링하여 csv 폴더에 각각의 이름으로 저장하며, 크롤링된 csv 파일들을 가지고 하나의 csv 파일로 통합합니다.

### week_crawler_run.js

- 위 파일을 실행하면 네이버, 조아라, 리디북스 사이트의 주간 소설 데이터를 크롤링하여 csv 폴더에 각각의 이름으로 저장하며, 크롤링된 csv 파일들을 가지고 하나의 csv 파일로 통합합니다.

## NLP Tag

### insert_db

- 위 파일을 실행하면 crawler_run.js를 통해 생성된 csv 파일을 DB에 삽입합니다.

### run_pycode.js

- 위 파일을 실행하면 python으로 작성된 NLP 폴더의 novel_taging.py를 실행합니다.

### novel_taging.py

- 위 파일은 run_pycode.js에 의해 실행되며, 실행 시 DB에 있는 소설 데이터에 대한 NPL 작업(TAG 작업)을 진행하여 novel_tag 테이블에 INSERT 합니다.

### week_run_pycode.js

- 위 파일을 실행하면 python으로 작성된 NLP 폴더의 week_novel_taging.py를 실행합니다.

### week_novel_taging.py

- 위 파일은 week_run_pycode.js에 의해 실행되며, 실행 시 week_crawler_run.js에 의해 생성된 csv 파일은 DB에 삽입함과 동시에 삽입하는 소설에 대한 NPL 작업(TAG 작업)을 진행하여 해당 결과를 DB에 함께 INSERT 합니다.
