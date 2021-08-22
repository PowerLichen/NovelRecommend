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

CREATE TABLE user (
  id int(11) NOT NULL AUTO_INCREMENT,
  id varchar(20) NOT NULL,
  pw varchar(20) NOT NULL,
  PRIMARY KEY (id)
);


--
-- 2. 소설 정보 테이블
--

CREATE TABLE novel (
  id int(11) NOT NULL AUTO_INCREMENT,
  title varchar(30) NOT NULL,
  imgurl varchar(150) DEFAULT NULL,
  genre varchar(30) DEFAULT NULL,
  description text,
  author_id int(11) DEFAULT NULL,
  PRIMARY KEY (id)
);

--
-- 3. 작가 정보 테이블
--

CREATE TABLE author (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(20) NOT NULL,
  profile varchar(200) DEFAULT NULL,
  PRIMARY KEY (id)
);

--
-- 4. 호감도 정보 테이블
--

CREATE TABLE likenovel (
  uid int(11) NOT NULL,
  nid int(11) NOT NULL,
  score float(1,1) NOT NULL,
);

--
-- 5. 찜목록 정보 테이블
--

CREATE TABLE wishlist (
  uid int(11) NOT NULL,
  nid int(11) NOT NULL,
);


- novel, author JOIN으로 작가 작품 목록 추출
- user, wishlist, novel JOIN으로 찜 목록 추출
- 


INSERT INTO author VALUES (1,'egoing','developer');
```
