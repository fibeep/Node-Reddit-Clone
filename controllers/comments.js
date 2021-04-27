const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require("../models/user");

module.exports = (app) => {
// CREATE Comment

app.post("/posts/:postId/comments", function(req, res) {
  // INSTANTIATE INSTANCE OF MODEL
  if (req.user) {
    const comment = new Comment(req.body);
    comment.author = req.user._id;
    comment.save()
    .then(comment => {
      return User.findById(req.user._id)
    })
    .then(user => {
      user.comments.unshift(comment)
      user.save()
      res.redirect('/')
    })
    .catch(err => {
      console.log(err.message)
    })
  } else {
    return res.status(401)
  }})}
