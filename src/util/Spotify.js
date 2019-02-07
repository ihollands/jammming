const clientId = 'fd67204daa92409a821a368990b2ef91';
const redirectURI = 'http://jammming_ih.surge.sh';
let accessToken = '';
const Spotify = {
  getAccessToken() {
    const currentLocation = window.location.href;
    const token = currentLocation.match(/access_token=([^&]*)/),
          expiration = currentLocation.match(/expires_in=([^&]*)/);

    if (accessToken) {
      return accessToken;
    } else if (token && expiration) {
      accessToken = token[1];
      const expirationTime = expiration[1] * 1000;
      setTimeout(() => accessToken = '', expirationTime);
      return window.history.pushState('Access Token', null, '/');
    } else {
      return window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
    }
  },

  search(searchInput) {
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchInput}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      return jsonResponse.tracks.items.map(item => {
        return {
          id: item.id,
          name: item.name,
          artist: item.artists[0].name,
          album: item.album.name,
          uri: item.uri
        };
      })
    });
  },

  savePlaylist(name, trackURIs) {
    if (!name || !trackURIs.length) {
      return;
    }
    let userToken = accessToken;
    let headers = {
      Authorization: `Bearer ${userToken}`,
      'Content-Type': 'application/json'
    };
    let userId;
    return fetch('https://api.spotify.com/v1/me', { headers: headers }).then(response => response.json()).then(jsonResponse => {
      userId = jsonResponse.id;
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({ name: name })
      }).then(response => response.json()).then(jsonResponse => {
        const playlistId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({ uris: trackURIs })
        }).then(response => {
          return response.status === 201;
        });
      });
    });
  }
};

export default Spotify;
