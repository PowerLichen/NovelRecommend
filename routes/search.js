const express = require('express')
const path = require('path');
const router = express.Router();

module.exports = (pool) => {
    //단어 검색
    //API: '/search/keyword/천마/568'
    router.get('/keyword/:keyword/:id', (req, res, next) => {
        const keyword = path.parse(req.params.keyword).base;
        const pageId = path.parse(req.params.id).base * 20;
        const queryword = "%" + keyword + "%";
        const sql =
            'SELECT id, title, imgurl \
            FROM novel_data \
            WHERE title LIKE ? OR description LIKE ? \
            LIMIT ?, 20';
        pool.query(sql, [queryword, queryword, pageId],
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