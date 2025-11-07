import React from "react";

const MessageList = ({ messages, currentUser }) => {
  return (
    <div className="flex flex-col gap-2">
      {messages.map((msg) => (
        <div
          key={msg._id || msg.id}
          className={`p-2 rounded ${
            msg.sender === currentUser ? "bg-blue-200 self-end" : "bg-gray-200 self-start"
          }`}
        >
          <div className="text-sm font-semibold">{msg.sender}</div>
          <div>{msg.message}</div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
