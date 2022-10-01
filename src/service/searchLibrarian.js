import api from "./api";

async function downloadLibrarian() {
  const librarian = await api.get("/librian/all-collaborators");

  return librarian.data.data;
}

export default downloadLibrarian;
