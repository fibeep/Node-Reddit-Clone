// Require Libraries
const express = require('express');
import 'dotenv/config';
import { addHook } from 'pirates';


// App Setup
const app = express();
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

// Middleware
const exphbs  = require('express-handlebars');
 
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
// Set db
require('./data/reddit-db');
// Controllers
require('./controllers/posts.js')(app);

// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add after body parser initialization!
app.use(expressValidator());


// Routes




// ''' Home Route '''
app.get('/', (req, res) => {
    res.render('home')
})

// New Post Route
app.get('/posts/new', (req,res) => {
    res.render('post_form')
})


app.listen(3000, () => {
  console.log('Search listening on port localhost:3000!');
});