import React, { useState, useContext, useEffect} from 'react'
import AuthContext from '../../context/auth/AuthContext';
import { Link, withRouter } from 'react-router-dom';

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
    <form onSubmit={handleSubmit} className="container max-container-5">
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="text" name="email" value={user.email} onChange={handleChange} required/>
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="text" name="password" value={user.password} onChange={handleChange} required/>
      </div>
      <button type="submit">Log in</button>
      <p>
        <Link to="/register">Create an account</Link>
      </p>
    </form>
  )
}


export default withRouter(Login)

