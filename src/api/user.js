// src/api/auth.js
import api from "./axios";

// normal user login
export function loginUser({ email, password }) {
  return api.post("/users/login", { email, password });
}

// gym admin login
export function loginGymAdmin({ email, password }) {
  return api.post("/gymAdmins/login", { email, password });
}
