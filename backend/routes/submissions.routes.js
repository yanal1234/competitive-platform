const express = require("express");
const router = express.Router();
const { getAllSubmissions, getSubmissionsUser, add_submissions } = require("../controllers/submissions.controller");

router.get("/", getAllSubmissions);
router.get("/:user_id", getSubmissionsUser);
router.post("/", add_submissions);

module.exports = router;
