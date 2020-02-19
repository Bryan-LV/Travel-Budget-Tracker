const CountryReducer = (state, action) => {
  const {type, payload} = action;
  switch (type) {
    case 'ADD_COUNTRIES':
      return {...state, countries: payload, loading:false};
      break;
    case 'GET_COUNTRY':
      return {...state, selectedCountry: payload, loading:false};
      break;
    default:
      return {...state}
      break;
  }
  
}

export default CountryReducer;