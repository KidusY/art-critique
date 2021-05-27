const express = require('express');
const router = express.Router();
const Users = require("../models/users");
const jwtServices = require('../Services/jwtServices');

router.post('/', async(req,res)=>{
    const {email,password} = req.body;
   
    try {
        const users = await Users.find({email:email});
       
        if(users.length < 0){
           return res.status(404).json({errorMessage:"Email or Password Doesn't Exist"})
        }

        jwtServices.comparePasswords(password,users[0].password)
        .then((comparedPassword)=>{
            if (!comparedPassword){
                return res.status(404).json({ errorMessage: "Email or Password Doesn't Exist" })
            }
            const sub = users[0].email;
            const payload = {id: users[0].userId};

          return  res.status(201).json({
                authToken: jwtServices.createJwt(sub,payload),
                displayName: users[0].displayName,
                sub,
                peers:users[0].peers,
                posts:users[0].posts,
                userId:users[0].userId,
                profileImage:users[0].profileImage,
                bio:users[0].bio || ''

            })

        })
       

       
    }
    catch (err) {
        res.status(500).json(err);
    }
})


module.exports = router;