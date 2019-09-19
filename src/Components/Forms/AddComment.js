import React, { Component } from "react";
import * as api from "../../api";

class AddComment extends Component {
  state = {
    newBody: ""
  };

  handleChange = e => {
    e.preventDefault();
    const { value } = e.target;
    this.setState({ newBody: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { newBody } = this.state;
    const { loggedInUser, article_id, insertComment } = this.props;
    api
      .postComment(newBody, loggedInUser, article_id)
      .then(comment => {
        insertComment(comment);
      })
      .then(() => {
        this.setState({ newBody: "" });
      })
      .catch(err => console.dir(err));
  };

  render() {
    const { newBody } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Write Your Comment:{" "}
          <input
            value={newBody}
            type="text"
            onChange={this.handleChange}
            required
          />
        </label>
        <button type="submit">Post Comment</button>
      </form>
    );
  }
}

export default AddComment;
