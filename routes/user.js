const express = require('express')
const passport = require('passport');  
const router = express.Router();


module.exports = (pool) => {
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
    
    router.post('/join', (req,res,next)=>{
        let sql = 'INSERT INTO userdata VALUES (null,?,?,?,now(), 0)';
        let id = req.body.id;
        let password = req.body.password;
        let nickname = req.body.nickname;
        let params = [id, password, nickname];
        pool.query(sql, params,
            (err, results, fields) => {
                if(err){
                    console.log(err);
                    return next(err);
                }
                console.log('Create account end');
            });
    });
    
    return router
}
