import {
  SET_NEWS,
  GET_NEWS_REQUEST,
  GET_NEWS_SUCCESS,
  // GET_NEWS_FAIL,
} from '../actions/news';

const INIT_STATE = {
  isLoading: false,
  loadingStatus: null,
  list: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_NEWS_REQUEST:
      return {
        ...state,
        isLoading: true,
        loadingStatus: 'REQUEST',
      };
    case GET_NEWS_SUCCESS:
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
    case SET_NEWS: {
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
