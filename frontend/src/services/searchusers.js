import api from "./api";

export const searchUsers = (q) => {
  return api.get("/users/searchusers", { params: { q } });
};
