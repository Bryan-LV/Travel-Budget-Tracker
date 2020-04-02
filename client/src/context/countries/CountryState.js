import React, {useReducer} from 'react'
import CountryContext from './CountryContext'
import CountryReducer from './CountryReducer'
import axios from 'axios';
import uuid from 'uuid/v4'

const countries = [
  {
    name:'Indonesia',
    categories: [{category: 'food', _id: uuid(), expenses: [{name:'breakfast', price: 2.10, _id: uuid()}]}],
    _id: uuid()
  },
  {
    name: 'Thailand',
    categories: [{category: 'food', _id: uuid(), expenses: [{name:'breakfast', price: 2.10, _id: uuid()}]}],
    _id: uuid()
  },
  {
    name: 'Philippines',
    categories: [{category: 'food', _id: uuid(), expenses: [{name:'breakfast', price: 2.10, _id: uuid()}]}],
    _id: uuid()
  }
]

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

  // fetch countries
  const fetchCountries = async () => {
    try {
      const request = await axios.get('http://localhost:4000/api/countries', getConfig());
      const countries = request.data;
      dispatch({type:'SET_COUNTRIES', payload: countries})

    } catch (error) {
      console.log(error);
    }
  }
  

  // set currencies
  const setCurrency = (currency) => {
    dispatch({type:'SET_CURRENCY', payload: currency});
  }
  
  // add new country
  const addCountry = async (trip) => {
    try {
      const req = await axios.post('http://localhost:4000/api/countries', trip, getConfig());
      const res = req.data;
      console.log(res);
      fetchCountries()
    } catch (error) {
      console.log(error.response);
    }
  }

  // delete country
  const deleteCountry = async (id) => {
    try {
      await axios.delete('http://localhost:4000/api/countries/country', { data: {countryID: id}})
    } catch (error) {
      console.log(error.response.data.msg);
    }
    fetchCountries()
  }
  

  // add category to country
  const addCategory = async ({categoryName, countryID}) => {
    try {
      const req = await axios.post('http://localhost:4000/api/categories', {categoryName, countryID}, getConfig())
      const res = req.data;
      fetchCountries();
      dispatch({type:'ADD_CATEGORY', payload: countryID})

    } catch (error) {
      console.log(error);
    }
    
  }

  // delete category
  const deleteCategory = async (countryID, categoryID) => {

    console.log(countryID, categoryID);
    try {
      await axios.delete('http://localhost:4000/api/categories', {data: {countryID, categoryID}});
      fetchCountries();
      dispatch({type:'DELETE_CATEGORY', payload: countryID});
    } catch (error) {
      console.log(error.response.data.msg);
    }
  }

  // add new expense to category
  const addExpense = async (expense) => {
    console.log(expense);
    try {
      await axios.post('http://localhost:4000/api/expense/country/add', expense);
      fetchCountries()
    } catch (error) {
      console.log(error);
    }
  }

  const editExpense = async (expense) => {
    console.log(expense);
    try {
      await axios.put('http://localhost:4000/api/expense/country/edit', expense);
      fetchCountries();
    } catch (error) {
      console.log(error);
    }
  }
  

  const deleteExpense = async (countryID, categoryID, expenseID) => {
    console.log(countryID, categoryID, expenseID);
    try {
      await axios.delete('http://localhost:4000/api/expense/', { data: { countryID, categoryID, expenseID } } )
      fetchCountries();
    } catch (error) {
      console.log(error);
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
