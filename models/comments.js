const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({
    commentsId: {
        type: String,
    },
    postId:{
        type:String,
        require:true
    },
    commentsBy: {
        type: String,
        required: true
    },
    likes: {
        type: []
    },
    comment: {
        type: String,
        required: true
    },
    datePosted: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('commentsSchema', commentsSchema)