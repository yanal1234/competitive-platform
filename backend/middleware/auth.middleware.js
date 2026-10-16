const jwt = require("jsonwebtoken");
require("dotenv/config");

const verifyToken = (req, res, next) => {
  try {
    const accesstoken = req.cookies?.accesstoken;
    if (!accesstoken) {
      return res.status(401).json({ message: "Access token is required" });
    }
    const decode = jwt.verify(accesstoken, process.env.ACCESS_TOKEN_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
      error: error.message,
    });
  }
};

const verifyAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "You do not have the authority to perform this operation.",
    });
  }
  next();
};

module.exports = { verifyToken, verifyAdmin };
