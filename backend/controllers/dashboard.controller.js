const db = require("../config/db");

const getDashboard = async (req, res) => {
  const user_id = 1;
  try {
    const [user] = await db.query(
      `SELECT user_id FROM users WHERE user_id = ?`,
      [user_id]
    );

    if (user.length === 0) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const [Problems_id] = await db.query(`SELECT problemsId
    FROM user_recommendations WHERE user_id = ?;`, [user_id]);

    const problems = Problems_id[0]?.problemsId ? Problems_id[0].problemsId.split(",").map(Number)
      : [];
    const priorityProblems = [... new Set(problems)].length;

    const [skills] = await db.query(`SELECT COUNT(*) AS number_skills FROM userskills
    WHERE user_id = ?;`, [user_id]);

    const skillsMeasured = Number(skills[0].number_skills);

    const [roadmap] = await db.query(`
    SELECT COUNT(*) AS remainingStages
    FROM (
        SELECT rt.stage_id
        FROM roadmap_tags rt
        LEFT JOIN user_roadmap_progress urp
            ON urp.stage_id = rt.stage_id
            AND urp.tag_id = rt.tag_id
            AND urp.user_id = ?
        GROUP BY rt.stage_id
        HAVING SUM(
            CASE WHEN urp.completed = 1 THEN 1 ELSE 0 END
        ) < COUNT(*)
    ) AS incomplete_stages`, [user_id]);

    const remainingStages = Number(roadmap[0].remainingStages);

    const [users_active] = await db.query(`SELECT COUNT(*) AS activeCoders FROM users
    WHERE last_login >= NOW() - INTERVAL 30 DAY`);

    const activeCoders = Number(users_active[0].activeCoders);

    res.status(200).json({
      priorityProblems,
      skillsMeasured,
      remainingStages,
      activeCoders
    })
  }
  catch (error) {
    res.status(500).json({
      message: "Internal server error.",
      error: error.message
    });
  }
}

module.exports = { getDashboard };
