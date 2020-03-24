import React, {useState, useContext} from 'react'
import CountryContext from '../../context/countries/CountryContext';
import {Label, Button, Input} from '../../styles/styles'
import currencies from '../../helpers/currencies'

export default function AddExpense(props) {
  const [expense, setExpense] = useState({
    name: '',
    price: '',
    category:''
  })

  const context = useContext(CountryContext);
  const [category] =  context.selectedCategory;

  const handleExpenseChange = (e) => {
    setExpense({...expense, [e.target.name]: e.target.value});
  }

  const getForeignCurrency = () => {
    const selectedCountry = context.selectedCountry[0].name.toLowerCase();
    const findCurrency = currencies.filter(country => country.countryName.toLowerCase() === selectedCountry);
    return findCurrency[0].currencyCode;
  }

  const submitExpense = (e) => {
    e.preventDefault();

    if(expense.name !== '' && expense.price !== 0){
      const expensePayload = {
        expenseName: expense.name,
        expensePrice: expense.price,
        countryID: context.selectedCountry[0]._id,
        categoryID: category._id,
        baseCurrency: context.selectedCountry[0].baseCurrency,
        foreignCurrency: getForeignCurrency()
      }

      context.addExpense(expensePayload);
      
      setExpense({
        name: '',
        price: '',
        category:''
      })
    }
  }

  return (
    <div>
    <form>
        <Label htmlFor="name">Add new expense</Label>
        <Input type="text" value={expense.name} name="name" id="name" onChange={(e) => handleExpenseChange(e)}/>
        <Label htmlFor="price">Add new price</Label>
        <Input type="text" value={expense.price} name="price" id="price" onChange={(e) => handleExpenseChange(e)}/>
        <Label htmlFor="category">Category</Label>
        <Input type="text" value={expense.category} name="category" id="category" onChange={(e) => handleExpenseChange(e)}/>
        <Button onClick={submitExpense}>add expense</Button>
      </form>
    </div>
  )
}
