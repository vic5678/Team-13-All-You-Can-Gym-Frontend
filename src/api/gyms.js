import api from "./axios";

export function getGyms() {
  return api.get("/gyms");
}

export function getGymsByKeyword(keyword) {
  return api.get("/gyms/search", { params: { keyword } });
}

export function searchGyms(query) {
  return api.get("/gyms/search", { params: { keyword: query } });
}

export function filterGyms(params) {
  return api.get("/gyms/filter", { params });
}

export function getGymById(gymId) {
  return api.get(`/gyms/${gymId}`);
}