const express = require('express')
const path = require('path');
const router = express.Router();

module.exports = (pool) => {
    //단어 검색
    //API: '/search/keyword/천마'
    router.get('/keyword/:keyword', (req, res, next) => {
        const keyword = path.parse(req.params.keyword);
        const sql =
            'SELECT id,title,imgurl \
            FROM novel_data \
            WHERE title LIKE "%?%" OR description LIKE "%?%" \
            LIMIT 0,20';
        pool.query(sql, [keyword, keyword],
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