const router        = require('express').Router();
const auth          = require('../lib/auth');
const dbService     = require('../models/favorites');
const newsService   = require('../services/news');


router.get('/', auth.authenticate, dbService.getFavorites, newsService.getArticlesForFavorites, (req, res) => {
  res.render('favorites/index', {
    favorites: res.favorites,
    favoritesExtended: res.favoritesExtended,
    user: res.user
  });
});

router.post('/', dbService.saveFavorites, (req, res) => {
  res.sendStatus(200);
});

router.delete('/:id', dbService.deleteFavorite, (req, res) => {
  res.sendStatus(200);
});



module.exports = router;
