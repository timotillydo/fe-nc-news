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
      <>
        <form className="action-bar" onSubmit={this.handleSortSubmit}>
          <select
            className="sort-by"
            name="sortChoice"
            value={sortChoice}
            onChange={this.handleSortChange}
          >
            <option value="created_at">Date Written</option>
            <option value="comment_count">Number Of Comments</option>
            <option value="votes">Respect</option>
          </select>
          <select
            className="order-by"
            name="orderChoice"
            value={orderChoice}
            onChange={this.handleSortChange}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>

          <button className="sort-button" type="submit">
            Sort
          </button>
        </form>
        <br />
        <Link className="new-article" to="/post_article">
          Post A New Article
        </Link>
      </>
    );
  }
}

export default ArticleActionBar;
