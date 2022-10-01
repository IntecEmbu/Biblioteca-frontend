import api from "./api.js";

async function downloadUser() {
  const users = await api.get("/user/all");

  return users.data.users;
}

export default downloadUser;
