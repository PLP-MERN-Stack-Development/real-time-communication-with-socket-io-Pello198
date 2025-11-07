const mongoose = require("mongoose");

const wallMessageSchema = new mongoose.Schema(
  {
    sender: { type: String, required: true },
    senderId: { type: String, required: true },
    message: { type: String, required: true },
    isPrivate: { type: Boolean, default: false },
    receiverId: { type: String },
  },
  { timestamps: true, collection: "wall_messages" }
);

module.exports = mongoose.model("WallMessage", wallMessageSchema);
