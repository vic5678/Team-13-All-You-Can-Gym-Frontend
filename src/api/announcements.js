import api from "./axios";

export function getSessionAnnouncements(sessionId) {
  return api.get(`/sessions/${sessionId}/announcements`);
}
export function createAnnouncement(sessionId, payload) {
  return api.post(`/sessions/${sessionId}/announcements`, payload);
}
// Missing leading slash in some specs; ensure correct path here:
export function getUserAnnouncements(userId) {
  return api.get(`/users/${userId}/sessions/announcements`);
}
export function getAnnouncement(id) {
  return api.get(`/announcements/${id}`);
}
