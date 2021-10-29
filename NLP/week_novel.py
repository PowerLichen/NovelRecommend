# 주간 크롤링 데이터 자연어 처리 및 DB INSERT
# import
import os
import pymysql
import csv
from konlpy.tag import Okt
import json

with open('database.json') as fj: config = json.load(fj)

CUR_DIR = os.path.dirname(os.path.abspath(__file__))
BASE_DIR = os.path.dirname((CUR_DIR))
file_dir = BASE_DIR+'/crawler/csv/novelList_week.csv'
fc = open(file_dir,'r',encoding='utf8')
rdr = csv.reader(fc)

okt = Okt()

## MySQL 연결
tag_db = pymysql.connect(
    user=config['user'],
    passwd=config['password'], # 비밀번호 설정할 것
    host=config['host'],
    db=config['database'], # db명 수정할 것
    charset='utf8'
)

## DB와 상호작용을 위한 cursor 객체 생성
cursor = tag_db.cursor(pymysql.cursors.DictCursor)

for v in rdr:
    noveldata = {
        'title' : v[0],
        'genre' : v[1],
        'author' : v[2],
        'desc' : v[3],
        'image' : v[4],
        'naver' : v[5],
        'kakao' : v[6],
        'joara' : v[7],
        'ridibooks' : v[8]
    }

    sql = 'SELECT EXISTS(SELECT * FROM author WHERE name = %s) as isChk'
    cursor.execute(sql,(noveldata['author']))
    result = cursor.fetchall()
    print(result[0]['isChk'])

# ## 데이터 조작 : 조회할 때
# sql = 'SELECT * FROM novel_data;'
# cursor.execute(sql)
# result = cursor.fetchall()

# for data in result:
#     array = []
#     word = okt.pos(data['description'])
#     for type in word:
#         if type[1] == 'Noun' and len(type[0]) > 1:
#             array.append(type[0])
#     sql = "INSERT INTO novel_tag (nid, tag) VALUES (%s, %s)"
#     for search in array:
#         cursor.execute(sql, (data['id'], search))
#     tag_db.commit()