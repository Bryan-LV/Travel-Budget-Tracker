import React from 'react'
import ToTitleCase from '../../helperFuncs/ToTitleCase';

export default function Expense(props) {
  const {name, _id, price} = props.expense;

  const handleDelete = () => {
    props.deleteExpense(_id);
  }
  
  let capitalizedExpenseName = ToTitleCase(name);

  return (
    <div data-id={_id} className="expense-item">
      <h3>{capitalizedExpenseName}</h3>
      <h3 className="secondary-font">${price}</h3>
      <button onClick={handleDelete}>Delete expense</button>
    </div>
  )
}
