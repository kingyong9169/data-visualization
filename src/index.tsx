import React from 'react';
import ReactDOM from 'react-dom/client';

import '@styles/global.scss';
import App from './App';
import { ApiPollingProvider } from './store/ApiRequestPollingContext';
import { TimeControlProvider } from './store/TimeControlProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement).render(
  <React.StrictMode>
    <TimeControlProvider>
      <ApiPollingProvider>
        <App />
      </ApiPollingProvider>
    </TimeControlProvider>
  </React.StrictMode>,
);
