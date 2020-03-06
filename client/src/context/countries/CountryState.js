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
  loading:true
}

export default function CountryState(props) {
  const [state, dispatch] = useReducer(CountryReducer, initialState);
  

  // fetch countries
  const fetchCountries = async () => {
    try {
      const request = await axios.get('http://localhost:4000/api/countries');
      const countries = request.data;
      dispatch({type:'SET_COUNTRIES', payload: countries})

    } catch (error) {
      console.log(error);
    }
  }
  

  // add new country
  const addCountry = async (country) => {
    try {
      const req = await axios.post('http://localhost:4000/api/countries', {country});
      const res = req.data;
      fetchCountries()
    } catch (error) {
      console.log(error.response.data.msg);
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
      const req = await axios.post('http://localhost:4000/api/categories', {categoryName, countryID})
      const res = req.data;
      fetchCountries();
      dispatch({type:'ADD_CATEGORY', payload: countryID})

    } catch (error) {
      console.log(error);
    }
    
  }

  // delete category
  const deleteCategory = async (countryID, categoryID) => {
    try {
      await axios.delete('http://localhost:4000/api/categories', {data: {countryID, categoryID}});
      fetchCountries();
      dispatch({type:'DELETE_CATEGORY', payload: countryID});
    } catch (error) {
      console.log(error.response.data.msg);
    }
  }
  

  // add new expense to category
  const addExpense = async ({expenseName, expensePrice, countryID, categoryID}) => {
    try {
      await axios.post('http://localhost:4000/api/expense/country/add', {expenseName, expensePrice, countryID, categoryID});
      fetchCountries()
    } catch (error) {
      console.log(error);
    }
  }

  const deleteExpense = async (countryID, categoryID, expenseID) => {
    try {
      await axios.delete('http://localhost:4000/api/expense/', { data: { countryID, categoryID, expenseID } } )
      fetchCountries();
    } catch (error) {
      console.log(error);
    }
  }
  
  
  // get selected country
  const getSelectedCountry = (countryID) => {
    console.log('get selected country rendered');
    const country = state.countries.filter(country => country._id === countryID);
    dispatch({type:'GET_COUNTRY', payload:country})
  }

  // get single category
  const getSingleCategory = (categoryID, countryID) => {
    const country = state.countries.filter(country => country._id === countryID)
    const category =  country[0].categories.filter(category => category._id ===  categoryID);
    dispatch({type: 'GET_CATEGORY', payload: category})
  }

  return (
    <CountryContext.Provider value={{
      countries: state.countries,
      selectedCountry: state.selectedCountry,
      selectedCategory: state.selectedCategory,
      loading: state.loading,
      fetchCountries,
      addCountry,
      deleteCountry,
      addCategory,
      deleteCategory,
      getSelectedCountry,
      getSingleCategory,
      addExpense,
      deleteExpense
      }}>
      {props.children}
    </CountryContext.Provider>
  )
}
