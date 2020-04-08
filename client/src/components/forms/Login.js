import React, { useState, useContext, useEffect} from 'react'
import AuthContext from '../../context/auth/AuthContext';
import AlertContext from '../../context/alerts/AlertContext';
import { withRouter } from 'react-router-dom';
import {Label, Input, Button} from '../../styles/styles';

function Login(props) {
  const [user, setUser] = useState({email: '', password: ''});
  const {loginUser, isAuth, error, clearError} = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const handleChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value});
  }

  useEffect(() => {
    if(isAuth && error === null){
      props.history.push('/home')
    }
    if(error){
      alertContext.addAlert({text:error.error, needsConfirmation:false});
      clearError()
    }
  }, [isAuth, error])
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if(user.email === ''){
      alertContext.addAlert({text:'Email cannot be left blank', needsConfirmation: false});
      return;
    }
    if(user.password === ''){
      alertContext.addAlert({text:'Password cannot be left blank', needsConfirmation: false});
      return;
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
          <Input type="text" name="email" value={user.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <Label htmlFor="password">Password</Label>
          <Input type="text" name="password" value={user.password} onChange={handleChange} />
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

