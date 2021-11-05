var pcc = require('./pcc');

// 상관분석을 사용한 알고리즘
// 사용자와 비슷하게 추천을 한 다른 사용자가 평점을 높게 준 작품을 출력
module.exports = async (uid, connection) => {
    console.log("협업 알고리즘: 시작")

    let sql = 'SELECT * FROM novel_scoredata';

    // 사용자가 평가한 데이터 목록
    const [user_result, field0] = await connection.query(sql, [uid])
    connection.release();

    // const user_result = [
    //     {
    //         uid: 13,
    //         nid: 87294,
    //         score: 5
    //     },
    //     {
    //         uid: 13,
    //         nid: 87303,
    //         score: 4
    //     },
    //     {
    //         uid: 13,
    //         nid: 83226,
    //         score: 2
    //     },
    //     {
    //         uid: 20,
    //         nid: 87294,
    //         score: 2
    //     },
    //     {
    //         uid: 20,
    //         nid: 87303,
    //         score: 1
    //     },
    //     {
    //         uid: 20,
    //         nid: 83226,
    //         score: 4
    //     },
    //     {
    //         uid: 26,
    //         nid: 87294,
    //         score: 5
    //     },
    //     {
    //         uid: 26,
    //         nid: 87303,
    //         score: 5
    //     },
    //     {
    //         uid: 26,
    //         nid: 83226,
    //         score: 4
    //     },
    //     {
    //         uid: 26,
    //         nid: 83230,
    //         score: 5
    //     },
    //     {
    //         uid: 26,
    //         nid: 83280,
    //         score: 4
    //     },
    // ];

    // 평점 데이터 초기화
    var scoredict = {}

    for (var data of user_result) {
        if ((data.uid in scoredict) == false){
            scoredict[data.uid] = {};
        }
        scoredict[data.uid][data.nid] = data.score;
    }

    // console.log("scoredict")
    // console.log(scoredict)

    var sorted_sim_list = [];
    for(var i in scoredict){
        if(i !=uid){
            let sim = pcc(scoredict, uid, i)
            if(isNaN(sim)){
                sim = 0;
            }
            sorted_sim_list.push([i, sim])
        }
    }

    sorted_sim_list.sort((a,b)=>{
        return b[1] - a[1];
    });

    // console.log("sorted_sim_list")
    // console.log(sorted_sim_list)
    
    var result = [];

    //유사도에 문제가 있는 경우
    if(sorted_sim_list[0][1] < 0.8){
        console.log("협업 알고리즘: 유사도 부족으로 종료")
        return result;

    }
    
    
    console.log(sorted_sim_list);
    // 가장 유사도가 높은 다른 사용자를 선택
    var result_uid = sorted_sim_list[0][0];

    // 현재 사용자가 아직 평가하지 않은 다른 소설들을 저장.
    for(var data in scoredict[result_uid]){
        if((data in scoredict[uid]) == false){
            result.push([data, scoredict[result_uid][data]])
        }
    }
    //최종 결과를 score 내림차순으로 정렬
    result.sort((a,b)=>{
        return b[1] - a[1];
    });

    console.log(result.slice(0,10));

    console.log("협업 알고리즘: 종료")

    // 추천 알고리즘에 의해 선택된 소설 목록
    return result.map(data => data[0]);
}