import axios from 'axios';

export const getAllMembers = data =>
  axios.get('/member', { params: data });

export const deleteMember = id => {
  return axios.delete(`/member/${id}`);
};