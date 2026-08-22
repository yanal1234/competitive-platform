const db = require("../config/db");

const getAllContests = async (req, res) => {
  try {
    const [allContests] = await db.query("SELECT * FROM contests ;");
    res.status(200).json({
      message: "The operation was successful.",
      contests: allContests
    })
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getContestById = async (req, res) => {
  try {
    const contest_id = Number(req.params.contestId);
    const [Contest] = await db.query("SELECT * FROM contests WHERE contest_id = ? ;", [contest_id]);

    if (Contest.length > 0) {
      res.status(200).json({
        message: "The operation was successful.",
        contest: Contest[0]
      })
    }
    else {
      res.status(404).json({
        message: "not fund contest.",
        contest: null
      })

    }
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const createContest = async (req, res) => {

  const connection = await db.getConnection();
  try {

    const {
      title,
      start_time,
      end_time,
      problems
    } = req.body;

    if (!title || !start_time || !end_time || !problems) {
      return res.status(400).json({
        message: "All contest fields are required."
      });
    }
    if (!Array.isArray(problems) || problems.length === 0) {
      return res.status(400).json({
        message: "At least one problem is required."
      });
    }
    if (new Date(start_time) >= new Date(end_time)) {
      return res.status(400).json({
        message: "End time must be after start time."
      });
    }

    await connection.beginTransaction();
    const [result] = await connection.query(
      `INSERT INTO contests
      (title, start_time, end_time)
      VALUES (?, ?, ?)`,
      [title, start_time, end_time]
    );
    const contest_id = result.insertId;
    for (const problem of problems) {
      await connection.query(`INSERT INTO contestproblems
        (problem_order, problem_id, contest_id)
        VALUES (?, ?, ?)`, [problem.problem_order, problem.problem_id, contest_id]);
    }
    await connection.commit();

    res.status(201).json({
      message: "Contest created successfully.",
      contest_id: contest_id
    });
  }
  catch (error) {
    await connection.rollback();
    res.status(500).json({ message: error.message });
  }
  finally {
    connection.release();
  }
}

const joinContest = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const contest_id = Number(req.params.contestId);

    const [contest] = await db.query("SELECT status FROM contests WHERE contest_id = ?;", [contest_id]);

    if (contest.length === 0) {
      return res.status(404).json({
        message: "contest not found."
      })
    }
    if (contest[0].status !== "Upcoming") {
      return res.status(400).json({
        message: "Registration time has ended."
      })
    }

    const [already_user] = await db.query(`SELECT user_id, contest_id  FROM contestparticipants
    WHERE user_id = ? AND contest_id = ?;`, [user_id, contest_id]);

    if (already_user.length > 0) {
      return res.status(400).json({
        message: "You already joined this contest."
      })
    }

    await db.query(
      `INSERT INTO contestparticipants
      (user_id, contest_id, score)
      VALUES (?, ?, 0);`,
      [user_id, contest_id]
    );

    res.status(201).json({
      message: "User joined successfully.",
    });
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getContestLeaderboard = async (req, res) => {
  const contest_id = Number(req.params.contestId);
  try {
    const [contest] = await db.query(`SELECT title, start_time, end_time , status FROM contests
    WHERE contest_id = ?;`, [contest_id]);

    if (contest.length === 0) {
      return res.status(404).json({
        message: "error not found contest"
      })
    }
    const [all_problem] = await db.query(`SELECT COUNT(*) AS number_problems FROM contestproblems
    WHERE contest_id = ?;`, [contest_id]);

    const [all_user] = await db.query(`SELECT COUNT(*) AS number_users FROM contestparticipants
    WHERE contest_id = ?;`, [contest_id]);

    const [users_contest] = await db.query(`SELECT us.username, us.user_rank, cp.score,
    COUNT(DISTINCT CASE WHEN su.verdict = 'Accepted' THEN su.problem_id END) AS solved,
    MAX(CASE WHEN su.verdict = 'Accepted' THEN su.submitted_at END) AS last_Accepted, us.country,
    us.profile_picture, COUNT(DISTINCT su.submission_id) AS "Total Submissions"
    FROM contestparticipants cp JOIN users us on us.user_id = cp.user_id
    JOIN contestproblems cm on cm.contest_id = cp.contest_id
    LEFT JOIN submissions su on su.problem_id = cm.problem_id and  su.user_id = cp.user_id
    WHERE cp.contest_id = ? GROUP BY cp.user_id, cp.score, us.username, us.user_rank, us.country,
    us.profile_picture ORDER BY cp.score DESC, solved DESC, last_Accepted ASC;`, [contest_id]);

    res.status(200).json({
      message: "The operation was successful.",
      contest: contest,
      numberProblems: all_problem[0].number_problems,
      numberUsers: all_user[0].number_users,
      users_contest: users_contest
    });
  }
  catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

module.exports = { getAllContests, getContestById, createContest, joinContest, getContestLeaderboard };
