import { combineReducers } from 'redux';

function socket(state = {}, action) {
  switch(action.type) {
    case 'CONNECT':
      return action.socket;
    case 'DISCONNECT':
      return {};
    default:
      return state;
  }
}

function display(state = "", action) {
  switch(action.type) {
    case 'UPDATE':
      return action.name
    default:
      return state;
  }
}

export default combineReducers({
  display,
  socket,
});
