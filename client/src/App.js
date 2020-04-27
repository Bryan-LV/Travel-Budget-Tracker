import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom'
import { Home, SingleCountry, Landing, UserPage } from './components/'
import { Navbar, Alert, UserSidebar } from './components'
import useSideBar from './hooks/useSideBar';
import AddTrip from './components/forms/AddTrip';
import './App.css';

function App(props) {
  const [showSideBar, toggleSideBar] = useSideBar();

  return (
    <div className="App">
      {props.location.pathname === "/home" && <Navbar handleSideBar={toggleSideBar} />}
      {props.location.pathname === "/user" && <Navbar handleSideBar={toggleSideBar} />}
      <Alert />
      <UserSidebar isOpen={showSideBar} handleSideBar={toggleSideBar} />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/home/:trip" component={SingleCountry} />
        <Route exact path="/addtrip" component={AddTrip} />
        <Route exact path="/user" component={UserPage} />
      </Switch>
    </div>
  );
}

export default withRouter(App);

