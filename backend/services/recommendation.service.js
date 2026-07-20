const db=require("../config/db");

const generateRecommendations= async(user_id)=>{
    const [skills]= await db.query("SELECT mastery_score,tag_id FROM UserSkills WHERE user_id= ?;",[user_id]);
    const weakSkills =skills.filter(sk=> sk.mastery_score<=50.00).map(sk=>sk.tag_id);
    if(weakSkills.length===0){
        return{message:"no recommendations",recommendations: []};
    }
    const [relatedTags]= await db.query("SELECT related_tag_id FROM tag_relations WHERE tag_id IN (?)",[weakSkills]);
    const relatedSkills = [... new Set(relatedTags.map(r=>{ return r.related_tag_id}))];
    const allTags =[...new Set([...weakSkills,...relatedSkills])];
    if(allTags.length===0){
        return{message:"no recommendations",recommendations: []};
    }
    const [problems]= await db.query(" SELECT DISTINCT  p.problem_id,p.title,p.difficulty,t.tag_id,COALESCE(accepted_count/NULLIF(submission_count,0),1) as acceptance_rate FROM problems p JOIN problemtags t ON p.problem_id=t.problem_id WHERE t.tag_id IN(?) AND p.problem_id NOT IN(SELECT problem_id FROM submissions WHERE user_id= ? AND verdict='Accepted');",[allTags,user_id]);
    const seen= new Set();
    const ranked =  problems.filter(p=>{if(seen.has(p.problem_id))return false;
    seen.add(p.problem_id);
    return true;
}).map(p=>{
        const isWeak = weakSkills.includes(p.tag_id);
        const isRelated = relatedSkills.includes(p.tag_id);

        let score=0;
        if(isWeak){
            score+=100;
        }
        else if(isRelated){
            score+=60;
        }
        const acceptance_rate=p.acceptance_rate;
        score += (1 - acceptance_rate) * 50;

        if (p.difficulty === "Easy") score += 5;
        if (p.difficulty === "Medium") score += 10;
        if (p.difficulty === "Hard") score += 15;

        return{...p,score};
    });
    ranked.sort((a,b)=>{ return b.score - a.score});

    console.log("Weak Skills:", weakSkills);
    console.log("Related Skills:", relatedSkills);
    console.log("All Tags:", allTags);
    console.log("Problems Found:", problems.length);

    return{weakSkills,recommendations:ranked.slice(0,6)}
}

module.exports={generateRecommendations};