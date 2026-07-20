const jwt=require("jsonwebtoken");
require("dotenv/config");

const generateAccessToken=(user)=>{
    return jwt.sign(
        {
            user_id:user.user_id,
            role:user.role
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:"15m"
        }
    );
};

const generateRefreshToken=(user)=>{
    return jwt.sign(
        {
            user_id:user.user_id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:"7d"
        }
    );
};

const sendAccessToken= (req,res)=>{
    res.send()
};


module.exports = {generateAccessToken,generateRefreshToken};