import React, {useState, useContext} from 'react'
import currencies from '../../currencies'
import CountryContext from '../../context/countries/CountryContext'

export default function Currencies() {
  const [state, setstate] = useState({
    baseCurrency:'USD',
    foreignCurrency:''
  })
  const context = useContext(CountryContext);

  const listOfCurrencies = [];
  for(const property in currencies){
    listOfCurrencies.push(property);
  }

  const currencyOptions = () => {
    const options = listOfCurrencies.map(currency => <option value={currency}> {currency} </option>)
    return options;
  }
  
  const handleChange = (e) => {
    setstate({...state, [e.target.name]: e.target.value})
    const currency = {
      [e.target.name]: e.target.value
    }
    context.setCurrency(currency);
    
  }
  

  return (
    <div>
      <form>
      <label htmlFor="baseCurrency">Base Currency</label>
      <select name="baseCurrency" id="base" value={state.baseCurrency} onChange={handleChange}>
        {currencyOptions()}
      </select>
      <label htmlFor="foreignCurrency">Foreign Currency</label>
      <select name="foreignCurrency" id="foreign" value={state.foreignCurrency} onChange={handleChange}>
        {currencyOptions()}
      </select>
      </form>
    </div>
  )
}
