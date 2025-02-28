import { Toaster } from 'react-hot-toast';

const toastOptions={
  duration: 1_500,
  className: 'toast-item',
}

export const withToaster = (Component: React.FC<any>) => (props: any) => {
  return (
    <>
      <Component {...props} />
      <Toaster
        position="top-center"
        toastOptions={toastOptions}
      />
    </>
  );
};