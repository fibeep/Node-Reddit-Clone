// Require Libraries
const dotenv = require('dotenv').config();
const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
var cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

// App Setup
var app = express();
const port = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(expressValidator());
app.use(cookieParser()); // Add this after you initialize express.
// Middleware

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Controllers
require('./controllers/posts.js')(app);
require('./controllers/comments.js')(app);
require('./controllers/auth.js')(app);

// Set db
require('./data/reddit-db');

app.listen(port, () => {
  console.log('Search listening on port localhost:3000!');
});

module.exports = app;