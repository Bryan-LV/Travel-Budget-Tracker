import React from 'react'

export default function TripBox(props) {
  const {name, startDate, endDate, budget} = props.country;

  return (
    <div className="trip-box">
      <div className="trip-box-top">
        <div className="trip-box-img border-radius-top"></div>
      </div>
      <div className="trip-box-bottom border-radius-bottom p2 bg-grey">
        <h3 className="trip-box-title">{name}</h3>
        <h4 className="trip-box-dates">{startDate} - {endDate}</h4>
        <h4>${budget} / $31.60 per day</h4>
      </div>
    </div>
  )
}
