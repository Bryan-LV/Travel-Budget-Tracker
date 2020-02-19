import React, {useEffect, useState, useContext} from 'react'
import CountryContext from '../../context/countries/CountryContext';
import PropTypes from 'prop-types'
import axios from 'axios'
import CountryList from '../helpers/CountryList';

function Home(props) {
  const context = useContext(CountryContext);

  const fetchCountries = async () => {
    // fetch countries
    try {
      const countries = await axios.get('http://localhost:4000/api/countries');
      const res = countries.data;
      context.addCountry(res);
      
    } catch (error) {
      console.log(error.response.data.msg);
    }
  }
  

  useEffect( () => {
    fetchCountries()
  }, [])

  return (
    <div className="container">
      {context.countries.map(country => <CountryList country={country.country} key={country._id} id={country._id}/>)}
    </div>
  )
}

Home.propTypes = {

}

export default Home

