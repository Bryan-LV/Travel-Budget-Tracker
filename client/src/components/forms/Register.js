import React, { useState, useContext, useEffect} from 'react'
import AuthContext from '../../context/auth/AuthContext';
import AlertContext from '../../context/alerts/AlertContext';
import {Label, Input, Button} from '../../styles/styles';
import { withRouter } from 'react-router-dom';

function Register(props) {
  const [user, setUser] = useState({name:'', email:'', password:'', passwordCheck:''})

  const {createUser, isAuth, error, clearError} = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  useEffect(() => {
    if(isAuth){
      props.history.push('/home');
    }
    if(error){
      alertContext.addAlert({text:error.error, needsConfirmation:false});
      clearError();
    }
  }, [isAuth, error])

  const handleChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if(user.name === ''){
      alertContext.addAlert({text:'Name field cannot be left blank', needsConfirmation: false});
      return;
    }
    if(user.email === ''){
      alertContext.addAlert({text:'Email cannot be left blank', needsConfirmation: false});
      return;
    }
    if(user.password === ''){
      alertContext.addAlert({text:'Password cannot be left blank', needsConfirmation: false});
      return;
    }
    if(user.password.length < 6){
      console.log(user.password.length);
      alertContext.addAlert({text:'Password must be 6 characters or longer', needsConfirmation: false});
      return;
    } 
    if(user.password !== user.passwordCheck){
      alertContext.addAlert({text:'Passwords do not match', needsConfirmation: false});
      return;
    }

    if(user.name !== '' && user.email !== '' && user.password !== ''){
      const userObj = {name: user.name, email: user.email, password: user.password}
      createUser(userObj);
      // useEffect will then check if isAuthenticated is true and redirect to home page
      // if there is an error, an alert will show
    }
    
  }
   

  return (
    <form onSubmit={handleSubmit} className="container-fluid landing-forms max-container-5">
      <h2 className="white-text underLine margin-left">Register</h2>
      <div className="margin-sides">
      <div className="form-group">
        <Label htmlFor="name">Name</Label>
        <Input type="text" value={user.name} name="name" onChange={handleChange}/>
      </div>
      <div className="form-group">
        <Label htmlFor="email">Email</Label>
        <Input type="text" value={user.email} name="email" onChange={handleChange}/>
      </div>
      <div className="form-group">
        <Label htmlFor="password">Password</Label>
        <Input type="text" value={user.password} name="password" onChange={handleChange}/>
      </div>
      <div className="form-group">
        <Label htmlFor="passwordCheck">Confirm password</Label>
        <Input type="text" value={user.passwordCheck} name="passwordCheck" onChange={handleChange}/>
      </div>
      <Button type="submit">Create User Account</Button>
      <div>
        <p className="underLine-black" onClick={props.toggleForms}>Already have an account?</p>
      </div>
      </div>
    </form>
  )
}

export default withRouter(Register);

