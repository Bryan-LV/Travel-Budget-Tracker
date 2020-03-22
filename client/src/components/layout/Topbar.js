import React from 'react'
import backArrow from '../../imgs/back.png'
import settings from '../../imgs/settings.png'
import { Link , withRouter} from 'react-router-dom'

function Topbar(props) {
  const handleBackBtn = () => {
    props.history.goBack();
  }

  return (
    <div className="topbar ml2 mr2">
      <div className="backArrow" onClick={handleBackBtn}>
        <img className="backArrow-icon" src={backArrow} alt="back"/>
      </div>
      <div className="">
        <h2 className="topbar-title white-text">{props.title}</h2>
      </div>
      <div className="currency-circle">
        <h3 className="white-text">{props.currency}</h3>
      </div>
    </div>
  )
}

export default withRouter(Topbar)
