import React, {useState, useContext} from 'react'
import Topbar from '../layout/Topbar'
import CountryContext from '../../context/countries/CountryContext';
import AlertContext from '../../context/alerts/AlertContext';
import {Label, Input, Button, HollowButton} from '../../styles/styles';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import currencies from '../../helpers/currencies';
import SelectTripImg from './SelectTripImg';

export default function AddTrip(props) {
  const context = useContext(CountryContext);
  const alertContext = useContext(AlertContext);
  const [trip, setTrip] = useState({ name:'', baseCurrency:'', budget:'', img: null});
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [openImgModal, setOpenImgModal] = useState(false);
  const [previewImg, setPreviewImg] = useState(false);

  const handleChange = (e) => {
    setTrip({...trip, [e.target.name]: e.target.value});
  }

  const handleOpenImgModal = (e) => {
    e.preventDefault();
    setOpenImgModal(!openImgModal)
  }
  
  const selectImg = (img) => {
    setTrip({...trip, img: img});
    setOpenImgModal(!openImgModal);
    setPreviewImg(true)
  }
  
  const handleTripSubmit = (e) => {
    e.preventDefault()

    if(trip.name === ''){
      alertContext.addAlert({text:'Name field must be filled', needsConfirmation:false})
      return;
    }

    const checkTripName = currencies.some(cur => cur.countryName.toLowerCase() === trip.name.toLowerCase());
    if(!checkTripName) {
      alertContext.addAlert({text:'Country name not found', needsConfirmation:false});
      return;
    }
    if(trip.baseCurrency === ''){
      alertContext.addAlert({text:'Base Currency field must be filled', needsConfirmation:false});
      return;
    }
    const checkBaseCurrency = currencies.some(cur => cur.currencyCode.toLowerCase() === trip.baseCurrency.toLowerCase());
    if(!checkBaseCurrency){
      alertContext.addAlert({text:'Can not find currency with that code', needsConfirmation:false});
      return;
    }
    if(trip.budget === '') {
      alertContext.addAlert({text:'Budget field must be filled', needsConfirmation:false});
      return;
    }
    if(trip.img === null){
      alertContext.addAlert({text:'Please select a trip image', needsConfirmation:false});
      return;
    }

    if(trip.name !== '' && trip.baseCurrency !== '' && trip.budget !== ''){
      const tripObj = {...trip, startDate, endDate };
      context.addCountry(tripObj);
      setTrip({ name:'', baseCurrency:'', budget:'', img: null});
      setStartDate(new Date());
      setEndDate(new Date());
    }
  }

  const currencyCodes = () => {
    const currencySet = new Set();
    currencies.forEach(cur => currencySet.add(cur.currencyCode));
    const filteredList = Array.from(currencySet);
    return filteredList.map(cur => <option value={cur}/>);
  }
  

  return (
    <div>
      <Topbar title="New Trip"/>
      <div className="container-fluid bg-accent border-radius-top pos-rel">
        <form className="margin-sides" onSubmit={handleTripSubmit}>
          <Label htmlFor="country-name">Country Name</Label>
          <input className="styles-input-css" type="text" name="name" value={trip.name} list="country-name" onChange={handleChange}/>
          <datalist id="country-name">
            {currencies.map(cur => <option value={cur.countryName}/>)}
          </datalist>
          <Label htmlFor="base currency">Base Currency</Label>
          <input className="styles-input-css" type="text" name="baseCurrency" value={trip.baseCurrency} list="base-currency" onChange={handleChange}/>
          <datalist id="base-currency">
            {currencyCodes()}
          </datalist>
          <Label htmlFor="budget">Budget</Label>
          <Input type="number" name="budget" value={trip.budget} onChange={handleChange}/>
          <Label htmlFor="start">Start Date</Label>
          <DatePicker className="input-style pointer" selected={startDate} onChange={date => setStartDate(date)} />
          <Label htmlFor="end">End Date</Label>
          <DatePicker className="input-style pointer" selected={endDate} onChange={date => setEndDate(date)} />
          <HollowButton className="mt2 mb2" onClick={handleOpenImgModal}>Select Photo</HollowButton>
          {openImgModal && <SelectTripImg selectImg={selectImg}/>}
          {previewImg ? <img src={trip.img}/> : <></>}
          <Button className="container">Add Trip</Button>
        </form>
      </div>
    </div>
  )
}
