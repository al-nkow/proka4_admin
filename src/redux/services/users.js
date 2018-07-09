import axios from 'axios';

export const getAllUsers = data =>
  axios.get('/user', {
    params: data,
  });

export const signupUser = data => {
  return axios.post(`/user/signup`, data);
};

export const deleteUser = id => {
  return axios.delete(`/user/${id}`);
};

