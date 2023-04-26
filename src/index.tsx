import React from 'react';
import ReactDOM from 'react-dom/client';

import '@styles/global.scss';
import App from './App';
import { ApiPollingProvider } from './store/ApiRequestPollingContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement).render(
  <React.StrictMode>
    <ApiPollingProvider>
      <App />
    </ApiPollingProvider>
  </React.StrictMode>,
);
