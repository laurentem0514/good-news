const fetch = require('node-fetch');

const API_URL = 'https://newsapi.org/v1/articles?'
const API_KEY = process.env.NEWS_KEY;

// function getLatestNews(req, res, next) {
//   fetch('https://newsapi.org/v1/sources?')
//   .then (r => r.json())
//   .then((result) => {
//     res.articles = result;
//     next();
//   })
//   .catch((err) => {
//     res.err = err;
//     next();
//   })
// }

 //function that lets user find news source ssearch by category
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

//function that lets user search by source name
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




module.exports = {
        //getLatestNews,
        getSources,
        getArticlesForSource,

};
