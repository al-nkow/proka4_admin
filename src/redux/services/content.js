import axios from 'axios';

export const getContent = data =>
  axios.get('/content', {
    params: data,
  });

export const saveContent = data => {
  return axios.post(`/content`, data);
};

