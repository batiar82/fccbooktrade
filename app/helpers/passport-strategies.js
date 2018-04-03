const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const  User  = require('../model/User');

passport.serializeUser((user, done) => {
    console.log("Serialize");
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
    console.log("Serialize");
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

/**
 * Local.
 */
/*
passport.use(new LocalStrategy(
    function(username, password, done) {
        console.log("a ver ahora");
        //any username, password=admin
        if(password === 'admin') {
            return done(null, {id:1,name:username});
        } else {
            return done(null, false);
        }
    }
));
*/

// passport/login.js
/*
passport.use(new LocalStrategy({
    passReqToCallback : true
  },
  function(req, username,email, password, done) { 
    console.log("Nuevo");
    // check in mongo if a user with username exists or not
    User.findOne({ 'email' :  email }, 
      function(err, user) {
        // In case of any error, return using the done method
        if (err)
          return done(err);
        // Username does not exist, log error & redirect back
        if (!user){
          console.log('User Not Found with email '+username);
          return done(null, false, 
                req.flash('message', 'User Not found.'));                 
        }
        // User exists but wrong password, log the error 
        if (!isValidPassword(user, password)){
          console.log('Invalid Password');
          return done(null, false, 
              req.flash('message', 'Invalid Password'));
        }
        // User and password both match, return user from 
        // done method which will be treated like success
        return done(null, user);
      }
    );
}));
*/



passport.use('local-signin',new LocalStrategy({ usernameField: 'email',passReqToCallback : true }, async (req,email, password, done) => {
    console.log("En use");
    try {
    console.log("Voy a buscar un usuario "+email)  
    const user = await User.findOne({ email }).exec();
    if (!user) {
      return done(null, false, 'Email not found.');
    }
    console.log("Encontre: "+JSON.stringify(user));
    const passwordMatch = user.comparePassword(password);
    if (!passwordMatch) {
      return done(null, false, 'Incorrect password.');
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

passport.use('local-signup', new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, async (req, email, password, done) => {
    console.log("email pass "+email+password);
    const user = await User.findOne({ email }).exec();
  if (user) {
    return done(null, false, 'There is already an account using this email address.');
  }

  const newUser = new User();
  newUser.email = email;
  newUser.password = password;
  newUser.name=req.body.name;
  try {
    const newUserSaved = await newUser.save();
    return done(null, newUserSaved);
  } catch (error) {
    return done(error);
  }
}));

module.export = passport;