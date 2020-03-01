const CountryReducer = (state, action) => {
  const {type, payload} = action;
  switch (type) {
    case 'SET_COUNTRIES':
      return {...state, countries: [...payload], loading:false}
    case 'ADD_COUNTRIES':
      return {...state, countries: [...state.countries, payload], loading:false};
      break;
    case 'GET_COUNTRY':
      return {...state, selectedCountry: payload, loading:false};
      break;
    case 'GET_CATEGORY':
      return {...state, selectedCategory: payload, loading:false};
      break;
    case 'ADD_EXPENSE':
      
      return {...state};
      break;
    default:
      return {...state}
      break;
  }
  
}

export default CountryReducer;