import { createRoot } from 'react-dom/client';

import 'animate.css';
import './global.scss';

setTimeout(async () => {
  const container = document.getElementById('root');
  if (!container) return;
  const { App } = await import('./app');
  createRoot(container).render(<App />);
}, 1_000);

