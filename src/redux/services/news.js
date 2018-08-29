import axios from 'axios';

export const createNews = data => {
  // return axios.post(`/news`, data);
  return axios({
    method: 'post',
    url: '/news',
    data: data,
    config: { headers: {'Content-Type': 'multipart/form-data' }}
  });
};

export const getAllNews = data =>
  axios.get('/news', {
    params: data,
  });

export const deleteNews = id => {
  return axios.delete(`/news/${id}`);
};

