const express = require("express");
const router = express.Router();
const WallMessage = require("../models/WallMessage");

router.get("/public", async (req, res) => {
  const messages = await WallMessage.find({ isPrivate: false }).sort({ createdAt: 1 });
  res.json(messages);
});

module.exports = router;
