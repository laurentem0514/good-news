require('dotenv').config();
const express         = require('express');
const logger          = require('morgan');
const bodyParser      = require('body-parser');
const methodOverride  = require('method-override');
const path            = require('path');
const session         = require('express-session');
const cookieParser    = require('cookie-parser');

const homeRoute       = require('./routes/home');
const sourcesRoute    = require('./routes/sources');
const favoritesRoute  = require('./routes/favorites');
const authRoute       = require('./routes/auth');

const app = express();
const SECRET  = 'unicorn23';
const PORT = process.argv[2] || process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use(cookieParser());

app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: SECRET
}));


app.use('/', homeRoute, authRoute);
app.use('/sources', sourcesRoute);
app.use('/favorites', favoritesRoute);
//app.use('/', authRoute);




app.listen(PORT, () => console.log('server listening on ', PORT));
