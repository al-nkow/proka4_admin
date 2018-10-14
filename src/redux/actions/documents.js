import { createDocument, getAllDocuments, deleteDocument } from '../services/documents';
import idx from 'idx';

export const SET_DOCUMENTS = 'SET_DOCUMENTS';
export const GET_DOCUMENTS_REQUEST = 'GET_DOCUMENTS_REQUEST';
export const GET_DOCUMENTS_SUCCESS = 'GET_DOCUMENTS_SUCCESS';
export const GET_DOCUMENTS_FAIL = 'GET_DOCUMENTS_FAIL';

export const createDoc = data => dispatch => {
  return createDocument(data)
    .then(res => {
      dispatch(getDocsList());
      return res;
    });
};

export const getDocsList = params => dispatch => {
  dispatch({ type: GET_DOCUMENTS_REQUEST });
  return getAllDocuments(params)
    .then(res => {
      dispatch({ type: GET_DOCUMENTS_SUCCESS });
      let result = idx(res, _ => _.data.list);
      dispatch({ type: SET_DOCUMENTS, payload: result });
      return res;
    }).catch((err) => {
      console.log('GET DOCUMENTS ERROR: ', err);
      dispatch({ type: GET_DOCUMENTS_FAIL });
      throw new Error('Ошибка при получении списка документов');
    });
};

export const deleteDoc = id => dispatch => {
  return deleteDocument(id)
    .then(res => {
      dispatch(getDocsList());
      return res;
    });
};