const express = require("express");
const router = express.Router();
const { verifyToken, verifyAdmin } = require("../middleware/auth.middleware")
const { getRoadmaps } = require("../controllers/roadmap.controller");

router.get("/", verifyToken, getRoadmaps);
/*
router.post("/", verifyToken, verifyAdmin, createRoadmap);
router.patch("/:stageId", verifyToken, verifyAdmin, updateRoadmap);
router.delete("/:stageId", verifyToken, verifyAdmin, deleteRoadmap);
*/

module.exports = router;
