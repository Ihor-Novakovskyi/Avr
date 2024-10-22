import React from 'react';
import ReactDOM from 'react-dom/client';
import MainPage from './Pages/MainPage/MainPage';
import App from './App';
import { Provider } from 'react-redux';
import store from './utils/store';
import './index.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App/>
  </Provider>
);
