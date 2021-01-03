const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    comment: {
        type: String,
        required: true,
        default: ''
    }
})

mongoose.model('Comment', commentSchema);
