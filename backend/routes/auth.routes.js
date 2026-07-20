const express=require("express");
const router=express.Router();
const {Register,login,logout,refreshToken}=require("../controllers/auth.controller");

router.post("/register", Register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", refreshToken)
/*
router.get("/me", getCurrentUser);
*/
module.exports=router;