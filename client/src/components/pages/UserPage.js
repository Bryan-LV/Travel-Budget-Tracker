import React, {useContext} from 'react'
import AuthContext from '../../context/auth/AuthContext'
import toTitleCase from '../../helpers/ToTitleCase'

export default function UserPage(props) {
  const {user} = useContext(AuthContext);
  // to update password first type current password
  // after current password is validated and true
  // user can then update new password

  const titleName = toTitleCase(user.name);
  return (
    <div className="container-fluid txt-center white-text">
      <h2>Name: {titleName}</h2>
      <h2>Email: {user.email}</h2>
      <h2>Reset Password</h2>
    </div>
  )
}
