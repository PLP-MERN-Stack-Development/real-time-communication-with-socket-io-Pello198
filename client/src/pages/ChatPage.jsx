import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useSocket } from "../hooks/useSocket";
import Sidebar from "../components/Sidebar";
import MessageList from "../components/MessageList";
import ChatInput from "../components/ChatInput";
import TypingIndicator from "../components/TypingIndicator";

const ChatPage = () => {
  const { user, logout } = useContext(AuthContext);
  const {
    socket,
    messages,
    users,
    typingUsers,
    connect,
    sendMessage,
    sendPrivateMessage,
    setTyping,
  } = useSocket();

  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (user) connect(user.username);
  }, [user]);

  const handleSend = (msg) => {
    if (selectedUser) {
      sendPrivateMessage(selectedUser.id, msg);
    } else {
      sendMessage({ message: msg });
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        users={users.filter((u) => u.username !== user.username)}
        selectUser={setSelectedUser}
        selectedUser={selectedUser}
        logout={logout}
      />

      <div className="flex flex-col flex-1">
        <div className="flex items-center justify-between p-4 bg-white shadow">
          <h2 className="text-xl font-semibold">
            {selectedUser ? `Chat with ${selectedUser.username}` : "Public Wall"}
          </h2>
          <button
            onClick={logout}
            className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <div className="flex-1 p-4 overflow-y-auto">
          <MessageList
            messages={messages.filter((m) =>
              selectedUser
                ? m.isPrivate &&
                  (m.senderId === selectedUser.id || m.senderId === socket?.id)
                : !m.isPrivate
            )}
            currentUser={user.username}
          />
        </div>

        <TypingIndicator typingUsers={typingUsers} currentUser={user.username} />

        <div className="p-4 bg-white shadow">
          <ChatInput onSend={handleSend} setTyping={setTyping} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
