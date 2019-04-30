import axios from 'axios';

export const saveToken = data => {
  return axios.post(`/instagram`, data);
};