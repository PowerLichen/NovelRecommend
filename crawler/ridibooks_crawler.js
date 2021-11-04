//모듈 import
const puppeteer = require('puppeteer');
const stringify = require('csv-stringify/lib/sync');
const fs = require('fs');

// 크롤링 실행 함수
const run = async() =>{
    try{
        let results = [];   // 최종 결과 저장 변수
        let datas = [];     // 각 장르별로 소설정보를 저장할 리스트 변수
        // 장르 정보 => 장르명, 장르코드, 페이지번호, 인덱스
        const genres = [
            [`로맨스`,1650,1,0],
            [`판타지`,1750,1,0],
            [`라이트노벨`,3000,1,0],
            [`BL`,4150,1,0],
        ];
        
        // 브라우저 옵션
        const browserOption = {
            headless : true,
        };

        const browser = await puppeteer.launch(browserOption);

        await Promise.all(genres.map(async (genreCode,i)=>{
            const page = await browser.newPage();
            // 각 장르별로 데이터를 따로 저장하기 위해서
            datas[i] = new Array();
            console.log(`리디북스 ${genreCode[0]} 장르 크롤링 시작`);
            while(1){
                const url = `https://ridibooks.com/category/books/${genreCode[1]}?rent=n&adult=n&adult_exclude=y&order=selling&page=${genreCode[2]}`;
                // 해당 url로 페이지 이동
                await page.goto(url);
                const lists = await page.evaluate((genreCode) =>{
                    let list = []; // 페이지 별 소설 정보를 담을 리스트
                    let check; // 다음 페이지 존재 여부를 저장할 변수
                    let itemNum = genreCode[3]; // 소설 수
                    // 소설 정보를 담을 객체
                    const data = {
                        title : null,
                        genre : null,
                        author : null,
                        desc : null,
                        link : null,
                        image : null,
                    };
                    // 쿼리문을 통해 소설 정보를 크롤링
                    const novels = document.querySelectorAll('.book_macro_110');
                    for(const novel of novels){
                        data.title = novel.querySelector('.book_metadata.meta_title span').textContent.trim();
                        data. genre = novel.querySelector('.book_metadata.genre').textContent.trim();
                        switch(genreCode[0]){
                            case "로맨스":
                                if(data.genre=="판타지물") data.genre = "로맨스판타지";
                                else data.genre=genreCode[0];
                                break;
                            case "판타지":
                                if(data.gerne=="현대 판타지") data.genre="현대판타지";
                                else if(data.genre=="무협 소설") data.genre="무협";
                                else data.genre=genreCode[0];
                                break;
                            default:
                                data.genre=genreCode[0];
                        }
                        data.author = novel.querySelector('.author_detail_link').textContent.trim();
                        data.desc = novel.querySelector('.meta_description');
                        if(data.desc == null) data.desc = "";
                        else{
                            data.desc = (data.desc.textContent);
                            data.desc = (data.desc).replace(/<책소개>/,"");
                            data.desc = data.desc.trim();
                        }
                        data.link = novel.querySelector('.meta_description a.trackable').href;
                        data.image = novel.querySelector('.thumbnail_image > img').getAttribute('data-src');
                        list.push(Object.values(data));
                        // 아이템 수 증가
                        itemNum +=1;
                    }
                    // 다음 페이지 존재 유무 확인
                    const nextPage = document.querySelector('.paging_wrap .btn_next');
                    if (nextPage != null) check = true;
                    else check = false;
                    return {list:list, check:check,itemNum : itemNum};
                },(genreCode));
                datas[i] = datas[i].concat(lists.list);
                if(lists.check == false){
                    results = results.concat(datas[i]);
                    break;
                }
                genreCode[2] +=1;
                genreCode[3] = lists.itemNum;
            }
            // 작업을 완료한 페이지는 닫아주기
            await page.close();
            console.log(`리디북스 ${genreCode[0]} 장르 크롤링 완료`);
        }));
        // 모든 작업 마치면 browser 닫기
        await browser.close();
        console.log('리디북스 크롤링 완료');
        const str = stringify(results);
        fs.writeFileSync(__dirname+'/csv/ridibooks.csv',str);

    }catch(e){
        console.log(e);
    }
}
// 모듈로 사용하기 위해 run 함수 exports
exports.run = run;