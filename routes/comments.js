const express = require('express');
const router = express.Router();
const Posts = require("../models/posts");
const Comments = require("../models/comments");
const { v4: uuidv4 } = require('uuid');
router.get('/', async (req, res) => {

    try {
        const comments = await Comments.find({});
        res.json(comments)
    }
    catch (err) {
        res.status(500).json(err);
    }

})


router.post('/', async (req, res) => {
    const { commentsBy, comment, postId } = req.body;
//postId example = b9ed1ae1-2370-4797-add5-4c662b5c6c71

    for (const field of ['commentsBy', 'comment', 'postId']) {
        if (!req.body[field])
            return res.status(400).json({
                error: `Missing '${field}' in request body`
            });

    }
    
    try {
        const posts = await Posts.find({ postId: postId });
       
        if (posts.length === 0) {
          return  res.status(404).json("Unable to find post")
        };
       
        let {comments} = posts[0]
        
        let Comment = new Comments({
            commentsId: `${uuidv4()}`,
            commentsBy,
            comment,
            datePosted: new Date().toDateString()
        })

        let newComment = await Comment.save();

        comments.push(newComment);
        console.log(comments);

        Posts.updateOne({ postId: postId }, { $set: {comments: comments} })
            .then((done) => res.json(done))


       
    }
    catch (err) {
        res.status(500).json(err);
    }



})

module.exports = router;