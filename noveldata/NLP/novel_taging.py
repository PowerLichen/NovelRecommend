# pip 설치 : pip install -r requirements.txt
# database에 들어있는 모든 소설에 대한 tag 작업 처리
import os
import pymysql
from konlpy.tag import Okt
import json
# 현재 디렉토리 주소 /noveldata/NLP
CUR_DIR = os.path.dirname(os.path.abspath(__file__))
# 상위 디렉토리 주소 /noveldata
BASE_DIR = os.path.dirname((CUR_DIR))
with open(BASE_DIR+'/database.json') as fj: config = json.load(fj)

okt = Okt()

## MySQL 연결
tag_db = pymysql.connect(
    user=config['user'],
    passwd=config['password'],
    host=config['host'],
    db=config['database'], # db명 수정할 것
    charset='utf8mb4'
)

## DB와 상호작용을 위한 cursor 객체 생성
cursor = tag_db.cursor(pymysql.cursors.DictCursor)

## 데이터 조작 : 조회할 때
sql = 'SELECT * FROM novel_data;'
cursor.execute(sql)
result = cursor.fetchall()

for data in result:
    array=[]
    sql = 'SELECT EXISTS(SELECT * FROM novel_tag WHERE nid = %s) as isChk;'
    cursor.execute(sql,(data['id']))
    check_db_result = cursor.fetchall()
    if(check_db_result[0]['isChk']==False):
        word = okt.pos(data['description'])
        for type in word:
            if type[1] == 'Noun' and len(type[0])>1:
                array.append(type[0])
        sql = "INSERT INTO novel_tag (nid, tag) VALUES(%s,%s);"
        for search in array:
            cursor.execute(sql,(data['id'],search))
        tag_db.commit()
    else:
        continue
tag_db.close()
