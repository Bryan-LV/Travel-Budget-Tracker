import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import CountryState from './context/countries/CountryState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alerts/AlertState';
import { BrowserRouter } from 'react-router-dom'
import './styles/basscss.css'

const app = (
  <AuthState>
    <AlertState>
      <CountryState>
        <BrowserRouter>
          <App></App>
        </BrowserRouter>
      </CountryState>
    </AlertState>
  </AuthState>
)

ReactDOM.render(app, document.getElementById('root'));