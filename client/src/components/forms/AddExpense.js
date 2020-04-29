import React, { useState, useContext, useEffect } from 'react'
import CountryContext from '../../context/countries/CountryContext';
import AlertContext from '../../context/alerts/AlertContext';
import { Label, Button, Input, HollowButton, Textarea } from '../../styles/styles'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import getPaymentIcon from '../../helpers/getPaymentIcon';
import toTitleCase from '../../helpers/ToTitleCase';
import getForeignCurrency from '../../helpers/getForeignCurrency';


export default function AddExpense(props) {
  const context = useContext(CountryContext);
  const alertContext = useContext(AlertContext);
  const [country] = context.selectedCountry;
  const allCategories = country.categories.map(category => category);
  const setCategory = allCategories.length > 0 ? allCategories[0].category : '';
  let category = null;

  const [expense, setExpense] = useState({ name: '', price: '', category: setCategory, spread: 0, notes: '' })
  const [isSpreadExpense, setIsSpreadExpense] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [paymentMethod, setPaymentMethod] = useState('');

  const getCategory = () => {
    const [category] = allCategories.filter(item => item.category === expense.category)
    return category;
  }

  useEffect(() => {
    if (allCategories.length === 0) {
      props.handleViewChange('addcategory');
      alertContext.addAlert({ text: 'Please create category first', needsConfirmation: false });
    }
    if (context.selectedCategory !== null) {
      category = context.selectedCategory[0];
      setExpense({ ...expense, category: context.selectedCategory[0].category });
    }
  }, [])

  const handleExpenseChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  }

  const createPaymentBtns = () => {
    const methods = ['cash', 'credit', 'debt'];
    let paymentIcon;
    const list = methods.map((method, index) => {
      paymentIcon = getPaymentIcon(method);
      const selectedMethod = method === paymentMethod ? 'selected-yellow-accent' : '';
      return (
        <div className={`${selectedMethod} payment-method ${method === 'credit' ? 'margin-sides-5' : ''}`} onClick={() => setPaymentMethod(method)} key={index}>
          <div className="payment-icon" style={{ width: '26px' }}>
            <img style={{ maxWidth: '100%' }} src={paymentIcon} alt="" />
          </div>
          <p className="payment-name">{method}</p>
        </div>
      )
    })
    return list
  }

  const submitExpense = (e) => {
    e.preventDefault();

    if (category === null) {
      category = getCategory();
    }

    if (expense.name === '') alertContext.addAlert({ text: 'Name field can not be blank', needsConfirmation: false })
    if (expense.expense === '') alertContext.addAlert({ text: 'Expense field can not be blank', needsConfirmation: false })
    if (paymentMethod === '') alertContext.addAlert({ text: 'Choose payment method', needsConfirmation: false })

    if (expense.name !== '' && expense.price !== 0 && paymentMethod !== '') {
      const expensePayload = {
        expenseName: toTitleCase(expense.name),
        expensePrice: expense.price,
        countryID: context.selectedCountry[0]._id,
        categoryID: category._id,
        baseCurrency: context.selectedCountry[0].baseCurrency,
        foreignCurrency: getForeignCurrency(context.selectedCountry[0].name),
        category: expense.category,
        methodOfPayment: paymentMethod,
        spread: expense.spread,
        notes: expense.notes,
        date: startDate,
      }

      if (isSpreadExpense) {
        expensePayload.endDate = endDate
      }

      context.addExpense(expensePayload);
      setExpense({ ...expense, name: '', price: '', spread: 0, notes: '' });
    }
  }

  const handleSpreadToggle = (e) => {
    e.preventDefault();
    setIsSpreadExpense(!isSpreadExpense)
  }

  return (
    <div className="form padding-sides border-radius-top">
      <h3 className="underLine white-text">Add Expense</h3>
      <form>
        <Label htmlFor="name">Expense name</Label>
        <Input type="text" value={expense.name} name="name" id="name" onChange={handleExpenseChange} />

        <Label htmlFor="price">Price</Label>
        <Input type="number" value={expense.price} name="price" id="price" onChange={handleExpenseChange} />

        <Label htmlFor="methodOfPayment">Method of payment</Label>
        <div className="flex margin-btm">
          {createPaymentBtns()}
        </div>

        <Label htmlFor="category">Category</Label>
        <select
          className="margin-btm input-style selectElm"
          name="category"
          value={expense.category}
          onChange={handleExpenseChange}>
          {allCategories.map((category, index) => <option value={category.category} key={index} >{category.category}</option>)}
        </select>

        <Label htmlFor="startDate">Date</Label>
        <DatePicker className="input-style" selected={startDate} onChange={date => setStartDate(date)} />

        <HollowButton className="margin-btm" onClick={handleSpreadToggle}>Spread over dates</HollowButton>
        {isSpreadExpense && <DatePicker className="input-style" selected={endDate} onChange={date => setEndDate(date)} />}

        <Textarea className="margin-btm" value={expense.notes} name="notes" placeholder="Add a note..." onChange={handleExpenseChange}></Textarea>

        <Button onClick={submitExpense}>Add Expense</Button>
      </form>
    </div>
  )
}
