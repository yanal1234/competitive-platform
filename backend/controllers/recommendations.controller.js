const { generateRecommendations } = require("../services/recommendation.service");
const { generateAIRecommendationExplanation } = require("../services/ai.service")

const getRecommendations = async (req, res) => {
  try {
    const user_id = Number(req.params.user_id);
    const recommendations = await generateRecommendations(user_id);
    const resultAi = await generateAIRecommendationExplanation(recommendations);
    res.status(200).json(resultAi);
  }
  catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = { getRecommendations };
