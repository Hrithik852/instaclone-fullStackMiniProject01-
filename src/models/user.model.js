const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, 'username already taken'],
        required: [true, 'username required'],
    },
    email: {
        type: String,
        unique: [true, 'email already taken'],
        required: [true, 'email required'],
    },
    password: {
        type: String,
        required: [true, 'pass required']
    },
    bio: String,
    pfp: {
        type: String,
        default: 'https://i.pinimg.com/originals/06/3b/bf/063bbf0665eaf9c1730bccdc5c8af1b2.jpg',
    },
})

const userModel = mongoose.model('users', userSchema)

module.exports = userModel;