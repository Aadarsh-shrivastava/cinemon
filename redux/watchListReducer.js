import {ADD_TO_WATCHLIST, REMOVE_FROM_WATCHLIST} from './watchlistAction';

const initialState = [];

const watchlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_WATCHLIST:
      return [...state, action.payload];
    case REMOVE_FROM_WATCHLIST:
      return [...state].splice(action.payload, 1);
    default:
      return state;
  }
};

export default watchlistReducer;
