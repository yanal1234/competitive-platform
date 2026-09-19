require("dotenv/config");
const cookieParser = require("cookie-parser")
const express = require("express");
const cors = require("cors");
const app = express();
const RouteUsers = require("./routes/users.routes");
const RouteProblems = require("./routes/problems.routes");
const RouteSubmissions = require("./routes/submissions.routes");
const Routerecommendations = require("./routes/recommendations.routes");
const RouteRoadmaps = require("./routes/roadmap.routes");
const Routeauth = require("./routes/auth.routes");
const RouteContests = require("./routes/contests.routes");
const Routeleaderboard = require("./routes/leaderboard.routes");
const Routedashboard = require("./routes/dashboard.routes");
const Routecontactmessages = require("./routes/contactmessages.routes");

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

app.use("/api/users", RouteUsers);
app.use("/api/problems", RouteProblems);
app.use("/api/submissions", RouteSubmissions);
app.use("/api/Recommendations", Routerecommendations);
app.use("/api/Roadmaps", RouteRoadmaps);
app.use("/api/auth", Routeauth);
app.use("/api/Contests", RouteContests);
app.use("/api/leaderboard", Routeleaderboard);
app.use("/api/dashboard", Routedashboard);
app.use("/api/contactmessages", Routecontactmessages);

app.listen(process.env.PORT, () => {
  console.log("Server running...");
})

