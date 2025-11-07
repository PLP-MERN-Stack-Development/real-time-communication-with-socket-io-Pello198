const Message = ({ message, currentUser }) => {
  const isMine = message.sender === currentUser;

  return (
    <div
      className={`flex ${isMine ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`p-2 rounded max-w-xs ${
          isMine ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
        }`}
      >
        {!message.system && <p className="text-sm font-semibold">{message.sender}</p>}
        <p>{message.message}</p>
        <span className="text-xs text-gray-500">
          {new Date(message.timestamp).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
};

export default Message;
