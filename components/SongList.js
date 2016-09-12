import React, { Component } from 'react';

class SongList extends Component {
  render() {
    let songs = this.props.songs.map(song => {
      return <li>{song.name} - {song.likes}</li>
    })
    return (
      <ul>
        {songs}
      </ul>
    )
  }
}

export default SongList;
