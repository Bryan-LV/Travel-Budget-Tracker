import React, {useState, useContext, useEffect} from 'react'
import CountryContext from '../../context/countries/CountryContext';
import {Label, Button, Input, HollowButton, Textarea} from '../../styles/styles'
import currencies from '../../helpers/currencies'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import cash from '../../imgs/money.png';
import credit from '../../imgs/credit-card.png';
import debt from '../../imgs/debt.png';
import getPaymentIcon from '../../helpers/getPaymentIcon';

export default function AddExpense(props) {
  const [expense, setExpense] = useState({})

  const [isSpreadExpense, setIsSpreadExpense] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [paymentMethod, setPaymentMethod] = useState('');

  const context = useContext(CountryContext);
  const [category] =  context.selectedCategory;

  const handleExpenseChange = (e) => {
    setExpense({...expense, [e.target.name]: e.target.value});
  }

  const handlePaymentMethod = (method) => {
    setPaymentMethod(method);
  }

  const createPaymentBtns = () => {
    const methods = ['cash', 'credit', 'debt'];
    let paymentIcon;
    const list = methods.map(method => {
      paymentIcon = getPaymentIcon(method);
      const selectedMethod = method === paymentMethod ? 'selected-yellow-accent' : '';
      return (
          <div className={`${selectedMethod} payment-method`} onClick={() => handlePaymentMethod(method)}>
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
      const expensePayload = {
        expenseName: expense.name,
        expensePrice: expense.price,
        countryID: context.selectedCountry[0]._id,
        categoryID: category._id,
        baseCurrency: context.selectedCountry[0].baseCurrency,
        foreignCurrency: getForeignCurrency(),
        category: expense.category,
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

  const endDateForm = <DatePicker selected={endDate} onChange={date => setEndDate(date)} />

  const handleSpreadToggle = (e) => {
    e.preventDefault();
    setIsSpreadExpense(!isSpreadExpense)
  }

  useEffect(() => {
    if(Object.keys(props.expense).length !== 0){
      setExpense(props.expense);
      setPaymentMethod(props.expense.methodOfPayment)
    } else {
      setExpense({
        name: '',
        price: '',
        category:'',
        spread: 0,
        notes:''
      })
    }
  }, [])

  return (
    <div>
    <h3 className="underLine white-text">Add Expense</h3>
    <form>
        <Label htmlFor="name">Expense name</Label>
        <Input type="text" value={expense.name} name="name" id="name" onChange={(e) => handleExpenseChange(e)}/>

        <Label htmlFor="price">Price</Label>
        <Input type="text" value={expense.price} name="price" id="price" onChange={(e) => handleExpenseChange(e)}/>

        <Label htmlFor="methodOfPayment">Method of payment</Label>
        <div className="flex">
          {createPaymentBtns()}
        </div>

        <Label htmlFor="category">Category</Label>
        <Input type="text" value={expense.category} name="category" id="category" onChange={(e) => handleExpenseChange(e)}/>

        <Label htmlFor="startDate">Date</Label>
        <DatePicker selected={startDate} onChange={date => setStartDate(date)} />

        <HollowButton onClick={handleSpreadToggle}>Spread over dates</HollowButton>
        {isSpreadExpense && endDateForm}

        <h4>Add Photo</h4>
        <Textarea value={expense.notes} name="notes" onChange={(e) => setExpense({...expense, [e.target.name]: e.target.value})}></Textarea>

        <Button onClick={submitExpense}>Add Expense</Button>
      </form>
    </div>
  )
}
