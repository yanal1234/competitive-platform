const db = require("../config/db");
const { formatProblems } = require("../utils/formatProblems");

const getAllProblems = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM problems;");
    res.status(200).json(rows);
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllProblemsSorted = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM problems ORDER BY accepted_count * 100.0 / NULLIF(submission_count, 0) DESC;");
    if (rows.length === 0) {
      res.status(404).json({ message: "No problems" });
    }
    else {
      res.status(200).json(rows);
    }
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const add_problems = async (req, res) => {
  const {
    title,
    difficulty,
    points,
    statement,
    input_format,
    output_format,
    time_limit,
    memory_limit,
    example_input,
    example_output,
    explanation,
    tags = []
  } = req.body;

  const fileds =
    [
      "title",
      "difficulty",
      "statement",
      "input_format",
      "output_format",
      "example_input",
      "example_output"
    ];

  const values =
    [
      title,
      difficulty,
      statement,
      input_format,
      output_format,
      example_input,
      example_output
    ];

  if (
    !title ||
    !difficulty ||
    !statement ||
    !input_format ||
    !output_format ||
    !example_input ||
    !example_output
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (points !== undefined) {
    fileds.push("points");
    values.push(points);
  }
  if (time_limit !== undefined) {
    fileds.push("time_limit");
    values.push(time_limit);
  }
  if (memory_limit !== undefined) {
    fileds.push("memory_limit");
    values.push(memory_limit);
  }
  if (explanation !== undefined) {
    fileds.push("explanation");
    values.push(explanation);
  }

  const placeholders = fileds.map(() => "?").join(", ");

  try {
    const [result] = await db.query(`insert into problems (${fileds.join(", ")}) values (${placeholders})`,
      values);

    const problem_id = result.insertId;

    for (const tag_id of tags) {
      await db.query("insert into problemtags (problem_id, tag_id) values (?, ?);", [problem_id, tag_id]);
    }
    return (res.status(201).json({ message: "Problem created successfully" }));
  }

  catch (error) {
    return (res.status(500).json({
      message: "Database error",
      error: error.message
    }));
  }
}

const getAvailableProblems = async (req, res) => {
  try {
    const [problems] = await db.query(`
    SELECT p.problem_id, p.title, p.difficulty, pt.tag_id
    FROM problems p LEFT JOIN problemtags pt ON p.problem_id = pt.problem_id
    LEFT JOIN contestproblems c ON p.problem_id = c.problem_id WHERE c.problem_id is null ;
    `);

    const formattedProblems = formatProblems(problems);

    res.status(200).json({
      message: "Problems retrieved successfully.",
      problems: formattedProblems
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = { getAllProblems, getAllProblemsSorted, add_problems, getAvailableProblems };
