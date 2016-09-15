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

function likes(state = 0, action) {
  switch(action.type) {
    case 'CREATE_LIKE':
      return state + 1;
    case 'USE_LIKE':
      return state - 1;
    default:
      return state;
  }
}

function dislikes(state = 0, action) {
  switch(action.type) {
    case 'CREATE_DISLIKE':
      return state + 1;
    case 'USE_DISLIKE':
      return state - 1;
    default:
      return state;
  }
}

export default combineReducers({
  dislikes,
  likes,
  songs,
  socket,
});
