import React from 'react'

export default function Expense(props) {
  const {name, _id, price} = props.expense;

  const handleDelete = () => {
    props.deleteExpense(_id);
  }
  

  return (
    <div data-id={_id}>
      <h2>{name}</h2>
      <h3>{price}</h3>
      <button onClick={handleDelete}>Delete expense</button>
    </div>
  )
}
