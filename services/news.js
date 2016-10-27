const fetch = require('node-fetch');

const API_URL = 'https://newsapi.org/v1/articles?'
const API_KEY = process.env.NEWS_KEY;

//fix fetch url to be a req.query

function findNewsBySource(req, res, next) {
  fetch(`${API_URL}source=${req.query.sourceName}&apiKey=${API_KEY}`)
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

module.exports = { findNewsBySource };
