// 모듈 import
const joara = require('./joara_crawler.js');
const naver = require('./naver_series_crawler.js');
const kakao = require('./kakao_page_crawler.js');
const ridibooks = require('.ridibooks_crawler.js');
const fs = require('fs');

// csv 폴더 읽기, 없으면 csv 폴더 생성
fs.readdir('csv',(err)=>{
    if(err){
        console.err('csv 폴더가 없으므로, 우선 폴더를 생성합니다.');
        fs.mkdirSync('csv');
    }
});
// 크롤링 실행
const run = async() =>{
    try{
        await Promise.all([joara.run(),naver.run(),kakao.run(),ridibooks.run()]);
    } catch(error){
        console.log(error);
    }
}
run();