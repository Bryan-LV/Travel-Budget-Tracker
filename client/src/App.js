import React from 'react';
import {Route, Switch} from 'react-router-dom'
import './styles/basscss.css'
import './App.css';
import Home from './components/pages/Home';
import SingleCountry from './components/pages/SingleCountry';
import SingleCategory from './components/pages/SingleCategory';
import CountryState from './context/countries/CountryState';
import Navbar from './components/layout/Navbar';
import Landing from './components/pages/Landing';
import AuthState from './context/auth/AuthState';
import Register from './components/helpers/Register';
import AddTrip from './components/helpers/AddTrip';

function App() {
  return (
    <AuthState>
      <CountryState>
        <div className="App">
            <Navbar/>
            <Switch>
              <Route exact path="/" component={Landing}/>
              <Route exact path="/register" component={Register}/>
              <Route exact path="/home" component={Home}/>
              <Route exact path="/addtrip" component={AddTrip}/>
              <Route exact path="/:country" component={SingleCountry}/>
              <Route exact path="/:country/:category" component={SingleCategory}/>
            </Switch>
        </div>
      </CountryState>
    </AuthState>
  );
}

export default App;
