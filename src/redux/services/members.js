import axios from 'axios';

export const getAllMembers = data =>
  axios.get('/member', { params: data });