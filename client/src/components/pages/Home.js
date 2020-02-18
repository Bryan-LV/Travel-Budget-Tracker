import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

function Home(props) {
  const [countries, setCountries] = useState([]);

  useEffect(async () => {
    const countryList = await axios.get(`http://localhost:4000/`)
  }, [])

  return (
    <div className="container">
    
    </div>
  )
}

Home.propTypes = {

}

export default Home

