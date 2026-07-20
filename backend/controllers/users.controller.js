const db=require("../config/db");

const getAllUsers=async(req,res)=>{
    try{
        const [rows]= await db.query("SELECT * FROM users ORDER BY rating DESC LIMIT 10;");
        res.status(200).json(rows);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
};

const getUserId=async(req,res)=>{
    try{
        const user_id= Number(req.params.user_id);
        const [rows]= await db.query("SELECT * FROM users WHERE user_id= ? LIMIT 1;",[user_id])
        if(rows.length===0){
            res.status(404).json({message:"User not found"});
        }
        else{
        res.status(200).json(rows[0]);
        }
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
};

module.exports={getAllUsers,getUserId};