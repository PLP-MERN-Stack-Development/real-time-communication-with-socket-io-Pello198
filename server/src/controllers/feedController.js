const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const WallMessage = require("../models/WallMessage");

// GET /api/messages/feed
router.get("/feed", async (req, res) => {
  try {
    // Extract JWT token from headers
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Fetch public + private messages for this user
    const messages = await WallMessage.find({
      $or: [
        { isPrivate: false },
        { isPrivate: true, $or: [{ senderId: userId }, { receiverId: userId }] }
      ]
    }).sort({ createdAt: 1 }); // oldest first

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
