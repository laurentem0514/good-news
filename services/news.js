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

 // function findNews(req, res, next){
 //    const bySource = req.query.sourceName ? true: false;
 //    const url = bySource ? `${API_URL}source=${req.query.sourceName}&apiKey=${API_KEY}`

 //                          : `https://newsapi.org/v1/sources?language=en&category=${req.query.category}`;
 //          fetch(url)
 //          .then (r => r.json())
 //          .then((result) => {
 //            if (bySource){
 //             res.articlesBySource = result;
 //          } else {
 //             res.articlesByCategory = result;
 //          }
 //            next();
 //          })
 //          .catch((err) => {
 //            res.err = err;
 //            next();
 //          })
 //      }

 //function that lets user find news source ssearch by category
function getSources(req, res, next) {
  fetch(`https://newsapi.org/v1/sources?language=en&category=${req.query.category}`)
   .then (r => r.json())
  .then((result) => {
    res.sourcesByCategory = result;
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
    res.articles = result.articles;
    next();
  })
  .catch((err) => {
    res.err = err;
    next();
  })
}




module.exports = {
        //getLatestNews,
        //findNews,
        getSources,
        getArticlesForSource,

};
