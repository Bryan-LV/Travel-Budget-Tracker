import React, {useReducer} from 'react';
import AuthContext from './AuthContext'
import AuthReducer from './AuthReducer'
import axios from 'axios'

const initState = {
  token: '',
  user: null,
  isAuth: !!localStorage.getItem('token'),
  error: null
}

export default function AuthState(props) {
  const [state, dispatch] = useReducer(AuthReducer, initState);

  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'auth-token': localStorage.getItem('token')
    }
  }

  const createUser = async (user) => {
    try {
      const res = await axios.post('/api/user/create', user, axiosConfig);
      dispatch({type:'CREATE_USER', payload: res.data})
    } catch (error) {
      dispatch({type:'USER_ERROR', payload: error.response.data})
    }
  }

  const loginUser = async (user) => {
      try {
        const res = await axios.post('/api/user/login', user, axiosConfig);
        dispatch({type:'LOGIN_USER', payload: res.data});
      } catch (error) {
        dispatch({type:'USER_ERROR', payload: error.response.data})
      }
  }
  
  const loadUser = async () => {
    try {
      const res = await axios.get('/api/user', axiosConfig);
      dispatch({type:'LOAD_USER', payload: res.data})
    } catch (error) {
      dispatch({type:'USER_ERROR', payload: error.response.data});
    }
  }

  const editUser = async (payload) => {
    try {
      await axios.put('/api/user/profile', payload, axiosConfig);
    } catch (error) {
      dispatch({type:'USER_ERROR', payload: error.response.data});
    }
  }

  const updateUserPassword = async (payload) => {
    try {
      await axios.put('/api/user/password', payload, axiosConfig);
    } catch (error) {
      dispatch({type:'USER_ERROR', payload: error.response.data});
    }
  }

  const logoutUser = async () => {
      dispatch({type:'LOGOUT_USER'})
  }
  
  const deleteUser = async () => {
    try {
      const res = await axios.delete('/api/user', axiosConfig);
      dispatch({type:'DELETE_USER', payload: res.data});
    } catch (error) {
      dispatch({type:'USER_ERROR', payload: error.response.data})
    }
  }

  const clearError = () => {
    dispatch({type:'CLEAR_ERROR'})
  }

  return (
    <AuthContext.Provider 
    value={{
      token: state.token,
      user: state.user,
      isAuth: state.isAuth,
      error: state.error,
      createUser,
      loginUser,
      loadUser,
      logoutUser,
      deleteUser,
      clearError,
      editUser,
      updateUserPassword
    }}>
      {props.children}
    </AuthContext.Provider>
  )
}
