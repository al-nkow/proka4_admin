import {
  SET_FAQ,
  GET_FAQ_REQUEST,
  GET_FAQ_SUCCESS,
  // GET_NEWS_FAIL,
} from '../actions/faq';

const INIT_STATE = {
  isLoading: false,
  loadingStatus: null,
  list: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_FAQ_REQUEST:
      return {
        ...state,
        isLoading: true,
        loadingStatus: 'REQUEST',
      };
    case GET_FAQ_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loadingStatus: 'SUCCESS',
      };
    // case GET_NEWS_FAIL:
    //   return {
    //     ...state,
    //     isLoading: false,
    //     loadingStatus: 'FAIL',
    //   };
    case SET_FAQ: {
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
