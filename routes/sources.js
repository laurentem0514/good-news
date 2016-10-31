const router        = require('express').Router();
const auth          = require('../lib/auth');
const newsService   = require('../services/news');
const favorites     = require('../models/favorites');


router.get('/ajax', auth.authenticate, favorites.getFavorites, newsService.getSources, (req,res) =>{
console.log('ajax-source user: ', res.user);
 res.render('sources/sources', {
  sourcesByCategory: res.sourcesByCategory,
  user: res.user
 })
});

router.get('/:source/articles', auth.authenticate, newsService.getArticlesForSource, (req, res) => {
   res.render('sources/articles', {
    articles: res.articles,
    user: res.user
   })
})

module.exports = router;
