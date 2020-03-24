import React, { useEffect, useContext, useState } from 'react'
import CountryContext from '../../context/countries/CountryContext'
import Topbar from '../layout/Topbar';
import PlusBtn from '../UI/PlusBtn';
import currencies from '../../currencies';
import TripHeader from '../layout/Trip/TripHeader';
import AddCategory from '../forms/AddCategory';
import TripBottom from '../layout/Trip/TripBottom';
import TripCategories from '../layout/Trip/TripCategories';

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

  const handleDelete = (countryID, categoryID) => {
    context.deleteCategory(countryID, categoryID);
  }

  const findTotalSpent = () => {
    const allExpenses = [];
    const getExpenses = country.categories.map(category => {
      // loop through all categories and return expenses
      return category.expenses.map(expense => expense.price);
    });

    // if expenses is 0 then return '0'
    if(getExpenses.length === 0){
      return 0
    } 
    // if expenses is only 1 
    else if(getExpenses.length === 1 ){
      return getExpenses[0];
    }
    // if expenses is more than 1
    else if(getExpenses.length > 1){

      getExpenses.forEach(expenses => {
        allExpenses.push(...expenses)
      });

      const total  = allExpenses.reduce((prev,next) => prev + next);
      return total.toFixed(2);
    }
}

  const getPercentage = () => {
    let totalSpent = findTotalSpent();
    if(totalSpent === 0){
      return 0
    } else {
      const percentage = (totalSpent / country.budget) * 100;
      return percentage.toFixed(2);
    }
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
  
  const getForeignCurrency = () => {
    const selectedCountry = context.selectedCountry[0].name.toLowerCase();
    const findCurrency = currencies.filter(country => country.countryName.toLowerCase() === selectedCountry);
    return findCurrency[0].currencyCode;
  }
  
  return (
    <div id={country._id}>
      <Topbar title={country.name} currency={getForeignCurrency()}/>
      <TripHeader budget={country.budget} percentage={getPercentage()} total={findTotalSpent()} />
      <h4 className="trip-dates white-text secondary-font">{startMonth} {startDay} - {endMonth} {endDay}</h4>
      
      <div className="categories bg-light-blue">
        <TripBottom country={country}/>
      </div>

      <div className="txt-center bg-light-blue pt3">
        <div className="inline-block plus-button-container" onClick={() => setShowCategoryForm(!showCategoryForm)}>
            <PlusBtn/>
        </div>
      </div>

      <AddCategory showCategoryForm={showCategoryForm} countryID={country._id}/>
    </div>
  )
}
