import React, { useState, useContext, useEffect } from 'react'
import { withRouter } from 'react-router-dom';
import CountryContext from '../../../context/countries/CountryContext';
import AlertContext from '../../../context/alerts/AlertContext';
import TripCategories from './TripCategories';
import TripExpensesByDate from './TripExpensesByDate';
import SingleCategory from './SingleCategory'
import SingleExpense from './SingleExpense';
import { AddExpense, EditExpense, AddCategory } from '../../forms/'
import bin from '../../../imgs/bin.png'
import edit from '../../../imgs/edit.png'

function TripBottom(props) {
  const [view, setView] = useState('categories');
  const [expense, setExpense] = useState(null);
  const context = useContext(CountryContext);
  const alertContext = useContext(AlertContext);

  const handleViewChange = (newView, payload) => {
    if (payload === '') {
      setExpense(null);
    }
    if (payload) {
      setExpense(payload);
    }
    setView(newView)
  }

  const View = () => {
    if (view === 'categories') {
      return <TripCategories handleViewChange={handleViewChange} country={props.country} />
    }
    if (view === 'date') {
      return <TripExpensesByDate handleViewChange={handleViewChange} country={props.country} />
    }
    if (view === 'singlecategory') {
      return <SingleCategory handleViewChange={handleViewChange} />
    }
    if (view === 'singleexpense') {
      return <SingleExpense expense={expense} handleViewChange={handleViewChange} />
    }
    if (view === 'addcategory') {
      return <AddCategory />
    }
    if (view === 'addexpense') {
      return <AddExpense handleViewChange={handleViewChange} />
    }
    if (view === 'editexpense') {
      return <EditExpense expense={expense} handleViewChange={handleViewChange} />
    }
  }

  const underLineCategory = view === 'categories' ? 'underLine' : '';
  const underLineDate = view === 'date' ? 'underLine' : '';


  // useEffect(() => {
  //   if (alertContext.confirm) {
  //     context.deleteCountry(props.country._id);
  //     props.history.push('/home');
  //   }
  // }, [alertContext.confirm])

  const deleteCountry = () => {
    alertContext.addAlert({ text: 'Are you sure you want to delete?', needsConfirmation: true });
  }

  const editCountry = () => {

  }

  return (
    <div>
      <div className="view-container">
        <div className="flex">
          <h3 className={`${underLineCategory} white-text view-link`} onClick={() => setView('categories')} >Category</h3>
          <h3 className={`${underLineDate} white-text view-link`} onClick={() => setView('date')} >Date</h3>
        </div>
        <div className="icon-container" >
          <div onClick={deleteCountry}>
            <img src={bin} alt="delete" />
          </div>
          <div onClick={editCountry}>
            <img src={edit} alt="" />
          </div>
        </div>
      </div>
      <div>
        {View()}
      </div>
    </div>
  )
}

export default withRouter(TripBottom);