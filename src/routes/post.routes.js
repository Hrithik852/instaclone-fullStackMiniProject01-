const express=require('express');
const multer=require('multer')
const postController=require('../controllers/post.controller')
const postRouter=express.Router();
const upload=multer({storage:multer.memoryStorage()})
const identifyUser=require('../middlewares/auth.middleware')
postRouter.post('/',upload.single('photo'),postController.createPostController)
postRouter.get('/',identifyUser,postController.getPostController);
postRouter.get('/details/:id',identifyUser,postController.getPostDetailsController)
module.exports=postRouter;