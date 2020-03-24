import React, { useContext } from 'react'
import CountryContext from '../../context/countries/CountryContext'
import Expense from '../helpers/Expense';
import AddExpense from '../forms/AddExpense';

export default function SingleCategory(props) {
  const context = useContext(CountryContext);
  const [category] =  context.selectedCategory;
  const getCountry = context.countries.filter(country => country._id === context.selectedCountry[0]._id);
  const getCategory =  getCountry[0].categories.filter(category => category._id === context.selectedCategory[0]._id);


  const deleteExpense = (expenseID) => {
    context.deleteExpense(getCountry[0]._id, category._id, expenseID);
  }
  
  const loadExpenses = () => {
    const expenses =  getCategory[0].expenses.map(expense => <Expense key={expense._id} expense={expense} deleteExpense={deleteExpense}/>)
    return expenses;
  }
  
  return (
    <div>
      <h3 className="underLine white-text">{category.category}</h3>
      <AddExpense/>
      <div className="expense-container">
        {loadExpenses()}
      </div>
    </div>
  )
}
