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
  
  const handleDelete = () => {
    context.deleteCountry(_id);
  }
  

  return (
    <div className="country__list-item" id={_id} >
      <h3 className="country__name" onClick={handleClick}>{name}</h3>
      <button onClick={handleDelete}>Delete Country</button>
    </div>
  )
}

export default withRouter(CountryList);