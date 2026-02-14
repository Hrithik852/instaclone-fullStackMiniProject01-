const express = require('express');
const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const registerController = async (req, res) => {
    const { username, email, password, bio, pfp } = req.body;
    const isuserExists = await userModel.findOne({
        $or: [{ email }, { username }]
    })
    if (isuserExists) {
        return res.status(409).json({
            message: (isuserExists.email === email) ? 'mail already in use' : 'username already in use'
        })
    }
    const hash = await bcrypt.hash(password,10)
    const user = await userModel.create({ username, email, password: hash, bio, pfp })

    const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1d'})
    res.cookie('token',token)

    res.status(201).json({
        message: 'user registred', user: {
            username: user.username, email: user.email, bio: user.bio, pfp: user.pfp, id: user._id
        }
    })
}

const loginController = async (req, res) => {
    const {username,email,password}=req.body;

    const user=await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })
    if(!user){
        return res.status(409).json({
            message:'user doesnt exists'
        })
    }
    const isPassMatch=await bcrypt.compare(password,user.password)
    if(!isPassMatch){
        return res.status(409).json({
            message:"invalid pass"
        })
    }
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1d'})

    res.cookie('token',token)
    res.status(201).json({
        message:'user successfully logged in',user:{
            username:user.username,
            bio:user.bio,
            pfp:user.pfp
        }
    })

}

module.exports = { registerController, loginController }