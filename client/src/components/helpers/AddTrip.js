import React, {useState, useContext} from 'react'
import Topbar from '../layout/Topbar'
import CountryContext from '../../context/countries/CountryContext';
import {Label, Input, Button, HollowButton} from '../../styles/styles';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default function AddTrip(props) {
  const context = useContext(CountryContext);
  const [trip, setTrip] = useState({
    name:'',
    baseCurrency:'',
    budget:''
  })
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleChange = (e) => {
    setTrip({...trip, [e.target.name]: e.target.value});
  }

  const handlePhotoSubmit = (e) => {
    e.preventDefault();
  }
  
  const handleTripSubmit = (e) => {
    e.preventDefault()
    const tripObj = {...trip, startDate, endDate };
    context.addCountry(tripObj);
  }
  

  return (
    <div>
      <Topbar title="New Trip"/>
      <form className="container-fluid bg-accent border-radius-top">
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
        <HollowButton onClick={handlePhotoSubmit}>Add Photo</HollowButton>
        <Button className="container" onClick={handleTripSubmit}>Add Trip</Button>
      </form>
    </div>
  )
}
