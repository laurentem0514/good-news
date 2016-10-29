const router = require('express').Router();
const newsService = require('../services/news');

router.get('/', (req, res) => {
  res.render('index')
});

router.get('/ajax/sources', newsService.getSources, (req,res) =>{
 res.render('partial', {
  sourcesByCategory: res.sourcesByCategory
 })
});


module.exports = router;
