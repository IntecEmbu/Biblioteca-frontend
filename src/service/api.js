import axios from "axios";

const api = axios.create({
  baseURL: "https://biblitec.azurewebsites.net",
});

export default api;
