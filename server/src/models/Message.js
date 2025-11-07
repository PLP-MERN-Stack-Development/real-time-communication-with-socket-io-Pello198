const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    sender: { type: String, required: true },
    senderId: { type: String, required: true },
    message: { type: String, required: true },
    isPrivate: { type: Boolean, default: false },
    receiverId: { type: String, default: null }, // only for private messages
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
