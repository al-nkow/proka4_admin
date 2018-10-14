import axios from 'axios';

export const createDocument = data => {
  return axios({
    method: 'post',
    url: '/documents',
    data: data,
    config: { headers: {'Content-Type': 'multipart/form-data' }}
  });
};

export const getAllDocuments = data =>
  axios.get('/documents', {
    params: data,
  });

export const deleteDocument = id => {
  return axios.delete(`/documents/${id}`);
};
