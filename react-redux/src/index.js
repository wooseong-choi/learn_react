import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import App_reducer from './App_reducer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <h1>Reducer</h1>
    <App_reducer/>
  </React.StrictMode>
);

