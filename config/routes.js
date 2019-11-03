'use strict';

/**
 * Module dependencies.
 */

const home = require('../app/controllers/home');


/**
 * Expose
 */

module.exports = function (app, passport) {

  /**
   * Home routes
   */
  app.get('/', home.index);



  /**
   * authentication routes
   */
  // Redirect the user to Facebook for authentication.  When complete,
  // Facebook will redirect the user back to the application at
  //     /auth/facebook/callback
  app.get('/api/auth/facebook', passport.authenticate('facebook', { session: false, scope: [] }));

  // Facebook will redirect the user to this URL after approval.  Finish the
  // authentication process by attempting to obtain an access token.  If
  // access was granted, the user will be logged in.  Otherwise,
  // authentication has failed.
  app.get('/api/auth/facebook/callback',
    passport.authenticate('facebook', {
      session: false,
      // successRedirect: `${process.env.CLIENT_BASE_URL}/`,
      failureRedirect: `${process.env.CLIENT_BASE_URL}/account/login`
    }),
    function (req, res) {
      res.redirect(`${process.env.CLIENT_BASE_URL}/account/login/?access_token=${req.user.facebookProvider.access_token}`);
    });

  app.get('/profile', passport.authenticate('bearer', { session: false }),
    function (req, res) {
      console.log(req.headers)
      res.send("LOGGED IN as " + req.user.facebookId + " - <a href=\"/logout\">Log out</a>");
    }
  );

  /**
   * Error handling
   */

  app.use(function (err, req, res, next) {
    // treat as 404
    if (
      err.message &&
      (~err.message.indexOf('not found') ||
        ~err.message.indexOf('Cast to ObjectId failed'))
    ) {
      return next();
    }
    console.error(err.stack);
    // error page
    res.status(500).render('500', { error: err.stack });
  });

  // assume 404 since no middleware responded
  app.use(function (req, res) {
    res.status(404).render('404', {
      url: req.originalUrl,
      error: 'Not found'
    });
  });
};
