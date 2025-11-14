import { createContext, useContext, useEffect, useState } from "react";

const AuthCtx = createContext();

export function AuthProvider({ children }) {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [token, setToken] = useState(localStorage.getItem("token"));

  function login({ username, password }) {
    // Basic mock login: accept any non-empty credentials
    const demoUserId = process.env.REACT_APP_DEFAULT_USER_ID || "demo-user-1";
    const fakeToken = btoa(`${username}:${password}`); // Basic-like token
    setUserId(demoUserId);
    setToken(fakeToken);
    localStorage.setItem("userId", demoUserId);
    localStorage.setItem("token", fakeToken);
    return true;
  }

  function logout() {
    setUserId(null);
    setToken(null);
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
  }

  const value = { userId, token, login, logout };
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  return useContext(AuthCtx);
}
