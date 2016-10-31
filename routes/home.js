const router       = require('express').Router();
const auth         = require('../lib/auth');
const newsService  = require('../services/news');
const favorites    = require('../models/favorites');


router.get('/', auth.authenticate, (req, res) => {
  console.log('Home view with user: ', JSON.stringify(res.user));
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
