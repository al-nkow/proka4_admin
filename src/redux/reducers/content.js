import {
  SET_CONTENT,
  GET_CONTENT_REQUEST,
  GET_CONTENT_SUCCESS,
  GET_CONTENT_FAIL,
} from '../actions/content';

const INIT_STATE = {
  isLoading: false,
  loadingStatus: null,
  content: {},
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_CONTENT_REQUEST:
      return {
        ...state,
        isLoading: true,
        loadingStatus: 'REQUEST',
      };
    case GET_CONTENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loadingStatus: 'SUCCESS',
      };
    case GET_CONTENT_FAIL:
      return {
        ...state,
        isLoading: false,
        loadingStatus: 'FAIL',
      };
    case SET_CONTENT: {
      // const { list, totalCount } = action.payload;
      return {
        ...state,
        content: action.payload,
        // totalCount,
      };
    }
    default:
      return state;
  }
};
