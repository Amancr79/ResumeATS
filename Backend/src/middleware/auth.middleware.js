const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require('../schema/blacklist/blacklist.token')

async function authUser(req,res,next){
    const token = req.cookies.token;

    if(!token){
        res.status(401).json({message:"Unauthorized, token not found"});
    }

    const blacklistedToken = await tokenBlacklistModel.findOne({ token});
    if(blacklistedToken){
        return res.status(401).json({message:"Unauthorized, token is expired"});
    }
     try{
         const decoded = jwt.verify(token, process.env.JWT_SECRET);
         req.user=decoded;
         next();

     }catch(err){
        res.status(401).json({message:"Unauthorized, invalid token"});
     }
}

module.exports = authUser;