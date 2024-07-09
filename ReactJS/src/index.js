import React from 'react';
import ReactDOM from 'react-dom/client'; // Import ReactDOM from 'react-dom/client'
import App from './app'; // Import the root component of your React application
import reportWebVitals from './reportWebVitals';

// Create a root element using ReactDOM.createRoot and pass the root element obtained from document.getElementById('root')
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render your root React component within the created root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Measure performance of your app using reportWebVitals
reportWebVitals();
