import React, { Component } from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';


class Playlist extends Component {

  handleNameChange = (e) => {
    this.props.onNameChange(e.target.value);
  }

  render() {
    return (
      <div className="Playlist">
        <input onChange={this.handleNameChange} defaultValue={'Enter new playlist'}/>
        <TrackList isRemoval={this.props.isRemoval} onRemove={this.props.onRemove} tracks={this.props.tracks} />
        <a onClick={this.props.onSave} className="Playlist-save">SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default Playlist;
