import { combineReducers } from 'redux';
import { compose } from 'ramda';

import {
  withSearchDataReducer,
  withUserDataReducer,
} from './features';

export const combinedReducers = compose(
  combineReducers,
  withUserDataReducer,
  withSearchDataReducer,
)({});
