import api from "./api";

export const sendMessage = (data) => {
  return (api.post("/contactmessages", data));
}
