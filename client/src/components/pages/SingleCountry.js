import React, { useEffect, useContext } from 'react'
import CountryContext from '../../context/countries/CountryContext'

export default function SingleCountry(props) {
  const context = useContext(CountryContext);

  useEffect(() => {
    // fetchCountry()
  }, [])

  return (
    <div>
      <h3>{context.selectedCountry.country}</h3>
      <h3>{context.selectedCountry.totalBalance}</h3>
    </div>
  )
}
