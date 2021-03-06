import React, { Component } from "react";
import { Link } from "@reach/router";

class ArticleActionBar extends Component {
  state = { sortChoice: "", orderChoice: "" };

  handleSortChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSortSubmit = e => {
    e.preventDefault();
    const { sortChoice, orderChoice } = this.state;
    const { changeSortBy } = this.props;
    changeSortBy(sortChoice, orderChoice);
  };

  render() {
    const { sortChoice, orderChoice } = this.state;
    return (
      <div className="action-bar">
        <form onSubmit={this.handleSortSubmit}>
          <select
            className="sort-by"
            name="sortChoice"
            value={sortChoice}
            onChange={this.handleSortChange}
          >
            <option value="" disabled hidden>
              Sort By
            </option>
            <option value="created_at">Date</option>
            <option value="comment_count">Comments</option>
            <option value="votes">Votes</option>
          </select>
          <select
            className="order-by"
            name="orderChoice"
            value={orderChoice}
            onChange={this.handleSortChange}
          >
            <option value="" disabled hidden>
              Order
            </option>
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
          <button className="sort-button" type="submit">
            Sort
          </button>
        </form>
        <Link className="post-article" to="/post_article">
          Post A New Article
        </Link>
      </div>
    );
  }
}

export default ArticleActionBar;
