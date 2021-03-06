import React, {useEffect, useContext} from 'react'
import CountryContext from '../../../context/countries/CountryContext';
import months from '../../../helpers/months'
import TripDateComp from './TripDateComp';
import PlusBtn from '../../UI/PlusBtn'

export default function TripExpensesByDate(props) {
  const context = useContext(CountryContext);
  useEffect(() => {
    if(context.selectedCategory !== null){
      context.resetSelectedCategory();
    }
  }, [])

  const getAllExpenses = props.country.categories.map(category => category.expenses);
  let expenseList = [];
  for (let i = 0; i < getAllExpenses.length; i++) {
    expenseList.push(...getAllExpenses[i]); 
  }

  const sortedExpenses = expenseList.sort((a,b) => {
    return new Date(b.date) - new Date(a.date);
  });

  const createDates = sortedExpenses.map(expense => {
    const date = new Date(expense.date);
    const getMonth = date.getMonth();
    const month = months[getMonth];
    const day = date.getDate();
    const year = date.getFullYear();
    const newDate = `${month} ${day}, ${year}`
    return newDate;
  });

  const singleSetOfDates = [...new Set(createDates)];

  const createDateList = () => {
    const list = singleSetOfDates.map((date, index) => <TripDateComp handleViewChange={props.handleViewChange} expenses={sortedExpenses} date={date} key={index}/>)
    return list
  }

  return (
    <div>
      {createDateList()}

      <div className="txt-center bg-light-blue pt3">
        <div className="inline-block plus-button-container" onClick={() => props.handleViewChange('addexpense')}>
            <PlusBtn/>
        </div>
      </div>
    </div>
  )
}
