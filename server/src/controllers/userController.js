exports.getOnlineUsers = (req, res) => {
  const io = req.app.get("io");
  const users = req.app.get("users");
  return res.json(Object.values(users));
};
