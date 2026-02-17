const mongoose = require('mongoose')

const likeSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'post id needed'],
        ref: "posts",
    },
    user: {
        type: String,
        required: [true, 'username required to like'],
    }
}, { timestamps: true, },)
likeSchema.index({ post: 1, user: 1 }, { unique: [true] })


const likeModel = mongoose.model("likes", likeSchema);
module.exports = likeModel;