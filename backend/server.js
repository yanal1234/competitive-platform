const express = require("express");
const cors = require("cors");
const app=express();
const RouteUsers=require("./routes/users.routes");
const RouteProblems=require("./routes/problems.routes");
const RouteSubmissions=require("./routes/submissions.routes");
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.use("/api/users", RouteUsers);
app.use("/api/problems", RouteProblems);
app.use("/api/submissions", RouteSubmissions);

app.listen(5000,()=>{
    console.log("Server running...");
})