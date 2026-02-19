const express = require('express');
const identifyUser=require('../middlewares/auth.middleware')
const authRouter = express.Router()
const authControllers = require('../controllers/auth.controller')
authRouter.post('/register', authControllers.registerController)
authRouter.post('/login', authControllers.loginController)
authRouter.get('/get-me',identifyUser,authControllers.getMeController);
module.exports = authRouter;