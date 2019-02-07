import React, { Component } from 'react';
import './Track.css';

class Track extends Component {

  renderAction() {
    if (this.props.isRemoval) {
      return <a onClick={this.removeTrack} className="Track-action">-</a>;
    }
    return <a onClick={this.addTrack} className="Track-action">+</a>;
  }

  addTrack = () => {
    return this.props.onAdd(this.props.track);
  }

  removeTrack = () => {
    return this.props.onRemove(this.props.track);
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        {this.renderAction()}
      </div>
    );
  }
}

export default Track;
