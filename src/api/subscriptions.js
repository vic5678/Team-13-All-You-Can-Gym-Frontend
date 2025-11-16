import api from "./axios";

export function createSubscription(userId, { subscriptionPackageId, startDate }) {
  return api.post(`/users/${userId}/subscriptions`, { subscriptionPackageId, startDate });
}
export function getSubscriptions(userId){
  return api.get(`/users/${userId}/subscriptions`);   
}
export function updateSubscription(userId, subscriptionId, { newPackageId }) {
  return api.put(`/users/${userId}/subscriptions/${subscriptionId}`, { newPackageId });
}
export function cancelSubscription(userId, subscriptionId) {
  return api.delete(`/users/${userId}/subscriptions/${subscriptionId}`);
}

export function getSubscriptionPackages() {
  return api.get("/subscriptionPackages");
}
