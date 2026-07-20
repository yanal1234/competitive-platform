const express=require("express");
const router=express.Router();
const {getAllProblems,getAllProblemsSorted}=require("../controllers/problems.controller");

router.get("/",getAllProblems);
router.get("/Sorted",getAllProblemsSorted)

module.exports=router;