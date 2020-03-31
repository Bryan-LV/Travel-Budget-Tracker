import React, {useContext, useEffect} from 'react'
import formatDate from '../../../helpers/formatDate'
import toTitleCase from '../../../helpers/ToTitleCase'
import getPaymentIcon from '../../../helpers/getPaymentIcon';
import edit from '../../../imgs/edit.png'
import CountryContext from '../../../context/countries/CountryContext';

export default function SingleExpense(props) {
  const {name, price, category, methodOfPayment, notes, date} = props.expense;
  const context = useContext(CountryContext);

  const formatedDate = formatDate(date);
  const capName = toTitleCase(name)
  const capCategory = toTitleCase(category);
  const paymentIcon = getPaymentIcon(methodOfPayment);

  useEffect(() => {
    if(context.selectedCategory === null){
      const [country] = context.selectedCountry;
      const getCategory = country.categories.filter(category =>  category.category.toLowerCase() === props.expense.category.toLowerCase());
      context.getCategoryFromExpense(getCategory);
    }
  },[])

  return (
    <div className="margin-sides white-text secondary-font pb4">
      <div className="flex space-between">
        <h3 className="underLine">Expense</h3>
        <div className="icon-container" >
          <img style={{maxWidth:'80%'}} src={edit} alt="" onClick={() => props.handleViewChange('addexpense', props.expense)}/>
        </div>
      </div>
      <p className="full-width-underline">{formatedDate}</p>
      <p>{capName}</p>
      <p>${price}</p>
      <div className="icon-container">
        <img className="expense-payment-icon" src={paymentIcon} alt="payment method"/>
      </div>
      <p>{capCategory}</p>
      <div className="grey-border">
        <p className="pl1 grey-text note-text">{notes}</p>
      </div>
    </div>
  )
}
