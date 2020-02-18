import React from 'react';
import {Route, Switch} from 'react-router-dom'
import './App.css';
import Home from './components/pages/Home';
import SingleCountry from './components/pages/SingleCountry';
import ItemBreakDown from './components/pages/ItemBreakDown';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Switch>
          <Route exact to="/" component={Home}/>
          <Route exact to="/" component={SingleCountry}/>
          <Route exact to="/" component={ItemBreakDown}/>
        </Switch>
      </header>
    </div>
  );
}

export default App;
