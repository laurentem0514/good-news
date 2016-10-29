const router = require('express').Router();
const dbService = require('../models/favorites');


router.get('/', dbService.getFavorite, (req, res) => {
  res.render('favorites', {
    favorites: res.favorites
  });
});

router.post('/', dbService.saveFavorites, (req, res) => {
  res.redirect('/');
});


module.exports = router;
