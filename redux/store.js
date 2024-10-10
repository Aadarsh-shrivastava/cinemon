import {combineReducers} from 'redux';
import {createStore} from 'redux';
import watchlistReducer from './watchListReducer';

const rootReducer = combineReducers(
  (reducers = {
    watchlist: watchlistReducer,
  }),
);

export const store = createStore(rootReducer);
