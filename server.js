// Require Libraries
const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');


import 'dotenv/config';
import { addHook } from 'pirates';


// App Setup
const app = express();
const port = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(expressValidator());

// Middleware

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

require('./controllers/posts.js')(app);

// Set db
require('./data/reddit-db');


// Routes


app.listen(port, () => {
  console.log('Search listening on port localhost:3000!');
});