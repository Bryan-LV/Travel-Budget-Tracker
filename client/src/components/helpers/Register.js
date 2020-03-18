import React, { useState, useContext, useEffect} from 'react'
import AuthContext from '../../context/auth/AuthContext';
import { Link } from 'react-router-dom';

function Register(props) {
  const [user, setUser] = useState({
  name:'',
  email:'',
  password:'',
  passwordCheck:''
  })

  const {createUser, isAuth, error} = useContext(AuthContext);

  useEffect(() => {
    if(isAuth){
      props.history.push('/home');
    }
  }, [isAuth, error])

  const handleChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if(user.password !== user.passwordCheck){
    return console.log('Passwords do not match');
    }
    if(user.password.length < 6){
    return console.log('user password needs to be a min length of 6 characters');
    } 
    else{
    // create user obj
    const userObj = {name: user.name, email: user.email, password: user.password}
    // send user info
    // useEffect will then check if isAuthenticated is true and redirect to home page
    // if there is an error, an alert will show
    createUser(userObj);
    }
  }
   

  return (
    <form onSubmit={handleSubmit} className="container max-container-5">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" value={user.name} name="name" onChange={handleChange} required/>
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="text" value={user.email} name="email" onChange={handleChange} required/>
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="text" value={user.password} name="password" onChange={handleChange} required/>
      </div>
      <div className="form-group">
        <label htmlFor="passwordCheck">PasswordCheck</label>
        <input type="text" value={user.passwordCheck} name="passwordCheck" onChange={handleChange} required/>
      </div>
      <button type="submit">Create User Account</button>
      <p>
        <Link to="/">Already have an account?</Link>
      </p>
    </form>
  )
}

export default Register;

