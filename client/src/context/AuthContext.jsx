import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    if (token) {
      fetch(import.meta.env.VITE_BACKEND_URL + "/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) setUser(data.user);
          else logout();
        });
    }
  }, [token]);

  const login = async (username, password) => {
    const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (res.ok && data.token) {
      setToken(data.token);
      localStorage.setItem("token", data.token);
      setUser(data.user);
      navigate("/chat");
    }else {
      // Login failed
      return { success: false, message: data.message || "Login failed" };
    }
    return data;
  };

  const register = async (username, password) => {
    const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    return data;
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
