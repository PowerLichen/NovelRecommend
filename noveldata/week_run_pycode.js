// 주간 크롤링 데이터에 대한 처리를 위한 python 코드 실행 js 파일
// 1. child-process 모듈의 spawn 취득
const spawn = require('child_process').spawn;

// 2. spawn을 통해 'python 파일.py' 명령어 실행
const result = spawn('python',[__dirname+'/NLP/week_novel_taging.py']);

// 3. stdout의 'data' 이벤트 리스너로 실행결과를 받는다.
result.stdout.on('data',function(data){
    console.log(data.toString());
});

// 4. 에러 발생 시, stderr의 'data' 이벤트리스너로 실행결과를 받는다.
result.stderr.on('data',function(data){
    console.log(data.toString());
});