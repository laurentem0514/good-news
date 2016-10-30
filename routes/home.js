const router       = require('express').Router();
const newsService  = require('../services/news');
const favorites    = require('../models/favorites');
const auth         = require('../lib/auth');

router.get('/', auth.authenticate, (req, res) => {
  res.render('index', {
    user: res.user
  })
});

router.get('/ajax/sources', favorites.getFavorites, newsService.getSources, (req,res) =>{
 res.render('sources/sources', {
  sourcesByCategory: res.sourcesByCategory
 })
});


module.exports = router;
