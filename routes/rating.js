const express = require('express')
const path = require('path');
const router = express.Router();


module.exports = (pool) => {
    //평점 데이터 추가
    //API: '/rating/addscore/32/82443/4.5'
    router.get('/addscore/:uid/:nid/:score', (req, res, next) => {
        const uid = path.parse(req.params.uid).base;
        const nid = path.parse(req.params.nid).base;
        const score = path.parse(req.params.score).base;

        const sql = 'INSERT INTO novel_scoredata VALUES (?,?,?)';

        pool.query(sql, [uid, nid, score],
            (err, results) => {
                if (err) {
                    console.log(err);
                    return next(err);
                }
                return res.send("Add score complete");
            });
    });

    return router;
}
