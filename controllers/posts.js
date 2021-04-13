


module.exports = (app) => {

  // Model
    const Post = require('../models/post');
  // CREATE
  const exphbs  = require('express-handlebars');
  // MIDDLEWARE

  app.engine('handlebars', exphbs({defaultLayout: 'main'}));
  app.set('view engine', 'handlebars');
  // ''' Home Route '''
  app.get('/', (req, res) => {
  
    Post.find({}).lean()
    .then(posts => {
      res.render('posts-index', { posts });
    })
    .catch(err => {
      console.log(err.message);
    })
  })

  // New Post Route
  app.get('/posts/new', (req,res) => {
      res.render('post_form')
  })
  // View Post Route
  app.get("/posts/:id", function(req, res) {
  // LOOK UP THE POST
  Post.findById(req.params.id).lean()
    .then(post => {
      res.render("posts-show", { post });
    })
    .catch(err => {
      console.log(err.message);
    });
  });
  

  app.post('/posts/new', (req, res) => {
    // INSTANTIATE INSTANCE OF POST MODEL
    const post = new Post(req.body);

    // SAVE INSTANCE OF POST MODEL TO DB
    post.save((err, post) => {
      // REDIRECT TO THE ROOT
      return res.redirect(`/`);
    })
  });

};