const db = require("../config/db");

const getLeaderboard = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    const [leaderboard] = await db.query(`SELECT u.username, u.name, u.rating, u.country, u.profile_picture,
    CASE
        WHEN u.rating < 800 THEN 'Novice'
        WHEN u.rating < 1200 THEN 'Solver'
        WHEN u.rating < 1500 THEN 'Algorithmist'
        WHEN u.rating < 1800 THEN 'Specialist'
        WHEN u.rating < 2100 THEN 'Expert'
        WHEN u.rating < 2400 THEN 'Master'
        WHEN u.rating < 2700 THEN 'Elite Master'
        WHEN u.rating < 3000 THEN 'Champion'
        ELSE 'Legend'
    END AS user_rank,
    COUNT(DISTINCT CASE WHEN s.verdict = 'Accepted' THEN s.problem_id END) AS solved
    FROM users u LEFT JOIN submissions s ON u.user_id = s.user_id
    GROUP BY u.user_id, u.username, u.name, u.rating, u.country, u.profile_picture
    ORDER BY u.rating DESC
    LIMIT ? offset ?;`, [limit, offset]);

    const [result] = await db.query(
      `SELECT COUNT(*) AS total
       FROM users;`
    );

    res.status(200).json({
      message: "operation is successfully.",
      leaderboard: leaderboard,
      pagination: {
        currentPage: page,
        limit: limit,
        total: result[0].total,
        totalPages: Math.ceil(result[0].total / limit)
      }
    });
  }
  catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = { getLeaderboard };
