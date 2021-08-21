const passport = require('passport');
const local = require('./local');

module.exports = (pool) => {
    passport.serializeUser(() => {

    });
    passport.deserializeUser(()=>{

    });
    local(pool);
}