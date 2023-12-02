import { createStore, combineReducers } from 'redux';
import reducers from '../../../architectui-react-free-1.0.0/src/reducers';

export default function configureStore() {
  return createStore(
    combineReducers({
      ...reducers
    }),
    {},
  );
}