var JwtStartegy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('../models/User');
var config = require('./database'); // get the db url


module.exports = function(passport){
    var options = {};
    options.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    options.secretOrKey = config.secret;
    
    passport.use( new  JwtStartegy(options, function(jwt_payload, done){

        User.findOne({id: jwt_payload.id}, function(error, user){
            if(error){
                return done(error, false);
            }
            if(user){
                return done(null,user);
            }else{
                return done(null, false);
            }
        });
    }));
};
