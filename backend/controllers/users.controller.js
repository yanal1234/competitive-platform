const db=require("../config/db");

const getAllUsers=async(req,res)=>{
    try{
        const [rows]= await db.query("SELECT * FROM users;");
        res.status(200).json(rows);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
};

module.exports={getAllUsers};