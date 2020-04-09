import React from 'react'
import tripImgs from '../../helpers/getTripImgs';

export default function SelectTripImg(props) {

  return (
    <div className="modal">
      {tripImgs.map(img => {
       return ( <div onClick={() => props.selectImg(img)} className="trip-select-box">
                  <img className="trip-img" src={img} alt=""/>
                </div>)
      })}
    </div>
  )
}
