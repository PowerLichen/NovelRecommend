// 모듈 import
const puppeteer = require('puppeteer');
const stringify = require('csv-stringify/lib/sync');
const fs = require('fs');

// 크롤링 실행 함수
const run = async () => {
    try{
        let result = []; // 크롤링 데이터 저장 변수
        let datas = []; // 연재, 완결 작품별로 소설정보를 저장할 리스트 변수
        // 브라우저 옵션
        const browserOption ={
            headless:true, // 화면 안보이게
        };
        // 연재, 완결 작품 페이지 번호, 소설 수 List
        const ending = [
            ['연재',1,0],
            ['완결',1,0],
        ];
        const browser = await puppeteer.launch(browserOption);

        await Promise.all(ending.map(async (isFinish,i)=>{
            try{
                const page = await browser.newPage();
                datas[i] = new Array();
                console.log(`조아라 ${isFinish[0]} 작품 크롤링 시작`);
                while(1){
                    let url;
                    if(isFinish[0]=='연재') url = `http://pre.joara.com/premium_new/book_list.html?page_no=${isFinish[1]}&sl_category=&sl_search=&sl_keyword=&sl_orderby=amt_sale&sl_othercategory=&list_type=&sub_category=&sl_cate_no=fm`;
                    else url = `http://pre.joara.com/premium_new/finish_list.html?page_no=${isFinish[1]}&sl_category=&sl_search=&sl_keyword=&sl_orderby=cnt_page_read&sl_othercategory=&list_type=finish&sub_category=&sl_cate_no=fm`;
                    await page.goto(url);
                    const lists = await page.evaluate((isFinish)=>{
                        let list = []; // 페이지별 소설 정보를 담을 리스트
                        let check; // 다음 페이지 존재 여부를 저장할 변수
                        let itemNum = isFinish[2];  // 소설 수
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
                        // 만약 페이지 내의 html 코드가 변경된다면 이부분을 수정할 것
                        const novels = document.querySelectorAll('.list_list_con.best_c');
                        for(const novel of novels){
                            data.title = novel.querySelector('.finish_list_view a b').textContent.trim();
                            data.genre = novel.querySelector('.finish_list_view span[style="color:#888;"]').textContent.trim().replace(/[\[\]]/g,"");// 대괄호 제거
                            data.link = novel.querySelector('.img_book1 a').href;
                            data.desc = novel.querySelector('.finish_list_view_text');
                            if(data.desc == null) data.desc = "";
                            else data.desc = (data.desc).textContent.trim();
                            data.author = novel.querySelector('.member_nickname').textContent.trim();
                            data.image = novel.querySelector('.img_book1 a img').src;
                            list.push(Object.values(data)); // list에 위 소설 push
                            itemNum +=1; //소설 수 증가
                        }
                        // 다음 페이지 존재 유무 확인
                        const nextPage = document.querySelector('.paginate_l a:last-child').href;
                        if(nextPage=='javascript:;') check = false;
                        else check = true;
                        return {list:list,check:check,itemNum:itemNum,};
                    },(isFinish));
                    // 장르별 리스트 붙여넣기
                    datas[i] = datas[i].concat(lists.list);

                    // 소설 크롤링이 끝났는지 확인해서 끝났으면 결과 list에 해당 장르 list 삽입
                    if(lists.check == false){
                        result = result.concat(datas[i]);
                        break;
                    }
                    isFinish[1] +=1;
                    isFinish[2] = lists.itemNum;
                }
                // 작업을 완료한 페이지는 닫아주기
                await page.close();
            }
            catch(e){
                console.error(e);
            }
        }));
        // 모든 작업 마치면 browser 닫기
        await browser.close();
        console.log('조아라 크롤링 완료');
        const str = stringify(result);
        fs.writeFileSync(__dirname+`/csv/joara.csv`,str);

    }catch(e){
        console.error(e);
    }
}
exports.run = run;
