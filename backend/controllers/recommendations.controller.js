const db = require("../config/db");
const { generateRecommendations } = require("../services/recommendation.service");
const { generateAIRecommendationExplanation } = require("../services/ai.service")

const generateAndSaveRecommendations = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    await db.query("DELETE FROM user_recommendations WHERE user_id = ?", [user_id]);
    const recommendations = await generateRecommendations(user_id);
    const resultAi = await generateAIRecommendationExplanation(recommendations);
    await db.query(`INSERT INTO user_recommendations(user_id, recommendation, problemsId)
    VALUES(?, ?, ?);`, [user_id, resultAi, recommendations.problemsId]);

    res.status(200).json({
      message: "Recommendations generated and saved successfully"
    });
  }
  catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = { generateAndSaveRecommendations };
