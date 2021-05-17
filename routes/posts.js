const express = require('express');
const router = express.Router();
const Posts = require("../models/posts");
const { v4: uuidv4 } = require('uuid');
router.get('/', async (req, res) => {

    try {
        const posts = await Posts.find({});
        
        res.json(posts)
    }
    catch (err) {
        res.status(500).json(err);
    }

})


router.post('/', async (req, res) => {
    const { title, postedBy, imgLink,  } = req.body;

    for (const field of ['title', 'postedBy', 'imgLink',]) {
        if (!req.body[field])
            return res.status(400).json({
                error: `Missing '${field}' in request body`
            });
    }

    try {
        let Post = new Posts({
            postId: `${uuidv4()}`,
            title,
            postedBy,
            imgLink,
            datePosted: new Date().toDateString()
        })

        let newPost = await Post.save();

        res.json(newPost);
    }
    catch (err) {
        res.status(500).json(err);
    }



})

module.exports = router;