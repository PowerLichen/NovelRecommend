# 주간 크롤링 데이터 자연어 처리 및 DB INSERT
# import
import os
import json
import pymysql
import csv
from konlpy.tag import Okt

okt = Okt()

## MySQL 연결
tag_db = pymysql.connect(
    user='root',
    passwd='', # 비밀번호 설정할 것
    host='localhost',
    db='', # db명 수정할 것
    charset='utf8'
)

## DB와 상호작용을 위한 cursor 객체 생성
cursor = tag_db.cursor(pymysql.cursors.DictCursor)


## 데이터 조작 : 조회할 때
sql = 'SELECT * FROM novel_data;'
cursor.execute(sql)
result = cursor.fetchall()

for data in result:
    array = []
    word = okt.pos(data['description'])
    for type in word:
        if type[1] == 'Noun' and len(type[0]) > 1:
            array.append(type[0])
    sql = "INSERT INTO novel_tag (nid, tag) VALUES (%s, %s)"
    for search in array:
        cursor.execute(sql, (data['id'], search))
    tag_db.commit()