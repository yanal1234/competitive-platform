const jwt =require("jsonwebtoken");
require("dotenv/config");

const verifyToken = (req, res, next) =>{
    try{
    const authHeader=req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({message: "Access token is required"});
    }
    const token=authHeader.split(" ")[1];
    const decode=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    req.user=decode;
    next();
    }
    catch (err) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

module.exports = {verifyToken};