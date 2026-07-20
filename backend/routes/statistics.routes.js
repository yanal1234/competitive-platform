const express=require("express");
const router=express.Router();
const {getProfileSummary,getHeatMapAll,getHeatMapYear}=require("../controllers/statistics.controller");

router.get("/profile-summary/:user_id",getProfileSummary);
router.get("/heatmap/:user_id",getHeatMapAll);
router.get("/heatmap/:user_id/:year",getHeatMapYear);
module.exports=router;