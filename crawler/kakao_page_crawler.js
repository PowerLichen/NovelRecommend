// 모듈 import
const puppeteer = require('puppeteer');
const stringify = require('csv-stringify/lib/sync');
const fs = require('fs');

// 크롤링 실행 함수
const run = async() =>{
    try{
        // 브라우저 옵션, 페이지 출력 없음
        const browserOption = {
            headless:true,
        };
        // 변수 설정
        let result = [];    // 크롤링 데이터 저장 변수
        let itemNum = 0;    // 아이템 수 저장 변수
        let scrollTop = -1; // 스크롤의 위치 저장 변수
        const browser = await puppeteer.launch(browserOption);
        const page = await browser.newPage();
        // UserAgent 설정
        await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36");
        // 페이지의 viewport 설정 - 화면 출력 크기 설정
        await page.setViewport({
            width:1200, height:768
        });
        // 카카오 페이지 주소
        const url = `https://page.kakao.com/main?categoryUid=11&subCategoryUid=1101`;
        await page.goto(url);
        console.log('카카오 페이지 크롤링 시작');
        //반복
        while(1){
            // 이전 아이템 개수
            let preItemNum = itemNum;
            const datas = await page.evaluate((itemNum)=>{
                let list = [];
                // 각 소설 정보
                const data = {
                    title : null,
                    genre : null,
                    author : null,
                    desc : null,
                    link : null,
                    image : null,
                };
                // 쿼리문을 통한 소설 정보 크롤링
                const novels = document.querySelectorAll('.listItemBox');
                for(const novel of novels){
                    data.title = novel.querySelector(' .css-9prbtm span').textContent.trim();
                    data.genre = novel.querySelectorAll('div.css-k87799>p')[1].textContent.trim();
                    data.link = novel.querySelector(' a.jsx-219726507').href;
                    data.desc = novel.querySelector(' p.jsx-219726507.text-ellipsis').textContent.trim();
                    data.author = novel.querySelector(' .css-k87799 .text-ellipsis').textContent.trim();
                    data.image = novel.querySelector(' .imageWrapper img').getAttribute('data-src');
                    list.push(Object.values(data));
                    itemNum+=1;
                }
                return {list,itemNum};
            },(itemNum));
            // 한 화면 크롤링 끝나면 스크롤 내림
            const scroll = await page.evaluate((scrollTop)=>{
                let check;
                window.scrollBy(0,window.innerHeight);
                // 스크롤 높이가 지금이랑 이전이랑 같은 경우 => 스크롤을 더이상 내리지 못하는 경우
                if(document.documentElement.scrollTop == scrollTop){
                    // fasle 반환
                    check = false;
                    return {check,scrollTop};
                }
                // 그 외의 경우(스크롤이 내려가는 경우)
                scrollTop = document.documentElement.scrollTop;
                // true 반환
                check = true;
                return {check,scrollTop};
            },(page,scrollTop));
            // 0.3초 대기
            await page.waitForTimeout(300);
            itemNum = datas.itemNum;
            scrollTop = scroll.scrollTop;
            // 이전 아이템 개수와 지금 개수가 같은 경우 => 아이템의 추가가 없는 경우 반복 멈춤
            if(preItemNum==itemNum) break;
            result = result.concat(datas.list);
            // 스크롤이 끝난 경우 => 반복 멈춤
            if(scroll.check == false) break;
        }
        console.log('카카오 페이지 크롤링 완료');
        // 페이지 및 브라우저 닫기
        await page.close();
        await browser.close();
        
        // 위 크롤링 진행시 중복이 생길 수 있음(해당 화면의 코드를 다 크롤링 하기 때문에)
        // Set을 통해 중복 제거
        const unique = [...new Set(result.map(JSON.stringify))].map(JSON.parse);        
        const str = stringify(unique);
        // csv파일로 쓰기
        fs.writeFileSync('csv/kakao.csv',str); 

    }catch(e){
        console.error(e);
    }
}
exports.run = run;
