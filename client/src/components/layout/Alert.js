import React, { useContext, useEffect } from 'react'
import AlertContext from '../../context/alerts/AlertContext'

export default function Alert(props) {
  const {isShowing, alert, confirmAlert, removeAlert} = useContext(AlertContext);
  
  const handleClick = (answer) => {
    confirmAlert(answer)
    setTimeout(() => {
      removeAlert();
    }, 500);
  }
  
  useEffect(() => {
    if(isShowing && alert.needsConfirmation === false){
      setTimeout(() => {
        removeAlert()
      }, alert.duration);
    }
  }, [isShowing])

  if(isShowing){
    return (
      <div className="alert-modal">
        <h3 className="txt-center">{alert.text}</h3>
        {alert.needsConfirmation && (<div className="txt-center">
            <button className="alertBtn bg-accent" onClick={() => handleClick(true)}>Yes</button>
            <button className="alertBtn bg-grey" onClick={() => handleClick(false)}>No</button>
          </div> )}
      </div>
    )
  } else {
    return (<></>)
  }
}
