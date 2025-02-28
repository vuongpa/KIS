import { compose } from 'ramda';

import { withData } from '../../react_utils';
import { AddElementsComponent as AEC} from './components/layout_element_sidebar/layout-element-sidebar';
import { elementConfigs } from './data';

export * from './components/layout_element_sidebar/layout-element-sidebar';
export * from './components';

export const AddElementsComponent = compose(
    withData(elementConfigs),
)(AEC);
