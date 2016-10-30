const router = require('express').Router();
const dbService = require('../models/favorites');


router.get('/', dbService.getFavorites, (req, res) => {
  res.render('favorites/index', {
    favorites: res.favorites
  });
});

router.post('/', dbService.saveFavorites, (req, res) => {
  res.sendStatus(200);
});

router.delete('/:id', dbService.deleteFavorite, (req, res) => {
  res.sendStatus(200);
});



module.exports = router;
