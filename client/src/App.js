import React, {useState} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom'
import './styles/basscss.css'
import './App.css';
import Home from './components/pages/Home';
import SingleCountry from './components/pages/SingleCountry';
import CountryState from './context/countries/CountryState';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Landing from './components/pages/Landing';
import AuthState from './context/auth/AuthState';
import AddTrip from './components/forms/AddTrip';
import AlertState from './context/alerts/AlertState';
import UserSidebar from './components/layout/User/UserSidebar';
import UserPage from './components/pages/UserPage';

function App(props) {
  const [sideBar, setSideBar] = useState(false);

  const handleSideBar = () => {
    setSideBar(!sideBar);
  }



  return (
    <AuthState>
      <AlertState>
      <CountryState>
        <div className="App">
          {props.location.pathname === "/home" && <Navbar handleSideBar={handleSideBar}/> }
          {props.location.pathname === "/user" && <Navbar handleSideBar={handleSideBar}/> }
            <Alert/>
            <UserSidebar isOpen={sideBar} handleSideBar={handleSideBar}/>
            <Switch>
              <Route exact path="/" component={Landing}/>
              <Route exact path="/home" component={Home}/>
              <Route exact path="/user" component={UserPage}/>
              <Route exact path="/addtrip" component={AddTrip}/>
              <Route exact path="/home/:trip" component={SingleCountry}/>
            </Switch>
        </div>
      </CountryState>
      </AlertState>
    </AuthState>
  );
}

export default withRouter(App);
