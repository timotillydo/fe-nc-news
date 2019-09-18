import React, { Component } from "react";

class Search extends Component {
  state = { searchInput: "" };
  render() {
    return (
      <form className="search-bar" onSubmit={this.handleSubmit}>
        <label>
          Search: <input type="text" onChange={this.handleChange} />
          <button type="submit"></button>
        </label>
      </form>
    );
  }
}

export default Search;
