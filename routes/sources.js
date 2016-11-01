const router        = require('express').Router();
const auth          = require('../lib/auth');
const newsService   = require('../services/news');
const favorites     = require('../models/favorites');

//route for sources by category
router.get('/ajax', auth.authenticate, favorites.getFavorites, newsService.getSources, (req,res) =>{
 res.render('sources/sources', {
  sourcesByCategory: res.sourcesByCategory,
  user: res.user
 })
});

//route for articles by source
router.get('/:source/articles', auth.authenticate, newsService.getArticlesForSource, (req, res) => {
   res.render('sources/articles', {
    articles: res.articles,
    user: res.user
   })
})

module.exports = router;
