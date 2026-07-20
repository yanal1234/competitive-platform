const db=require("../config/db");

const getAllSubmissions=async(req,res)=>{
    try{
        const [rows]= await db.query("SELECT * FROM submissions;");
        res.status(200).json(rows);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
};

const getSubmissionsUser=async(req,res)=>{
    try{
        const user_id= Number(req.params.user_id);
        const [rows]= await db.query("SELECT * FROM submissions WHERE user_id= ? LIMIT 10;",[user_id])
        if(rows.length===0){
            res.status(404).json({message:"No submissions"});
        }
        else{
            res.status(200).json(rows[0]);
        }
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
};

module.exports={getAllSubmissions,getSubmissionsUser};