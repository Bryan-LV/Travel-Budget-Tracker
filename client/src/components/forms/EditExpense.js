import React, {useState, useContext, useEffect} from 'react'
import CountryContext from '../../context/countries/CountryContext';
import {Label, Button, Input, HollowButton, Textarea} from '../../styles/styles'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import getPaymentIcon from '../../helpers/getPaymentIcon';
import toTitleCase from '../../helpers/ToTitleCase';
import getForeignCurrency from '../../helpers/getForeignCurrency';

// 2. Edit Expense
// edit expense will have it's category already selected, filter through category list to match categories
// if user wants to change category, then category goes off new expense method instead

export default function EditExpense(props) {
  const context = useContext(CountryContext);
  const [country] = context.selectedCountry;
  const allCategories = country.categories.map(category => category);

  const [expense, setExpense] = useState({name: '', price: '', category:'', spread: 0, notes:''}) 
  const [isSpreadExpense, setIsSpreadExpense] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [paymentMethod, setPaymentMethod] = useState('');

  useEffect(() => {
    if(props.expense !== null){
      setExpense({...props.expense, price: props.expense.foreignPrice});
      setPaymentMethod(props.expense.methodOfPayment)
      setStartDate(new Date(props.expense.date));
    }
  }, [])
  
  const getCategoryID = () => {
    const [category] = allCategories.filter(item => item.category === expense.category)
    return category._id;
  }

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

    if(expense.name !== '' && expense.price !== 0){

      const expensePayload = {
        expenseName: toTitleCase(expense.name),
        expensePrice: expense.price,
        countryID: context.selectedCountry[0]._id,
        categoryID: getCategoryID(),
        expenseID: props.expense._id,
        baseCurrency: context.selectedCountry[0].baseCurrency,
        foreignCurrency: getForeignCurrency(context.selectedCountry[0].name),
        category: expense.category,
        methodOfPayment: paymentMethod,
        spread:expense.spread,
        notes: expense.notes,
        date: startDate
      }

      context.editExpense(expensePayload);
      setExpense({name: '', price: '', category:'', spread: 0, notes:''});
      props.handleViewChange('categories','');
    }
  }

  const handleSpreadToggle = (e) => {
    e.preventDefault();
    setIsSpreadExpense(!isSpreadExpense)
  }

  const handleExpenseDelete = (e) => {
    e.preventDefault();
    const categoryID = getCategoryID();
    context.deleteExpense(context.selectedCountry[0]._id, categoryID , props.expense._id)
    props.handleViewChange('categories','');
  }

  return (
    <div className="form padding-sides border-radius-top">
    <h3 className="underLine white-text">Edit Expense</h3>
    <form>
        <Label htmlFor="name">Expense name</Label>
        <Input type="text" value={expense.name} name="name" id="name" onChange={handleExpenseChange}/>

        <Label htmlFor="price">Price</Label>
        <Input type="text" value={expense.price} name="price" id="price" onChange={handleExpenseChange}/>

        <Label htmlFor="methodOfPayment">Method of payment</Label>
        <div className="flex margin-btm">
          {createPaymentBtns()}
        </div>

        <Label htmlFor="category">Category</Label>
        <select className="margin-btm input-style selectElm" value={expense.category} name="category" onChange={handleExpenseChange}>
          {allCategories.map(category => <option value={category.category}>{category.category}</option> )}
        </select>

        <Label htmlFor="startDate">Date</Label>
        <DatePicker className="input-style" selected={startDate} onChange={date => setStartDate(date)} />

        <HollowButton className="margin-btm" onClick={handleSpreadToggle}>Spread over dates</HollowButton>
        {isSpreadExpense && <DatePicker className="input-style" selected={endDate} onChange={date => setEndDate(date)} />}

        <Textarea className="margin-btm" value={expense.notes} name="notes" placeholder="Add a note..." onChange={handleExpenseChange}></Textarea>
      
        <div>
          <Button  onClick={submitExpense} >Save Edit</Button>
          <Button  backgroundColor="#EAEAEA" onClick={() => props.handleViewChange('categories', '')}>Cancel</Button>
          <Button  backgroundColor="#FF6262" onClick={handleExpenseDelete}>Delete Expense</Button>
        </div>

      </form>
    </div>
  )
}
