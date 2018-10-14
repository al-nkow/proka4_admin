import { createPartner, getAllPartners, deletePartner } from '../services/partners';
import idx from 'idx';

export const SET_PARTNER = 'SET_PARTNER';
export const GET_PARTNER_REQUEST = 'GET_PARTNER_REQUEST';
export const GET_PARTNER_SUCCESS = 'GET_PARTNER_SUCCESS';
export const GET_PARTNER_FAIL = 'GET_PARTNER_FAIL';

export const createPartnerItem = data => dispatch => {
  return createPartner(data)
    .then(res => {
      dispatch(getPartnersList());
      return res;
    });
};

export const getPartnersList = params => dispatch => {
  dispatch({ type: GET_PARTNER_REQUEST });
  return getAllPartners(params)
    .then(res => {
      dispatch({ type: GET_PARTNER_SUCCESS });
      let result = idx(res, _ => _.data.partners);
      dispatch({ type: SET_PARTNER, payload: result });
      return res;
    }).catch((err) => {
      console.log('GET PARTNERS LIST ERROR: ', err);
      dispatch({ type: GET_PARTNER_FAIL });
      throw new Error('Ошибка при получении списка партнёров проекта');
    });
};

export const deletePartnerItem = id => dispatch => {
  return deletePartner(id)
    .then(res => {
      dispatch(getPartnersList());
      return res;
    });
};