const express = require('express');
const router = express.Router();
const Users = require("../models/users");
const jwtServices = require('../Services/jwtServices')
const { v4: uuidv4 } = require('uuid');
const users = require('../models/users');

router.get('/', async (req, res) => {

    try {
        const users = await Users.find({});
        res.json(users)
    }
    catch (err) {
        res.status(500).json(err);
    }

})
router.get('/:userId', async (req, res) => {

    try {
        const users = await Users.find({ userId: req.params.userId });
        res.json(users)
    }
    catch (err) {
        res.status(500).json(err);
    }

})


router.post('/', async (req, res) => {
    const { displayName, email, password } = req.body
    let user;
    for (const field of ['displayName', 'email', 'password']) {
        if (!req.body[field])
            return res.status(400).json({
                error: `Missing '${field}' in request body`
            });
    }

    try {
        const user = await Users.find({ email: email });
        if (user.length > 0) {
            return res.status(409).json({ errorMessage: "Email already Exists" })
        }
    }
    catch (err) {
        return res.status(500).json(err);
    }

    //creates a user 
    jwtServices.hashPassword(password).then(async (hashedPassword) => {
        user = new Users({
            userId: `${uuidv4()}`,
            displayName: displayName,
            email: email,
            password: hashedPassword,
            profileImage: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'

        })

        try {
            const newUser = await user.save();
            res.json(newUser)
        }
        catch (err) {
            res.status(500).json(err)
        }

    })

})

//update user info
router.put('/profile/:userId', async (req, res) => {
    const { displayName, bio, profileImage } = req.body;
    try {
        const user = await Users.find({ userId: req.params.userId });
        if (user.length < 0) {
            return res.status(409).json({ errorMessage: "User Not Found" })
        }

        const filter = { userId: req.params.userId };

        const options = { upsert: false };

        const updateDoc = {
            $set: {
                displayName, bio, profileImage
            },
        };
        const updatedUser = await users.updateOne(filter, updateDoc, options);

        res.json(updatedUser);

    }
    catch (err) {
        return res.status(500).json(err);
    }
})

//add a peer 
router.put('/addpeer/:userId', async (req, res) => {
    const { peerId } = req.body;
    try {
        const user = await Users.find({ userId: req.params.userId });
        if (user.length < 0) {
            return res.status(409).json({ errorMessage: "User Not Found" })
        }
        
        let peers = user[0].peers;
        //checks if the peer is already added
        let isPeer = peers.includes(peerId);
        //if added removes the peer from the array
        if (isPeer) {
            peers = user[0].peers.filter(peer => peerId !== peer)
        }
        //if not added a new a peer 
        else {
            peers.push(peerId);
        }
        const filter = { userId: req.params.userId };

        const options = { upsert: false };

        const updateDoc = {
            $set: {
                peers
            },
        };
        const updatedUser = await users.updateOne(filter, updateDoc, options);

        res.json(updatedUser);

    }
    catch (err) {
        return res.status(500).json(err);
    }
})




module.exports = router