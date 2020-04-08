import currencies from './currencies'

const getForeignCurrency = (countryName) => {
  // base currency not country name
  const selectedCountry = countryName;
  const findCurrency = currencies.filter(country => country.countryName.toLowerCase() === selectedCountry.toLowerCase());
  return findCurrency[0].currencyCode;
}

export default getForeignCurrency;