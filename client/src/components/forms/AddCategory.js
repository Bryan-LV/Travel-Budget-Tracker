import React, {useContext, useState} from 'react'
import CountryContext from '../../context/countries/CountryContext'
import {Button, Label, Input} from '../../styles/styles'
import toTitleCase from '../../helpers/ToTitleCase';

export default function AddCategory(props) {
  const [category, setCategory ] = useState('');
  const context = useContext(CountryContext);

  const country = context.selectedCountry[0];

  const addNewCategory = (e) => {
    e.preventDefault();
    // check if category already exists
    const categoryExists = country.categories.filter(cat => {
      const existingCategory = cat.category.replace(/ /g, "");
      const newCategory = category.replace(/ /g, "");
      return existingCategory.toLowerCase() === newCategory.toLowerCase();
    });

    if(category !== '' && categoryExists.length === 0){
      let categoryCap = toTitleCase(category)
      const newCategory = {categoryName: categoryCap, countryID: country._id}
      context.addCategory(newCategory)
      setCategory('');
    }
  }

  return (
    <form className="form padding-sides border-radius-top"> 
      <Label htmlFor="category">Category</Label>
      <Input type="text" value={category} name="category" onChange={(e) => setCategory(e.target.value)}/>
      <Button onClick={addNewCategory}>Add Category</Button>
    </form>
  )
}
