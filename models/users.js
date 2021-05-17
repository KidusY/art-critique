const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    displayName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,

    },
    peers:{
        type:[]
    },
    posts:{
        type:[]
    },
    profileImage: {
        type: String,
        required: false
    },
    userCreated:{
        type:String,        
    }

})

module.exports = mongoose.model('UsersSchema', usersSchema)
