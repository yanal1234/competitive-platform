const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const { generateAccessToken, generateRefreshToken } = require("../utils/jwt")
const { sendRefreshToken } = require("../utils/sendTokens");
const { formatProblems } = require("../utils/formatProblems")
const { NodeUploader } = require("@google/genai/vertex_internal");

const Register = async (req, res) => {
  const { username, email, password, country } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Username, email and password are required" });
    }
    const [users] = await db.query("SELECT * FROM users WHERE email= ? OR username= ? ;", [email, username]);
    if (users.length > 0) {
      return res.status(409).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query("INSERT INTO users(username, email, password, country, role) VALUES(?,?,?,?,?);", [username, email, hashedPassword, country, "user"]);
    const [user] = await db.query("SELECT * FROM users WHERE email= ? OR username= ? ;", [email, username]);
    res.status(201).json({
      message: "User registered successfully",
      user: {
        user_id: user[0].user_id,
        username: user[0].username,
        email: user[0].email,
        rating: user[0].rating,
        user_rank: user[0].user_rank,
        country: user[0].country,
        profile_picture: user[0].profile_picture,
        role: user[0].role,
        bio: user[0].bio
      }
    });
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if ((!username && !email) || !password) {
      return res.status(400).json({ message: "Username or email and password are required" });
    }
    const [users] = await db.query("SELECT * FROM users WHERE email=? OR username=?", [email, username]);
    if (users.length > 0) {
      const isMatch = await bcrypt.compare(password, users[0].password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or username or password" });
      }

      const accessToken = generateAccessToken(users[0]);
      const refreshToken = generateRefreshToken(users[0]);
      sendRefreshToken(res, refreshToken);

      res.status(200).json({
        message: "Login successful",
        accessToken,
        user: {
          user_id: users[0].user_id,
          username: users[0].username,
          email: users[0].email,
          rating: users[0].rating,
          user_rank: users[0].user_rank,
          country: users[0].country,
          profile_picture: users[0].profile_picture,
          role: users[0].role,
          bio: users[0].bio
        }
      });
    }
    else {
      return res.status(401).json({ message: "Invalid email or username or password" });
    }
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const logout = (req, res) => {
  res.clearCookie("refreshtoken", {
    httpOnly: true,
    path: "/refresh"
  });
  res.status(200).json({ message: "Logged out successfully" })
};

const refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refreshtoken;
    if (!token) {
      return res.status(401).json({
        message: "Refresh token is required"
      });
    }

    const decode = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const [users] = await db.query("SELECT * FROM users WHERE user_id=?", [decode.user_id]);
    if (users.length === 0) {
      return res.status(401).json({
        message: "User not found"
      });
    }
    const accessToken = generateAccessToken(users[0]);
    res.json({
      accessToken
    });
  }
  catch (err) {
    res.status(401).json({
      message: "Invalid refresh token"
    });
  }
};

const getMyProfile = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const [user] = await db.query(`SELECT user_id, username, email, rating, user_rank, bio, 
      profile_picture, last_login, country FROM users WHERE user_id = ?`, [userId]);

    const [allProblem] = await db.query("SELECT COUNT(*) AS numberProblems FROM problems;");

    const [solveProblem] = await db.query(`SELECT COUNT(DISTINCT(problem_id)) AS numberProblems
    FROM submissions WHERE verdict = 'Accepted' AND user_id = ?;`, [userId]);

    const [allSubmissions] = await db.query(`SELECT DATE(submitted_at) AS date, COUNT(*) AS accepted
    FROM submissions WHERE verdict = 'Accepted'  AND user_id = ? GROUP BY date;`, [userId]);

    const [Recommendation] = await db.query(`SELECT recommendation, problemsId, created_at
    FROM user_recommendations WHERE user_id = ?;`, [userId]);

    let problemsSort = [];

    if (Recommendation.length > 0 && Recommendation[0].problemsId) {
      const problemId = (Recommendation[0].problemsId).split(", ").map(Number);
      console.log("problemId:", problemId);
      if (problemId.length > 0) {
        const [problemsNonsort] = await db.query(`SELECT p.problem_id, p.title, p.difficulty, t.tag_id FROM problems p
        JOIN problemtags t ON p.problem_id = t.problem_id WHERE t.problem_id IN(?);`, [problemId])

        problemsSort = formatProblems(problemsNonsort);
      }
    }
    res.status(200).json({
      user: user[0],
      statistics: {
        totalProblems: allProblem[0].numberProblems,
        solvedProblems: solveProblem[0].numberProblems
      },
      submissions: allSubmissions,
      recommendation: Recommendation[0]
        ?
        {
          recommendation: Recommendation[0].recommendation,
          created_at: Recommendation[0].created_at
        }
        :
        {
          recommendation: "Welcome! 🎉 Start solving problems and we'll analyze your performance to give you personalized recommendations.",
          created_at: new Date()
        },
      recommendedProblems: problemsSort
    })
  }

  catch (error) {
    res.status(401).json({
      message: "User not found",
      error: error.message
    });
  };
};

const updateProfile = async (req, res) => {
  try {

    const user_id = req.user.user_id;
    const {
      username,
      email,
      bio,
      profile_picture,
      country
    } = req.body;

    const fields = [];
    const values = [];

    if (username !== undefined) {
      fields.push("username = ?");
      values.push(username);
    }

    if (email !== undefined) {
      fields.push("email = ?");
      values.push(email);
    }

    if (bio !== undefined) {
      fields.push("bio = ?");
      values.push(bio);
    }

    if (profile_picture !== undefined) {
      fields.push("profile_picture = ?");
      values.push(profile_picture);
    }

    if (country !== undefined) {
      fields.push("country = ?");
      values.push(country);
    }

    if (fields.length === 0) {
      return res.status(400).json({
        message: "No fields to update."
      });
    }

    values.push(user_id);
    await db.query(`UPDATE users SET ${fields.join(", ")} WHERE user_id = ?;`, values);

    res.status(200).json({
      message: "Profile updated successfully."
    });
  }
  catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = { Register, login, logout, refreshToken, getMyProfile, updateProfile };
