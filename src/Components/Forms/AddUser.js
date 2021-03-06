import React, { Component } from "react";
import * as api from "../../api";
import DisplayError from "../DisplayError";

class AddTopic extends Component {
  state = {
    newUsername: "",
    newAvatarUrl: "",
    newName: "",
    err: null
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { newUsername, newAvatarUrl, newName } = this.state;
    const { insertUser } = this.props;
    api
      .postUser(newUsername, newAvatarUrl, newName)
      .then(user => {
        insertUser(user);
      })
      .then(() => {
        this.setState({
          newUsername: "",
          newAvatarUrl: "",
          newName: ""
        });
      })
      .catch(err => {
        const { errMsg } = err.response.data;
        this.setState({ err: errMsg, isLoading: false });
      });
  };

  render() {
    const { newUsername, newAvatarUrl, newName, err } = this.state;

    return err ? (
      <DisplayError err={err} />
    ) : (
      <form className="user-form" onSubmit={this.handleSubmit}>
        <label>
          Username:
          <br />
          <input
            className="post-user-input"
            name="newUsername"
            value={newUsername}
            type="text"
            onChange={this.handleChange}
            required
          />
        </label>
        <label>
          Avatar URL:
          <br />
          <input
            className="post-user-input"
            name="newAvatarUrl"
            value={newAvatarUrl}
            type="text"
            onChange={this.handleChange}
            required
          />
        </label>
        <label>
          Your Name:
          <br />
          <input
            className="post-user-input"
            name="newName"
            value={newName}
            type="text"
            onChange={this.handleChange}
            required
          />
        </label>
        <button className="post-user-button" type="submit">
          Sign Up
        </button>
      </form>
    );
  }
}

export default AddTopic;
