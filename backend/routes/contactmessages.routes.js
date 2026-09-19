const express = require("express");
const router = express.Router();
const { verifyToken, verifyAdmin } = require("../middleware/auth.middleware");

const { getMessages, addMessage } = require("../controllers/contactmessages.controller");

router.get("/", verifyToken, verifyAdmin, getMessages);
router.post("/", verifyToken, addMessage)

module.exports = router;

