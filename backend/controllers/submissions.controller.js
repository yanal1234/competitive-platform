const db = require("../config/db");
const runCode = require("../../judge/runner.js")
const { updateUserSkills } = require("../utils/userSkills.utils.js");

const getAllSubmissions = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  try {
    const [submissions] = await db.query(`SELECT *
       FROM submissions
       ORDER BY submitted_at DESC
       LIMIT ? OFFSET ?;`, [limit, offset]);

    const [result] = await db.query(
      `SELECT COUNT(*) AS total
       FROM submissions;`
    );

    res.status(200).json({
      message: "operation is successfully.",
      submissions: submissions,
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
      message: "Internal server error.",
      error: error.message
    });
  }
};

const getSubmissionsUser = async (req, res) => {
  const user_id = req.user.user_id;
  const page = Number(req.query.page) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  try {
    const [user_submission] = await db.query(`SELECT *
    FROM submissions
    WHERE user_id = ?
    ORDER BY submitted_at DESC
    LIMIT ? OFFSET ?`, [user_id, limit, offset]);

    const [result] = await db.query(
      `SELECT COUNT(*) AS total
       FROM submissions WHERE user_id = ?;`, [user_id]);

    res.status(200).json({
      message: "operation is successfully.",
      submissions: user_submission,
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
      message: "Internal server error.",
      error: error.message
    });
  }
};

const add_submissions = async (req, res) => {
  const user_id = req.user.user_id;
  const
    {
      problem_id,
      language,
      code,
      contest_id
    }
      = req.body;

  try {
    if (contest_id === undefined) {
      const [information] = await db.query(`SELECT example_input, example_output, time_limit,
      memory_limit FROM problems WHERE problem_id = ?;`, [problem_id]);

      if (information.length === 0) {
        return res.status(404).json({
          message: "Problem not found"
        });
      }

      let result = await runCode(code, information[0].example_input, information[0].example_output, information[0].time_limit, information[0].memory_limit, language);

      if (result.verdict === "Accepted") {
        const [testcases] = await db.query("SELECT input_data, expected_output FROM testcases WHERE problem_id = ?;", [problem_id]);
        for (const testcase of testcases) {

          result = await runCode(
            code,
            testcase.input_data,
            testcase.expected_output,
            information[0].time_limit,
            information[0].memory_limit,
            language
          );

          console.log(result);

          if (result.verdict !== "Accepted") {
            break;
          }
        }
      }

      const [alreadySolved] = await db.query(
        `SELECT COUNT(*) AS number_Accepted
     FROM submissions
     WHERE user_id = ?
       AND problem_id = ?
       AND verdict = 'Accepted'`,
        [user_id, problem_id]
      );

      await db.query("insert into submissions (language, verdict, execution_time, memory_used, user_id, problem_id) values(?, ?, ?, ?, ?, ?);"
        , [language, result.verdict, result.executionTime, result.memoryUsed, user_id, problem_id]);

      await db.query(
        `UPDATE problems
   SET submission_count = submission_count + 1
   WHERE problem_id = ?`,
        [problem_id]
      );

      if (result.verdict === "Accepted") {
        if (alreadySolved[0].number_Accepted === 0) {
          await updateUserSkills(
            user_id,
            problem_id,
            information[0].difficulty
          );
        }

        await db.query(
          `UPDATE problems
     SET accepted_count = accepted_count + 1
     WHERE problem_id = ?`,
          [problem_id]
        );
      }

      return res.status(201).json({
        message: "submission successfully",
        verdict: result.verdict,
        output: result.output,
        errorOutput: result.errorOutput,
        executionTime: result.executionTime,
        memoryUsed: result.memoryUsed
      });
    }
    else {
      const [information] = await db.query(`SELECT p.example_input, p.example_output, p.time_limit,
      p.memory_limit, p.points, p.difficulty FROM problems p JOIN contestproblems c
      ON c.problem_id = p.problem_id JOIN contests co ON co.contest_id = c.contest_id
      WHERE p.problem_id = ? AND c.contest_id = ?  AND NOW() >= co.start_time AND 
      NOW() <= co.end_time;`, [problem_id, contest_id]);

      if (information.length === 0) {
        return res.status(404).json({
          message: "Problem not found in contest."
        });
      }


      let result = await runCode(code, information[0].example_input, information[0].example_output,
        information[0].time_limit, information[0].memory_limit, language);

      if (result.verdict === "Accepted") {
        const [testcases] = await db.query(`SELECT input_data, expected_output FROM testcases
        WHERE problem_id = ?;`, [problem_id]);

        for (const testcase of testcases) {

          result = await runCode(
            code,
            testcase.input_data,
            testcase.expected_output,
            information[0].time_limit,
            information[0].memory_limit,
            language
          );

          console.log(result);

          if (result.verdict !== "Accepted") {
            break;
          }
        }
      }

      const [Accepted_submission] = await db.query(`SELECT COUNT(*) AS number_Accepted
      FROM submissions s
      JOIN contestproblems c
      ON s.problem_id = c.problem_id
      WHERE s.verdict = 'Accepted'
      AND s.user_id = ?
      AND s.problem_id = ?
      AND c.contest_id = ?;`, [user_id, problem_id, contest_id]);

      await db.query("insert into submissions (language, verdict, execution_time, memory_used, user_id, problem_id) values(?, ?, ?, ?, ?, ?);"
        , [language, result.verdict, result.executionTime, result.memoryUsed, user_id, problem_id]);

      await db.query(
        `UPDATE problems
   SET submission_count = submission_count + 1
   WHERE problem_id = ?`,
        [problem_id]
      );

      if (result.verdict === "Accepted") {
        if (Accepted_submission[0].number_Accepted === 0) {
          await db.query(`UPDATE contestparticipants SET score = score + ${information[0].points}
          WHERE user_id = ? AND contest_id = ?;`, [user_id, contest_id]);

          await updateUserSkills(user_id, problem_id, information[0].difficulty);
        }
        await db.query(
          `UPDATE problems
     SET accepted_count = accepted_count + 1
     WHERE problem_id = ?`,
          [problem_id]
        );

      }

      return res.status(201).json({
        message: "submission successfully",
        verdict: result.verdict,
        output: result.output,
        errorOutput: result.errorOutput,
        executionTime: result.executionTime,
        memoryUsed: result.memoryUsed
      });

    }
  }
  catch (error) {
    return (res.status(500).json({
      message: "Internal server error.",
      error: error.message

    }));
  }
}

const getSubmissionById = async (req, res) => {
  const user_id = req.user.user_id;
  const submissionId = req.params.submissionId;

  try {
    const [submission] = await db.query(`SELECT * FROM submissions 
    WHERE submission_id = ? AND user_id = ? LIMIT 1;`, [submissionId, user_id]);
    if (submission.length === 0) {
      return res.status(404).json({
        message: "the submission not found."
      })
    }

    res.status(200).json({
      message: " operation is successfully.",
      submission: submission[0]
    });
  }
  catch (error) {
    res.status(500).json({
      message: "Internal server error.",
      error: error.message
    });
  }
}

module.exports = { getAllSubmissions, getSubmissionsUser, add_submissions, getSubmissionById };
