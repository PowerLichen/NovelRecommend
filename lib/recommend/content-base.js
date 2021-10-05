//사용자가 평점을 준 작품이 많을 수록, 데이터의 정확도가 높아지는 알고리즘

const datas = [
    {
        nid: 1,
        tag: "먹고"
    },
    {
        nid: 1,
        tag: "싶은"
    },
    {
        nid: 1,
        tag: "사과"
    },
    {
        nid: 2,
        tag: "먹고"
    },
    {
        nid: 2,
        tag: "싶은"
    },
    {
        nid: 2,
        tag: "바나나"
    },
    {
        nid: 3,
        tag: "길고"
    },
    {
        nid: 3,
        tag: "노란"
    },
    {
        nid: 3,
        tag: "바나나"
    },
    {
        nid: 3,
        tag: "바나나"
    },
    {
        nid: 4,
        tag: "저는"
    },
    {
        nid: 4,
        tag: "과일이"
    },
    {
        nid: 4,
        tag: "좋아요"
    },
]



//module.exports = () => {
let tagset = new Set();
let nid_idx_map = new Map();
let raw_data = new Array();

let size = 0;

//기본 데이터 초기화
for (var data of datas) {
    // nid에 대한 첫 데이터
    if (!nid_idx_map.has(data.nid)) {
        nid_idx_map.set(data.nid, size);
        raw_data.push(new Array());
        size += 1;
    }
    //raw_data[nid]에 데이터 삽입
    raw_data[nid_idx_map.get(data.nid)].push(data.tag);
    //사전에 데이터 삽입.
    tagset.add(data.tag);
}
console.log("기본 데이터 >>")
console.log(tagset);
console.log(raw_data);
console.log("nid 갯수 : " + size);

//전체 태그 중 n개 선택
let sql = "SELECT tag, COUNT(tag) AS cnt FROM novel_tag GROUP BY tag ORDER BY cnt DESC, tag limit ?;"
const num = 4;
//result_tag = query(sql, [num]);
const result_tag = [
    {
        tag: "바나나",
        cnt: 3,
    },
    {
        tag: "먹고",
        cnt: 2,
    },
    {
        tag: "싶은",
        cnt: 2,
    },
    {
        tag: "과일이",
        cnt: 1,
    }
];

var target_tags = new Array(result_tag.length);
for (var i = 0; i < result_tag.length; i++) {
    target_tags[i] = result_tag[i].tag;
}

console.log("\n필터링 후 태그 >> " + target_tags);

var filtered_freq_data = new Array(raw_data.length);
var filtered_freq_total = Array.from({ length: target_tags.length }, () => 0);

for (var i = 0; i < raw_data.length; i++) {
    filtered_freq_data[i] = new Array(target_tags.length);
    for (var j = 0; j < target_tags.length; j++) {
        filtered_freq_data[i][j] = raw_data[i].filter(tag => tag === target_tags[j]).length;
        if (filtered_freq_data[i][j] != 0) {
            filtered_freq_total[j] += 1;
        }
    }
}


console.log(filtered_freq_data);
console.log("빈도 >>" + filtered_freq_total);

var idf_data = filtered_freq_total.map((num) => {
    return Math.log(raw_data.length / (num + 1)) + 1;
});
console.log("idf >>" + idf_data);

var tf_idf = filtered_freq_data.map((datas)=>{
    return datas.map((n,i)=>{
        return n * idf_data[i];
    });
});

console.log("tf-idf >>");
console.log(tf_idf);





// const tag_arr = Array.from(tagset);

// //단어 빈도 수 데이터
// let freq_data = new Array(size)
// for (var i = 0; i < size; i++) {
//     freq_data[i] = new Array(tag_arr.length);
// }

// for (var i = 0; i < tag_arr.length; i++) {
//     var cur_tag = tag_arr[i];
//     var nums = 0;

//     for (var j = 0; j < size; j++) {
//         freq_data[j][i] = raw_data[j].filter(tag => tag === cur_tag).length;
//         nums += freq_data[j][i];
//     }
// }

// console.log("단어 빈도 수 데이터 >>");
// console.log(freq_data);

// /// num개의 상위 4종 태그만 계산
// const num = 4;




//}