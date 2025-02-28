import { useLayoutEffect } from 'react';

export const useScrollToTop = () => {
  useLayoutEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 0);
  }, []);
}