const express=require("express");
const router=express.Router();
const {getAllSubmissions}=require("../controllers/submissions.controller");

router.get("/",getAllSubmissions);

module.exports=router;