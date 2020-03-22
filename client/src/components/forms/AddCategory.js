import React, {useContext, useState} from 'react'
import CountryContext from '../../context/countries/CountryContext'
import {Button, Label, Input} from '../../styles/styles'
import toTitleCase from '../../helperFuncs/ToTitleCase';

export default function AddCategory(props) {
  const [category, setCategory ] = useState('');
  const context = useContext(CountryContext);

  const addNewCategory = (e) => {
    e.preventDefault();
    if(category !== ''){
      let categoryCap = toTitleCase(category)
      const newCategory = {categoryName: categoryCap, countryID: props.countryID}
      context.addCategory(newCategory)
    }
  }

  if(props.showCategoryForm){
    return (
        <form>
          <Label htmlFor="category">Category</Label>
          <Input type="text" value={category} name="category" onChange={(e) => setCategory(e.target.value)}/>
          <Button onClick={addNewCategory}>Add Category</Button>
        </form>
    ) 
  } else {
    return <div></div>
  }
}
