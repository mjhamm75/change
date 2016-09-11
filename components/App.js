import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  connectSocket,
  disconnectSocket,
  sendMessage
} from './../actions';

class App extends Component {
  render() {
    let {
      display,
      dispatch,
    } = this.props;

    return (
      <div>
        <button onClick={() => dispatch(connectSocket()) }>Connect</button>
        <br/>
        <br/>
        <button onClick={() => dispatch(disconnectSocket()) }>DisConnect</button>
        <br/>
        <br/>
        <input ref="message"></input>
        <button onClick={() => dispatch(sendMessage(this.refs.message.value)) }>Send Message</button>
        <div>{display}</div>
      </div>
    )
  }
}

export default connect(state => {
  return {
    display: state.display
  }
})(App);
