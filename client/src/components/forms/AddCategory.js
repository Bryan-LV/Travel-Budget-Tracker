import React, {useContext} from 'react'
import CountryContext from '../../context/countries/CountryContext'

export default function AddCategory(props) {
  const [category, setCategory ] = useState('');
  const context = useContext(CountryContext);

  const addNewCategory = (e) => {
    e.preventDefault();
    if(category !== ''){
      const newCategory = {categoryName: category, countryID: country._id}
      context.addCategory(newCategory)
    }
  }

  return (
    <div>
      <form>
          <label htmlFor="category">Category</label>
          <input type="text" value={category} name="category" onChange={(e) => setCategory(e.target.value)}/>
          <button onClick={addNewCategory}>Add Category</button>
        </form>
    </div>
  )
}
