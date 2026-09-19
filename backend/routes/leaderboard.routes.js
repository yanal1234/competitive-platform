const express = require("express");
const router = express.Router();
const { verifyToken, verifyAdmin } = require("../middleware/auth.middleware");
const { getLeaderboard } = require("../controllers/leaderboard.controller");

router.get("/", getLeaderboard);

module.exports = router;
