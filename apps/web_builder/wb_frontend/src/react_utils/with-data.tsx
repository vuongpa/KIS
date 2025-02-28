import { curryN } from 'ramda';

export type HasData = {
  data: any
};

export const withData = curryN(
  2,
  (data: any, Component: React.FC<any>) => (props: any) => {
    return (
      <Component {...props} data={data} />
    );
  }
);