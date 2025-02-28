import { compose } from 'ramda';

import { ProjectList as PL } from './project-list';
import { withData } from '../../react_utils';
import { projects } from './dummy_data';

export const ProjectList = compose(
    withData(projects),
)(PL);
