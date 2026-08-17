const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "../.env")
});
const db = require("../config/db");

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    apiVersion: "v1"
  }
});

const generateAIRecommendationExplanation = async (recommendation) => {
  const weakSkillIds = recommendation.weakSkills;
  const recommendations = recommendation.recommendations;
  const [nameTags] = await db.query(
    `SELECT tag_id, tag_name
     FROM tags
     WHERE tag_id IN (?)`,
    [weakSkillIds]
  );
  const weakSkills = nameTags.map(nt => nt.tag_name);

  if (weakSkills.length === 0 && recommendations.length === 0) {
    return "Keep solving problems to build your profile. Once we have enough data, we'll identify your weak skills and provide personalized recommendations.";
  }

  const prompt = `
You are a competitive programming learning assistant.

USER'S WEAK SKILLS:
${weakSkills.join(", ")}

RECOMMENDED PROBLEMS:
${recommendations
      .map((problem, index) =>
        `${index + 1}. ${problem.title} (${problem.difficulty})`
      )
      .join("\n")}

TASK:
Provide a short personalized recommendation based only on the information above.

RESPONSE REQUIREMENTS:
- Write exactly 3 short sentences.
- Sentence 1: Mention the user's main weak skills.
- Sentence 2: Mention the recommended problems in EXACTLY the same order provided above.
- Sentence 3: Briefly explain why this order is useful.
- Do not reorder the problems.
- Do not add headings, bullet points, or extra information.
- Do not create or suggest additional problems.
- Do not guess or infer information that was not provided.
`;

  const interaction = await ai.interactions.create({
    model: "gemini-3.6-flash",
    input: prompt
  });
  console.log(interaction.output_text);
  return (interaction.output_text);
}

module.exports = { generateAIRecommendationExplanation };
