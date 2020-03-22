import React from 'react'
import backArrow from '../../imgs/back.png'
import settings from '../../imgs/settings.png'
import { Link , withRouter} from 'react-router-dom'

function Topbar(props) {
  const handleBackBtn = () => {
    props.history.goBack();
  }

  return (
    <div className="topbar mt2 ml2 mr2">
      <div className="backArrow" onClick={handleBackBtn}>
        <img className="backArrow-icon" src={backArrow} alt="back"/>
      </div>
      <div className="">
        <h3 className="topbar-title white-text">{props.title}</h3>
      </div>
      <div className="currency-circle">
        <h4 className="white-text">{props.currency}</h4>
      </div>
    </div>
  )
}

export default withRouter(Topbar)
