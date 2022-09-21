import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ValueProvider } from './components/ValueContext';
import { AuthProvider } from './components/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* TODO When split up context and providers only put arround necessary components */}
    <AuthProvider>
      <ValueProvider>
        <App />
      </ValueProvider>
    </AuthProvider>
  </React.StrictMode>,
);
