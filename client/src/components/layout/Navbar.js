import React from 'react'
import Currencies from '../helpers/Currencies'
import settings from '../../imgs/settings.png'

export default function Navbar(props) {
  return (
    <header>
      <div className="navbar pt2 pb2">
        <h3 className="white-text mt3 ml3">TripWallet</h3>
        <div className="settings mr3">
          <img className="settings-icon" src={settings} alt="settings"/>
        </div>
      </div>
    </header>
  )
}
