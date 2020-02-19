import React, { useContext }  from 'react'
import { withRouter } from 'react-router-dom';
import CountryContext from '../../context/countries/CountryContext';

function CountryList(props) {
  const {country, id} = props;
  const context = useContext(CountryContext);

  const handleClick = () => {
    context.getSelectedCountry(id);
    props.history.push(`/${country}`);
  }
  
  return (
    <div className="country__list-item" id={id} onClick={handleClick}>
      <h3 className="country__name">{country}</h3>
    </div>
  )
}

export default withRouter(CountryList);