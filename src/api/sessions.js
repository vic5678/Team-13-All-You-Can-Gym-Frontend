import api from "./axios";

export function getAllSessions(){
  return api.get("/sessions");
}
export const createSession = (payload) => {
  return api.post("/sessions", payload);
};
export function updateSession(sessionId, payload) {
  return api.put(`/sessions/${sessionId}`, payload);
}
export function deleteSession(sessionId) {
  return api.delete(`/sessions/${sessionId}`);
}
export function searchSessions(query) {
  return api.get("/sessions/search", { params: { keyword: query } });
}
export function getSessionById(id){
  return api.get(`/sessions/${id}`);
}
// Booking: spec path lacks {sessionId} param; include it in body.
export function bookSession(userId, { sessionId, date }) {
  return api.post(`/users/${userId}/sessions/upcoming`, { sessionId, date });
}
export function cancelBooking(userId, sessionId) {
  return api.delete(`/users/${userId}/sessions/upcoming/${sessionId}`);
}
export function getUpcoming(userId) {
  return api.get(`/users/${userId}/sessions/upcoming`);
}
export function getRecent(userId) {
  return api.get(`/users/${userId}/sessions/recent`);
}
export function getActive(userId) {
  return api.get(`/users/${userId}/sessions/active`);
}

export function fetchSessionsByGym(gymId) {
  return api.get("/sessions", { params: { gymId } });
}