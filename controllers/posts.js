// Model
    const Post = require('../models/post');


module.exports = (app) => {

  // New Post Route
  app.post('/posts/new', (req,res) => {
      const post = new Post(req.body);
      // Save post to DB
      post.save((err, post) => {
        // redirect to root 
        return res.redirect('/')
      })
  })


  // Home Route 
  app.get('/', (req, res) => {
  
    Post.find({}).lean()
    .then(posts => {
      res.render('posts-index', { posts });
    })
    .catch(err => {
      console.log(err.message);
    })
  })

  // Post Form Route
  app.get('/posts/new', (req, res) => {
    res.render('post_form')
  })
  // SUBREDDIT
  app.get("/n/:subreddit", function(req, res) {
    Post.find({subreddit: req.params.subreddit}).lean()
      .then(posts => res.render("posts-index", {posts}))
      .catch(err => {
        console.log(err)
      })
    console.log(req.params.subreddit);
  });

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
  
};