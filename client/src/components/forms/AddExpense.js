import React, {useState, useContext, useEffect} from 'react'
import CountryContext from '../../context/countries/CountryContext';
import {Label, Button, Input, HollowButton, Textarea} from '../../styles/styles'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import getPaymentIcon from '../../helpers/getPaymentIcon';
import toTitleCase from '../../helpers/ToTitleCase';
import getForeignCurrency from '../../helpers/getForeignCurrency';


export default function AddExpense(props) {
  const context = useContext(CountryContext);
  const [country] = context.selectedCountry;
  const allCategories = country.categories.map(category => category);
  let category = null;

  const [expense, setExpense] = useState({name: '', price: '', category: allCategories[0].category, spread: 0, notes:''}) 
  const [isSpreadExpense, setIsSpreadExpense] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [paymentMethod, setPaymentMethod] = useState('');

  const getCategory = () => {
    const [category] = allCategories.filter(item => item.category === expense.category)
    return category;
  }

  useEffect(() => {
      if(context.selectedCategory !== null){
        category = context.selectedCategory[0];
        setExpense({...expense, category: context.selectedCategory[0].category });
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
          <div className={`${selectedMethod} payment-method ${method === 'credit' ? 'margin-sides-5': ''}`} onClick={() => setPaymentMethod(method)}>
            <div className="payment-icon" style={{width:'26px'}}>
              <img style={{maxWidth:'100%'}} src={paymentIcon} alt=""/>
            </div>
            <p className="payment-name">{method}</p>
          </div>
      )
  })
    return list
  }

  const submitExpense = (e) => {
    e.preventDefault();

    if(category === null){
      category = getCategory();
    }

    if(expense.name !== '' && expense.price !== 0){
      const expensePayload = {
        expenseName: toTitleCase(expense.name),
        expensePrice: expense.price,
        countryID: context.selectedCountry[0]._id,
        categoryID: category._id,
        baseCurrency: context.selectedCountry[0].baseCurrency,
        foreignCurrency: getForeignCurrency(context.selectedCountry[0].name),
        category: expense.category,
        methodOfPayment: paymentMethod,
        spread:expense.spread,
        notes: expense.notes,
        date: startDate
      }

      context.addExpense(expensePayload);
      setExpense({name: '', price: '', category:'', spread: 0, notes:''});
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
        <Input type="text" value={expense.name} name="name" id="name" onChange={handleExpenseChange}/>

        <Label htmlFor="price">Price</Label>
        <Input type="number" value={expense.price} name="price" id="price" onChange={handleExpenseChange}/>

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
          {allCategories.map(category => <option value={category.category}>{category.category}</option> )}
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
