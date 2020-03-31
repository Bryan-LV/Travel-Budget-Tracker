import React, {useState, useContext, useEffect} from 'react'
import CountryContext from '../../context/countries/CountryContext';
import {Label, Button, Input, HollowButton, Textarea} from '../../styles/styles'
import currencies from '../../helpers/currencies'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import getPaymentIcon from '../../helpers/getPaymentIcon';
import toTitleCase from '../../helpers/ToTitleCase';

export default function AddExpense(props) {
  const [expense, setExpense] = useState({name: '', price: '', category:'', spread: 0, notes:''}) 
  const [isSpreadExpense, setIsSpreadExpense] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [isEditCategory, setIsEditCategory] = useState(false);
  const [category, setCategory] = useState('');

  const context = useContext(CountryContext);
  const [country] = context.selectedCountry;
  const allCategories = country.categories.map(category => category);
  const endDateForm = <DatePicker selected={endDate} onChange={date => setEndDate(date)} />

  useEffect(() => {
    if(props.expense && Object.keys(props.expense).length !== 0){
      setExpense(props.expense);
      setPaymentMethod(props.expense.methodOfPayment)
      setIsEdit(!isEdit);
      setIsEditCategory(!isEditCategory);
    }
  }, [])
  
  const handleExpenseChange = (e) => {
    setExpense({...expense, [e.target.name]: e.target.value});
  }

  const createPaymentBtns = () => {
    const methods = ['cash', 'credit', 'debt'];
    let paymentIcon;
    const list = methods.map(method => {
      paymentIcon = getPaymentIcon(method);
      const selectedMethod = method === paymentMethod ? 'selected-yellow-accent' : '';
      return (
          <div className={`${selectedMethod} payment-method`} onClick={() => setPaymentMethod(method)}>
            <div className="payment-icon" style={{width:'30px'}}>
              <img style={{maxWidth:'100%'}} src={paymentIcon} alt=""/>
            </div>
            <p className="payment-name">{method}</p>
          </div>
      )
  })
    return list
  }
  
  const getForeignCurrency = () => {
    const selectedCountry = context.selectedCountry[0].name.toLowerCase();
    const findCurrency = currencies.filter(country => country.countryName.toLowerCase() === selectedCountry);
    return findCurrency[0].currencyCode;
  }

  const submitExpense = (e) => {
    e.preventDefault();

    if(expense.name !== '' && expense.price !== 0){
      const [categoryID] = allCategories.filter(category => category.category.toLowerCase() === expense.category.toLowerCase())

      const expensePayload = {
        expenseName: expense.name,
        expensePrice: expense.price,
        countryID: context.selectedCountry[0]._id,
        categoryID: categoryID,
        baseCurrency: context.selectedCountry[0].baseCurrency,
        foreignCurrency: getForeignCurrency(),
        category: category,
        methodOfPayment: paymentMethod,
        spread:expense.spread,
        notes: expense.notes,
        date: startDate
      }

      if(Object.keys(props.expense).length !== 0){
        expensePayload.expenseID = props.expense._id;
        context.editExpense(expensePayload)
      } else {
        context.addExpense(expensePayload);
      }
      
      setExpense({
        name: '',
        price: '',
        category:''
      })
    }
  }

  const handleSpreadToggle = (e) => {
    e.preventDefault();
    setIsSpreadExpense(!isSpreadExpense)
  }
  
  const categoryField = isEditCategory ? <p className="input-style text-field" onClick={() => setIsEditCategory(!isEditCategory)}>{props.expense.category}</p> : (
    <select value={category} onChange={(e) => setCategory(e.target.value)}>
      {allCategories.map(category => <option value={category.category}>{category.category}</option> )}
    </select>
  );

  return (
    <div className="form padding-sides border-radius-top">
    <h3 className="underLine white-text">Add Expense</h3>
    <form>
        <Label htmlFor="name">Expense name</Label>
        <Input type="text" value={expense.name} name="name" id="name" onChange={(e) => handleExpenseChange(e)}/>

        <Label htmlFor="price">Price</Label>
        <Input type="text" value={expense.price} name="price" id="price" onChange={(e) => handleExpenseChange(e)}/>

        <Label htmlFor="methodOfPayment">Method of payment</Label>
        <div className="flex margin-btm">
          {createPaymentBtns()}
        </div>

        <Label htmlFor="category">Category</Label>
        {categoryField}

        <Label htmlFor="startDate">Date</Label>
        <DatePicker className="input-styles" selected={startDate} onChange={date => setStartDate(date)} />

        <HollowButton onClick={handleSpreadToggle}>Spread over dates</HollowButton>
        {isSpreadExpense && endDateForm}

        <h4>Add Photo</h4>
        <Textarea value={expense.notes} name="notes" onChange={(e) => setExpense({...expense, [e.target.name]: e.target.value})}></Textarea>

        <Button onClick={submitExpense}>Add Expense</Button>
      </form>
    </div>
  )
}
