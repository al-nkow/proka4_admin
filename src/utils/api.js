import axios from 'axios';
// import { REACT_APP_DEV_API_URL } from '../shared/env';

export const saveToken = token => {
  if (!token) return;
  localStorage.setItem('token', token);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const saveUserRole = role => {
  if (!role) return;
  localStorage.setItem('role', role);
};

export const clearToken = () => {
  localStorage.setItem('token', undefined);
  axios.defaults.headers.common['Authorization'] = undefined;
};

export default () => {
  const token = localStorage.getItem('token');

  axios.defaults.baseURL = 'http://localhost:8080';
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  axios.defaults.headers.patch['Content-Type'] = 'application/json';
  axios.defaults.headers.put['Content-Type'] = 'application/json';
  // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};
