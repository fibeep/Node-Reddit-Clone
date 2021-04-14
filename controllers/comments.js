  module.exports = function(app) {

    // CREATE Comment route
    app.post('/posts/:postId/comments', function(req, res) {
        
        // Instantiate Instance of Model
        const comment = new Comment(req.body);

        // Save Instnace of comment model to db
        comment
            .save()
            .then(comment => {
                // Redirect to Root
                return res.redirect('/')
            })
            .catch(err => {
                console.log(err)
            })
    })

    

  };