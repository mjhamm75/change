import React, { Component } from 'react';
import { sortByLikes } from './../sort.util.js';

class SongList extends Component {
  render() {
    let songs = this.props.songs.sort(sortByLikes).map((song, index) => {
      return (
        <div
          key={index}
          className="song">
          <button style={{marginRight: '10px'}} onClick={this.props.upvoteSong.bind(this, song.id)}>Like</button>
          <div className="song-name">{song.name}</div>
          <div className="song-likes">{song.likes}</div>
          <button style={{marginLeft: '10px'}} onClick={this.props.downvoteSong.bind(this, song.id)}>DisLike</button>
        </div>
      )
    })
    return (
      <div className="list">
        {songs}
      </div>
    )
  }
}

export default SongList;
