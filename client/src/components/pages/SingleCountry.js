import React, { useEffect, useContext, useState } from 'react'
import CountryContext from '../../context/countries/CountryContext'

export default function SingleCountry(props) {
  const [category, setCategory ] = useState('');
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
      return ( <div key={category._id} data-id={category._id}>
                <h3>{category.category}</h3>
                <button className="category__btn" onClick={() => handleCategoryDetails(category.category, category._id, country._id)}>Category Details</button>
                <button onClick={() => handleDelete(country._id, category._id)}>Delete Category</button>
              </div> )
    })
    return categoriesList;
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
        {createCategories()}
      </div>
    </div>
  )
}
