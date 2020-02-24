import React from 'react';
import {Route, Switch} from 'react-router-dom'
import './App.css';
import Home from './components/pages/Home';
import SingleCountry from './components/pages/SingleCountry';
import SingleCategory from './components/pages/SingleCategory';
import CountryState from './context/countries/CountryState';
import Navbar from './components/layout/Navbar';

function App() {
  return (
    <CountryState>
      <div className="App">
          <Navbar/>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/:country" component={SingleCountry}/>
            <Route exact path="/:country/:category" component={SingleCategory}/>
          </Switch>
      </div>
    </CountryState>
  );
}

export default App;
