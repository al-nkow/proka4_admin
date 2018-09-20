import axios from 'axios';
import history from '../history';
// import { REACT_APP_DEV_API_URL } from '../shared/env';

export const saveToken = data => {
  if (!data.token) return;
  localStorage.setItem('token', data.token);
  localStorage.setItem('refreshToken', data.refreshToken);
  localStorage.setItem('expires_in', data.expires_in);
  axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
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
  const baseUrl = process.env.NODE_ENV === 'production' ? 'http://37.140.198.199:3000' : 'http://localhost:3000'; // REACT_APP_DEV_API_URL



  axios.interceptors.request.use(
    async config => {

      console.log('>>>>>>> INTERCEPROR >>>>>>>', config);
      const result = await fetch(baseUrl + '/user/token', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: '1234567' })
      });
      const content = await result.json();
      console.log('>>>>>>> INTERCEPROR RESULT >>>>>>>', content);


      // const result = await axios.post('/user/token', { token: '123456' });
      // console.log('>>>>>>> INTERCEPROR RESULT >>>>>>>', result);

      // if (config.baseURL === baseApiAddress && !config.headers.Authorization) {
      //   const token = getToken();
      //
      //   if (token) {
      //     config.headers.Authorization = `Bearer ${token}`;
      //   }
      // }

      return config;
    },
    error => Promise.reject(error)
  );





  axios.defaults.baseURL = baseUrl;
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
    if (error && error.response && error.response.status === 401) {
      localStorage.clear();
      history.push('/login');
    }
    return Promise.reject(error);
  });
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  axios.defaults.headers.patch['Content-Type'] = 'application/json';
  axios.defaults.headers.put['Content-Type'] = 'application/json';
  // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};
