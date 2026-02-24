const followModel = require('../models/follow.model');
const likeModel = require('../models/like.model');
const postModel = require('../models/post.model');
const userModel = require('../models/user.model')
const followController = async (req, res) => {

    const follower = req.user.username;
    const followee = req.params.username;

    const isuserExists = await userModel.findOne({ username: followee });
    if (!isuserExists) {
        return res.status(400).json({ message: 'user doesnt exists' })
    }
    if (follower === followee) {
        return res.status(409).json({ message: 'bro you cant follow ur self' })
    }
    const isFollowing = await followModel.findOne({ follower, followee })
    
    if (isFollowing&&isFollowing.status=='pending') {
        return res.status(403).json({ message: 'you have already send follow request and it is in pending state' })
    }
    else if(isFollowing&&isFollowing.status=='accepted'){
        return res.status(403).json({ message: 'you are already following' })
    }

    const followRecord = await followModel.create({ follower,followee})
    res.status(201).json({
        message: 'you requested to follow' + followRecord.followee,
    })
}

const unfollowController = async (req, res) => {

    const follower = req.user.username;
    const followee = req.params.username;
    if (follower === followee) {
        return res.status(409).json({ message: 'bro you cant unfollow ur self' })
    }
    const isAlreadyFollowing = await followModel.findOne({ followee, follower })
    if (!isAlreadyFollowing) {
        return res.status(409).json({ message: 'bro u not following him' })
    }
    await followModel.findByIdAndDelete(isAlreadyFollowing.id)
    res.status(201).json({ message: 'successfully unfollowed', followeeData })

}

const likePostController = async (req, res) => {
    const postId = req.params.postId;
    const username = req.user.username;
    const post = await postModel.findById(postId);
    if (!post) {
        return res.status(404).json({ message: 'post not found' })
    }

    const alreadyLiked = await likeModel.findOne({ post: postId, user: username });
    if (alreadyLiked) {
        return res.status(400).json({ message: 'already liked' })
    }

    const likeRecord = await likeModel.create({ post: postId, user: username })
    res.status(201).json({ message: 'like the post ' + post, likeRecord })
}


const getRequestsController=async(req,res)=>{
    const username = req.user.username;
    const requests=await followModel.find({
       followee:username ,status:"pending"});
    if(requests.length==0){
        return res.status(404).json({message:'no requests to show'})
    }
res.status(200).json({message:'there is '+requests.length+ ' requests pending',requests});
}

const acceptFollowRequestController=async(req,res)=>{
    const follower=req.params.username;
    const username=req.user.username;
    if(username===follower){ return res.status(409).json({
        message:'you cant accept urself'
    })}
    const  isFollowrequestExists=await followModel.findOne({follower,followee:username,status:"pending"})
    if(!isFollowrequestExists){
        return res.status(404).json({message:`there is no request from ${follower} you have either accepted or rejected`})
    }
    const updatedStatus=await followModel.updateOne({follower,followee:username},{$set:{status:'accepted'}})
    res.status(201).json({updatedStatus})
}
const rejectFollowRequestController=async(req,res)=>{
    const follower=req.params.username;
    const username=req.user.username;
    if(follower===username){
        return res.status(409).json({message:'you cant reject urself'})
    }
    const isFollowrequestExists=await followModel.findOne({follower,followee:username,status:"pending"})
    if(!isFollowrequestExists){
        return res.status(404).json({message:`there is no request from ${follower} you have either accepted or rejected`})
    }
    await followModel.findByIdAndDelete(isFollowrequestExists._id)
    res.status(204).json({message:"rejected the user",isFollowrequestExists})

}


const unlikePostController = async (req, res) => {
    const postId = req.params.postId;
    const username = req.user.username;
    const post = await postModel.findById(postId);
    if (!post) {
        return res.status(404).json({ message: 'post not found' })
    }

    const alreadyLiked = await likeModel.findOne({ post: postId, user: username });
    if (!alreadyLiked) {
        return res.status(400).json({ message: 'not liked' })
    }

   await likeModel.findOneAndDelete(alreadyLiked._id)
    res.status(201).json({ message: 'like the post ' + post, message:"unliked" })
}
module.exports = { followController, unfollowController, likePostController,getRequestsController,acceptFollowRequestController,rejectFollowRequestController,unlikePostController}