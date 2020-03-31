import React, { useContext } from 'react'
import CountryContext from '../../context/countries/CountryContext'
import Expense from '../helpers/Expense';
import PlusBtn from '../UI/PlusBtn'
import bin from '../../imgs/bin.png'

export default function SingleCategory(props) {
  const context = useContext(CountryContext);
  const [category] =  context.selectedCategory;
  const getCountry = context.countries.filter(country => country._id === context.selectedCountry[0]._id);
  const getCategory =  getCountry[0].categories.filter(category => category._id === context.selectedCategory[0]._id);


  const deleteExpense = (expenseID) => {
    context.deleteExpense(getCountry[0]._id, category._id, expenseID);
  }

  const deleteCategory = () => {
    context.deleteCategory(getCountry[0]._id, category._id);
    props.handleViewChange('categories')
  }
  
  const loadExpenses = () => {
    const expenses =  getCategory[0].expenses.map(expense => (
      <Expense 
      key={expense._id} 
      expense={expense} 
      deleteExpense={deleteExpense} 
      handleViewChange={props.handleViewChange}/>)
    )
    return expenses;
  }
  
  return (
    <div>
      <div className="flex space-between margin-sides">
        <h3 className="underLine white-text">{category.category}</h3>
        <div className="icon-container" onClick={deleteCategory}>
          <img src={bin} alt="delete"/>
        </div>
      </div>
      <div className="expense-container">
        {loadExpenses()}
      </div>

      <div className="txt-center bg-light-blue pt3">
        <div className="inline-block plus-button-container" onClick={() => props.handleViewChange('addexpense')}>
            <PlusBtn/>
        </div>
      </div>
    </div>
  )
}
