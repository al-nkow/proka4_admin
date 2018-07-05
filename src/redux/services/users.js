import axios from 'axios';

export const getAllUsers = data =>
  axios.get('/user', {
    params: data,
  });
