import axios from 'axios';

export const createReview = data => {
  return axios({
    method: 'post',
    url: '/review',
    data: data,
    config: { headers: {'Content-Type': 'multipart/form-data' }}
  });
};