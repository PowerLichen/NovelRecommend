const parse = require('csv-parse/lib/sync');
const fs = require('fs');
const stringify = require('csv-stringify/lib/sync');

const run = async () => {
    // 크롤링 완료된 소설 data file read
    const naver = fs.readFileSync(__dirname+'/../../csv/naver.csv')
    const kakao = fs.readFileSync(__dirname+'/../../csv/kakao.csv');
    const joara = fs.readFileSync(__dirname+'/../../csv/joara.csv');
    const ridibooks = fs.readFileSync(__dirname+'/../../csv/ridibooks.csv')
    // csv file parse
    const naver_records = parse(naver.toString('utf-8'));
    const kakao_records = parse(kakao.toString('utf-8'));
    const joara_records = parse(joara.toString('utf-8'));
    const ridibooks_records = parse(ridibooks.toString('utf-8'));

    // csv 파일에 저장되어있는 데이터의 순서 : [0]제목, [1]장르, [2]작가, [3]설명, [4]링크, [5]이미지 링크
    let novel = {
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
    let results = [];
    // 네이버 소설 insert
    for (let item of naver_records) {
        let check_naver = false;
         novel.title = item[0];
         novel.genre = item[1];
         novel.author = item[2];
         novel.desc = item[3];
         novel.image = item[5];
         novel.naver = item[4];
         novel.kakao = null;
         novel.joara = null;
         novel.ridibooks = null;
         for(let comp of results){
             if(novel.title == comp[0] && novel.author == comp[2]){
                 check_naver=true;
                 break;
             }
         }
         if(check_naver==true){
             continue
         }
         results.push(Object.values(novel));
     }

     // result와 joara 데이터 비교해서 삽입
    joara_records.forEach((j, ji) => {
        let check = false;
        novel.title = j[0];
        novel.genre = j[1];
        novel.author = j[2];
        novel.desc = j[3];
        novel.image = j[5];
        novel.naver = null;
        novel.kakao = null;
        novel.joara = j[4];
        novel.ridibooks = null;
        results.forEach((r, ri) => {
            if (j[0] == r[0] && j[2] == r[2]) {
                results[ri][7] = j[4];
                check = true;
                return false;
            }
        });
        if (check == false) {
            results.push(Object.values(novel));
        }
    });

    // result와 ridibooks 데이터 비교해서 삽입
    ridibooks_records.forEach((ridi, idx) => {
        let check = false;
        novel.title = ridi[0];
        novel.genre = ridi[1];
        novel.author = ridi[2];
        novel.desc = ridi[3];
        novel.image = ridi[5];
        novel.naver = null;
        novel.kakao = null;
        novel.joara = null;
        novel.ridibooks = ridi[4];
        results.forEach((r, ri) => {
            if (ridi[0] == r[0] && ridi[2] == r[2]) {
                results[ri][8] = ridi[4];
                check = true;
                return false;
            }
        });
        if (check == false) {
            results.push(Object.values(novel));
        }
    });
    
    // result와 kakao 데이터 비교해서 삽입
    kakao_records.forEach((k, ki) => {
        let check = false;
        novel.title = k[0];
        novel.genre = k[1];
        novel.author = k[2];
        novel.desc = k[3];
        novel.image = k[5];
        novel.naver = null;
        novel.kakao = k[4];
        novel.joara = null;
        novel.ridibooks = null;
        results.forEach((r, ri) => {
            if (k[0] == r[0] && k[2] == r[2]) {
                results[ri][6] = k[4];
                check = true;
                return false;
            }
        });
        if (check == false) {
            results.push(Object.values(novel));
        }
    });
    // result를 다시 csv 파일로 저장
    const str = stringify(results);
    fs.writeFileSync(__dirname+'/../../csv/novelList.csv',str);
    console.log('done');
}
exports.run = run;
