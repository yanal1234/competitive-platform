const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const db= require("../config/db");
const {generateAccessToken,generateRefreshToken}= require("../utils/jwt")
const {sendRefreshToken} = require("../utils/sendTokens");

const Register=async(req,res)=>{
const {username,email,password,country }= req.body;
try{
    if(!username|| !email || !password ){
        return res.status(400).json({message: "Username, email and password are required"});
    }
    const[users]= await db.query("SELECT * FROM users WHERE email= ? OR username= ? ;",[email,username]);
    if(users.length>0){
        return res.status(409).json({message: "User already exists"});
    }
    const hashedPassword= await bcrypt.hash(password ,10);
    await db.query("INSERT INTO users(username, email, password, country, role) VALUES(?,?,?,?,?);",[username, email, hashedPassword, country, "user"]);
    const[user]= await db.query("SELECT * FROM users WHERE email= ? OR username= ? ;",[email,username]);
    res.status(201).json({ message:"User registered successfully" ,
        user:{
            user_id:user[0].user_id,
            username: user[0].username,
            email: user[0].email,
            rating: user[0].rating,
            user_rank: user[0].user_rank,
            country: user[0].country,
            profile_picture: user[0].profile_picture,
            role: user[0].role,
            bio:user[0].bio
        }
    });
}
catch(err){
    res.status(500).json({ message: err.message });
}
};

const login=async(req,res)=>{
    const {username,email,password}= req.body;
    try{
    if((!username && !email) || !password ){
        return res.status(400).json({ message: "Username or email and password are required"});
    }
    const[users]= await db.query("SELECT * FROM users WHERE email=? OR username=?",[email,username]);
    if(users.length>0){
        const isMatch =await bcrypt.compare(password,users[0].password);
        if(!isMatch){
            return res.status(401).json({message: "Invalid email or username or password"});
        }

        const accessToken=generateAccessToken(users[0]);
        const refreshToken=generateRefreshToken(users[0]);
        sendRefreshToken(res,refreshToken);

        res.status(200).json({ message: "Login successful",
        accessToken,
        user:{
            user_id:users[0].user_id,
            username: users[0].username,
            email: users[0].email,
            rating: users[0].rating,
            user_rank: users[0].user_rank,
            country: users[0].country,
            profile_picture: users[0].profile_picture,
            role: users[0].role,
            bio:users[0].bio
        }
    });
    }
    else{
        return res.status(401).json({message: "Invalid email or username or password"});
    }
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
};

const logout=(req,res)=>{
    res.clearCookie("refreshtoken",{
        httpOnly: true,
        path: "/refresh"
    });
    res.status(200).json({message: "Logged out successfully"})
};

const refreshToken= async (req,res)=>{
    try{
    const token= req.cookie.refreshtoken;
    if (!token) {
    return res.status(401).json({
        message: "Refresh token is required"
    });
    }

    const decode=jwt.verify(token,process.env.REFRESH_TOKEN_SECRET);
    const[users]= await db.query("SELECT * FROM users WHERE user_id=?",[decode.user_id]);
    if(users.length===0){
            return res.status(401).json({
                message: "User not found"
            });
    }
    const accessToken = generateAccessToken(users[0]);
        res.json({
            accessToken
        });
}
    catch (err) {
        res.status(401).json({
            message: "Invalid refresh token"
        });
    }
};

module.exports={Register,login,logout,refreshToken};