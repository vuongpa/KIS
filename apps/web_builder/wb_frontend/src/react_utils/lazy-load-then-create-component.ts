import { createElement, lazy } from 'react';

export const lazyLoadThenCreateComponent = (lazyLoad: () => Promise<any>, componentName = 'default') => {
  return createElement(
    lazy(
      () => lazyLoad().then(
        (module) => ({ default: module[componentName] })
      )
    )
  );
}
