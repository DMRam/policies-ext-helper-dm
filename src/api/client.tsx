import axios from 'axios';

const apiClient = axios.create({
  baseURL: "http://localhost:5005",
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default apiClient;