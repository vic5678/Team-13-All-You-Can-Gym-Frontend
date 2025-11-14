import api from "./axios";

export function getGyms() {
  return api.get("/gyms");
}
export function searchGyms(query) {
  return api.get("/gyms/search", { params: { query } });
}
export function filterGyms(params) {
  return api.get("/gyms/filter", { params });
}
