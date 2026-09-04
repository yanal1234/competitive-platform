const db = require("../config/db");

const getAllUsers = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM users ORDER BY rating DESC LIMIT 10;");
    res.status(200).json(rows);
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUserName = async (req, res) => {
  try {
    const user_name = req.params.user_name;

    const [User] = await db.query(`SELECT user_id, username, rating, user_rank, bio,
    profile_picture,created_at, last_login, country, role FROM users WHERE username = ? LIMIT 1;`,
      [user_name]);

    if (User.length === 0) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const [solveProblem] = await db.query(`SELECT COUNT(DISTINCT(problem_id)) AS numberProblems
    FROM submissions WHERE verdict = 'Accepted' AND user_id = ?;`, [User[0].user_id]);

    const [contestCount] = await db.query(`SELECT COUNT(DISTINCT(contest_id)) AS number_contests
    FROM contestparticipants WHERE user_id = ?;`, [User[0].user_id]);

    const [heatmap] = await db.query(`SELECT DATE(submitted_at) AS date, COUNT(*) AS accepted
    FROM submissions WHERE verdict = 'Accepted'  AND user_id = ? GROUP BY date;`, [User[0].user_id]);

    const [submissionCount] = await db.query(`SELECT COUNT(submission_id) AS numder_submissions
    FROM submissions  WHERE user_id = ?;`, [User[0].user_id]);

    const [acceptedSubmissionCount] = await db.query(`SELECT COUNT(submission_id) AS numder_submissions
    FROM submissions  WHERE user_id = ? AND verdict = "Accepted";`, [User[0].user_id]);

    const [topSkills] = await db.query(` SELECT u.mastery_score, t.tag_name FROM userskills u JOIN tags
    t ON u.tag_id = t.tag_id WHERE u.mastery_score > 50.00 AND u.user_id = ?;`, [User[0].user_id]);

    const [languageStatistics] = await db.query(`SELECT COUNT(submission_id) AS number_submissions, language
    FROM submissions WHERE user_id = ? GROUP BY language;`, [User[0].user_id]);

    const [completedContests] = await db.query(`SELECT c.title, c.end_time, cu.score, cu.contest_rank
    FROM contests c JOIN contestparticipants cu ON c.contest_id = cu.contest_id
    WHERE cu.user_id = ? AND NOW() >= c.end_time;`, [User[0].user_id]);

    const [ratingHistory] = await db.query(`SELECT * FROM user_rating_history
    WHERE user_id = ?;`, [User[0].user_id]);

    const [userSubmissions] = await db.query(`SELECT s.language, s.verdict, s.execution_time,
    s.memory_used, s.submitted_at, s.contest_id, p.title, p.difficulty FROM submissions s
    JOIN problems p ON s.problem_id = p.problem_id  WHERE s.user_id = ?;`, [User[0].user_id]);

    const [submissionStatistics] = await db.query(`SELECT verdict, COUNT(submission_id)
    AS number_submission FROM submissions WHERE user_id = ? GROUP BY verdict;`, [User[0].user_id]);

    const [contestHistory] = await db.query(`SELECT c.title, c.start_time, c.end_time, cp.score,
    cp.contest_rank, u.rating, u.rating_change FROM contests c JOIN contestparticipants cp
    ON c.contest_id = cp.contest_id JOIN user_rating_history u 
    ON u.user_id = cp.user_id AND u.contest_id = cp.contest_id WHERE cp.user_id = ?
    ORDER BY c.start_time ASC;`, [User[0].user_id]);

    const [contestRankStatistics] = await db.query(`SELECT CASE
    WHEN contest_rank >= 1 AND contest_rank <=3 THEN 'Won'
    WHEN contest_rank >=4 AND contest_rank<= 10 THEN 'Top 10'
    WHEN contest_rank >= 11 AND contest_rank<= 20 THEN 'Top 20'
    ELSE 'Other' END AS rank_group, COUNT(*) AS number_rank FROM contestparticipants
    WHERE user_id = ? GROUP BY rank_group;`, [User[0].user_id]);

    return res.status(200).json({
      user: User[0],

      statistics: {
        solvedProblems: solveProblem[0].numberProblems,
        contestCount: contestCount[0].number_contests,
        submissionCount: submissionCount[0].numder_submissions,
        acceptedSubmissionCount: acceptedSubmissionCount[0].numder_submissions
      },

      heatmap,
      topSkills,
      languageStatistics,
      completedContests,
      ratingHistory,
      userSubmissions,
      submissionStatistics,
      contestHistory,
      contestRankStatistics
    });
  }
  catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { user_name } = req.body;
    const [User] = await db.query(`SELECT username FROM users WHERE username = ?;`, [user_name]);
    if (User.length === 0) {
      return res.status(404).json({
        message: "User not found"
      })
    }
    const [result] = await db.query(`DELETE FROM users WHERE username = ?;`, [user_name]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "The user was not deleted"
      })
    }

    return res.status(200).json({
      message: "The operation was successful"
    });
  }
  catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = { getAllUsers, getUserName, deleteUser };
