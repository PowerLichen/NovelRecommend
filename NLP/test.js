const {KMR, KKMA} = require('koalanlp/API');
const {initialize} = require('koalanlp/Util');
const {Tagger, Parser} = require('koalanlp/proc');

const str = `장호는 강호의 고수들과 중원을 구하려고 했지만,
황밀교의 계략에 빠져 진법에 갇혀 버렸다.
모든 힘을 다한 최후의 순간!

으잉? 눈 떠 보니 12살...?!
12살로 돌아온 내 눈앞에 보이는 건,
가난과 병마로 죽었던 두 형들!
이번 생은 절대로 죽게 내버려 두지 않겠어!
두 형을 건사하기 위해 의방에 취직하고.,,

의선문의 정식 제자가 된 이후,
새벽에 무공 수련
오후에는 의방 일
눈 코 뜰새없이 바쁘지만
황밀교의 마수를 저지하기 위해선 게을리 할 수 없다.

이번엔 반드시! 
저지하고 말겠어!의원 장호, 다시 강호로!`;

async function executor(){
    await initialize({packages: {KMR: '2.0.4', KKMA: '2.0.4'}, verbose: true});

    let tagger = new Tagger(KMR);
    let tagged = await tagger(str);
    for(const sent of tagged) {
        console.log(sent.toString());
    }

    let parser = new Parser(KKMA);
    let parsed = await parser(str);
    for(const sent of parsed){
        console.log(sent.toString());
        for(const dep of sent.dependencies){
            console.log(dep.toString());
        }
    }
}

executor().then(
    () => console.log('finished!'), 
    (error) => console.error('Error Occurred!', error)
);