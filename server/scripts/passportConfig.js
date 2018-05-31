const passport = require('passport');
const passportJTW = require('passport-jwt');
const db = require('../models')

const jtwStrat = passportJTW.Strategy;
const ExtractJtw = passportJTW.ExtractJwt; 

const opts = {
    jwtFromRequest: ExtractJtw.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_OR_KEY
};

const strategy = new jtwStrat(opts, (payload, next) => {
    db.User.find({
        google_id : payload.id
    })
    .then(res => next(null, res))
}); 

passport.use(strategy);

module.exports = passport;
