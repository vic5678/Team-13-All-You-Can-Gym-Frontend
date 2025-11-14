import api from "./axios";

export function searchUsers(username) {
  return api.get("/users/search", { params: { username } });
}
export function getUser(userId) {
  return api.get(`/users/${userId}`);
}
export function getFriends(userId) {
  return api.get(`/users/${userId}/friends`);
}
export function getActiveFriends(userId) {
  return api.get(`/users/${userId}/friends/active`);
}
export function sendFriendRequest(payload) {
  return api.post("/friend-requests", payload);
}
export function respondFriendRequest(requestId, action) {
  return api.post(`/friend-requests/${requestId}`, { action });
}
