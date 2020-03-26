import React from 'react'
import months from '../../../helpers/months'
import Expense from '../../helpers/Expense';

export default function TripDateComp(props) {

  const getDateFormat = (DATE) => {
    const date = new Date(DATE);
    const getMonth = date.getMonth();
    const month = months[getMonth];
    const day = date.getDate();
    const year = date.getFullYear();
    const newDate = `${month} ${day}, ${year}`
    return newDate;
  }

  const addExpenses = () => {
    let list = props.expenses.map(expense => {
      const getDate = getDateFormat(expense.date);
      if(getDate === props.date){
        return <Expense expense={expense}/>
      }
    })
    return list
  }
  

  return (
    <div>
      <p className="white-text expense-date secondary-font">{props.date}</p>
      {addExpenses()}
    </div>
  )
}
