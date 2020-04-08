import React from 'react'
import settings from '../../imgs/settings.png'
import { Link } from 'react-router-dom'

export default function Navbar(props) {
  return (
    <header>
      <div className="navbar pt2 pb2">
        <Link to="/home" className="nav-title"><h3 className="white-text mt3 ml3">TripWallet</h3></Link>
        <div className="settings mr3" onClick={props.handleSideBar}>
          <img className="settings-icon" src={settings} alt="settings"/>
        </div>
      </div>
    </header>
  )
}

