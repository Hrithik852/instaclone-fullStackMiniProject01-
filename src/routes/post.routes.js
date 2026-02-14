const express=require('express')
const postController=require('../controllers/post.controller')
const postRouter=express.Router();
const multer=require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
postRouter.post('/',upload.single('photo'),postController.createPostController)

module.exports=postRouter;