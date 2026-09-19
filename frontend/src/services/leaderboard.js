import api from "./api";

export const getLeaderboard = () => {
  return (api.get("/leaderboard?limit=5"));
}
