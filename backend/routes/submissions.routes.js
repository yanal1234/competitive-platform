const express = require("express");
const router = express.Router();
const { verifyToken, verifyAdmin } = require("../middleware/auth.middleware");
const { getAllSubmissions, getSubmissionsUser, add_submissions } = require("../controllers/submissions.controller");

router.get("/all", verifyToken, verifyAdmin, getAllSubmissions);
router.get("/my", verifyToken, getSubmissionsUser);
router.post("/", verifyToken, add_submissions);
/*
  * router.get("/:submissionId", verifyToken, getSubmissionById);
* */
module.exports = router;
