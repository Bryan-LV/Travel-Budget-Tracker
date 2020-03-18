import React, {useEffect, useState, useContext} from 'react'
import CountryContext from '../../context/countries/CountryContext';
import CountryList from '../helpers/CountryList';
import AuthContext from '../../context/auth/AuthContext';
import PlusButton from '../helpers/PlusButton';
import Topbar from '../layout/Topbar';

function Home(props) {
  const context = useContext(CountryContext);
  const {loadUser, isAuth} = useContext(AuthContext);
  const {countries} = context.countries;
  const [country, setCountry] = useState('');


  useEffect( () => {
    if(isAuth){
      loadUser();
      // context.fetchCountries();
    } else{
      props.history.push('/');
    }
  }, [countries])
  
  const addCountry = (e) => {
    e.preventDefault();
    if(country !== ''){
      context.addCountry(country);
    }
  }
  

  return (
    <div className="">

      <div className="bg-light-blue border-radius-top bottom-layer">
        <h3 className="underLine white-text ml3">Trips</h3>
      </div>

      <div className="bg-medium-blue border-radius-top pt4 pb4 top-layer">
        <div className="container">
        <div className="trip-box">
          <div className="trip-box-top">
            <div className="trip-box-img border-radius-top"></div>
          </div>
          <div className="trip-box-bottom border-radius-bottom p2 bg-grey">
            <h3 className="trip-box-title">Indonesia</h3>
            <h4 className="trip-box-dates">March 12 - April 14</h4>
            <h4>$950 / $31.60 per day</h4>
          </div>
        </div>
        </div>
      </div>

      <PlusButton page="/addtrip"/>
      {/* {context.countries.map(country => <CountryList country={country} key={country._id} id={country._id}/>)} */}
    </div>
  )
}

export default Home

