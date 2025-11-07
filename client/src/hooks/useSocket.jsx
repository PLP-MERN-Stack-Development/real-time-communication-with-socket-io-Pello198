import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

export const useSocket = () => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const socketRef = useRef(null);

  const connect = (username) => {
    socketRef.current = io(import.meta.env.VITE_BACKEND_URL || "http://localhost:5000");

    socketRef.current.emit("user_join", username);

    // Load previous public messages
    socketRef.current.on("load_public_messages", (msgs) => {
      setMessages(msgs);
    });

    // Receive public message
    socketRef.current.on("receive_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    // Receive private message
    socketRef.current.on("private_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    // Users list
    socketRef.current.on("user_list", (list) => {
      setUsers(list);
    });

    // Typing users
    socketRef.current.on("typing_users", (typing) => {
      setTypingUsers(typing);
    });
  };

  const sendMessage = (data) => {
    if (!data.message || data.message.trim() === "") return;
    socketRef.current.emit("send_message", data);
  };

  const sendPrivateMessage = (to, message) => {
    if (!message || message.trim() === "") return;
    socketRef.current.emit("private_message", { to, message });
  };

  const setTyping = (isTyping) => {
    socketRef.current.emit("typing", isTyping);
  };

  return {
    socket: socketRef.current,
    messages,
    users,
    typingUsers,
    connect,
    sendMessage,
    sendPrivateMessage,
    setTyping,
  };
};
