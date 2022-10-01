import axios from "axios";

const api = axios.create({
  baseURL: "https://biblitec-api.herokuapp.com",
});

export default api;
