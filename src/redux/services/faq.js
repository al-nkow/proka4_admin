import axios from 'axios';

export const createQuestion = data => axios.post(`/faq`, data);

export const editQuestion = (id, data) => axios.put(`/faq/${id}`, data);

export const deleteQuestion = id => axios.delete(`/faq/${id}`);

export const getAllQuestions = data =>
  axios.get('/faq', {
    params: data,
  });