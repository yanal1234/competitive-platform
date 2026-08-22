const express = require("express");
const router = express.Router();
const { verifyToken, verifyAdmin } = require("../middleware/auth.middleware");
const { getAllUsers, getUserId } = require("../controllers/users.controller");

router.get("/", verifyToken, verifyAdmin, getAllUsers);
router.get("/:user_id", getUserId);
/*
  * router.delete("/:user_id", verifyToken, verifyAdmin, deleteUser);
* */

module.exports = router;
