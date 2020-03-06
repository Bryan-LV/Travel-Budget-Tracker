import React, {useState} from 'react'
import currencies from '../../currencies'

export default function Currencies() {
  const [baseCurrency, setBaseCurrency] = useState('');
  const [foreignCurrency, setForeignCurrency] = useState('');

  const listOfCurrencies = [];
  for(const property in currencies){
    listOfCurrencies.push(property);
  }

  const currencyOptions = () => {
    const options = listOfCurrencies.map(currency => <option value={currency}> {currency} </option>)
    return options;
  }
  
  return (
    <div>
      <form>
      <select name="base" id="base" value={baseCurrency} onChange={(e) => setBaseCurrency(e.target.value)}>
        {currencyOptions()}
      </select>
      <select name="foreign" id="foreign" value={foreignCurrency} onChange={(e) => setForeignCurrency(e.target.value)}>
        {currencyOptions()}
      </select>
      </form>
    </div>
  )
}
