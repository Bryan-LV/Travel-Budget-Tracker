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
    case 'ADD_EXPENSE':
      const updatedExpense = state.countries.map(country =>  {
        if(country._id === payload.countryID){
          country.categories.map(category => {
            if(category._id === payload.categoryID){
              category.expenses.push(payload.expense)
              return category;
            }
          })
          return country;
        }
        return country;
      })
      console.log(updatedExpense);
      return {...state};
      break;
    case 'ADD_CATEGORY':
      const updatedCountries = state.countries.map(country => { 
        if(country._id === payload.country){
          country.categories.push(payload.newCategory);
        }
        return country
      })
      return {...state, countries: [...updatedCountries]}
    default:
      return {...state}
      break;
  }
  
}

export default CountryReducer;