var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require('../config/db.js');


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null,obj);
});

function findById(id, fn) {
  var idx = id - 1;
  if (users[idx]) {
    fn(null, users[idx]);
  } else {
    fn(new Error('User ' + id + ' does not exist'));
  }
}

function findByUsername(username, fn) {
  var user = db.Users.find({where: {first_name: username}});
  if (user.first_name === username) {
    return fn(null, user);
  }
  return fn(null, null);
}



// Use local strategy
passport.use(new LocalStrategy(
  function(username, password, done) {
     console.log ("LocalStrategy invoked");
    process.nextTick(function() {
      findByUsername(username, done);
    }
    );
  }
));

module.exports = {

}



// var users = [
//     { id: 1, username: 'bob', password: 'secret', email: 'bob@example.com' }
//   , { id: 2, username: 'joe', password: 'birthday', email: 'joe@example.com' }
// ];
