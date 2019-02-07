import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

import Spotify from '../../util/Spotify';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'Enter new playlist',
      playlistTracks: [],
      playlistCreated: false
    };
  }

  addTrack = (track) => {
    const isTrackNew = !this.state.playlistTracks.some(item => item.id === track.id);
    return isTrackNew ? this.setState({ playlistTracks: [...this.state.playlistTracks, track] }) : null;
  }

  removeTrack = (track) =>  {
    const trackRemoved = this.state.playlistTracks.filter(item => item.id !== track.id);
    return this.setState({ playlistTracks: trackRemoved });
  }

  updatePlaylistName = (newName) => {
    return this.setState({ playlistName: newName });
  }

  savePlaylist = () => {
    const trackURIs = this.state.playlistTracks.map(item => item.uri),
          { playlistName } = this.state;
    Spotify.savePlaylist(playlistName, trackURIs).then(success => {
      return success ? this.setState({ playlistCreated: true }) : null;
    });
    setTimeout(() => { this.setState({ playlistCreated: false }) }, 5000);
    return this.setState({ playlistName: 'Enter new playlist', playlistTracks: [] })
  }

  search = (searchInput) => {
    Spotify.search(searchInput).then(tracks => this.setState({ searchResults: tracks }));
  }

  render() {
    Spotify.getAccessToken();
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <h2 class="playlist-success">{this.state.playlistCreated ? 'New playlist successfully added!' : ''}</h2>
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults isRemoval={false} onAdd={this.addTrack} results={this.state.searchResults}/>
            <Playlist onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} isRemoval={true} onRemove={this.removeTrack} name={this.state.playlistName} tracks={this.state.playlistTracks}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
