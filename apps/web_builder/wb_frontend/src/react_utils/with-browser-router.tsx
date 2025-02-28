import React from 'react';
import { BrowserRouter } from "react-router-dom";

export const withBrowserRouter = (Component: React.FC<any>) => (props: any) => {
  return (
    <BrowserRouter>
      <Component {...props} />
    </BrowserRouter>
  );
};