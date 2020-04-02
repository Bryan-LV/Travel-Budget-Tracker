import React, {useContext} from 'react'
import CountryContext from '../../../context/countries/CountryContext';
import { withRouter } from 'react-router-dom';
import PlusBtn from '../../UI/PlusBtn'

function TripCategories({country, handleViewChange}) {
  const context = useContext(CountryContext);


  const handleCategoryDetails = (categoryName, categoryID, countryID) => {
    context.getSingleCategory(categoryID, countryID);
    handleViewChange('singlecategory')
  }

  const createCategories = () => {
    const categoriesList = country.categories.map(category => {

      let getPrices = category.expenses.map(expense => expense.price);
      let result;
      if(getPrices.length > 1) {
        result = getPrices.reduce((prev,next) => prev + next);
        result = result.toFixed(2);
      } else if(getPrices.length === 1){
        result = getPrices[0];
      } else{
        result = '0.00';
      }
      return ( <div key={category._id} data-id={category._id} className="category-box" onClick={() => handleCategoryDetails(category.category, category._id, country._id)}>
                <div className="category-pair">
                  <div className="category-color"></div>
                  <h3 className="white-text">{category.category}</h3>
                </div>
                <h3 className="white-text secondary-font category-total">${result}</h3>
              </div> )
    })
    return categoriesList;
  }

  return (
    <div className="">
      {createCategories()}
      <div className="txt-center bg-light-blue pt3">
        <div className="inline-block plus-button-container" onClick={() => handleViewChange('addcategory')}>
            <PlusBtn/>
        </div>
      </div>
    </div>
  )
}

export default withRouter(TripCategories);