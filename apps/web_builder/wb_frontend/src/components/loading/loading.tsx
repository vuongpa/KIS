import { FC, memo } from 'react';

type LoadingProps = {
  message?: string
};

export const Loading: FC<LoadingProps> = memo(({
  message = 'loading...'
}) => {
  return (
    <span>{message}</span>
  );
});
