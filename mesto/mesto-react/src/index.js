import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';

const root = ReactDOM.createRoot(document.getElementById("root"));

const strictMode = process.env.NODE_ENV === 'production';

root.render(
  (strictMode && (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )) || <App />
);