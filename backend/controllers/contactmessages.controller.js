const db = require("../config/db");

const getMessages = async (req, res) => {
  const user_id = req.user.user_id;
  const page = Number(req.query.page) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  try {
    const [messages] = await db.query(`SELECT c.message_id, c.subject, c.message, c.created_at,
    u.username, u.email, u.rating,
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
    u.bio, u.profile_picture, u.country, u.name
    FROM contact_messages c JOIN users u ON u.user_id = c.user_id WHERE u.user_id = ? LIMIT ? OFFSET ?;`,
      [user_id, limit, offset]);

    const [result] = await db.query(`SELECT COUNT(*) AS total FROM contact_messages;`);

    res.status(200).json({
      message: "operation is successfully.",
      messages: messages,
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
}

const addMessage = async (req, res) => {
  const user_id = req.user.user_id;
  try {
    const [result] = await db.query(`INSERT INTO contact_messages (user_id, subject, message)
    VALUES ( ?, 'Problem with submission',
    'I submitted my solution but I received an unexpected verdict.');` , [user_id]);

    if (result.affectedRows === 0) {
      return res.status(500).json({
        message: "Failed to send message"
      });
    }

    res.status(201).json({
      message: "Message sent successfully"
    });
  }
  catch (error) {
    res.status(500).json({
      message: "Internal server error.",
      error: error.message
    });
  }
}

module.exports = { getMessages, addMessage };

