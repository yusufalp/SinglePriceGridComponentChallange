const express = require('express');
const passport = require('passport');

const router = express.Router();

// local strategy
router.post('/login/local', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login/local/failed'
}));
router.get('/login/local/failed', (req, res, next) => {
  res.json({ message: 'Username or password is incorrect.' });
});

// github strategy
router.get('/login/github', passport.authenticate('github'));
router.get('/login/github/failed', (req, res, next) => {
  res.json({ message: 'There is a problem with GitHub authentication.' });
});
router.get('/auth/github', passport.authenticate('github', {
  successRedirect: '/',
  failureRedirect: '/login/github/failed'
}));

// // google strategy
// router.get('/login/google', passport.authenticate('google', { scope: ['profile'] }));
// router.get('/login/google/failed', (req, res, next) => {
//   res.json({ message: 'There is a problem with Google authentication.' });
// });
// router.get('/auth/google', passport.authenticate('google', {
//   successRedirect: '/',
//   failureRedirect: '/login/google/failed'
// }));

module.exports = router;

