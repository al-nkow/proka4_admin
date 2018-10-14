import {
  SET_PARTNER,
  GET_PARTNER_REQUEST,
  GET_PARTNER_SUCCESS,
  GET_PARTNER_FAIL,
} from '../actions/partners';

const INIT_STATE = {
  isLoading: false,
  loadingStatus: null,
  list: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_PARTNER_REQUEST:
      return {
        ...state,
        isLoading: true,
        loadingStatus: 'REQUEST',
      };
    case GET_PARTNER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loadingStatus: 'SUCCESS',
      };
    case GET_PARTNER_FAIL:
      return {
        ...state,
        isLoading: false,
        loadingStatus: 'FAIL',
      };
    case SET_PARTNER: {
      // const { list, totalCount } = action.payload;
      return {
        ...state,
        list: action.payload,
        // totalCount,
      };
    }
    default:
      return state;
  }
};
