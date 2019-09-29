import React, { Component } from "react";
import * as api from "../../api";
import DisplayError from "../DisplayError";

class AddComment extends Component {
  state = {
    newBody: "",
    err: null
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
      .catch(err => {
        const { errMsg } = err.response.data;
        this.setState({ err: errMsg, isLoading: false });
      });
  };

  render() {
    const { newBody, err } = this.state;
    return err ? (
      <DisplayError err={err} />
    ) : (
      <form className="post-comment" onSubmit={this.handleSubmit}>
        <label>
          Post A Comment:{" "}
          <input
            className="post-comment-input"
            value={newBody}
            type="text"
            onChange={this.handleChange}
            required
          />
        </label>
        <button className="post-comment-button" type="submit">
          Post Comment
        </button>
      </form>
    );
  }
}

export default AddComment;
