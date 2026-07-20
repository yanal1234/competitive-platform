const{generateRecommendations}=require("../services/recommendation.service");

const getRecommendations = async(req,res)=>{
    try{
        const user_id=Number(req.params.user_id);
        const recommendations =await generateRecommendations(user_id);
        res.status(200).json(recommendations);
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}

module.exports = {getRecommendations};