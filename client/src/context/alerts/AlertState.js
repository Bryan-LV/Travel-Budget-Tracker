import React, {useContext, useReducer} from 'react'
import AlertContext from './AlertContext';
import AlertReducer from './AlertReducer';
import {v4 as uuid} from 'uuid';

const initialState = {
  isShowing: false,
  alert: null,
  confirm: null
}

export default function AlertState(props) {
  const [state, dispatch] = useReducer(AlertReducer, initialState);

  // add alert(s)
  const addAlert = (payload) => {
    payload.id = uuid();
    dispatch({type:'ADD_ALERT', payload: payload});
  }

  // confirmation Alert
  const confirmAlert = (payload) => {
    dispatch({type:'CONFIRM_ALERT', payload: payload})
  }

  // remove alerts
  const removeAlert = () => {
    dispatch({type:'REMOVE_ALERT'});
  }

  return (
    <AlertContext.Provider value={{
      isShowing: state.isShowing,
      alert: state.alert,
      confirm: state.confirm,
      addAlert,
      removeAlert,
      confirmAlert
    }}>
      {props.children}
    </AlertContext.Provider>
  )
}
