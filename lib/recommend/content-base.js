//사용자가 평점을 준 작품이 많을 수록, 데이터의 정확도가 높아지는 알고리즘
var cosinesim = require('./cosinesim');

const datas = [
    {
        nid: 12,
        tag: "먹고"
    },
    {
        nid: 12,
        tag: "싶은"
    },
    {
        nid: 12,
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

//표본 데이터가 n개인 경우
//2n개를 (최근에 검색된 작품, 가장 최근에 입력된 작품 중) 순서로 정렬 후
//n개의 데이터를 추출
//해당 n개의 소설에 대한 태그를 이용해서 작업.


//module.exports = () => {
let tagset = new Set();
let tagset_test = [];
let nid_idx_map = new Map();
let nid_list = new Array();
let raw_data = new Array();

let size = 0;

//기본 데이터 초기화
for (var data of datas) {
    // nid에 대한 첫 데이터
    if (!nid_idx_map.has(data.nid)) {
        nid_idx_map.set(data.nid, size);
        raw_data.push(new Array());
        nid_list.push(data.nid);
        size += 1;
    }
    //raw_data[nid]에 데이터 삽입
    raw_data[nid_idx_map.get(data.nid)].push(data.tag);
    //사전에 데이터 삽입.
    tagset.add(data.tag);
    
    if(tagset_test[data.tag] == undefined){
        tagset_test[data.tag] = 1;
    } else{
        tagset_test[data.tag] += 1;
    }
}


var sorted = [];
for(var data in tagset_test){
    sorted.push([data, tagset_test[data]]);
}

console.log(sorted);

sorted.sort(function (a,b) {
    return b[1]-a[1];
});


console.log("기본 데이터 >>")
console.log(nid_idx_map);
console.log(sorted.slice(0,5));
console.log(sorted.slice(0,5).map((data)=>{return data[0]}));
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
console.log(target_tags);

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


//사용자의 픽인 nid 1에 대해서, 2,3,4에 대한 유사도

const p = cosinesim(tf_idf[0],tf_idf[2]);


for(var n=0;n<size;n++){
    console.log("\nnid " + nid_list[n]+ "에 대한 유사도 >> ");
    
    tf_idf.forEach((value, i,arr)=>{
        var nid = nid_list[i];
        console.log(nid + " : " + cosinesim(arr[n],arr[i]));
    });

}

//}