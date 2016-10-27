const router = require('express').Router();
const { findNewsBySource } = require('../services/news');

router.get('/', findNewsBySource, (req, res) => {
  console.log(res.articles);
  res.render('results', {
    articles: res.articles
  });
});


module.exports = router;
