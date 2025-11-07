import React from "react";

const Sidebar = ({ users, selectUser, selectedUser, logout }) => {
  return (
    <div className="flex flex-col w-64 p-4 bg-white border-r">
      <h2 className="mb-4 text-lg font-semibold">Users</h2>
      <div className="flex-1 overflow-y-auto">
        {users.map((user) => (
          <div
            key={user.id}
            className={`flex justify-between items-center p-2 mb-1 cursor-pointer rounded hover:bg-gray-100 ${
              selectedUser?.id === user.id ? "bg-gray-200" : ""
            }`}
            onClick={() => selectUser(user)}
          >
            <span>{user.username}</span>
            {user.online && <span className="w-3 h-3 bg-green-500 rounded-full"></span>}
          </div>
        ))}
      </div>
      <button
        onClick={logout}
        className="px-3 py-1 mt-4 text-white bg-red-500 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
