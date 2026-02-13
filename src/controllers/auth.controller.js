const userModel = require("../models/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
    const { username, email, password, bio, pfp } = req.body;
    const isUserExists = await userModel.findOne({
        $or: [{ email }, { username }],
    });
    if (isUserExists) {
        return res.status(409).json({
            message:
                (isUserExists.email === email) ? "email already in use" : "username taken",
        });
    }

    const hash = crypto.createHash("md5").update(password).digest("hex");
    const user = await userModel.create({
        username,
        email,
        password: hash,
        bio,
        pfp,
    });
    const token = jwt.sign({ username, id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
    res.cookie("token", token);
    res.status(201).json({
        message: "user registered succesfully",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            pfp: user.pfp,
        },
    });
}

const loginController = async (req, res) => {
    const { username, email, password } = req.body;


    const user = await userModel.findOne({
        $or: [
            {
                username: username
            },
            {
                email: email
            }
        ]
    })

    if (!user) {
        return res.status(409).json({
            message: 'user not found'
        })
    }
    const isPassValid = user.password === crypto.createHash('md5').update(password).digest('hex')
    if (!isPassValid) {
        return res.status(409).json({
            message: 'invalid pass'
        })
    }

    const token = jwt.sign({ id: user._id, username }, process.env.JWT_SECRET, { expiresIn: "1d" })

    res.cookie("token", token);

    res.status(201).json({
        message: "user logged in succesfully",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            pfp: user.pfp,
        }
    })
}

module.exports = {
    registerController,
    loginController,
}