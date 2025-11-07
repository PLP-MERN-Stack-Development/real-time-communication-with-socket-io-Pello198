import React, { useState } from "react";

const ChatInput = ({ onSend, setTyping }) => {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
    setTyping(e.target.value.trim() !== "");
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (text.trim() === "") return;
    onSend(text.trim());
    setText("");
    setTyping(false);
  };

  return (
    <form className="flex gap-2" onSubmit={handleSend}>
      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="Type a message..."
        className="flex-1 p-2 border rounded"
      />
      <button type="submit" className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600">
        Send
      </button>
    </form>
  );
};

export default ChatInput;
