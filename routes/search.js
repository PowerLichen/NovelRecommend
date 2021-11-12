const express = require('express')
const path = require('path');
const router = express.Router();

module.exports = (pool) => {
    // 태그 검색
    router.get('/tag/:keyword/:id', (req, res, next) => {
        const keyword = path.parse(req.params.keyword).base;
        const pageId = path.parse(req.params.id).base * 20;
        const sql = 'SELECT id,title, imgurl FROM novel_data WHERE id IN (SELECT DISTINCT nid FROM novel_tag WHERE tag = ?) LIMIT ?, 20;'
        pool.query(sql, [keyword, pageId],
            (err, results) => {
                if (err) {
                    console.log(err);
                    return next(err);
                }
                res.send(results);
            });
    });

    //전체에서 단어 검색
    //API: '/search/title/천마/568'
    router.get('/:order/:keyword/:id', (req, res, next) => {
        const order = path.parse(req.params.order).base;
        const keyword = path.parse(req.params.keyword).base;
        const pageId = path.parse(req.params.id).base * 20;
        const queryword = "%" + keyword + "%";
        const isNameSearch = (order === "name") ? 'LEFT JOIN author ON novel_data.author_id = author.id' : '';
        const sql =
            `SELECT novel_data.id, novel_data.title, novel_data.imgurl \
            FROM novel_data ${isNameSearch}\
            WHERE ${order} LIKE ?  \
            LIMIT ?, 20`;
        pool.query(sql, [queryword, pageId],
            (err, results) => {
                if (err) {
                    console.log(err);
                    return next(err);
                }
                res.send(results);
            });
    });


    return router;
}