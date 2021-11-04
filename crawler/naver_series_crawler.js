// 모듈 import
const puppeteer = require('puppeteer');
const stringify = require('csv-stringify/lib/sync');
const fs = require('fs');

// 크롤링 실행 함수
const run = async () => {
    try {
        let results = [];   // 최종 결과 저장 변수
        let datas = [];     // 각 장르별로 소설정보를 저장할 리스트(이중 리스트 형식으로 데이터가 들어갈 것임)
        // 장르 정보 => 장르명, 장르코드, 페이지번호, 인덱스
        const genres = [
            [
                `로맨스`, 201, 1, 0
            ],
            [
                `로맨스판타지`, 207, 1, 0
            ],
            [
                `판타지`, 202, 1, 0
            ],
            [
                `현대판타지`, 208, 1, 0
            ],
            [
                `무협`, 206, 1, 0
            ],
            [
                `미스터리`, 203, 1, 0
            ],
            [
                `라이트노벨`, 205, 1, 0
            ],
            [
                `BL`, 209, 1, 0
            ]
        ];
        // 브라우저 옵션
        const browserOption = {
            headless: true,
        };

        const browser = await puppeteer.launch(browserOption);
        // 각 장르별로 비동기 실행
        await Promise.all(genres.map(async (genreCode, i) => {
            const page = await browser.newPage();
            // 장르별로 데이터를 따로 저장하기 위해서 
            datas[i] = new Array();
            console.log(`네이버 시리즈 ${genreCode[0]} 장르 크롤링 시작`);
            while (1) {
                const url = `https://series.naver.com/novel/categoryProductList.series?categoryTypeCode=genre&genreCode=${genreCode[1]}&orderTypeCode=star_score&is&isFinished=false&page=${genreCode[2]}`;
                await page.goto(url);
                const lists = await page.evaluate((genreCode) => {
                    let list = [];  // 페이지 별 소설 정보를 담을 리스트
                    let check;      // 다음 페이지 존재 여부를 저장할 변수
                    let itemNum = genreCode[3]; // 소설 수
                    // 소설 정보를 담을 객체
                    const data = {
                        title: null,
                        genre: null,
                        author: null,
                        desc: null,
                        link: null,
                        image: null
                    };
                    // 쿼리문을 통해 소설 정보 크롤링
                    const novels = document.querySelectorAll('ul.lst_list > li');
                    for (const novel of novels) {
                        data.title = novel
                            .querySelector('h3 > a')
                            .title;
                        data.genre = genreCode[0];
                        data.author = novel
                            .querySelector('.ellipsis')
                            .textContent
                            .trim();
                        // 소설 내용은 null 값이 존재할 수 있음(소설 내용을 적어두지 않은 경우)
                        data.desc = novel.querySelector('.dsc');
                        if (data.desc == null) 
                            data.desc = "";
                        else 
                            data.desc = (data.desc)
                                .textContent
                                .trim();
                        data.link = novel
                            .querySelector('h3 > a')
                            .href;
                        data.image = novel
                            .querySelector('img')
                            .src;
                        //페이지 내 소설 정보를 list에 삽입
                        // 단행본인 경우 삽입 하지 않도록 함
                        if((data.title).indexOf('단행본')==-1){
                            list.push(Object.values(data));
                            //아이템 수 증가
                            itemNum += 1;
                        }
                    }
                    // 다음 페이지는 아래 쿼리문을 통해 확인
                    const nextPage = document.querySelector('span.next > a');
                    if (nextPage != null) 
                        check = true;
                    else 
                        check = false;
                    // 페이지 내 소설 정보(list), 다음 페이지 존재 유무(check), 소설 수(itemNum) return
                    return {list: list, check: check, itemNum: itemNum};
                }, (genreCode));
                // 장르별 리스트에 해당 페이지 정보 병합
                datas[i] = datas[i].concat(lists.list);
                // 다음페이지가 없을 경우
                if (lists.check == false) {
                    // 결과 리스트에 장르별 리스트 병합
                    results = results.concat(datas[i]);
                    break;
                }
                // 페이지 및 아이템 증가(갱신)
                genreCode[2] += 1;
                genreCode[3] = lists.itemNum;
            }
            // 작업을 완료한 페이지는 닫아주기
            await page.close();
        }));
        // 모든 작업을 마치면 browser 닫기
        await browser.close();
        console.log('네이버 시리즈 크롤링 완료');
        // 결과 데이터를 csv파일로 저장
        const str = stringify(results);
        fs.writeFileSync(__dirname+'/csv/naver.csv', str);
    } catch (e) {
        // 에러 발생시 에러 메시지 콘솔에 출력
        console.error(e);
    }
}
// 모듈로 사용하기 위해 exports
exports.run = run;
