import React, { useEffect, useContext, useState } from 'react'
import CountryContext from '../../context/countries/CountryContext'
import Topbar from '../layout/Topbar';
import formatDistanceStrict from 'date-fns/formatDistanceStrict'
import PlusButton from '../helpers/PlusButton';
import {Button, Label, Input} from '../../styles/styles'

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
      return ( <div key={category._id} data-id={category._id} onClick={() => handleCategoryDetails(category.category, category._id, country._id)}>
                <h3>{category.category}</h3>
                <button onClick={() => handleDelete(country._id, category._id)}>Delete Category</button>
              </div> )
    })
    return categoriesList;
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
  

  return (
    <div id={country._id}>
      <Topbar title={country.name}/>
      <div className="monthly-budget-title">
        <h4>Monthly budget</h4>
        <h4>80%</h4>
      </div>

      <h2>${country.budget}</h2>
      <h4 className="trip-box-dates">{startMonth} {startDay} - {endMonth} {endDay}</h4>

      <div className="categories">
        {createCategories()}
      </div>
      <PlusButton toggle={toggleCategoryForm}/>
      {showCategoryForm && showCategoryModal()}
    </div>
  )
}
