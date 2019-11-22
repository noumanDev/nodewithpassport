/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;
const User = mongoose.model('User');

/**
 * Expose
 */

module.exports = new LocalStrategy(
  {
    usernameField: 'user[email]',
    passwordField: 'user[password]'
  },
  async function (email, password, done) {
    try {
      let user = await User.findOne({ email: email });
      if (!user) {
        return done(null, false, { message: 'Unknown user' });
      }
      if (!user.validatePassword(password)) {
        return done(null, false, { message: 'Invalid password' });
      }
      return done(null,user)
    } catch (err) {
      if (err) return done(err);
    }
  }
);
