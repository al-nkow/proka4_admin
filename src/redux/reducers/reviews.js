import {
  SET_REVIEWS,
  GET_REVIEWS_REQUEST,
  GET_REVIEWS_SUCCESS,
  // GET_NEWS_FAIL,
} from '../actions/reviews';

const INIT_STATE = {
  isLoading: false,
  loadingStatus: null,
  list: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_REVIEWS_REQUEST:
      return {
        ...state,
        isLoading: true,
        loadingStatus: 'REQUEST',
      };
    case GET_REVIEWS_SUCCESS:
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
    case SET_REVIEWS: {
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
