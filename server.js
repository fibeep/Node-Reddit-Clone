// Require Libraries
const express = require('express');
import 'dotenv/config';
import { addHook } from 'pirates';

// App Setup
const app = express();

// Middleware
const exphbs  = require('express-handlebars');
 
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Routes

app.get('/', (req, res) => {
    res.render('home')
})


app.listen(3000, () => {
  console.log('Search listening on port localhost:3000!');
});