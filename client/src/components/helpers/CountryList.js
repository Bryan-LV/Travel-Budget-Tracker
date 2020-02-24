import React, { useContext }  from 'react'
import { withRouter } from 'react-router-dom';
import CountryContext from '../../context/countries/CountryContext';

function CountryList(props) {
  const {name, _id} = props.country;
  const context = useContext(CountryContext);

  const handleClick = () => {
    context.getSelectedCountry(_id)
    props.history.push(`/${name}`);
  }
  
  return (
    <div className="country__list-item" id={_id} onClick={handleClick}>
      <h3 className="country__name">{name}</h3>
    </div>
  )
}

export default withRouter(CountryList);