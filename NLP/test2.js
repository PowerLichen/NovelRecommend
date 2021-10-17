const {initialize, finalize} = require('koalanlp/Util');
const {Tagger} = require('koalanlp/proc');
const {EUNJEON} = require('koalanlp/API');

async function someAsyncFunction(){
    // 꼬꼬마와 은전한닢 분석기의 2.0.4 버전을 참조합니다.
    await initialize({
      packages: {KKMA:'2.0.4', EUNJEON:'2.0.4'},
      javaOptions: ["-Xmx4g"],
      verbose: true,
    });
    
    // 초기화 다음 작업...
    let tagger = new Tagger(EUNJEON);
    let result = await tagger("문단을 분석합니다. 자동으로 분리되어 목록을 만듭니다.");
    console.log(result[0].singleLineString());
    console.log(result[0].getNouns().toString()); // 체언 // 문단을 = 문단/NNG+을/JKO
    console.log(result[0].getVerbs()); // 용언
    console.log(result[0].getModifiers()); // 수식언
    console.log(result[1].singleLineString());
    console.log(result[1].getNouns());
    console.log(result[1].getVerbs());
    console.log(result[1].getModifiers());
}

someAsyncFunction().then(
    () => console.log('Finished'),
    (error) => console.error('Error', error)
);