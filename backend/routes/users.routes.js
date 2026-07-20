const express=require("express");
const router=express.Router();
const {getAllUsers,getUserId}=require("../controllers/users.controller");

router.get("/",getAllUsers);
router.get("/:user_id",getUserId);

module.exports=router;