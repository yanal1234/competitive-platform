const db=require("../config/db");

const getAllProblems=async(req,res)=>{
    try{
        const [rows]= await db.query("SELECT * FROM problems;");
        res.status(200).json(rows);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
};

const getAllProblemsSorted=async(req,res)=>{
    try{
        const [rows]= await db.query("SELECT * FROM problems ORDER BY accepted_count * 100.0 / NULLIF(submission_count, 0) DESC;");
        if(rows.length===0){
            res.status(404).json({message:"No problems"});
        }
        else{
            res.status(200).json(rows);
        }
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
};

module.exports={getAllProblems,getAllProblemsSorted};