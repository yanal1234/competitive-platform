const express=require("express");
const router=express.Router();
const {getAllProblems,getAllProblemsSorted, add_problems}=require("../controllers/problems.controller");

router.get("/all",getAllProblems);
router.get("/Sorted",getAllProblemsSorted)
router.patch("/add", add_problems)

module.exports=router;
