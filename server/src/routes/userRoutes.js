const express = require("express");
const router = express.Router();
const { getOnlineUsers } = require("../controllers/userController");
const auth = require("../middleware/authMiddleware");

router.get("/online", auth, getOnlineUsers);

module.exports = router;
