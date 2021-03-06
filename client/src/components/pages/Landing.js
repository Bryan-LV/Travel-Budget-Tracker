import React, { useState } from 'react'
import Login from '../forms/Login'
import Register from '../forms/Register';

export default function Landing() {
  const [login, setLogin] = useState(true);
  const [register, setRegister] = useState(false);

  const toggleForms = () => {
    setLogin(!login);
    setRegister(!register);
  }

  return (
    <div className="container-fluid pb1">
      <h2 className="padding-sides white-text">TripWallet</h2>
      {login && <Login toggleForms={toggleForms} />}
      {register && <Register toggleForms={toggleForms} />}
    </div>
  )
}
