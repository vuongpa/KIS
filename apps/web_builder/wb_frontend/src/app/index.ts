import { compose } from 'ramda';

import {
  withClasses,
  withEventEmitter,
  withToaster,
} from '../react_utils';
import { withProvider } from '../redux_logic/with-provider';
import { withMuiTheme } from '../mui_theme';
import { App as A } from './app';
import classes from './app.module.scss';

export const App = compose(
  withClasses(classes),
  withEventEmitter,
  withProvider,
  withToaster,
  withMuiTheme,
)(A);
