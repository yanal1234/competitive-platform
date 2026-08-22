const express = require("express");
const router = express.Router();
const { verifyToken, verifyAdmin } = require("../middleware/auth.middleware");
const { getAllContests, getContestById, createContest, joinContest, getContestLeaderboard } = require("../controllers/contests.controller");

router.get("/", getAllContests);
router.get("/:contestId", getContestById);
router.post("/", verifyToken, verifyAdmin, createContest);
router.post("/:contestId/join", verifyToken, joinContest);
router.get("/:contestId/leaderboard", getContestLeaderboard);
/*
  * router.patch("/:contestId", verifyToken, verifyAdmin, updateContest);
router.delete("/:contestId", verifyToken, verifyAdmin, deleteContest);
router.delete("/:contestId/leave", verifyToken, leaveContest);
*/
module.exports = router;
