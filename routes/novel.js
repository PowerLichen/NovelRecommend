const express = require('express')
const router = express.Router();

module.exports = (pool) => {

    router.get('/lists', (req, res, next) => {
        //위에서 10개의 데이터를 호출
        let sql = 'SELECT id,title,imgurl FROM novel_data LIMIT 0,10';
        pool.query(sql, (err, results) => {
            if(err){
                console.log(err);
                return next(err);
            }
            res.send(results);
        });
    });

    // 작품 상세정보 API : '/novel/detail/:id'


    return router;
}