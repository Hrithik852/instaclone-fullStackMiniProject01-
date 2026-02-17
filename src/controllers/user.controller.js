const followModel=require('../models/follow.model');
const likeModel = require('../models/like.model');
const postModel = require('../models/post.model');
const userModel=require('../models/user.model')
const followController=async(req,res)=>{

    const follower=req.user.username;
  const followee=req.params.username;

  const isuserExists=await userModel.findOne({username:followee});
  if(!isuserExists){
    return res.status(400).json({message:'user doesnt exists'})
  }
  if(follower===followee){
    return res.status(409).json({message:'bro you cant follow ur self'})
  }
  const isFollowing=await followModel.findOne({follower,followee})
  if(isFollowing){
    return res.status(403).json({message:'you are already following'})
  }

  const followRecord=await followModel.create({follower,followee})
   res.status(201).json({
    message:'here the info you just followed '+followRecord.followee,
   })
}

const unfollowController=async(req,res)=>{

    const follower=req.user.username;
    const followee=req.params.username;
     if(follower===followee){
    return res.status(409).json({message:'bro you cant unfollow ur self'})
  }
    const isAlreadyFollowing=await followModel.findOne({followee,follower})
    if(!isAlreadyFollowing){
        return res.status(409).json({message:'bro u not following him'})
    }
    await followModel.findByIdAndDelete(isAlreadyFollowing.id)
    res.status(201).json({message:'successfully unfollowed',followeeData})

}

const likePostController=async(req,res)=>{
const postId=req.params.postId;
const username=req.user.username;
const post=await postModel.findById(postId);
if(!post){
    return res.status(404).json({message:'post not found'})
}

const alreadyLiked=await likeModel.findOne({post:postId,user:username});
if(alreadyLiked){
    return res.status(400).json({message:'already liked'})
}

const likeRecord=await likeModel.create({post:postId,user:username})
res.status(201).json({message:'like the post '+post,likeRecord})
}
module.exports={followController,unfollowController,likePostController}