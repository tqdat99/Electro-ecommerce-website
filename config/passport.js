const LocalStrategy = require('passport-local').Strategy;

const users = require('../app/models/user')

module.exports = function(passport) {
    passport.use('local-signup', new LocalStrategy(
      function(username, password, done) {
        if (password.length < 6){
            console.log('PASSWORD >= 6');
            return done(null,false, 'PASSWORD >= 6');
        }    
        users.find(username, function(result, err){
            if(err) {
              winston.error('Error...I dont know why', err)
              return done(err)
            }
            if(result.rows.length == 0){
                password = users.generateHash(password);
                users.insert(username, password, function(result) {
                    console.log(result)
                    return done(null, true, "SUCCESSFULLY SIGN UP! PLEASE LOGIN!")
                })
            } else {
                console.log('USERNAME EXISTS');
                return done(null,false, 'USERNAME EXISTS');
            }  
        })
      }
    ));

    passport.use('local-login', new LocalStrategy(
        function(username, password, done) {
        if (password.length < 6){
            console.log('PASSWORD >= 6');
            return done(null,false, 'PASSWORD >= 6');
        }    
        users.find(username, function(result, err){
            if(err) {
              winston.error('Error when selecting user on login', err)
              return done(err)
            }
            if(result.rows.length == 0){
                console.log('ACCOUNT NON-EXISTS');
                return done(null, false, 'ACCOUNT NON-EXISTS');
            } else {
                const res = users.validPassword(password, username);
                console.log("res from .validPassword --> " + res);
                res.then(function(value) {
                    if (!value) {
                        console.log('WRONG PASSWORD');
                        return done(null, false, 'WRONG PASSWORD');
                    }
                    console.log('WELCOME')
                    return done(null, {id: result.rows[0].id, username: result.rows[0].username, password: result.rows[0].password}, 'WELCOME');
                })
            }
        })
      }
    ));

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        users.findID(id, function(result, err){
            if(err) {
              winston.error('Error when selecting user from id', err)
              return done(err)
            }
            done(null, result.rows[0]);
        })
    });
};
