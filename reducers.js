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

function songs(state = [], action) {
  switch(action.type) {
    case 'INITIAL_RESULT':
      return action.result;
    case 'UPDATE':
      return {
        ...state,
        [action.song.id] : action.song,
      };
    default:
      return state;
  }
}

export default combineReducers({
  songs,
  socket,
});
