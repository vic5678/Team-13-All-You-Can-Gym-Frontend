import api from "./axios";

export function getPackages() {
  return api.get("/subscription-packages");
}
export function getPackage(id) {
  return api.get(`/subscription-packages/${id}`);
}
