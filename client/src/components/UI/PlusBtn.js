import React from 'react'
import addButton from '../../imgs/add-button.png'
import { withRouter } from 'react-router-dom'

function PlusBtn(props) {
  return (
    <div className="plus-btn-container mb2">
      <div className="plus-btn-bg">
        <img className="plus-btn-icon" src={addButton} alt="button"/>
      </div>
    </div>
  )
}


export default withRouter(PlusBtn)