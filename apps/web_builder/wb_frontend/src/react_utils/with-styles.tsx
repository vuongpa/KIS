import { curryN } from 'ramda';

type Styles = {
  readonly [key: string]: string;
};

export type HasStyles = {
  styles: Styles
};

export const withStyles = curryN(
  2,
  (styles: Styles, Component: React.FC<any>) => (props: any) => {
    return (
      <Component styles={styles} {...props} />
    );
  }
);