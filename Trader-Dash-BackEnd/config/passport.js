//A Passport strategy for authenticating with a JSON Web Token.
const JwtStrategey=require('passport-jwt').Strategy;

//Extract the JWT strategy
const ExtractJwt=require('passport-jwt').ExtractJwt;


const User=require('../model/users');
const config=require('../config/database');

let opts={};

opts.jwtFromRequest=ExtractJwt.fromAuthHeaderWithScheme('jwt');
opts.secretOrKey=config.secrect;

module.exports  = function (passport) {
    passport.use( new JwtStrategey ( opts,(jwt_payload , done) => {
        
        //console.log("j; ",jwt_payload)
        User.getUserById (jwt_payload._id, (err,user) =>{
            if (err)
                return done(err,false);
            if(user)
                return done(null,user);
            else
                return done(null,false);
        });

    }));
}
