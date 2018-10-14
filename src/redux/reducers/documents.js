import {
  SET_DOCUMENTS,
  GET_DOCUMENTS_REQUEST,
  GET_DOCUMENTS_SUCCESS,
  GET_DOCUMENTS_FAIL,
} from '../actions/documents';

const INIT_STATE = {
  isLoading: false,
  loadingStatus: null,
  list: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_DOCUMENTS_REQUEST:
      return {
        ...state,
        isLoading: true,
        loadingStatus: 'REQUEST',
      };
    case GET_DOCUMENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loadingStatus: 'SUCCESS',
      };
    case GET_DOCUMENTS_FAIL:
      return {
        ...state,
        isLoading: false,
        loadingStatus: 'FAIL',
      };
    case SET_DOCUMENTS: {
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
