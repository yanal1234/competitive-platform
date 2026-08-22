const express = require("express");
const router = express.Router();
const { verifyToken, verifyAdmin } = require("../middleware/auth.middleware");
const { getAllProblems, getAllProblemsSorted, add_problems, getAvailableProblems } = require("../controllers/problems.controller");

router.get("/all", getAllProblems);
router.get("/Sorted", getAllProblemsSorted);
router.post("/add", verifyToken, verifyAdmin, add_problems);
router.get("/available", getAvailableProblems);
/*
  * router.patch("/:problemId", verifyToken, verifyAdmin, updateProblem);
router.delete("/:problemId", verifyToken, verifyAdmin, deleteProblem);
*/

module.exports = router;
