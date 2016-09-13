import React, { Component } from 'react';
import { sortByLikes } from './../sort.util.js';

class SongList extends Component {
  render() {
    let songs = this.props.songs.sort(sortByLikes).map((song, index) => {
      return (
        <div
          onClick={this.props.upvoteSong.bind(this, song.id)}
          key={index}
          className="song">
          <div className="song-name">{song.name}</div>
          <div className="song-likes">{song.likes}</div>
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
