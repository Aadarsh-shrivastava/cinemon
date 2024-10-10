export const ADD_TO_WATCHLIST = 'ADD_TO_WATCHLIST';
export const REMOVE_FROM_WATCHLIST = 'REMOVE_FROM_WATCHLIST';

export const addToWatchList = item => ({type: ADD_TO_WATCHLIST, payload: item});

export const removeFromWatchList = id => ({
  type: REMOVE_FROM_WATCHLIST,
  payload: id,
});
