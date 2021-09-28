// 모듈 import
const puppeteer = require('puppeteer');
const stringify = require('csv-stringify/lib/sync');
const fs = require('fs');

const run = async() =>{
    try{
        let results = [];
        let datas = [];
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
            headless:true,
        };
        const browser = await puppeteer.launch(browserOption);
        await Promise.all(genres.map(async (genreCode, i)=>{
            const page = await browser.newPage();
            datas[i] = new Array();
            while (1){
                const url = `https://series.naver.com/novel/categoryProductList.series?categoryTypeCode=genre&genreCode=${genreCode[1]}&orderTypeCode=new&is&isFinished=false&page=${genreCode[2]}`;
                await page.goto(url);
                const lists = await page.evaluate((genreCode) => {
                    let list = [];  // 페이지 별 소설 정보를 담을 리스트
                    let check;      // 다음 페이지 존재 여부를 저장할 변수
                    let datecheck;
                    let itemNum = genreCode[3]; // 소설 수
                    let d = new Date();
                    d = new Date(d.getFullYear(),d.getMonth(),d.getDate()-7);
                    let month = d.getMonth()+1;
                    month = month>=10? month:'0'+month;
                    let date = d.getDate();
                    date = date>=10? date:'0'+date;
                    let lastdate = `${d.getFullYear()}-${month}-${date}`;
                    // 소설 정보를 담을 객체
                    const data = {
                        title: null,
                        genre: null,
                        author: null,
                        desc: null,
                        link: null,
                        image: null,
                    };
                    let noveldate;
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
                        noveldate = ((document.querySelector('ul.lst_list >li p').innerText).slice(-11,-1)).replace(/[.]/g,"-");
                        if(noveldate < lastdate){
                            datecheck = false;
                            break;
                        }
                        else{
                            datecheck=true;
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
                    return {list: list, check: check, itemNum: itemNum, datecheck: datecheck};
                }, (genreCode));
                // 장르별 리스트에 해당 페이지 정보 병합
                datas[i] = datas[i].concat(lists.list);
                // 다음페이지가 없을 경우
                if (lists.check == false || lists.datecheck == false) {
                    // 결과 리스트에 장르별 리스트 병합
                    results = results.concat(datas[i]);
                    break;
                }
                // 페이지 및 아이템 증가(갱신)
                genreCode[2] += 1;
                genreCode[3] = lists.itemNum;
                if(genreCode[2]%100 == 0){
                    console.log(`장르 : ${genreCode[0]}\t페이지 번호 : ${genreCode[2]}\t 소설 수 : ${genreCode[3]}`);
                }
            }
            // 작업을 완료한 페이지는 닫아주기
            await page.close();
            console.log(`네이버 시리즈 ${genreCode[0]} 장르 크롤링 완료`);
        }));
        // 모든 작업을 마치면 browser 닫기
        await browser.close();
        console.log('네이버 시리즈 크롤링 완료');
        // 결과 데이터를 csv파일로 저장
        const str = stringify(results);
        fs.writeFileSync(__dirname+'/csv/naver_week.csv', str);
    } catch (e) {
        // 에러 발생시 에러 메시지 콘솔에 출력
        console.error(e);
    }
}
run();