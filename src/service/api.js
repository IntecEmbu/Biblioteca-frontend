import axios from 'axios';

const api = axios.create({
  baseURL:'https://jade-api.herokuapp.com'
})

export default api;