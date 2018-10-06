import axios from 'axios';

export const createQuestion = data => {
  return axios.post(`/faq`, data);
};

export const getAllQuestions = data =>
  axios.get('/faq', {
    params: data,
  });