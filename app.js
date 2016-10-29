require('dotenv').config();
const express = require('express');
const logger = require('morgan');
//const bodyParser = require('body-parser');
//const methodOverride = require('method-override');
const path = require('path');

const homeRoute = require('./routes/home');
const sourcesRoute = require('./routes/sources');

const app  = express();
const PORT = process.argv[2] || process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', homeRoute);
app.use('/sources', sourcesRoute);



app.listen(PORT, () => console.log('server listening on ', PORT));
