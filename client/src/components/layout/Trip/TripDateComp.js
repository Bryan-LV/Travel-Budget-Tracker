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

  // const addExpenses = ( ) => {
  //     // const createDateList = () => {
  // //   // iterate through expense list
  // //   sortedExpenses.forEach(expense => {
  // //     // use getDateFormat func on each expense to create a useable date
  // //     // then compare the usable date to the singleSetOfDates arr and add 
  // //     const createDate = getDateFormat(expense.date);
  // //     console.log(createDate);
  // //   })
  // //   // if dates match then place in that 
  // // }
  // }

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
      <h3>{props.date}</h3>
      {addExpenses()}
    </div>
  )
}
