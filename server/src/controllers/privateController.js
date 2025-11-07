const PrivateMessage = require("../models/PrivateMessage");

exports.getPrivateMessages = async (req, res) => {
  try {
    const { userId } = req.user; // from token
    const { otherId } = req.params;

    const messages = await PrivateMessage.find({
      $or: [
        { senderId: userId, receiverId: otherId },
        { senderId: otherId, receiverId: userId },
      ],
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
