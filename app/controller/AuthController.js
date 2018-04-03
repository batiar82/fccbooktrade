const passport = require('passport');
const { ServerError } = require('../helpers/server');
require('../helpers/passport-strategies');
/*
const signin = (req, res, next) => {
    console.log("Signin");
    return new Promise((resolve, reject) => {
        console.log("Voy a auth");
        passport.authenticate('local-signin', (error, user, info) => {
            console.log("Adentro");
            if (error)
                return reject(error);
            if (!user)
                return reject(new ServerError(info, 400))
            return req.logIn(user, (loginError) => {
                if (loginError)
                    return reject(loginError)
                return resolve(user);
            })
        })
    })
}

const signin = (req, res, next) => {
    console.log("Signin");
    return new Promise((resolve, reject) => {
        console.log("Voy a auth");
        passport.authenticate('local', {
            successRedirect: '/api/books',
            failureRedirect: '/api/error'
          }), function(req, res) {
            console.log('user',req.user);
            res.redirect('/dashboard');
          }});
    }
*/
/**
 * Sign in using email and password.
 * req, res, next params are all required this time (passport requires them). This is an exceptional
 * case.
 */
function signin(req, res, next) {
    return new Promise((resolve, reject) => {
      passport.authenticate('local-signin', (error, user, info) => {
        if (error) {
          return reject(error); // Passport uses callback, but controllerHandler uses Promise.
        }
        if (!user) {
          return reject(new ServerError(info, 400));
        }
  
        return req.logIn(user, (loginError) => {
          if (loginError) {
            return reject(loginError);
          }
          console.log("User al loguear: "+JSON.stringify(user));
          console.log(JSON.stringify(req.user));
          return resolve(user);
        });
      })(req, res, next);
    });
  }
  

function signup(req, res, next) {
    console.log("SignUp")
    return new Promise((resolve, reject) => {
        passport.authenticate('local-signup', (error, user, info) => {
            console.log("User"+JSON.stringify(user));
            if (error) {
                return reject(error); // Passport uses callback, but controllerHandler uses Promise.
            }
            if (!user) {
                return reject(new ServerError(info, 400));
            }

            return resolve(user);
        })(req, res, next);
    });
}

module.exports = {
    signin, signup
}