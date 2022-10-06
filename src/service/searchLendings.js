import api from "./api";

async function downloadLending() {
  const lendings = await api.get("/lending/not-returned");

  return lendings.data;
}

export default downloadLending;
