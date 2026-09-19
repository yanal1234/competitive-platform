const express = require("express");
const router = express.Router();
const { verifyToken, verifyAdmin } = require("../middleware/auth.middleware");
const { getDashboard } = require("../controllers/dashboard.controller");

router.get("/", getDashboard);

module.exports = router;

