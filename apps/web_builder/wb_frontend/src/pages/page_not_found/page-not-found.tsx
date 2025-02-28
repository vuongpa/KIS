import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { DefaultFcProps } from '../../react_utils';

export const PageNotFound: React.FC<DefaultFcProps> = () => {
  return (
    <div className="app-content">
      <div className="flex flex-col justify-center items-center h-[400px] mt-12">
        <h1 className="text-[48px] font-bold">Page Not Found :(</h1>
        <p>
          Oops! 😖 The requested URL was not found on this server.
        </p>
        <Button
          className='mt-6'
          component={Link}
          to="/"
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
};
