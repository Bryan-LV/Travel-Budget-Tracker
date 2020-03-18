import React from 'react'
import backArrow from '../../imgs/back.png'
import settings from '../../imgs/settings.png'

export default function Topbar(props) {
  return (
    <div className="topbar ml2 mr2">
      <div className="backArrow">
        <img className="backArrow-icon" src={backArrow} alt="back"/>
      </div>
      <div className="">
        <h2 className="topbar-title white-text">{props.title}</h2>
      </div>
      <div className="settings">
          <img className="settings-icon" src={settings} alt="settings"/>
      </div>
    </div>
  )
}
