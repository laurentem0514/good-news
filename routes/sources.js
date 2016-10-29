const router = require('express').Router();
const newsService = require('../services/news');



router.get('/:source/articles', newsService.getArticlesForSource, (req, res) => {
   res.render('articles', {
    articles: res.articles,
   })
})

module.exports = router;
