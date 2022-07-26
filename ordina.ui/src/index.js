import React from 'react';
import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { ValueProvider } from './components/ValueContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ValueProvider>
      <App />
    </ValueProvider>
  </React.StrictMode>,
);
