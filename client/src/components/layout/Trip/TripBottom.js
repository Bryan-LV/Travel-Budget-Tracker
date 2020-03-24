import React from 'react'
import { useState } from 'react'
import TripCategories from './TripCategories';
import TripExpensesByDate from './TripExpensesByDate';
import SingleCategory from '../../pages/SingleCategory'

export default function TripBottom(props) {
  const [view, setView] = useState('categories');

  const handleSingleCategory = () => {
    setView('singlecategory')
  }
  

  const View = () => {
    if(view === 'categories'){
      return <TripCategories singlecategory={handleSingleCategory} country={props.country}/>
    }
    if(view === 'date'){
      return <TripExpensesByDate country={props.country}/>
    }
    if(view === 'singlecategory'){
      return <SingleCategory/>
    }
  }
  
  const underLineCategory = view === 'categories' ? 'underLine': '';
  const underLineDate = view === 'date' ? 'underLine': '';

  return (
    <div>
      <div className="view-container">
        <h3 className={`${underLineCategory} white-text view-link`} onClick={() => setView('categories')} >Category</h3>
        <h3 className={`${underLineDate} white-text view-link`} onClick={() => setView('date')} >Date</h3>
      </div>
      <div>
        {View()}
      </div>
    </div>
  )
}
