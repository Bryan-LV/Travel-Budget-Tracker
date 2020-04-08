import React, {useState, useContext} from 'react'
import Topbar from '../layout/Topbar'
import CountryContext from '../../context/countries/CountryContext';
import AlertContext from '../../context/alerts/AlertContext';
import {Label, Input, Button} from '../../styles/styles';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default function AddTrip(props) {
  const context = useContext(CountryContext);
  const alertContext = useContext(AlertContext);
  const [trip, setTrip] = useState({ name:'', baseCurrency:'', budget:''});
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [file, setFile] = useState('');

  const handleChange = (e) => {
    setTrip({...trip, [e.target.name]: e.target.value});
  }

  const handlePhotoSubmit = (e) => {
    setFile(e.target.files[0]);
  }
  
  const handleTripSubmit = (e) => {
    e.preventDefault()

    if(trip.name === '') alertContext.addAlert({text:'Name field must be filled', needsConfirmation:false})
    if(trip.baseCurrency === '') alertContext.addAlert({text:'Base Currency field must be filled', needsConfirmation:false})
    if(trip.budget === '') alertContext.addAlert({text:'Budget field must be filled', needsConfirmation:false})

    if(trip.name !== '' && trip.baseCurrency !== '' && trip.budget !== ''){
      const formData = new FormData();
      formData.append('photo', file);
      const tripObj = {...trip, startDate, endDate, file };
      context.addCountry(tripObj);
      setTrip({ name:'', baseCurrency:'', budget:''});
      setStartDate(new Date());
      setEndDate(new Date());
    }
  }

  return (
    <div>
      <Topbar title="New Trip"/>
      <div className="container-fluid bg-accent border-radius-top">
        <form className="margin-sides" onSubmit={handleTripSubmit}>
          <Label htmlFor="trip name">Trip Name</Label>
          <Input type="text" name="name" onChange={handleChange}/>
          <Label htmlFor="base currency">Base Currency</Label>
          <Input type="text" name="baseCurrency" onChange={handleChange}/>
          <Label htmlFor="budget">Budget</Label>
          <Input type="number" name="budget" onChange={handleChange}/>
          <Label htmlFor="start">Start Date</Label>
          <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
          <Label htmlFor="end">End Date</Label>
          <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
          <input type="file" name="photo" onChange={handlePhotoSubmit}/>
          <Button className="container">Add Trip</Button>
        </form>
      </div>
    </div>
  )
}
