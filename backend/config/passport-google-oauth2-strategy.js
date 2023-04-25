const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');

const User = require('../models/user');

// tell passport to use new strategy for google login 
passport.use(new googleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ,
    callbackURL: "http://localhost:8000/auth/google/callback"
    },
    function(accessToken,refreshToken, profile, done){
        // find the use
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if(err){
                console.log("error in google-strategy-passport",err);
                return;
            }
            console.log(profile);
            console.log(profile.photos[0].value);
            // console.log(accessToken, refreshToken);
            


            if(user){
                // if found, set the use as req.user
                return done(null, user);
            }else{
                // if not found, create the use and set it as req.user
             User.create({ 
                name:profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex'),
                avatar: profile.photos[0].value
             },
             function(err, user){
                if(err){
                    console.log("error in creating user google-strategy-passport",err);
                    return;
                }
                return done(null, user);
             }
             )   
            }
        })
    }

));
module.exports = passport;