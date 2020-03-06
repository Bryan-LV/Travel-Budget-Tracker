import React, {useEffect, useState, useContext} from 'react'
import CountryContext from '../../context/countries/CountryContext';
import axios from 'axios'
import CountryList from '../helpers/CountryList';
import Currencies from '../helpers/Currencies';

function Home(props) {
  const context = useContext(CountryContext);
  const {countries} = context.countries;
  const [country, setCountry] = useState('');

  useEffect( () => {
    context.fetchCountries()
  }, [countries])
  
  const addCountry = (e) => {
    e.preventDefault();
    if(country !== ''){
      context.addCountry(country);
    }
  }
  

  return (
    <div className="container">
      <Currencies/>
      <form>
        <label htmlFor="country">Add new country</label>
        <input type="text" name="country" value={country} onChange={(e) => setCountry(e.target.value)}/>
        <button onClick={addCountry}> Add Country </button>
      </form>
      {context.countries.map(country => <CountryList country={country} key={country._id} id={country._id}/>)}
    </div>
  )
}

export default Home

