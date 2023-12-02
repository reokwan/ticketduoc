import { createStore, combineReducers } from 'redux';
import reducers from '../src/reducers';

export default function configureStore() {
  return createStore(
    combineReducers({
      ...reducers
    }),
    {},
  );
}