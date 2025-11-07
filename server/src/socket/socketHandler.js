const WallMessage = require("../models/WallMessage");
const User = require("../models/User");

module.exports = (io) => {
  const users = {}; // track online users
  const typingUsers = {};

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("user_join", async (username) => {
      users[socket.id] = { username, id: socket.id, online: true };

      // send previous public messages
      const publicMessages = await WallMessage.find({ isPrivate: false }).sort({ createdAt: 1 });
      socket.emit("load_public_messages", publicMessages);

      // send all users with online status
      const allUsers = await User.find({});
      const usersWithStatus = allUsers.map((u) => {
        const onlineUser = Object.values(users).find((usr) => usr.username === u.username);
        return { username: u.username, id: u._id, online: !!onlineUser };
      });
      io.emit("user_list", usersWithStatus);

      io.emit("user_joined", { username, id: socket.id });
    });

    socket.on("send_message", async (messageData) => {
      if (!messageData.message || messageData.message.trim() === "") {
        socket.emit("error_message", { message: "Invalid text" });
        return;
      }

      const msg = new WallMessage({
        sender: users[socket.id]?.username || "Anonymous",
        senderId: socket.id,
        message: messageData.message,
        isPrivate: false,
      });

      await msg.save();
      io.emit("receive_message", msg);
    });

    socket.on("private_message", async ({ to, message }) => {
      if (!message || message.trim() === "") {
        socket.emit("error_message", { message: "Invalid text" });
        return;
      }

      const msg = new WallMessage({
        sender: users[socket.id]?.username || "Anonymous",
        senderId: socket.id,
        message,
        isPrivate: true,
        receiverId: to,
      });

      await msg.save();

      socket.to(to).emit("private_message", msg);
      socket.emit("private_message", msg);
    });

    socket.on("typing", (isTyping) => {
      if (users[socket.id]) {
        const username = users[socket.id].username;
        if (isTyping) typingUsers[socket.id] = username;
        else delete typingUsers[socket.id];

        io.emit("typing_users", Object.values(typingUsers));
      }
    });

    socket.on("disconnect", async () => {
      if (users[socket.id]) {
        const { username } = users[socket.id];
        delete users[socket.id];

        const allUsers = await User.find({});
        const usersWithStatus = allUsers.map((u) => {
          const onlineUser = Object.values(users).find((usr) => usr.username === u.username);
          return { username: u.username, id: u._id, online: !!onlineUser };
        });
        io.emit("user_list", usersWithStatus);
        io.emit("user_left", { username, id: socket.id });
      }
    });
  });
};
