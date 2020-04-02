import React, {useState, useContext, useEffect} from 'react'
import CountryContext from '../../context/countries/CountryContext';
import {Label, Button, Input, HollowButton, Textarea} from '../../styles/styles'
import currencies from '../../helpers/currencies'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import getPaymentIcon from '../../helpers/getPaymentIcon';
import toTitleCase from '../../helpers/ToTitleCase';

// 2. Edit Expense
// edit expense will have it's category already selected, filter through category list to match categories
// if user wants to change category, then category goes off new expense method instead

export default function EditExpense(props) {
  const [expense, setExpense] = useState({name: '', price: '', category:'', spread: 0, notes:''}) 
  const [isSpreadExpense, setIsSpreadExpense] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [paymentMethod, setPaymentMethod] = useState('');
  const [, setIsEditCategory] = useState(false);


  const context = useContext(CountryContext);
  const [country] = context.selectedCountry;
  const allCategories = country.categories.map(category => category);
  const endDateForm = <DatePicker className="input-style" selected={endDate} onChange={date => setEndDate(date)} />
  let category;

  useEffect(() => {
    if(props.expense !== null){
      setExpense(props.expense);
      setPaymentMethod(props.expense.methodOfPayment)
      setIsEditCategory(true);
      setCategory(props.expense.category);
    }
  }, [])
  
  const getCategoryID = () => {
    const [categoryID] = allCategories.filter(cat => {
      const existingCategory = cat.category.replace(/ /g, "");
      const newCategory = category.replace(/ /g, "");
      return existingCategory.toLowerCase() === newCategory.toLowerCase();
    });
    return categoryID._id;
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
  
  const getForeignCurrency = () => {
    const selectedCountry = context.selectedCountry[0].name.toLowerCase();
    const findCurrency = currencies.filter(country => country.countryName.toLowerCase() === selectedCountry);
    return findCurrency[0].currencyCode;
  }

  const submitExpense = (e) => {
    e.preventDefault();
    const test = getCategoryID();
    console.log(test);
    if(expense.name !== '' && expense.price !== 0){

      const expensePayload = {
        expenseName: toTitleCase(expense.name),
        expensePrice: expense.price,
        countryID: context.selectedCountry[0]._id,
        categoryID: getCategoryID(),
        baseCurrency: context.selectedCountry[0].baseCurrency,
        foreignCurrency: getForeignCurrency(),
        category: categoryVal,
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

  const handleExpenseDelete = (e) => {
    e.preventDefault();
    const categoryId = getCategoryID();
    context.deleteExpense(context.selectedCountry[0]._id, categoryId , props.expense._id)
  }

  const categoryField = isEditCategory ? (
    <div> 
      <p className="input-style text-field">{props.expense.category}</p> 
      <small onClick={() => setIsEditCategory(!isEditCategory)} className="underLine white-text">edit</small>
    </div>) : (
    <select className="margin-btm input-style selectElm" value={categoryVal} onChange={(e) => setCategoryVal(e.target.value)}>
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
        <DatePicker className="input-style" selected={startDate} onChange={date => setStartDate(date)} />

        <HollowButton className="margin-btm" onClick={handleSpreadToggle}>Spread over dates</HollowButton>
        {isSpreadExpense && endDateForm}

        <Textarea className="margin-btm" value={expense.notes} name="notes" placeholder="Add a note..." onChange={(e) => setExpense({...expense, [e.target.name]: e.target.value})}></Textarea>
      
        <div>
          <Button  onClick={submitExpense} style={{display:'block'}}>Save Edit</Button>
          <Button  backgroundColor="#EAEAEA" style={{display:'block'}}>Cancel</Button>
          <Button  backgroundColor="#FF6262"  style={{display:'block'}} onClick={handleExpenseDelete}>Delete Expense</Button>
        </div>

      </form>
    </div>
  )
}
