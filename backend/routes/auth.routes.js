const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth.middleware");
const { Register, login, logout, refreshToken, getMyProfile } = require("../controllers/auth.controller");

router.post("/register", Register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", refreshToken)
router.get("/me", verifyToken, getMyProfile);
/*
  * router.patch("/me", verifyToken, updateProfile);
  * router.patch("/change-password", verifyToken, changePassword);
  * router.delete("/me", verifyToken, deleteMyAccount);
* */

module.exports = router;
