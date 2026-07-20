const db=require("../config/db");
const{generateRoadmap}=require("../services/roadmap.service");

const getRoadmaps=async(req,res)=>{
    try{
        const [rows]= await db.query("SELECT rt.stage_id,rs.title,rt.tag_id,ta.tag_name FROM roadmap_tags rt JOIN roadmap_stages rs ON rt.stage_id=rs.stage_id JOIN tags ta ON ta.tag_id=rt.tag_id ORDER BY rt.stage_id,rt.topic_order;");
        const Roadmap= generateRoadmap(rows);
        res.status(200).json(Roadmap);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}

module.exports={getRoadmaps}