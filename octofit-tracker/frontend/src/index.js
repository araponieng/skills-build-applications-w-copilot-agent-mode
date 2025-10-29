import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Console logging for debugging
console.log('=== OctoFit Tracker Frontend Initialization ===');
console.log('Environment Variables:');
console.log('REACT_APP_CODESPACE_NAME:', process.env.REACT_APP_CODESPACE_NAME);
console.log('NODE_ENV:', process.env.NODE_ENV);

// Check if we're in development and provide guidance for environment variables
if (!process.env.REACT_APP_CODESPACE_NAME) {
  console.warn('⚠️ REACT_APP_CODESPACE_NAME is not set. API calls may not work properly.');
  console.log('💡 To set it, run: export REACT_APP_CODESPACE_NAME=your-codespace-name');
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
