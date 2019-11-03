

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const BearerStrategy = require('passport-http-bearer').Strategy;
const User = mongoose.model('User');
require('dotenv').config();

/**
 * Expose
 */

 //here facebook token is used for bearer authentication, so for logout facebook token from db must be clear, req.logout wont delete token from database
module.exports = new BearerStrategy(function (token, done) {
    User.findOne({ 'facebookProvider.access_token': token },
        function (err, user) {
            if (err) {
                return done(err)
            }
            if (!user) {
                return done(null, false)
            }
            return done(null, user, { scope: 'all' })
        }
    );
});
