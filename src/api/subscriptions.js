import api from "./axios";

export function createSubscription(userId, { subscriptionPackageId, startDate }) {
  return api.post(`/users/${userId}/subscription`, { subscriptionPackageId, startDate });
}

export function getSubscriptions(userId) {
  return api.get(`/users/${userId}/subscription`);
}

export function updateSubscription(userId, subscriptionId, { newPackageId }) {
  return api.put(`/users/${userId}/subscription/${subscriptionId}`, { newPackageId });
}

export function cancelSubscription(userId, subscriptionId) {
  return api.delete(`/users/${userId}/subscription/${subscriptionId}`);
}

export function getSubscriptionPackages() {
  return api.get("/subscriptions");
}

export function getSubscriptionPackageById(id) {
  return api.get(`/subscriptions/${id}`);
}

// Check if user has an active subscription
export async function getActiveSubscription(userId) {
  try {
    const res = await getSubscriptions(userId);
    const subscriptions = res.data?.data || [];
    
    if (!Array.isArray(subscriptions) || subscriptions.length === 0) {
      return null;
    }
    
    // Find active subscription with future end date
    const now = new Date();
    const activeSubscription = subscriptions.find(sub => {
      return sub.isActive !== false && new Date(sub.endDate) > now;
    });
    
    return activeSubscription || null;
  } catch (err) {
    console.error("Error getting active subscription:", err);
    return null;
  }
}


export const processPayment = (data) => {
  return api.post("/payments/checkout/", data);
};