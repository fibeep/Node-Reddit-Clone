


module.exports = (app) => {

  // Model
    const Post = require('../models/post');
  // CREATE
  
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