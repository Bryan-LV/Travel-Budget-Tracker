import React from 'react'
import { useState } from 'react'
import TripCategories from './TripCategories';
import TripExpenses from './TripExpenses';

export default function TripBottom(props) {
  const [view, setView] = useState('categories');

  const View = () => {
    if(view === 'categories'){
      return <TripCategories country={props.country}/>
    }
    if(view === 'date'){
      return <TripExpenses/>
    }
  }
  
  const underLineCategory = view === 'categories' ? 'underLine': '';
  const underLineDate = view === 'date' ? 'underLine': '';

  return (
    <div>
      <h3 className={`${underLineCategory} white-text`} onClick={() => setView('categories')} >Category</h3>
      <h3 className={`${underLineDate} white-text`} onClick={() => setView('date')} >Date</h3>
      <div>
        {View()}
      </div>
    </div>
  )
}
