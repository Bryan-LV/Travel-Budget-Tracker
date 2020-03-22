import React, {useEffect, useState, useContext} from 'react'
import CountryContext from '../../context/countries/CountryContext';
import AuthContext from '../../context/auth/AuthContext';
import PlusBtn from '../UI/PlusBtn';
import TripBox from '../helpers/TripBox';
import {Link} from 'react-router-dom'

function Home(props) {
  const context = useContext(CountryContext);
  const {loadUser, isAuth} = useContext(AuthContext);
  const {countries} = context.countries;

  useEffect( () => {
    if(isAuth){
      loadUser();
      context.fetchCountries();
    } else{
      props.history.push('/');
    }
  }, [countries])
  
  return (
    <div className="">
      <div className="bg-light-blue border-radius-top bottom-layer">
        <h3 className="underLine white-text ml3">Trips</h3>
      </div>

      <div className="bg-medium-blue border-radius-top pt4 pb4 top-layer">
        <div className="container trip-box-wrapper">
          {context.countries.map(country => <TripBox country={country} key={country._id} id={country._id} />)}
        </div>
      </div>

      {/* <PlusButton page="/addtrip"/> */}
      <div className="txt-center">
        <div className="inline-block plus-button-container">
          <Link to="/addtrip">
            <PlusBtn/>
          </Link> 
        </div>
      </div>
    </div>
  )
}

export default Home

