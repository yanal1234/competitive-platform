const db= require("../config/db");

const getProfileSummary=async(req,res)=>{
    try{
        const user_id= Number(req.params.user_id);
        const [[solved]]= await db.query("SELECT COUNT(DISTINCT problem_id) AS solved_count FROM Submissions WHERE user_id = ? AND verdict = 'Accepted';",[user_id]);
        const [[total]]= await db.query("SELECT DISTINCT COUNT(*) AS total_problems FROM problems;")
        res.status(200).json({
            solvedProblems:solved.solved_count,
            totalProblems:total.total_problems
        });
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
};

const getHeatMapAll=async(req,res)=>{
    try{
        const user_id= Number(req.params.user_id);
        const [rows]= await db.query("SELECT submitted_at AS day , COUNT(*) AS submissions_count FROM Submissions WHERE user_id = ? AND verdict = 'Accepted' GROUP BY submitted_at;",[user_id]);
        res.status(200).json(rows);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
};

const getHeatMapYear=async(req,res)=>{
    try{
        const user_id= Number(req.params.user_id);
        const year=Number(req.params.year);
        const [rows]= await db.query("SELECT submitted_at AS day , COUNT(*) AS submissions_count FROM Submissions WHERE user_id = ? AND verdict = 'Accepted' AND YEAR(submitted_at) = ? GROUP BY submitted_at;",[user_id,year]);
        res.status(200).json(rows);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
};

module.exports={getProfileSummary,getHeatMapAll,getHeatMapYear};