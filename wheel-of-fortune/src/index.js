import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Navbar from './Navbar';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

if (window.location.pathname === '/') {
  window.location.replace('/start');
}

const renderApp = () => {
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <div className='flex flex-col h-screen'>
          <Navbar />
          <App />
        </div>
      </BrowserRouter>
    </React.StrictMode>
  );
};

renderApp();
