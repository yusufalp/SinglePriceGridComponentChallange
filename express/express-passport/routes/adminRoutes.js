const express = require('express');
const crypto = require('crypto');

const User = require('../models/userModel');

const router = express.Router();

router.get('/login', (req, res, next) => {
  res.render('login');
});

router.get('/logout', (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }
    res.redirect('/');
  });
});

router.get('/signup', (req, res, next) => {
  res.render('signup');
});

router.post('/signup', (req, res, next) => {
  console.log(req.body);
  const salt = crypto.randomBytes(16);
  const { firstName, lastName, username, password, strategy } = req.body;
  // encrypt the password and then save AFTER
  crypto.pbkdf2(password, salt, 310000, 32, 'sha256', async (error, hashedPassword) => {
    if (error) {
      return next(error);
    }
    const newUser = new User({
      firstName,
      lastName,
      username,
      password: hashedPassword,
      salt,
      strategy
    });

    await newUser.save();

    req.login(newUser, (error) => {
      if (error) {
        return next(error);
      }
      res.redirect('/');
    });
  });

});

module.exports = router;