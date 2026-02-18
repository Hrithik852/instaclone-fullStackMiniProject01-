const mongoose = require('mongoose')
const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        default: "",
    },
    ImageUrl: {
        type: String,
        required: [true, 'image is required']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, 'user required']
    },
})

const postModel = mongoose.model('posts', postSchema);
module.exports = postModel;