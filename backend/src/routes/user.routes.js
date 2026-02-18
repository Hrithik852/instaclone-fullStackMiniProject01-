const express = require('express');
const identifyUser = require('../middlewares/auth.middleware')
const userRouter = express.Router();
const userController = require('../controllers/user.controller')
userRouter.post('/follow/:username', identifyUser, userController.followController);
userRouter.post('/unfollow/:username', identifyUser, userController.unfollowController);
userRouter.post('/like/:postId', identifyUser, userController.likePostController);
userRouter.get('/follow/requests',identifyUser,userController.getRequestsController)
userRouter.patch('/follow/requests/:username/accept',identifyUser,userController.acceptFollowRequestController);
userRouter.delete('/follow/requests/:username/reject',identifyUser,userController.rejectFollowRequestController);

module.exports = userRouter;