import io from 'socket.io-client';

import {
  CONNECT,
  DISCONNECT,
  RECEIVE_MESSAGE,
  POST_MESSAGE,
  UPDATE,
} from './constants.js';

export function connectSocket() {
  return dispatch => {
    let socket = io();
    socket.on('result', data => {
      dispatch({
        type: UPDATE,
        name: 'Jason'
      })
    })
    dispatch({
      type: CONNECT,
      socket
    })
  }
}

export function disconnectSocket() {
  return (dispatch, state) => {
    let socket = state().socket;
    Object.keys(socket).length > 0 ? socket.disconnect() : null;
    dispatch({
      type: DISCONNECT
    })
  }
}

export function receiveMessage(message){
  return {
    type: RECEIVE_MESSAGE,
    message
  }
}

export function postMessage(text){
  return {
    type: POST_MESSAGE,
    text
  }
}

export function sendMessage(message) {
  return (dispatch, state) => {
    let socket = state().socket;
    socket.emit('message', { message });
  }
}
