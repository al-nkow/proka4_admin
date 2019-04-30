import {
  SET_TOKEN,
  GET_TOKEN_REQUEST,
  GET_TOKEN_SUCCESS,
  GET_TOKEN_FAIL,
} from '../actions/instagram';

const INIT_STATE = {
  isLoading: false,
  loadingStatus: null,
  token: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_TOKEN_REQUEST:
      return {
        ...state,
        isLoading: true,
        loadingStatus: 'REQUEST',
      };
    case GET_TOKEN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loadingStatus: 'SUCCESS',
      };
    case GET_TOKEN_FAIL:
      return {
        ...state,
        isLoading: false,
        loadingStatus: 'FAIL',
      };
    case SET_TOKEN: {
      const { token } = action.payload;
      return {
        ...state,
        token,
      };
    }
    default:
      return state;
  }
};
