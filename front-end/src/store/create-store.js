import {createStore} from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';

import mainReducer from './reducers/main-reducer';

export default () => {
  return createStore(mainReducer, composeWithDevTools());
};
