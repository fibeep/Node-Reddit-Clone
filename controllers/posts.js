// Model
    const Post = require('../models/post');
  const User = require("../models/user");

module.exports = (app) => {

  // New Post Route
app.post("/posts/new", (req, res) => {
  if (req.user) {
    var post = new Post(req.body);
    post.author = req.user._id
    post.upVotes = [];
    post.downVotes = [];
    post.voteScore = 0;
    post.save()
    .then(post => {
      return User.findById(req.user._id)
    })
    .then(user => {
      user.posts.unshift(post)
      user.save()
      res.redirect(`/posts/${post._id}`)
    })
    .catch(err => {
      console.log(err.message)
    })
  } else {
    return res.status(401); // UNAUTHORIZED
  }
});


  // Home (INDEX) Route 
    app.get("/", (req, res) => {
      var currentUser = req.user;
      // res.render('home', {});
      console.log(req.cookies);
      Post.find({})
        .lean()
        .populate("author")
        .then((posts) => {
          res.render("posts-index", { posts, currentUser });
          // res.render('home', {});
        })
        .catch((err) => {
          console.log(err.message);
        });
    });

  // Post Form Route
  app.get('/posts/new', (req, res) => {
    res.render('post_form')
  })
  // SUBREDDIT
 app.get("/n/:subreddit", function (req, res) {
   var currentUser = req.user;
   Post.find({ subreddit: req.params.subreddit })
     .lean()
     .then((posts) => {
       res.render("posts-index", { posts, currentUser });
     })
     .catch((err) => {
       console.log(err);
     });
 });

  // View Post Route
  app.get("/posts/:id", function (req, res) {
    var currentUser = req.user;
    Post.findById(req.params.id)
      .populate("comments")
      .lean()
      .then((post) => {
        res.render("posts-show", { post, currentUser });
      })
      .catch((err) => {
        console.log(err.message);
      });
  });
  app.put("/posts/:id/vote-up", function (req, res) {
    Post.findById(req.params.id).exec(function (err, post) {
      post.upVotes.push(req.user._id);
      post.voteScore = post.voteScore + 1;
      post.save();

      res.status(200);
    });
  });

  app.put("/posts/:id/vote-down", function (req, res) {
    Post.findById(req.params.id).exec(function (err, post) {
      post.downVotes.push(req.user._id);
      post.voteScore = post.voteScore - 1;
      post.save();

      res.status(200);
    });
  });
};

