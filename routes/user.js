const express = require('express')
const passport = require('passport');
const router = express.Router();


module.exports = (pool) => {
    router.get('/', (req, res) => {
        if (!req.user) {
            return res.status(200).json(null);
        }
        res.status(200).json(req.user);
    });

    router.post('/login', (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            if (info) {
                return res.status(401).send(info.reason);
            }
            return req.login(user, async (loginErr) => {
                if (loginErr) { return next(loginErr); }
                return res.json(user);
            });
        })(req, res, next);
    });

    router.get('/logout', (req, res) => {
        req.logout();
        req.session.destroy();
        res.send('Complete logout');
    })

    router.post('/checkId', (req, res, next) => {
        let sql = 'SELECT idx FROM userdata_tb WHERE user_id=?';
        //post 요청 시 전달되는 id
        let email = req.body.email;
        pool.qurey(sql, [email],
            (err, results) => {
                if (err) {
                    console.log(err);
                    return next(err);
                }
                if (results.length !== 0) res.status(403).send('해당 아이디가 이미 DB에 있습니다.');
                else res.send("Good ID.");
            });
    });

    router.post('/join', (req, res, next) => {
        console.log(req.body);
        let sql = 'INSERT INTO userdata VALUES (null,?,?,?,now(), 0)';
        let email = req.body.email;
        let password = req.body.password;
        let name = req.body.name;
        let params = [email, password, name];
        pool.query(sql, params,
            (err, results, fields) => {
                if (err) {
                    console.log(err);
                    return next(err);
                }
                console.log('Create account end');
                res.send("Complete join");
            });
    });

    return router
}
