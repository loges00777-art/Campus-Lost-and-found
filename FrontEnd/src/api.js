// client/src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000', // your backend URL
  withCredentials: true, // optional: if using cookies later
});

export default API;
