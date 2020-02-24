import React, { useEffect, useContext, useState } from 'react'
import CountryContext from '../../context/countries/CountryContext'
import Axios from 'axios';
import { ContextRunnerImpl } from 'express-validator/src/chain';

export default function SingleCountry(props) {
  const [category, setCategory ] = useState('');
  const context = useContext(CountryContext);
  const country = context.selectedCountry[0];

  const fetchCountryData = () => {
   if(!country){
     props.history.push('/');
   }
  }
  
  useEffect(() => {
    fetchCountryData()
  }, [])

  const addNewCategory = (e) => {
    e.preventDefault();
    if(category !== ''){
      const newCategory = {category, country: country._id}
      context.addCategory(newCategory)
    }
  }

  const handleCategoryDetails = (categoryName, categoryID, countryID) => {
    context.getSingleCategory(categoryID,countryID);
    props.history.push(`/${country.name}/${categoryName}`)
  }
  
  
  return (
    <div id={country._id}>
      <h2>{country.name}</h2>
      <form>
        <label htmlFor="category">Category</label>
        <input type="text" value={category} name="category" onChange={(e) => setCategory(e.target.value)}/>
        <button onClick={addNewCategory}>Add Category</button>
      </form>
      <div className="categories">
        {country.categories.map(category => (<div data-id={category._id}>
          <h3>{category.category}</h3>
          <button className="category__btn" onClick={() => handleCategoryDetails(category.category, category._id, country._id)}>Category Details</button>
          </div>))}
      </div>
    </div>
  )
}
