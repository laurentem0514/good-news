const express = require('express');
const logger = require('morgan');
//const bodyParser = require('body-parser');
//const methodOverride = require('method-override');



const app  = express();
const PORT = process.argv[2] || process.env.PORT || 3000;


app.use(logger('dev'));








app.listen(PORT, () => console.log('server listening on ', PORT));
