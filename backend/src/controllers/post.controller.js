const postModel = require('../models/post.model');
const likeModel = require('../models/like.model');

const ImageKit = require('@imagekit/nodejs')
const { toFile } = require('@imagekit/nodejs')
const jwt = require('jsonwebtoken')
const client = new ImageKit({
    privateKey: process.env.IMAGE_KIT
})
let createPostController = async (req, res) => {
    console.log(req.body, req.file)

    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'token not found' })
    }
    let decoded = null;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    }
    catch (err) {
        return res.status(401).json({
            message: 'user not authorized'
        })
    }


    const file = await client.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: 'postImage'
    })

    const post = await postModel.create({
        caption: req.body.caption,
        ImageUrl: file.url,
        user: decoded.id,

    })
    res.status(201).json({
        message: "Post created successfully.",
        post
    })
}

const getPostController = async (req, res) => {


    const userId = req.user.id;

    const posts = await postModel.find({ user: userId })
    if (posts.length == 0) {
        return res.status(404).json({
            message: "no posts sadly"
        })
    }
    res.status(200).json({ message: 'posts fetched successfully', posts })
}

const getPostDetailsController = async (req, res) => {


    const userId = req.user.id;
    const postId = req.params.id;

    const postDetails = await postModel.findById(postId);
    if (!postDetails) {
        return res.status(404).json({ message: 'post not found' })
    }
    const isUserValid = userId === postDetails.user.toString();
    if (!isUserValid) {
        return res.status(403).json({ message: "you are not him bro" })
    }
    res.status(200).json({
        message: 'post details fetched', postDetails
    })
}

const feedFetchController=async(req,res)=>{
const  {username,id}=req.user;
    const posts=await Promise.all((await postModel.find().populate("user").lean()).map(async(post)=>{
        const isLiked=await likeModel.findOne({user:username,post:post._id});
        post.isLiked=Boolean(isLiked);
        return post
    }))

    res.status(200).json({message:"post fetched successfully",posts})
}
module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController,
    feedFetchController,
}