# 주간 크롤링 데이터 자연어 처리 및 DB INSERT
# import
import os
import pymysql
import csv
from konlpy.tag import Okt
import json

with open('database.json') as fj: config = json.load(fj)
# 현재 디렉토리 주소
CUR_DIR = os.path.dirname(os.path.abspath(__file__))
# 메인 폴더 디렉토리 주소
BASE_DIR = os.path.dirname((CUR_DIR))
# 불러올 소설 정보 파일 주소
file_dir = BASE_DIR+'/crawler/csv/novelList_week.csv'
# csv 파일 읽기
fc = open(file_dir,'r',encoding='UTF-8')
rdr = csv.reader(fc)

okt = Okt()

## MySQL 연결
tag_db = pymysql.connect(
    user=config['user'],
    passwd=config['password'],
    host=config['host'],
    db=config['database'],
    charset='utf8mb4'
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
    # 작가 존재여부 확인하고 INSERT
    sql = 'SELECT EXISTS(SELECT * FROM author WHERE name = %s) as isChk;'
    cursor.execute(sql,(noveldata['author']))
    result_author = cursor.fetchall()
    if(result_author[0]['isChk'] == False):
        sql = 'INSERT INTO author(name,profile) values(%s,NULL);'
        cursor.execute(sql,(noveldata['author']))
        result = cursor.fetchall()
    
    # 작품 존재여부 확인하고 INSERT
    ## 작품 정보 INSERT를 위한 author_id 가져오기
    sql = 'SELECT id FROM author WHERE name=%s;'
    cursor.execute(sql,(noveldata['author']))
    result_author_id = cursor.fetchall()

    ## 작품 정보 INSERT
    sql = 'SELECT EXISTS(SELECT * FROM novel_data WHERE title=%s AND author_id=%s) as isChk;'
    cursor.execute(sql,(noveldata['title'],result_author_id[0]['id']))
    result_chk = cursor.fetchall()
    ### 작품 정보가 존재하면 url 정보만 삽입
    if(result_chk[0]['isChk'] == True):
        sql = 'SELECT B.id FROM author as A JOIN novel_data as B ON A.id=B.author_id WHERE A.name=%s AND B.title=%s;'
        cursor.execute(sql,(noveldata['author'],noveldata['title']))
        result = cursor.fetchall()
        # 네이버
        if(noveldata['naver'] !=""):
            sql = 'SELECT EXISTS(SELECT * FROM novel_link WHERE nid=%s AND url=%s) as isChk;'
            cursor.execute(sql,(result[0]['id'],noveldata['naver']))
            na_result = cursor.fetchall()
            if(na_result[0]['isChk'] == False):
                sql = 'INSERT INTO novel_link(nid,url) values(%s,%s);'
                cursor.execute(sql,(result[0]['id'],noveldata['naver']))
                na_result = cursor.fetchall()
        # 카카오
        if(noveldata['kakao'] !=""):
            sql = 'SELECT EXISTS(SELECT * FROM novel_link WHERE nid=%s AND url=%s) as isChk;'
            cursor.execute(sql,(result[0]['id'],noveldata['kakao']))
            ka_result = cursor.fetchall()
            if(ka_result[0]['isChk'] == False):
                sql = 'INSERT INTO novel_link(nid,url) values(%s,%s);'
                cursor.execute(sql,(result[0]['id'],noveldata['kakao']))
                ka_result = cursor.fetchall()
        # 리디북스
        if(noveldata['ridibooks'] !=""):
            sql = 'SELECT EXISTS(SELECT * FROM novel_link WHERE nid=%s AND url=%s) as isChk;'
            cursor.execute(sql,(result[0]['id'],noveldata['ridibooks']))
            rd_result = cursor.fetchall()
            if(rd_result[0]['isChk'] == False):
                sql = 'INSERT INTO novel_link(nid,url) values(%s,%s);'
                cursor.execute(sql,(result[0]['id'],noveldata['ridibooks']))
                rd_result = cursor.fetchall()
        # 조아라
        if(noveldata['joara'] !=""):
            sql = 'SELECT EXISTS(SELECT * FROM novel_link WHERE nid=%s AND url=%s) as isChk;'
            cursor.execute(sql,(result[0]['id'],noveldata['joara']))
            jr_result = cursor.fetchall()
            if(jr_result[0]['isChk'] == False):
                sql = 'INSERT INTO novel_link(nid,url) values(%s,%s);'
                cursor.execute(sql,(result[0]['id'],noveldata['joara']))
                jr_result = cursor.fetchall()
    ### 작품 정보 없음
    else:
        sql = 'INSERT INTO novel_data(title,imgurl,genre,description,author_id) values(%s,%s,%s,%s,%s);'
        cursor.execute(sql,(noveldata['title'],noveldata['image'],noveldata['genre'],noveldata['desc'],result_author_id[0]['id']))
        result = cursor.fetchall()

        # 주소 정보 삽입을 위한 nid 가져오기
        sql = 'SELECT B.id FROM author as A JOIN novel_data as B ON A.id = B.author_id WHERE A.name =%s AND B.title =%s;'
        cursor.execute(sql,(noveldata['author'],noveldata['title']))
        result_nid = cursor.fetchall()
        
        # 주소 정보 삽입
        if(noveldata['naver'] != ""):
            sql ='INSERT INTO novel_link(nid,url) values(%s,%s);'
            cursor.execute(sql,(result_nid[0]['id'],noveldata['naver']))
            result = cursor.fetchall()
        if(noveldata['kakao'] != ""):
            sql ='INSERT INTO novel_link(nid,url) values(%s,%s);'
            cursor.execute(sql,(result_nid[0]['id'],noveldata['kakao']))
            result = cursor.fetchall()
        if(noveldata['ridibooks'] != ""):
            sql ='INSERT INTO novel_link(nid,url) values(%s,%s);'
            cursor.execute(sql,(result_nid[0]['id'],noveldata['ridibooks']))
            result = cursor.fetchall()
        if(noveldata['joara'] != ""):
            sql ='INSERT INTO novel_link(nid,url) values(%s,%s);'
            cursor.execute(sql,(result_nid[0]['id'],noveldata['joara']))
            result = cursor.fetchall()
        
        # 자연어 처리 및 태그 INSERT
        array = []
        word = okt.pos(noveldata['desc'])
        for type in word:
            if type[1] == 'Noun' and len(type[0]) > 1:
                array.append(type[0])
        sql = 'INSERT INTO novel_tag(nid,tag) VALUES (%s, %s);'
        for search in array:
            cursor.execute(sql, (result_nid[0]['id'],search))
            result = cursor.fetchall()
    ### 소설 INSERT 하면 commit
    tag_db.commit()
# 완료후 db 연결 닫기
tag_db.close()