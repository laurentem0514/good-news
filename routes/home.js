const router = require('express').Router();
const newsService = require('../services/news');
const favorites = require('../models/favorites');

router.get('/', (req, res) => {
  res.render('index')
});

router.get('/ajax/sources', favorites.getFavorites, newsService.getSources, (req,res) =>{
 res.render('sources/sources', {
  sourcesByCategory: res.sourcesByCategory
 })
});


module.exports = router;
