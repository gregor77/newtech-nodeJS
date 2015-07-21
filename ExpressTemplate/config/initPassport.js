/*

var User=require("../models/user.js");
var configAuth=require("./auth.js");
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

//app.js 에서 require("./config/initPassport")(passport); 에서 초기화 작업이
//이루어지도록 한다.
module.exports=function(passport){
  passport.use("local-login",new LocalStrategy({
      usernameField:"email",
      passwordField:"password",
      passReqToCallback : true // allows us to pass back the entire request to the callback
    },
       
    function(req, email, password, done) {
      User.findOne({"local.email":email }, function (err, user) {
        if (err) { 
          return done(err); 
        }
        if (!user) {
          return done(null, false, req.flash("errMsg",'존재하지 않는 아이디 입니다.'));
        }
        if (!user.validPassword(password)) {
          return done(null, false, req.flash("errMsg",'비밀번호를 확인하세요.'));
        }
        return done(null,user);
      });
    }
  ));
  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
      
      done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
          done(err, user);
      });
  });

  passport.use('local-signup', new LocalStrategy({
    usernameField:"email",
    passwordField:"password",
    passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function(req, email, password, done) {

    User.findOne({ 'local.email' :  email }, function(err, user) {
      // if there are any errors, return the error
      if (err)
        return done(err);

      // check to see if theres already a user with that email
      if (user) {
        return done(null, false, req.flash('errMsg', '이미 등록된 이메일  입니다.'));
      } else {

        var newUser = new User();
        newUser.local.email = email;
        //암호화된 비밀번호를 저장한다. 
        newUser.local.password = newUser.generateHash(password);
        newUser.save(function(err) {
            if (err)
                throw err;
            return done(null, newUser);
        });
      }

    });

  }));

  //*********************** Google Auth ********************
  passport.use(new GoogleStrategy({

      clientID        : configAuth.googleAuth.clientID,
      clientSecret    : configAuth.googleAuth.clientSecret,
      callbackURL     : configAuth.googleAuth.callbackURL,

  },
  function(token, refreshToken, profile, done) {

  // make the code asynchronous
  // User.findOne won't fire until we have all our data back from Google
  process.nextTick(function() {

        // try to find the user based on their google id
        User.findOne({ 'google.id' : profile.id }, function(err, user) {
            if (err)
                return done(err);

            if (user) {

                // if a user is found, log them in
                return done(null, user);
            } else {
                // if the user isnt in our database, create a new user
                var newUser          = new User();

                // set all of the relevant information
                newUser.google.id    = profile.id;
                newUser.google.token = token;
                newUser.google.name  = profile.displayName;
                newUser.google.email = profile.emails[0].value; // pull the first email

                // save the user
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }
        });
    });

  }));
};

*/