import { createContext, useContext, useState } from "react";
import { loginUser, loginGymAdmin } from "../api/user";

const AuthCtx = createContext();

export function AuthProvider({ children }) {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role") || null);

  // values: { username, password, isAdmin }
  async function login({ username, password, isAdmin }) {
    try {
      // backend expects "email", your form field is called "username"
      const payload = { email: username, password };

      const res = isAdmin
        ? await loginGymAdmin(payload)
        : await loginUser(payload);

      const data = res.data?.data; // { _id, username, email, role, token }

      if (!data || !data.token) {
        console.error("Login response missing token", res.data);
        return false;
      }

      setUserId(data._id);
      setToken(data.token);
      setRole(data.role || (isAdmin ? "gymAdmin" : "user"));

      localStorage.setItem("userId", data._id);
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role || (isAdmin ? "gymAdmin" : "user"));



      if (isAdmin && Array.isArray(data.gyms) && data.gyms.length > 0) {
      // data.gyms is an array of ObjectId strings from backend
      const adminGymId = data.gyms[0]; // first gym they manage
      localStorage.setItem("adminGymId", adminGymId);
      console.log("Saved adminGymId:", adminGymId);
     }
      return true;
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      return false;
    }
  }

  function logout() {
    setUserId(null);
    setToken(null);
    setRole(null);
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  }

  const value = { userId, token, role, login, logout };
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  return useContext(AuthCtx);
}
