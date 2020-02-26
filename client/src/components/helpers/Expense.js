import React from 'react'

export default function Expense(props) {
  const {name, _id, price} = props.expense;

  return (
    <div data-id={_id}>
      <h2>{name}</h2>
      <h3>{price}</h3>
    </div>
  )
}
