# pip 설치 : pip install -r requirements.txt
import pymysql
from konlpy.tag import Okt
okt = Okt()

## 임시 데이터
description1 = "[오직 나만이, 이 세계의 결말을 알고 있다.] 무려 3149편에 달하는 장편 판타지 소설, '멸망한 세계에서 살아남는 세 가지 방법'이 현실이 되어버렸다. 그리고 그 작품을 완독한 이는 단 한 명뿐이었다."
description2 = "17세 이전의 기억을 잃고 마법사가 된 반태수. 카페를 운영하며 마법 연구에 매진하는 평안한 삶을 영위하던 중, 이면세계로 가게 된다. 지구와 이면세계를 오가면서 다양한 사건을 겪으며 세상의 비밀에 조금씩 다가가는데..."

## MySQL 연결
tag_db = pymysql.connect(
    user='root',
    passwd='', # 비밀번호 설정할 것
    host='localhost',
    db='konlp_test',
    charset='utf8'
)

## DB와 상호작용을 위한 cursor 객체 생성
cursor = tag_db.cursor(pymysql.cursors.DictCursor)

## 데이터 조작 : 추가할 때 (필요 없음)
# sql = 'INSERT INTO `novel_data` (description) VALUES (%s)'
# cursor.execute(sql, (description1))
# cursor.execute(sql, (description2))
# tag_db.commit() # commit 필수

## 데이터 조작 : 조회할 때
sql = 'SELECT * FROM novel_data;'
cursor.execute(sql)
result = cursor.fetchall()

# print(result) # 조회 결과 출력

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







# print(okt.pos('아버지가 방에 들어가신다'))
# print(okt.pos('아버지가방에들어가신다'))

# 참고 : https://devpouch.tistory.com/96
# 참고 : https://2siwon.github.io/pip/2017/09/25/pip-002-pip-freeze.html