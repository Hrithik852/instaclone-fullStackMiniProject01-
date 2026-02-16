const jwt=require('jsonwebtoken')

const identifyUser=(req,res,next)=>{
    const token=req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:'there is no token'
        })
    }
    let decoded=null;
    try{
        decoded=jwt.verify(token,process.env.JWT_SECRET)
    }
    catch(err){
        return res.status(401).json({
            message:'not authorized'
        })
    }

    req.user=decoded;
    next()
}
module.exports=identifyUser;