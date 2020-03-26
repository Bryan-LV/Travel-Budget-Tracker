import React from 'react'
import enter from '../../imgs/enter.png'
import ToTitleCase from '../../helpers/ToTitleCase';
import getPaymentIcon from '../../helpers/getPaymentIcon';

export default function Expense(props) {
  const {name, _id, price, methodOfPayment, date} = props.expense;

  const handleDelete = () => {
    props.deleteExpense(_id);
  }

  const paymentIcon = getPaymentIcon(methodOfPayment);
  
  let capitalizedExpenseName = ToTitleCase(name);

  return (
    <div data-id={_id} className="expense-item category-box" onClick={() => props.handleViewChange('singleexpense', props.expense)}>
      <h3>{capitalizedExpenseName}</h3>
      <h3 className="secondary-font">${price}</h3>
      <div className="icon-container">
        <img className="expense-payment-icon" src={paymentIcon} alt="payment method"/>
      </div>
      <div className="icon-container">
        <img className="expense-payment-icon" src={enter} alt="payment method"/>
      </div>
      {/* <button onClick={handleDelete}>Delete expense</button> */}
    </div>
  )
}
