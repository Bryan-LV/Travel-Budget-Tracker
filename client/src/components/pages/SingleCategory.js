import React, { useContext, useState } from 'react'
import CountryContext from '../../context/countries/CountryContext'
import Expense from '../helpers/Expense';

export default function SingleCategory(props) {
  const [expense, setExpense] = useState({
    name: '',
    price: ''
  })
  const context = useContext(CountryContext);
  const [category] =  context.selectedCategory;

  const loadExpenses = () => {
    const expenses =  category.expenses.map(expense => <Expense key={expense._id} expense={expense}/>)
    return expenses;
  }
  
  const handleExpenseChange = (e) => {
    setExpense({...expense, [e.target.name]: e.target.value});
  }
  

  const submitExpense = (e) => {
    e.preventDefault();
    if(expense.name !== '' && expense.price !== 0){
      const expensePayload = {
        expense,
        categoryID: category._id,
        countryID: context.selectedCountry[0]._id
      }
      context.addExpense(expensePayload);
      setExpense({
        name: '',
        price: ''
      })
    }
  }
  

  return (
    <div>
      <form>
        <label htmlFor="name">Add new expense</label>
        <input type="text" value={expense.name} name="name" id="name" onChange={(e) => handleExpenseChange(e)}/>
        <label htmlFor="price">Add new price</label>
        <input type="text" value={expense.price} name="price" id="price" onChange={(e) => handleExpenseChange(e)}/>
        <button onClick={submitExpense}>add expense</button>
      </form>
      <h2>{category.category}</h2>
      <div className="expense-container">
        {loadExpenses()}
      </div>
    </div>
  )
}
