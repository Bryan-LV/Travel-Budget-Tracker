import React, { useContext } from 'react'
import CountryContext from '../../context/countries/CountryContext'

export default function SingleCategory(props) {
  const context = useContext(CountryContext);
  const category =  context.selectedCategory[0];
  return (
    <div>
      <h2>{category.category}</h2>
    </div>
  )
}
