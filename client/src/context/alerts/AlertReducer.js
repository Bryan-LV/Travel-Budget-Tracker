const AlertReducer = (state, action) => {
  const {payload, type} = action;
  switch (type) {
    case 'ADD_ALERT':
      return {...state, isShowing:true, alert: payload}
      break;
    case 'REMOVE_ALERT':
      return {isShowing:false, alert: null, confirm: false};
    case 'CONFIRM_ALERT':
      return {...state, isShowing:false, confirm: payload};
    default:
      break;
  }
}

export default AlertReducer;