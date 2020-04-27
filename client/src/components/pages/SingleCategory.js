import React, { useContext, useEffect } from 'react'
import CountryContext from '../../context/countries/CountryContext'
import AlertContext from '../../context/alerts/AlertContext';
import Expense from '../helpers/Expense';
import PlusBtn from '../UI/PlusBtn'
import bin from '../../imgs/bin.png'

export default function SingleCategory(props) {
  const { deleteCategory, deleteExpense, selectedCategory, selectedCountry } = useContext(CountryContext);
  const { confirm, addAlert } = useContext(AlertContext);
  const [category] = selectedCategory;
  const [country] = selectedCountry;

  useEffect(() => {
    console.log('single cat');
    if (confirm) {
      deleteCategory(country._id, category._id);
      props.handleViewChange('categories')
    }
  }, [confirm])


  const DeleteExpense = (expenseID) => {
    deleteExpense(country._id, category._id, expenseID);
  }

  const DeleteCategory = () => {
    addAlert({ text: 'Are you sure you want to delete?', needsConfirmation: true });
    // after alert confirm useeffect will run delete func
  }

  const loadExpenses = () => {
    const expenses = category.expenses.map(expense => (
      <Expense
        key={expense._id}
        expense={expense}
        deleteExpense={DeleteExpense}
        handleViewChange={props.handleViewChange} />)
    )
    return expenses;
  }

  return (
    <div>
      <div className="flex space-between margin-sides">
        <h3 className="underLine white-text">{category.category}</h3>
        <div className="icon-container" onClick={DeleteCategory}>
          <img src={bin} alt="delete" />
        </div>
      </div>
      <div className="expense-container">
        {loadExpenses()}
      </div>

      <div className="txt-center bg-light-blue pt3">
        <div className="inline-block plus-button-container" onClick={() => props.handleViewChange('addexpense')}>
          <PlusBtn />
        </div>
      </div>
    </div>
  )
}
