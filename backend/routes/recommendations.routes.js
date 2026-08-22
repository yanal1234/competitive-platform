const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth.middleware");

const { generateAndSaveRecommendations } = require("../controllers/recommendations.controller");

router.post("/", verifyToken, generateAndSaveRecommendations);

module.exports = router;
