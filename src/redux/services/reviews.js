import axios from 'axios';

export const createReview = data => {
  return axios({
    method: 'post',
    url: '/reviews',
    data: data,
    config: { headers: {'Content-Type': 'multipart/form-data' }}
  });
};

export const getAllReviews = data =>
  axios.get('/reviews', {
    params: data,
  });

export const deleteReview = id => {
  return axios.delete(`/reviews/${id}`);
};