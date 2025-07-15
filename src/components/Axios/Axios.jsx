import axios from 'axios';

const instanceAxios = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});
export default instanceAxios;