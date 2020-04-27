const CountryReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_COUNTRIES':
      return { ...state, countries: [...payload], loading: false }
      break;
    case 'SET_CURRENCY':
      if (payload.baseCurrency) {
        return { ...state, baseCurrency: payload.baseCurrency }
      } else if (payload.foreignCurrency) {
        return { ...state, foreignCurrency: payload.foreignCurrency }
      }
      break;

    case 'ADD_COUNTRIES':
      return { ...state, countries: [...state.countries, payload], loading: false };
      break;

    case 'GET_COUNTRY':
      return { ...state, selectedCountry: payload, loading: false };
      break;

    case 'GET_CATEGORY':
      return { ...state, selectedCategory: payload, loading: false };
      break;

    case 'RESET_CATEGORY':
      return { ...state, selectedCategory: null, loading: false };
      break;

    case 'ADD_CATEGORY':
    case 'DELETE_CATEGORY':
      const selectedCountry = state.countries.filter(country => country._id === payload);
      return { ...state, selectedCountry: selectedCountry, loading: false };
      break;

    case 'ADD_EXPENSE':
      const syncSelectedCountry = state.countries.filter(country => country._id === state.selectedCountry[0]._id)
      return { ...state, selectedCountry: syncSelectedCountry };
      break;

    default:
      return { ...state }
      break;
  }

}

export default CountryReducer;