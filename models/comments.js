const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({
    postId: {
        type: String,
    },
    title: {
        type: String,
        required: true
    },
    postedBy: {
        type: String,
        required: true
    },
    imgLink: {
        type: String,
        required: true
    },
    likes: {
        type: []
    },
    comments: {
        type: []
    },
    datePosted: {
        type: Date,
        required: true
    }

})

module.exports = mongoose.model('UsersSchema', commentsSchema)