const mysql = require('mysql2/promise');
const parse = require('csv-parse/lib/sync');
const fs = require('fs');
const config = require('./database.json');
//1. novelList.csv 파일을 불러와서 parsing 작업 진행
// 2. parsing 된 data를 이용하여 foreach 문으로 db에 삽입 db 삽입 시에는 작가 정보를 먼저 삽입하고 후에 작품 정보를
// 삽입하여야 하는가?
//3. csv 데이터와 db 데이터의 작품명, 작가를 비교하여 존재하면 update, 없으면 insert
// 4. 끝나면 종료 소설 list의 순서는 0: 제목 1: 장르, 2: 작가, 3: 내용, 4: 이미지 주소 5: 네이버 주소, 6: 카카오
// 주소, 7: 조아라 주소, 8: 리디북스 주소

// 주소가 중복되는 경우가 존재한다.
// 시간 겁나 걸린다.
const run = async () => {
    try {
        const pool = await mysql.createPool(config);
        const csvfile = fs.readFileSync(
            __dirname + '/csv/novelList.csv'
        );
        const novelDatas = parse(csvfile.toString('utf-8'));
        const novel = {
            title: null,
            genre: null,
            author: null,
            desc: null,
            image: null,
            naver: null,
            kakao: null,
            joara: null,
            ridibooks: null
        };
        let cnt = 1;
        const connection = await pool.getConnection(async conn => conn);
        try {
            for (const v of novelDatas) {
                novel.title = v[0];
                novel.genre = v[1];
                novel.author = v[2];
                novel.desc = v[3];
                novel.image = v[4];
                novel.naver = v[5];
                novel.kakao = v[6];
                novel.joara = v[7];
                novel.ridibooks = v[8];

                // 작가 정보 INSERT

                let sql = `SELECT EXISTS(SELECT * FROM author WHERE name=?) as isChk`;
                const [rows0, fields0] = await connection.query(sql,[novel.author]);
                if (rows0[0].isChk == 0) {
                    sql = `INSERT INTO author(name,profile) values(?,NULL)`;
                    await connection.query(sql,novel.author);
                    connection.release();
                }
                connection.release();

                // 작품 정보 INSERT를 위한 author_id 가져오기
                sql = `SELECT id FROM author WHERE name=?`;
                const [rows1, fields1] = await connection.query(sql,[novel.author]);
                connection.release();

                // 작품 정보 INSERT
                sql = `INSERT INTO novel_data(title,imgurl,genre,description,author_id) values(?,?,?,?,?)`;
                await connection.query(sql,[novel.title,novel.image,novel.genre,novel.desc,rows1[0].id]);
                connection.release();

                // 주소 정보 삽입을 위한 novel id 가져오기
                sql = `SELECT B.id FROM author as A JOIN novel_data as B ON A.id= B.author_id WHERE A.name =? AND B.title =?`;
                const [rows2, fields2] = await connection.query(sql,[novel.author,novel.title]);
                connection.release();

                // 주소 정보 삽입
                if (novel.naver != "") {
                    sql = `INSERT INTO novel_link(nid,url) values(?,?)`;
                    await connection.query(sql,[rows2[0].id,novel.naver]);
                    connection.release();
                }
                if (novel.kakao != "") {
                    sql = `INSERT INTO novel_link(nid,url) values(?,?)`;
                    await connection.query(sql,[rows2[0].id,novel.kakao]);
                    connection.release();
                }
                if (novel.joara != "") {
                    sql = `INSERT INTO novel_link(nid,url) values(?,?)`;
                    await connection.query(sql,[rows2[0].id,novel.joara]);
                    connection.release();
                }
                if (novel.ridibooks != "") {
                    sql = `INSERT INTO novel_link(nid,url) values(?,?)`;
                    await connection.query(sql,[rows2[0].id,novel.ridibooks]);
                    connection.release();
                }

                console.log(cnt + ' 작품 INSERT');
                cnt++;
            }
        } catch (err) {
            throw err;
        }
    } catch (err) {
        console.log(err);
    }
}
run();