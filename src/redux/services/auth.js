import axios from 'axios';

export const loginUser = (email, password) => {
  return axios.post('/user/login', { email, password });
};