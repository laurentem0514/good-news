const router       = require('express').Router();
const auth         = require('../lib/auth');

router.get('/', auth.authenticate, (req, res) => {
  res.render('index', {
    user: res.user
  })
});

module.exports = router;
