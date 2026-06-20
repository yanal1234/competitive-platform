const express=require("express");
const router=express.Router();
const {getAllProblems}=require("../controllers/problems.controller");

router.get("/",getAllProblems);

module.exports=router;