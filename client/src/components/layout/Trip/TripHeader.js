import React from 'react'
import ProgressBar from './ProgressBar'

export default function TripHeader(props) {
  return (
    <div className="trip-header">
      <h2 className="white-text txt-center secondary-font">${props.budget}</h2>
      <div className="monthly-budget-percentage-header">
        <h4 className="white-text secondary-font">{props.percentage}%</h4>
        <h4 className="white-text secondary-font">Current Spending</h4>
        <h4 className="white-text secondary-font">${props.total}</h4>
      </div>
      {<ProgressBar percentage={props.percentage}/>}
    </div>
  )
}
