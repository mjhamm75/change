import io from 'socket.io-client';
import axios from 'axios';

import {
  CONNECT,
  DISCONNECT,
  INITIAL_RESULT,
  RECEIVE_MESSAGE,
  POST_MESSAGE,
  UPDATE
} from './constants.js';

export function connectSocket() {
  return dispatch => {
    let socket = io();
    socket.on('initialResult', data => {
      dispatch({
        type: INITIAL_RESULT,
        result: data.result
      })
    })
    socket.on('update', data => {
      dispatch({
        type: UPDATE,
        song: data.result.new_val
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

export function upvoteSong(songId) {
  return dispatch => {
    axios.get(`/upvote/${songId}`).then(res => {
      dispatch({
        type: UPDATE,
        song: res.data
      })
    })
  }
}
