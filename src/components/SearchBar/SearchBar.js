import React, { Component } from 'react';
import './SearchBar.css';

let searchTerm;

class SearchBar extends Component {

  search = () => {
    return this.props.onSearch(searchTerm);
  }

  handleTermChange = (e) => {
    return searchTerm = e.target.value;
  }

  render() {
    return (
      <div className="SearchBar">
        <input onChange={this.handleTermChange} placeholder="Enter A Song, Album, or Artist" />
        <a onClick={this.search}>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;
