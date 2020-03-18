import React from 'react'
import addButton from '../../imgs/add-button.png'
import { withRouter } from 'react-router-dom'

function PlusButton(props) {
  return (
    <div className="plus-btn-container mb2">
      <div className="plus-btn-bg" aria-role="button">
        <img className="plus-btn-icon" src={addButton} alt="button" onClick={(e) => props.history.push(`/addtrip`)}/>
      </div>
    </div>
  )
}


export default withRouter(PlusButton)