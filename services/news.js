const fetch = require('node-fetch');

const API_URL = 'https://newsapi.org/v1/articles?'
const API_KEY = process.env.NEWS_KEY;


 //function that lets user find news source search by category
function getSources(req, res, next) {
  const favoritesIds = res.favorites.map((favorite) => {
      return favorite.id;
    });

  fetch(`https://newsapi.org/v1/sources?language=en&category=${req.query.category}`)
   .then (r => r.json())
   .then((result) => {

    //if user has added source to favorites, added boolean to check if souce already exists in favorites
    res.sourcesByCategory = result.sources.map((source) => {
      source.isFavorite = favoritesIds.indexOf(source.id) > -1;
      return source;
    });
    next();
  })
  .catch((err) => {
    res.err = err;
    next();
  })
}

//function to get news articles for a particular source
function getArticlesForSource(req, res, next) {
  fetch(`${API_URL}source=${req.params.source}&apiKey=${API_KEY}`)
  .then (r => r.json())
  .then((result) => {
    res.articles = result;
    next();
  })
  .catch((err) => {
    res.err = err;
    next();
  })
}

//modified version of function to get articles from a favorited source
//back-end is building the url for front-end call to get articles
function getArticlesForFavorites(req, res, next) {
  res.favoritesExtended = res.favorites.map((favorite) =>{
     favorite.articlesApiUrl = `${API_URL}source=${favorite.id}&apiKey=${API_KEY}`;
     favorite.articlesUrl = `/sources/${favorite.id}/articles`;
     return favorite;
  });

  next();
}

module.exports = {
        getSources,
        getArticlesForSource,
        getArticlesForFavorites
};
