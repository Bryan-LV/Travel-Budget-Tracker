import React, {useContext} from 'react'
import CountryContext from '../../context/countries/CountryContext';
import formatDistanceStrict from 'date-fns/formatDistanceStrict'
import { withRouter } from 'react-router-dom';
import island from '../../imgs/island-Caribbean.jpg'

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
  ];


function TripBox(props) {
  const context = useContext(CountryContext);

  const {name, startDate, endDate, budget, _id} = props.country;
  const formatStartDate = new Date(startDate);

  const startDay = formatStartDate.getDate();
  const getStartMonth = formatStartDate.getMonth();
  const startMonth =  months[getStartMonth];
  const startYear = formatStartDate.getFullYear()

  let endDay, getEndMonth, endMonth, endYear;
  if(endDate){
    const formatEndDate = new Date(endDate);
    endDay = formatEndDate.getDate();
    getEndMonth = formatEndDate.getMonth();
    endMonth =  months[getEndMonth];
    endYear = formatEndDate.getFullYear();
  }

  const calcDailySpend = () => {
    // find how many days the user has on their trip
    const createStartDate = new Date(startYear,getStartMonth, startDay);
    const createEndDate = new Date(endYear, getEndMonth, endDay);
    const days = formatDistanceStrict(createStartDate, createEndDate, {unit:'day'});

    // get only number from days;
    const getNumberFromDays = days.replace(/ .*/,'');

    // divide the budget by the number of days
    const dailySpend =  parseInt(budget) / parseInt(getNumberFromDays);
    const result  = dailySpend.toFixed(2);
    return result;
  }

  const selectTrip = () => {
    context.getSelectedCountry(_id);
    props.history.push(`/home/${name}`);

  }

  return (
    <div className="trip-box" onClick={selectTrip}>
      <div className="trip-box-top">
          <img className="trip-box-img border-radius-top" src={island} alt="trip image"/>
      </div>
      <div className="trip-box-bottom border-radius-bottom p2 bg-grey">
        <h3 className="trip-box-title">{name}</h3>
        <h4 className="trip-box-dates">{startMonth} {startDay} - {endMonth} {endDay}</h4>
        <h4 className="trip-budget">${budget} / ${calcDailySpend()} per day</h4>
      </div>
    </div>
  )
}


export default withRouter(TripBox);