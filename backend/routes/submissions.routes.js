const express=require("express");
const router=express.Router();
const {getAllSubmissions,getSubmissionsUser}=require("../controllers/submissions.controller");

router.get("/",getAllSubmissions);
router.get("/:user_id",getSubmissionsUser);

module.exports=router;