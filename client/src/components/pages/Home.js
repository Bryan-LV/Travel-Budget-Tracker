import React, {useEffect, useState, useContext} from 'react'
import CountryContext from '../../context/countries/CountryContext';
import CountryList from '../helpers/CountryList';
import AuthContext from '../../context/auth/AuthContext';
import PlusButton from '../helpers/PlusButton';
import Topbar from '../layout/Topbar';
import TripBox from '../helpers/TripBox';

function Home(props) {
  const context = useContext(CountryContext);
  const {loadUser, isAuth} = useContext(AuthContext);
  const {countries} = context.countries;
  const [country, setCountry] = useState('');


  useEffect( () => {
    if(isAuth){
      loadUser();
      context.fetchCountries();
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
          {context.countries.map(country => <TripBox country={country} key={country._id} id={country._id}/>)}
        </div>
      </div>

      <PlusButton page="/addtrip"/>
    </div>
  )
}

export default Home

