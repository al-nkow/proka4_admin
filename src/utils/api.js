import axios from 'axios';
import history from '../history';
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

  // Add a response interceptor
  axios.interceptors.response.use((response) => {
    return response;
  }, (error) => {
    //catches if the session ended!
    // if ( error.response.data.token.KEY == 'ERR_EXPIRED_TOKEN') {
    //   console.log("EXPIRED TOKEN!");
    //   localStorage.clear();
    //   store.dispatch({ type: UNAUTH_USER });
    // }
    if (error.status === 401) {
      localStorage.clear();
      history.push('/login');
    }
    return Promise.reject(error);
  });

  axios.defaults.baseURL = 'http://localhost:3000'; // REACT_APP_DEV_API_URL
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  axios.defaults.headers.patch['Content-Type'] = 'application/json';
  axios.defaults.headers.put['Content-Type'] = 'application/json';
  // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};
