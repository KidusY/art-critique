const express = require('express');
const router = express.Router();
const Posts = require("../models/posts");
const Users = require("../models/users");

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

router.get('/:userId', async (req, res) => {
    const { userId } = req.params;


    try {
        const posts = await Posts.find({ postedBy: userId });
        res.json(posts)
    }
    catch (err) {
        res.status(500).json(err);
    }
})


router.post('/', async (req, res) => {
    const { title, postedBy, imgLink, } = req.body;

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
router.put('/likes', async (req, res) => {
    const { userId, postId } = req.body;

    const posts = await Posts.find({ postId: postId });
    if (posts.length < 0) {
        return res.status(404).json({
            errorMessage: "No Post Found"
        })
    }

    let isLiked = posts[0].likes.includes(userId);
    try {
        const filter = { postId };
        const options = { upsert: false };
        let newPostLikes = posts[0].likes;
        let updateDoc = {};

        if (!isLiked) {
            newPostLikes.push(userId);
            updateDoc = {
                $set: {
                    likes: newPostLikes
                }
            }
        }
        else {
            newPostLikes = posts[0].likes.filter(likedBy => likedBy !== userId);
            updateDoc = {
                $set: {
                    likes: newPostLikes
                }
            }
        }
        const updatePost = await Posts.updateOne(filter, updateDoc, options)
        console.log(updatePost);
        res.json(updatePost);
    }
    catch (err) {
        res.status(500).json(err);
    }



})

module.exports = router;