import React, {useReducer} from 'react'
import CountryContext from './CountryContext'
import CountryReducer from './CountryReducer'
import Axios from 'axios';

const initialState = {
  countries: [],
  selectedCountry:'',
  loading:true
}

export default function CountryState(props) {
  const [state, dispatch] = useReducer(CountryReducer, initialState);
  
  // add state
  const addCountry = (countries) => {
    dispatch({type:'ADD_COUNTRIES', payload: countries});
  }

  // get selected country
  const getSelectedCountry = async (id) => {
    try {
      const req = await Axios.post(`http://localhost:4000/api/countries/country`, {id});
      const response = req.data;
      dispatch({type: 'GET_COUNTRY', payload: response});

    } catch (error) {
      console.log(error.response.data.msg);
    }
  }
  

  return (
    <CountryContext.Provider value={{
      countries: state.countries,
      selectedCountry: state.selectedCountry,
      loading: state.loading,
      addCountry,
      getSelectedCountry
      }}>
      {props.children}
    </CountryContext.Provider>
  )
}
