import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom'
import './styles/basscss.css'
import './App.css';
import Home from './components/pages/Home';
import SingleCountry from './components/pages/SingleCountry';
import CountryState from './context/countries/CountryState';
import Navbar from './components/layout/Navbar';
import Landing from './components/pages/Landing';
import AuthState from './context/auth/AuthState';
import Register from './components/forms/Register';
import AddTrip from './components/forms/AddTrip';

function App(props) {
  return (
    <AuthState>
      <CountryState>
        <div className="App">
          {props.location.pathname === "/home" && <Navbar/> }
            <Switch>
              <Route exact path="/" component={Landing}/>
              <Route exact path="/register" component={Register}/>
              <Route exact path="/home" component={Home}/>
              <Route exact path="/addtrip" component={AddTrip}/>
              <Route exact path="/home/:trip" component={SingleCountry}/>
            </Switch>
        </div>
      </CountryState>
    </AuthState>
  );
}

export default withRouter(App);
