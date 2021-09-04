const passport = require('passport');
const bcrypt = require('bcrypt');
const { Strategy: LocalStrategy } = require("passport-local");

module.exports = (pool) => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'pwd'
    }, (user_id, password, done) => {
        let sql = 'SELECT id, password, nickname FROM userdata WHERE id = ?';
        pool.query(sql, [user_id],
            async (err, rows, fields) => {
                if (err) {
                    console.log(err);
                    return done(err);
                }
                //해당 사용자 정보가 없음
                if (rows.length === 0) {
                    return done(null, false, { reason: '존재하지 않는 사용자입니다.' });
                }
                let user = rows[0];
                let result = await bcrypt.compare(password, user.password);
                if (!result) {
                    return done(null, false, { reason: '비밀번호가 틀립니다.' });
                }
                return done(null, user);
            });
    }));
}