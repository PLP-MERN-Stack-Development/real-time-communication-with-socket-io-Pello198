const WallMessage = require("../models/WallMessage");

exports.getWallMessages = async (req, res) => {
  try {
    const messages = await WallMessage.find().sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
