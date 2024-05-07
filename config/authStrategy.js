const passport = require("passport"); 
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

//Define the github strategy
const GithubStrategy = require('passport-github').Strategy;

//Define google strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require("../models/userModel");

passport.use(
    new LocalStrategy(
        (verify = (username, password, done) => {
        User.findOne({ username: username }).then((user) => {
            if (!user) {
            return done(null, false, { message: "User not found" });
            }
            bcrypt.compare(password, user.password, (error, result) => {
            
            if (error) {
                return done(error);
            }
            return done(null, user);
            });
        });
        })
    )
);

//implement the github strategy
passport.use(new GithubStrategy({ //container to use the strategy
    clientID: process.env.GITHUB_CLIENT_ID, 
    clientSecret: process.env.GITHUB_CLIENT_SECRET, 
    callbackURL: 'http://localhost:3000/auth/github'
}, 
    (accessToken, refreshToken, profile, done) => { 
    console.log(profile); 
    return done(null, profile); 
    })
);
  
//implement the google strategy
passport.use(new GoogleStrategy({ 
    clientID: process.env.GOOGLE_CLIENT_ID, 
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/admin'
    },
    (accessToken, refreshToken, profile, done) => { 
        console.log(profile); 
        return done(null, profile); 
    })
);

passport.serializeUser((user, done) => {
    done(null, user);
});
  
passport.deserializeUser((user, done) => {
    done(null, user);
});