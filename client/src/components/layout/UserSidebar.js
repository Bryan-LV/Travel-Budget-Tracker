import React, {useContext} from 'react'
import AuthContext from '../../context/auth/AuthContext'
import enter from '../../imgs/enter.png'
import { withRouter } from 'react-router-dom';
import toTitleCase from '../../helpers/ToTitleCase';

function UserSidebar(props) {
  const {user, logoutUser} = useContext(AuthContext);

  const handleLogout = () => {
    logoutUser();
    props.handleSideBar();
    props.history.push('/');
  }

  const UserPage = () => {
    props.handleSideBar();
    props.history.push('/user');
  }
  
  if(props.isOpen && user !== null){
    const titleName = toTitleCase(user.name)
    return (
      <div className="sidebar white-text">
        <div>
          <h4>{titleName}</h4>
          <h4>{user.email}</h4>
          <h4 className="pointer" onClick={UserPage}>Update Profile</h4>
          <h4 className="pointer" onClick={props.handleSideBar}>Close</h4>
        </div>
        <div className="flex space-between padding-sides">
          <h4 className="pointer" onClick={handleLogout}>Sign Out</h4>
          <div className="icon-container" onClick={handleLogout}>
            <img className="expense-payment-icon" src={enter} alt="payment method"/>
          </div>
        </div>
      </div>
    )
  }
  else {
    return <></>
  }
}

export default withRouter(UserSidebar);
