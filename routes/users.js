const express = require('express');
const router = express.Router();
const Users = require("../models/users");
const jwtServices = require('../Services/jwtServices')
const { v4: uuidv4 } = require('uuid');

router.get('/', async (req, res) => {

    try {
        const users = await Users.find({});
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
        return  res.status(500).json(err);
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


module.exports = router