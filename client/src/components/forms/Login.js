import React, { useState, useContext, useEffect} from 'react'
import AuthContext from '../../context/auth/AuthContext';
import { withRouter } from 'react-router-dom';
import {Label, Input, Button} from '../../styles/styles';

function Login(props) {
  const [user, setUser] = useState({email: '', password: ''});
  const {loginUser, isAuth, error} = useContext(AuthContext);

  const handleChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value});
  }

  useEffect(() => {
    if(isAuth){
      props.history.push('/home')
    }
  }, [isAuth, error])
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // validate password
    if(user.password.length < 6){
      return console.log('Password must be more than 6 characters long');
    }
    else {
      loginUser(user);
    }
  }
  

  return (
    <form onSubmit={handleSubmit} className="container-fluid max-container-5 landing-forms">
    <h2 className="underline white-text margin-left">Login</h2>
     <div className="margin-sides">
      <div className="form-group">
          <Label htmlFor="email">Email</Label>
          <Input type="text" name="email" value={user.email} onChange={handleChange} required/>
        </div>
        <div className="form-group">
          <Label htmlFor="password">Password</Label>
          <Input type="text" name="password" value={user.password} onChange={handleChange} required/>
        </div>
        <Button type="submit">Log in</Button>
        <div>
          <p className="underLine-black" onClick={props.toggleForms}>Create an account</p>
        </div>
     </div>
    </form>
  )
}


export default withRouter(Login)

