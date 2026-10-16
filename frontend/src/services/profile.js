import api from "./api";

export const getProfile = () => {
  return api.get("/auth/me");
};

export const logoutProfile = () => {
  return api.post("/auth/logout");
};
