import React, {useState, useContext, useEffect} from 'react'
import AuthContext from '../../context/auth/AuthContext'
import AlertContext from '../../context/alerts/AlertContext'
import {Button, Label, Input} from '../../styles/styles'
import { withRouter } from 'react-router-dom'

function UserEditForm(props) {
  const {user, editUser, error, deleteUser, updateUserPassword, isAuth} = useContext(AuthContext);
  const {addAlert, confirm} = useContext(AlertContext);
  const [state, setState] = useState({name: '', email:'', password:'', newPassword:''});
  const [passwords, setPasswords] = useState({password: '', newPassword:'', confirmNewPassword:''});

  useEffect(() => {
    setState({ ...state, name: user.name, email: user.email,});
    if(confirm){
      deleteUser();
    }
    if(error){
      addAlert({text:'Something went wrong', needsConfirmation:false});
    }
    if(!isAuth){
      props.history.push('/');
    }
  }, [error, confirm])

  const handleChange = (e) => setState({...state, [e.target.name]: e.target.value});

  const handlePasswordChange = (e) => setPasswords({...passwords, [e.target.name]: e.target.value});

  const handleDeleteProfile = (e) => addAlert({text:'Are you sure you want to delete profile?', needsConfirmation:true});

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    const updateObj = {};
    // validate form fields
    // if name & email are the same then don't update
    if(state.name === user.name && state.email === user.email){
      addAlert({text:'no updates were made to profile', needsConfirmation: false});
      return;
    }
    // name and email update
    if(state.name !== user.name && state.email !== user.email){
      editUser({name: state.name, email: state.email});
      if(error === null){
        addAlert({text:'Profile has been updated', needsConfirmation:false});
      }
      return;
    }
    // if name !== user.name then update
    if(state.name !== user.name){
      editUser({name: state.name});
      if(error === null){
        addAlert({text:'Profile has been updated', needsConfirmation:false});
      }
      return;
    }
    // if email !== user.email then update
    if(state.email !== user.email){
      editUser({email: state.email});
      if(error === null){
        addAlert({text:'Profile has been updated', needsConfirmation:false});
      }
      return;
    }
  }
  
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    const {password, newPassword, confirmNewPassword} = passwords;
    // all field must first be filled
    if(password === '' || newPassword === '' || confirmNewPassword === ''){
      addAlert({text:'All password fields must be filled in in order to update password', needsConfirmation:false});
      return;
    }
    // newpass and confirmpass must match
    if(newPassword !== confirmNewPassword){
      addAlert({text:'Please make sure new passwords match', needsConfirmation:false});
      return;
    }
    else{
      updateUserPassword({password, newPassword});
      if(error === null){
        addAlert({text:'Password has been updated', needsConfirmation:false});
      }
    }
  }
  
  return (
    <div className="form padding-sides pt2 dark-text">
      <form onSubmit={handleProfileSubmit} className="txt-left">
        <h3 className="underLine-black">Update Profile</h3>
        <Label htmlFor="name">Name</Label>
        <Input type="text" name="name" value={state.name} onChange={handleChange}/>
        <Label htmlFor="email">Email</Label>
        <Input type="text" name="email" value={state.email} onChange={handleChange}/>
        <Button>Save Changes</Button>
      </form>
      <form onSubmit={handlePasswordSubmit} className="txt-left pt1 pb1">
        <h3 className="underLine-black">Update Password</h3>
        <Label htmlFor="password">Password</Label>
        <Input type="text" name="password" value={passwords.password} onChange={handlePasswordChange}/>
        <Label htmlFor="newPassword">New Password</Label>
        <Input type="text" name="newPassword" value={passwords.newPassword} onChange={handlePasswordChange}/>
        <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
        <Input type="text" name="confirmNewPassword" value={passwords.confirmNewPassword} onChange={handlePasswordChange}/>
        <Button>Update Password</Button>
      </form>
      <div className="txt-left pb2">
        <h3>Warning: Once profile is deleted there is no going back</h3>
        <Button backgroundColor="#FF6262" onClick={handleDeleteProfile}>Delete Profile</Button>
      </div>
    </div>
  )
}

export default withRouter(UserEditForm);