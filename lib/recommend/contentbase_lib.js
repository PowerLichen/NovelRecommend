const mysql = require('mysql2/promise');
var cosinesim = require('./cosinesim');
const config = require('../../database.json');

//사용자가 평점을 준 작품이 많을 수록, 데이터의 정확도가 높아지는
//컨텐츠 기반 알고리즘.
module.exports = async (uid) => {
    //mysql pool 생성
    const pool = await mysql.createPool(config);
    const connection = await pool.getConnection(async conn => conn);

    let sql = '';
    const max = 10000;
    //사용자가 평점을 매긴 작품 상위 10개의 태그 데이터
    sql = 'SELECT * FROM novel_tag WHERE nid IN (SELECT * FROM (SELECT nid FROM novel_scoredata WHERE uid = ? ORDER BY score DESC LIMIT 10) AS t);';
    const [user_result, field0] = await connection.query(sql, [uid]);

    // console.log("사용자의 선택>>");
    // console.log(user_result.length);
    connection.release();

    //가장 최근에 추가된 작품 상위 10000개의 태그 데이터
    sql = 'SELECT * FROM novel_tag WHERE nid > (SELECT * FROM (SELECT id FROM novel_data ORDER BY id DESC LIMIT ?, 1) AS t);';

    const [novel_result, fields1] = await connection.query(sql, [max]);

    connection.release();


    //데이터 설정
    const datas = [...user_result, ...novel_result];


    //데이터 테이블 초기화
    let raw_data = new Array();     //작품의 태그를 저장하는 이차원 배열.
    let user_nid_list = new Set();
    let nid_list = new Array();     //raw_data의 idx에 대한 nid를 저장.
    let nid_idx_map = new Map();
    let tagset = [];                //태그 빈도 수 저장.

    let size = 0;                   //총 태그 갯수
    let count = 0;


    //데이터 테이블 초기 데이터 지정
    for (var data of datas) {
        // nid에 대한 첫 데이터
        if (!nid_idx_map.has(data.nid)) {
            nid_idx_map.set(data.nid, size);
            raw_data.push(new Array());
            nid_list.push(data.nid);
            size += 1;
        }
        //raw_data[nid]에 데이터 삽입
        raw_data[nid_idx_map.get(data.nid)].push(data.tag);

        //tagset에 데이터 삽입.
        if (count < user_result.length) {
            user_nid_list.add(data.nid);
            if (tagset[data.tag] == undefined) {
                tagset[data.tag] = 1;
            } else {
                tagset[data.tag] += 1;
            }
        }
        count++;
    }

    // console.log("tagset");
    // console.log(tagset);
    console.log("사용자가 선택한 작품")
    console.log(user_nid_list)

    //전체 태그 중 n개 선택
    const num = 5;
    var tag_sort = [];
    for (var tag in tagset) {
        tag_sort.push([tag, tagset[tag]]);
    }

    tag_sort.sort(function (a, b) {
        return b[1] - a[1];
    });

    var target_tags = tag_sort.slice(0, 6).map((data) => { return data[0]; });

    console.log("선택된 태그 >>");
    console.log(target_tags);


    //빈도 수 계산
    var filtered_freq_data = new Array(raw_data.length);
    var filtered_freq_total = Array.from({ length: target_tags.length }, () => 0);

    for (var i = 0; i < raw_data.length; i++) {
        filtered_freq_data[i] = new Array(target_tags.length);
        for (var j = 0; j < target_tags.length; j++) {
            filtered_freq_data[i][j] = raw_data[i].filter(tag => tag === target_tags[j]).length;
            if (filtered_freq_data[i][j] != 0) {
                filtered_freq_total[j] += 1;
            }
        }
    }

    //idf 계산
    var idf_data = filtered_freq_total.map((num) => {
        return Math.log(raw_data.length / (num + 1)) + 1;
    });

    //tf-idf 계산
    var tf_idf = filtered_freq_data.map((datas) => {
        return datas.map((n, i) => {
            return n * idf_data[i];
        });
    });


    //유사도 계산
    const user_pick_list_size = user_nid_list.size;
    var recdata = Array.from({ length: tf_idf.length - user_pick_list_size }, () => 0);

    for (var n = 0; n < user_pick_list_size; n++) {
        let idx = 0;
        tf_idf.forEach((value, i, arr) => {
            if (i >= user_pick_list_size) {
                var nid = nid_list[i];
                //console.log(nid + " : " + cosinesim(arr[n], arr[i]));
                recdata[idx] += cosinesim(arr[n], arr[i])
                idx += 1;
            }
        });
    }

    //반환할 데이터 정리

    var sorted_nid_list = [];
    recdata.forEach((value, i) => {
        var nid = nid_list[i + user_pick_list_size];
        sorted_nid_list.push([nid, value]);
        //console.log(nid + " : " + value);
    });

    sorted_nid_list.sort(function(a,b){
        return b[1]-a[1];
    });

    console.log(sorted_nid_list.slice(0,10));



    pool.end();

    console.log("Content base 알고리즘 종료.")

    return 0;
}