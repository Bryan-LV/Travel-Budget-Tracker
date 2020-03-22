import React, { useEffect, useContext, useState } from 'react'
import CountryContext from '../../context/countries/CountryContext'
import Topbar from '../layout/Topbar';
import {Button, Label, Input} from '../../styles/styles'
import SelectView from '../helpers/SelectView';
import PlusBtn from '../UI/PlusBtn';
import currencies from '../../currencies';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
  ];


export default function SingleCountry(props) {
  const [category, setCategory ] = useState('');
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const context = useContext(CountryContext);

  const selectedCountry = context.selectedCountry[0];
  const filterCountry = context.countries.filter(Country => Country._id === selectedCountry._id);
  const [country] = filterCountry;

  // check if a country has been selected, if not push back to home page
  const checkCountryIsSelected = () => {
   if(!country){
     props.history.push('/');
   }
  }
  
  useEffect(() => {
    checkCountryIsSelected()
  }, [selectedCountry]);

  // when new category added update selectedCountry
  const addNewCategory = (e) => {
    e.preventDefault();
    if(category !== ''){
      const newCategory = {categoryName: category, countryID: country._id}
      context.addCategory(newCategory)
      setShowCategoryForm(!showCategoryForm)
    }
  }

  // takes user to category page
  const handleCategoryDetails = (categoryName, categoryID, countryID) => {
    context.getSingleCategory(categoryID, countryID);
    props.history.push(`/${country.name}/${categoryName}`)
  }

  const handleDelete = (countryID, categoryID) => {
    context.deleteCategory(countryID, categoryID);
  }
  

  const createCategories = () => {
    const categoriesList = country.categories.map(category => {

      let getPrices = category.expenses.map(expense => expense.price);
      let result;
      if(getPrices.length > 1) {
        result = getPrices.reduce((prev,next) => prev + next);
      } else {
        result = getPrices[0];
      }

      return ( <div key={category._id} data-id={category._id} className="category-box" onClick={() => handleCategoryDetails(category.category, category._id, country._id)}>
                <div className="category-pair">
                  <div className="category-color"></div>
                  <h3 className="white-text">{category.category}</h3>
                </div>
                <h3 className="white-text secondary-font category-total">{result}</h3>
                {/* <button onClick={() => handleDelete(country._id, category._id)}>Delete Category</button> */}
              </div> )
    })
    return categoriesList;
  }

  const findTotalSpent = () => {
    const allExpenses = [];
    const getExpenses = country.categories.map(category => {
      // loop through all categories and return expenses
      return category.expenses.map(expense => expense.price);
    });

    getExpenses.forEach(expenses => {
      allExpenses.push(...expenses)
    });

    const total  = allExpenses.reduce((prev,next) => prev + next);
    return total;
}

  const getPercentage = () => {
    const percentage = (findTotalSpent() / country.budget) * 100;
    return percentage.toFixed(2);
  }

  const formatStartDate = new Date(country.startDate);
  const startDay = formatStartDate.getDate();
  const getStartMonth = formatStartDate.getMonth();
  const startMonth =  months[getStartMonth];
  const startYear = formatStartDate.getFullYear()

  let endDay, getEndMonth, endMonth, endYear;
  if(country.endDate){
    const formatEndDate = new Date(country.endDate);
    endDay = formatEndDate.getDate();
    getEndMonth = formatEndDate.getMonth();
    endMonth =  months[getEndMonth];
    endYear = formatEndDate.getFullYear();
  }

  const showCategoryModal = () => {
    return (
      <form>
        <Label htmlFor="category">Category</Label>
        <Input type="text" value={category} name="category" onChange={(e) => setCategory(e.target.value)}/>
        <Button onClick={addNewCategory}>Add Category</Button>
      </form>
    )
  }
  
  const toggleCategoryForm = () => {
    setShowCategoryForm(!showCategoryForm);
  }

  const getForeignCurrency = () => {
    const selectedCountry = context.selectedCountry[0].name.toLowerCase();
    const findCurrency = currencies.filter(country => country.countryName.toLowerCase() === selectedCountry);
    return findCurrency[0].currencyCode;
  }
  

  return (
    <div id={country._id}>
      <Topbar title={country.name} currency={getForeignCurrency()}/>
      <h2 className="white-text txt-center secondary-font">${country.budget}</h2>
      <div className="monthly-budget-percentage-header">
        <h4 className="white-text secondary-font">{getPercentage()}%</h4>
        <h4 className="white-text secondary-font">Current Spending</h4>
        <h4 className="white-text secondary-font">{findTotalSpent()}</h4>
      </div>

      <h4 className="trip-dates white-text secondary-font">{startMonth} {startDay} - {endMonth} {endDay}</h4>
      
      <SelectView/>
      {/* show links to category and dates */}
      <div className="select-view-type">
      </div>
      {/* create routes for both category and for dates */}

      <div className="categories bg-light-blue">
        {createCategories()}
      </div>

      <div className="txt-center">
        <div className="inline-block plus-button-container" onClick={toggleCategoryForm}>
            <PlusBtn/>
        </div>
      </div>
      {showCategoryForm && showCategoryModal()}
    </div>
  )
}
