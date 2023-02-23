import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Navbar from './Navbar';
import Login from './Login';
import Registration from './Registration';
import reportWebVitals from './reportWebVitals';

const navbar = ReactDOM.createRoot(document.getElementById('navbar'));
const root = ReactDOM.createRoot(document.getElementById('root'));

export const renderApp = () => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

export const renderNavbar = () => {
  navbar.render(<Navbar />);
};

export const renderLogin = () => {
  root.render(<Login />);
};

export const renderRegistration = () => {
  root.render(<Registration />);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

renderNavbar();
renderLogin();