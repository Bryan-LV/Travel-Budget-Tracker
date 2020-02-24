import React, {useEffect, useState, useContext} from 'react'
import CountryContext from '../../context/countries/CountryContext';
import PropTypes from 'prop-types'
import axios from 'axios'
import CountryList from '../helpers/CountryList';

function Home(props) {
  const context = useContext(CountryContext);
  const [country, setCountry] = useState('');

  const fetchCountries = async () => {
    // fetch countries
    try {
      
    } catch (error) {
    }
  }
  

  useEffect( () => {
    fetchCountries()
  }, [])
  
  const addCountry = (e) => {
    e.preventDefault();
    if(country !== ''){
      context.addCountry(country);
    }
  }
  

  return (
    <div className="container">
      <form>
        <label htmlFor="country">Add new country</label>
        <input type="text" name="country" value={country} onChange={(e) => setCountry(e.target.value)}/>
        <button onClick={addCountry}> Add Country </button>
      </form>
      {context.countries.map(country => <CountryList country={country} key={country._id} id={country._id}/>)}
    </div>
  )
}

Home.propTypes = {

}

export default Home

