const db = require("../config/db");
const { generateRoadmap } = require("../services/roadmap.service");

const getRoadmaps = async (req, res) => {
  const user_id = req.user.user_id;
  try {

    const [user_roadmap] = await db.query(`SELECT rt.stage_id, rs.title AS stage_title,
    rt.tag_id, ta.tag_name,
    urp.completed FROM roadmap_tags rt
    JOIN roadmap_stages rs ON rt.stage_id = rs.stage_id
    JOIN tags ta ON rt.tag_id = ta.tag_id
    LEFT JOIN user_roadmap_progress urp ON urp.stage_id = rt.stage_id AND urp.tag_id = rt.tag_id
    AND urp.user_id = ?  ORDER BY rt.stage_id, rt.topic_order;`, [user_id]);

    const Roadmap = generateRoadmap(user_roadmap);

    res.status(200).json({
      message: "operation is successfully.",
      Roadmap: Roadmap
    });
  }
  catch (error) {
    res.status(500).json({
      message: "Internal server error.",
      error: error.message
    });
  }
}

module.exports = { getRoadmaps }
