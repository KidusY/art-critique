const express = require('express');
const router = express.Router();
const Posts = require("../models/posts");
const {google} = require('googleapis');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');

const CLIENT_ID = '349294232179-q6i7330a6m60eu3t42kcdivnj21aldij.apps.googleusercontent.com';
const CLIENT_SECRET = 'Rli79vH5-dKM33wf5R7p7y9d';
const REDIRECT_URL = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04Q3Y1qku5FoxCgYIARAAGAQSNwF-L9Ir9TW99N6wNYb9mgiDVy7u50L1FCzedbTbD-lRgZd8-tyLZlh81ryjY7qBKtjX5xYSy-g';

const oauthClient = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL
)

oauthClient.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
    version: 'v3',
    auth: oauthClient

})

// const uploading = multer({
//     dest: __dirname + '../public/uploads/',
//     limits: { fileSize: 1000000, files: 1 }
// })

router.get('/', async (req, res) => {

    try {
        const posts = await Posts.find({});
        
        res.json(posts)
    }
    catch (err) {
        res.status(500).json(err);
    }

})

router.get('/:userId',async(req,res)=>{
    const { userId} = req.params;
 

    try {
        const posts = await Posts.find({ postedBy: userId});

        res.json(posts)
    }
    catch (err) {
        res.status(500).json(err);
    }
})

router.post('/photos', async(req,res)=>{
    
  
   
   

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