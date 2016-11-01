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
    res.sourcesByCategory = result.sources.map((source) => {
       const model = {
          isFavorite: favoritesIds.indexOf(source.id) > -1
       };
       for (let prop in source) {
         model[prop] = source[prop];
       }
       return model;
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
function getArticlesForFavorites(req, res, next) {
  res.favoritesExtended = res.favorites.map((favorite) =>{
     const fave = {};

     for (prop in favorite){
       fave[prop] = favorite[prop];
     }

     fave.articlesApiUrl = `${API_URL}source=${fave.id}&apiKey=${API_KEY}`;
     fave.articlesUrl = `/sources/${fave.id}/articles`;

     return fave;
  });

  next();
}

module.exports = {
        getSources,
        getArticlesForSource,
        getArticlesForFavorites
};
