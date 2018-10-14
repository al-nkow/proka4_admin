import axios from 'axios';

export const createPartner = data => {
  return axios({
    method: 'post',
    url: '/partners',
    data: data,
    config: { headers: {'Content-Type': 'multipart/form-data' }}
  });
};

export const getAllPartners = data =>
  axios.get('/partners', {
    params: data,
  });

export const deletePartner = id => {
  return axios.delete(`/partners/${id}`);
};