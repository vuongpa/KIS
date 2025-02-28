import { curryN } from 'ramda';

type Classes = {
  readonly [key: string]: string;
};

export type HasClasses = {
  classes: Classes
};

export const withClasses = curryN(
  2,
  (classes: Classes, Component: React.FC<any>) => (props: any) => {
    return (
      <Component classes={classes} {...props} />
    );
  }
);