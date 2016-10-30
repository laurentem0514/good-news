const router = require('express').Router();
const auth = require('../lib/auth');
const user = require('../models/user');

router.get('/register', (req, res) => {
  res.render('auth/register');
});

router.get('/signin', (req, res) => {
  res.render('auth/signin');
});

router.post('/register', user.createUser, auth.logIn, (req, res) => {
  res.redirect('/');
});

router.post('/signin', auth.logIn, (req, res) => {
  res.redirect('/favorites');
});



module.exports = router;
