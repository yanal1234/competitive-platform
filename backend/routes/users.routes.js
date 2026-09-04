const express = require("express");
const router = express.Router();
const { verifyToken, verifyAdmin } = require("../middleware/auth.middleware");
const { getAllUsers, getUserName, deleteUser } = require("../controllers/users.controller");

router.get("/", verifyToken, verifyAdmin, getAllUsers);
router.get("/:user_name", getUserName);
router.delete("/", verifyToken, verifyAdmin, deleteUser);

module.exports = router;
