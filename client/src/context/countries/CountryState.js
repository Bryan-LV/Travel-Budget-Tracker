import React, {useReducer} from 'react'
import CountryContext from './CountryContext'
import CountryReducer from './CountryReducer'
// import Axios from 'axios';
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
  countries: countries,
  selectedCountry:null,
  selectedCategory: null,
  loading:true
}

export default function CountryState(props) {
  const [state, dispatch] = useReducer(CountryReducer, initialState);
  
  // add new country
  const addCountry = (country) => {
    const newCountry = {
      name: country,
      categories:[],
      _id: uuid()
    }
    dispatch({type:'ADD_COUNTRIES', payload: newCountry});
  }

  // add category to country
  const addCategory = ({category, country}) => {
    const newCategory = {
      category: category,
      _id:uuid(),
      expenses: []
    }

    const payload = {
      newCategory,
      country
    }
    dispatch({type:'ADD_CATEGORY', payload});
  }

  // add new expense to category
  const addExpense = ({categoryID, countryID, expense}) => {
    
  }
  
  // get selected country
  const getSelectedCountry = (id) => {
    const country = state.countries.filter(country => country._id === id);
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
      addCountry,
      addCategory,
      getSelectedCountry,
      getSingleCategory
      }}>
      {props.children}
    </CountryContext.Provider>
  )
}
