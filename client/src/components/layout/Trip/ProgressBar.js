import React from 'react'
import { MyBar } from '../../../styles/styles'

export default function ProgressBar(props) {

  const myBarBackgroundColor = (num) => {
    if(num >= 80){
      return '#E85959'
    } else {
      return '#59E8AC'
    }
  }
  

  const myBarPercentage = () => {
    const getPercentage = Math.floor(props.percentage).toFixed(0);
    const result = `${getPercentage}%`;
    return <MyBar width={result} backgroundColor={myBarBackgroundColor(getPercentage)}/>
  }
  

  return (
    <div className="progress-bar">
      {myBarPercentage()}
    </div>
  )
}
