const mongoose = require("mongoose");

const privateMessageSchema = new mongoose.Schema(
  {
    senderId: String,
    receiverId: String,
    sender: String,
    receiver: String,
    message: String,
  },
  { timestamps: true ,collection: 'private_messages' }
);

module.exports = mongoose.model("PrivateMessage", privateMessageSchema);
