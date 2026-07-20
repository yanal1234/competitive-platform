const express = require("express");
const router = express.Router();

const {getRecommendations} = require("../controllers/recommendations.controller");

router.get("/:user_id", getRecommendations);

module.exports = router;