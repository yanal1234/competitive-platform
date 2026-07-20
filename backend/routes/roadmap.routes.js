const express =require("express");
const router= express.Router();
const{getRoadmaps}=require("../controllers/roadmap.controller");

router.get("/",getRoadmaps);

module.exports=router;