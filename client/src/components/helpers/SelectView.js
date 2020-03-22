import React, {useState} from 'react'

export default function SelectView(props) {
  const [view, setView] = useState('categories');

  const handleClick = (view) => {
    console.log(view);
  }
  

  return (
    <div className="select-view-container">
      <input type="radio" name="categories" id=""/>
      <input type="radio" name="" id=""/>
    </div>
  )
}
