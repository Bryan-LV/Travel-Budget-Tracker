import React from 'react'
import { useState } from 'react'
import TripCategories from './TripCategories';
import TripExpensesByDate from './TripExpensesByDate';
import SingleCategory from '../../pages/SingleCategory'
import AddExpense from '../../forms/AddExpense';
// import EditExpense from '../../forms/EditExpense';
import AddCategory from '../../forms/AddCategory';
import SingleExpense from './SingleExpense';

export default function TripBottom(props) {
  const [view, setView] = useState('categories');
  const [expense, setExpense] = useState(null);

  const handleViewChange = (newView, payload) => {
    if(payload){
      setExpense(payload);
    }
    setView(newView)
  }
  
  const View = () => {
    if(view === 'categories'){
      return <TripCategories handleViewChange={handleViewChange} country={props.country}/>
    }
    if(view === 'date'){
      return <TripExpensesByDate handleViewChange={handleViewChange} country={props.country}/>
    }
    if(view === 'singlecategory'){
      return <SingleCategory handleViewChange={handleViewChange} />
    }
    if(view  === 'singleexpense'){
      return <SingleExpense expense={expense} handleViewChange={handleViewChange}/>
    }
    if(view === 'addcategory'){
      return <AddCategory/>
    }
    if(view === 'addexpense'){
      return <AddExpense/>
    }
    // if(view === 'editexpense'){
    //   return <EditExpense expense={expense}/>
    // }
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
