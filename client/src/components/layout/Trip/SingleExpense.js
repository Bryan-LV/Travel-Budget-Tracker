import React from 'react'
import formatDate from '../../../helpers/formatDate'
import toTitleCase from '../../../helpers/ToTitleCase'
import getPaymentIcon from '../../../helpers/getPaymentIcon';
import edit from '../../../imgs/edit.png'

export default function SingleExpense(props) {
  const {name, price, category, methodOfPayment, notes, date} = props.expense;

  const formatedDate = formatDate(date);
  const capName = toTitleCase(name)
  const paymentIcon = getPaymentIcon(methodOfPayment);

  return (
    <div className="margin-sides white-text secondary-font pb4">
      <div className="flex space-between">
        <h3 className="underLine">Expense</h3>
        <div className="icon-container">
          <img style={{maxWidth:'80%'}} src={edit} alt=""/>
        </div>
      </div>
      <p className="full-width-underline">{formatedDate}</p>
      <p>{capName}</p>
      <p>${price}</p>
      <div className="icon-container">
        <img className="expense-payment-icon" src={paymentIcon} alt="payment method"/>
      </div>
      <p>{category}</p>
      <div className="grey-border">
        <p className="pl1 grey-text note-text">{notes}</p>
      </div>
    </div>
  )
}
