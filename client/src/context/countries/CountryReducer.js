const CountryReducer = (state, action) => {
  const {type, payload} = action;
  switch (type) {
    case 'ADD_COUNTRIES':
      return {...state, countries: [...state.countries, payload], loading:false};
      break;
    case 'GET_COUNTRY':
      return {...state, selectedCountry: payload, loading:false};
      break;
    case 'GET_CATEGORY':
      return {...state, selectedCategory: payload, loading:false};
      break;
    case 'ADD_CATEGORY':
      const updatedCountries = state.countries.map(country => country._id === payload.country ? country.categories.push(payload.newCategory) : null)
      return {...state, countries: [updatedCountries]}
    default:
      return {...state}
      break;
  }
  
}

export default CountryReducer;