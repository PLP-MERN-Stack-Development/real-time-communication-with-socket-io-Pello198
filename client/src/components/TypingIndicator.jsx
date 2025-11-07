import React from "react";

const TypingIndicator = ({ typingUsers, currentUser }) => {
  const othersTyping = typingUsers.filter((u) => u !== currentUser);
  if (othersTyping.length === 0) return null;

  return <div className="p-2 text-sm italic text-gray-500">{othersTyping.join(", ")} typing...</div>;
};

export default TypingIndicator;
