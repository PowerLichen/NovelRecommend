const passport = require('passport');
const local = require('./local');

module.exports = (pool) => {
    passport.serializeUser((user, done) => {
        done(null,user.id);
    });
    passport.deserializeUser((user_id, done)=>{
        let sql = 'SELECT idx, id, password, nickname, genre FROM userdata WHERE id = ?';
        pool.query(sql, [user_id],
            (err,rows, fields)=>{
                if(err){
                    console.log(err);
                    return done(err);
                }
                done(null, rows[0]);
            })
    });
    local(pool);
}