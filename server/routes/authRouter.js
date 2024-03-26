const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/userModel');

const router = express.Router();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLW_CALBACK_URL,
    },
    async function (accessToken, refreshToken, profile, done) {
      const newUser = {
        googleId: profile.id,
        displayName: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        profileImage: profile.photos[0].value,
      };

      try {
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          done(null, user);
        } else {
          user = await User.create(newUser);
          done(null, user);
        }
      } catch (err) {
        console.log(err);
      }
    }
  )
);

// Google Login Route
router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

// Retrieve user data
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login-failure',
    successRedirect: '/dashboard',
  })
);

// Router if something goes wring on login
router.get('/login-failure', (req, res) => {
  res.send('Something went wrong..');
});

// Presist user data after successful authentication
passport.serializeUser(function (user, done) {
  done(null, user.id);
});
// // Retrieve user data from session
// passport.deserializeUser(async function (id, done) {
//   const user = await User.findById(id, function (err, user) {
//     done(err, user);
//   });
// });
passport.deserializeUser(function (user, done) {
  process.nextTick(async function () {
    var usr = false;
    usr = await User.findOne(null, user.id).catch(err => done(err, false)); // this gets triggered by User.findOne as the user.id is non-existent in the DB
    return done(null, usr || false);
  });
});
module.exports = router;
