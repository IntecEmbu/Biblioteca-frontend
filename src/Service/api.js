import axios from 'axios';

const api = axios.create({
  baseURL:'https://bibli-on.herokuapp.com'
})

export default api;