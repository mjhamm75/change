import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SongList from './SongList';
import values from 'object.values';

import {
  connectSocket,
  disconnectSocket,
  sendMessage,
  upvoteSong
} from './../actions';

import './../app.css';

class App extends Component {
  render() {
    let {
      dislikes,
      display,
      dispatch,
      likes,
      songs
    } = this.props;

    let upvote = bindActionCreators(upvoteSong, dispatch);

    return (
      <div>
        <button onClick={() => dispatch(connectSocket()) }>Connect</button>
        <br/>
        <br/>
        <button onClick={() => dispatch(disconnectSocket()) }>DisConnect</button>
        <br/>
        <br/>
        <div>
          <SongList
            upvoteSong={upvote}
            songs={songs}/>
        </div>
        <br />
        {likes}
        <br />
        <br />
        {dislikes}
        <br />
        <br />
      </div>
    )
  }
}

export default connect(state => {
  return {
    songs: values(state.songs),
    likes: state.likes,
    dislikes: state.dislikes,
  }
})(App);
