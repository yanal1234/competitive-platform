const db = require("../config/db");
const runCode = require("../../judge/runner.js")

const getAllSubmissions = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM submissions;");
    res.status(200).json(rows);
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSubmissionsUser = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const [rows] = await db.query("SELECT * FROM submissions WHERE user_id= ? LIMIT 10;", [user_id])
    if (rows.length === 0) {
      res.status(404).json({ message: "No submissions" });
    }
    else {
      res.status(200).json(rows[0]);
    }
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const add_submissions = async (req, res) => {
  const
    {
      user_id,
      problem_id,
      language,
      code
    }
      = req.body;

  try {
    const [information] = await db.query("SELECT example_input, example_output, time_limit, memory_limit FROM problems WHERE problem_id = ?;", [problem_id]);
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

    await db.query("insert into submissions (language, verdict, execution_time, memory_used, user_id, problem_id) values(?, ?, ?, ?, ?, ?);"
      , [language, result.verdict, result.executionTime, result.memoryUsed, user_id, problem_id]);

    await db.query(
      `UPDATE problems
   SET submission_count = submission_count + 1
   WHERE problem_id = ?`,
      [problem_id]
    );

    if (result.verdict === "Accepted") {
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
  catch (error) {
    return (res.status(500).json({
      message: "Database error",
      error: error.message
    }));
  }
}

module.exports = { getAllSubmissions, getSubmissionsUser, add_submissions };
