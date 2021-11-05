const mysql = require('mysql2/promise');
const config = require('../../database.json');
const contentrec = require('./contentbase_lib');
const collavorec = require('./collaborative_lib');

module.exports = async (uid) => {
    //mysql 연결 설정
    const pool = await mysql.createPool(config);
    const connection = await pool.getConnection(async conn => conn);

    //협업 기반 추천 실행
    var result = await collavorec(uid, connection);
    
    //결과값 길이가 0인 경우
    if(result.length == 0){
        //컨텐츠 기반 추천 실행
        result = await contentrec(uid, connection);
    }
    
    //result 출력
    // console.log("최종 추천 목록>>")
    // console.log(result);

    const sql = 'SELECT id,title,imgurl FROM novel_data WHERE id IN (?)';
    const [novel_data, fields] = await connection.query(sql, [result]);
    connection.release();

    //mysql 연결 종료
    pool.end();



    return novel_data;
}