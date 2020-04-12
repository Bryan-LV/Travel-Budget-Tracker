import React, {useReducer, useContext} from 'react'
import AlertContext from '../alerts/AlertContext'
import CountryContext from './CountryContext'
import CountryReducer from './CountryReducer'
import axios from 'axios'

const initialState = {
  countries: [],
  selectedCountry:null,
  selectedCategory: null,
  baseCurrency:'',
  foreignCurrency:'',
  loading:true
}

const getConfig = () => {
  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'auth-token': localStorage.getItem('token')
    }
  }
  return axiosConfig;
}

export default function CountryState(props) {
  const [state, dispatch] = useReducer(CountryReducer, initialState);
  const alertContext = useContext(AlertContext);

  // fetch countries
  const fetchCountries = async () => {
    try {
      const request = await axios.get('/api/countries', getConfig());
      const countries = request.data;
      dispatch({type:'SET_COUNTRIES', payload: countries})

    } catch (error) {
      alertContext.addAlert({text:'Having a problem fetching your trips 😅', needsConfirmation:false});
    }
  }
  
  // set currencies
  const setCurrency = (currency) => {
    dispatch({type:'SET_CURRENCY', payload: currency});
  }
  
  // add new country
  const addCountry = async (trip) => {
    try {
      const req = await axios.post('/api/countries', trip, getConfig());
      fetchCountries()
    } catch (error) {
      alertContext.addAlert({text:'Having a problem adding your trip 😅', needsConfirmation:false, duration: 2000});
    }
  }

  // delete country
  const deleteCountry = async (id) => {
    try {
      await axios.delete('/api/countries/country', { headers: {'Content-Type': 'application/json', 'auth-token': localStorage.getItem('token') } , data: {countryID: id}});
    } catch (error) {
      alertContext.addAlert({text:'Having a problem deleting your trip 😅', needsConfirmation:false, duration: 2000});
    }
    fetchCountries()
  }
  
  // add category to country
  const addCategory = async ({categoryName, countryID}) => {
    try {
      await axios.post('/api/categories', {categoryName, countryID}, getConfig())
      fetchCountries();
      dispatch({type:'ADD_CATEGORY', payload: countryID})
    } catch (error) {
      alertContext.addAlert({text:'Having a problem adding your category 😅', needsConfirmation:false, duration: 2000});
    }
  }

  // delete category
  const deleteCategory = async (countryID, categoryID) => {
    try {
      await axios.delete('/api/categories', {data: {countryID, categoryID}});
      fetchCountries();
      dispatch({type:'DELETE_CATEGORY', payload: countryID});
    } catch (error) {
      alertContext.addAlert({text:'Having a problem deleting your trip 😅', needsConfirmation:false, duration: 2000});
    }
  }

  // add new expense to category
  const addExpense = async (expense) => {
    try {
      await axios.post('/api/expense/country/add', expense);
      fetchCountries()
    } catch (error) {
      alertContext.addAlert({text:'Having a problem adding your expense 😅', needsConfirmation:false, duration: 2000});
    }
  }

  const editExpense = async (expense) => {
    try {
      await axios.put('/api/expense/country/edit', expense);
      fetchCountries();
    } catch (error) {
      alertContext.addAlert({text:'Having a problem editing your expense 😅', needsConfirmation:false, duration: 2000});
    }
  }
  

  const deleteExpense = async (countryID, categoryID, expenseID) => {
    try {
      await axios.delete('/api/expense/', { data: { countryID, categoryID, expenseID } } )
      fetchCountries();
    } catch (error) {
      alertContext.addAlert({text:'Having a problem deleting your expense 😅', needsConfirmation:false, duration: 2000});
    }
  }
  
  
  // get selected country
  const getSelectedCountry = (countryID) => {
    const country = state.countries.filter(country => country._id === countryID);
    dispatch({type:'GET_COUNTRY', payload:country})
  }

  // get single category
  const getSingleCategory = (categoryID, countryID) => {
    const country = state.countries.filter(country => country._id === countryID)
    const category =  country[0].categories.filter(category => category._id ===  categoryID);
    dispatch({type: 'GET_CATEGORY', payload: category})
  }

  // reset selected category context
  const resetSelectedCategory = () => {
    dispatch({type:'RESET_CATEGORY'})
  }
  
   // get single category from expense obj
   const getCategoryFromExpense = (category) => {
    dispatch({type: 'GET_CATEGORY', payload: category})
  }

  return (
    <CountryContext.Provider value={{
      countries: state.countries,
      baseCurrency: state.baseCurrency,
      foreignCurrency: state.foreignCurrency,
      selectedCountry: state.selectedCountry,
      selectedCategory: state.selectedCategory,
      loading: state.loading,
      fetchCountries,
      setCurrency,
      addCountry,
      deleteCountry,
      addCategory,
      deleteCategory,
      getSelectedCountry,
      getSingleCategory,
      resetSelectedCategory,
      addExpense,
      editExpense,
      deleteExpense,
      getCategoryFromExpense
      }}>
      {props.children}
    </CountryContext.Provider>
  )
}
