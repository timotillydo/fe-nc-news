import React, { Component } from "react";
import * as api from "../../api";
import DisplayError from "./Components/DisplayError";

class AddTopic extends Component {
  state = {
    newUsername: "",
    newAvatarUrl: "",
    newName: ""
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
    const { newUsername, newAvatarUrl, newName } = this.state;

    return err ? (
      <DisplayError err={err} />
    ) : (
      <form onSubmit={this.handleSubmit}>
        <label>
          Username:
          <input
            name="newUsername"
            value={newUsername}
            type="text"
            onChange={this.handleChange}
            required
          />
        </label>
        <label>
          Avatar URL:
          <input
            name="newAvatarUrl"
            value={newAvatarUrl}
            type="text"
            onChange={this.handleChange}
            required
          />
        </label>
        <label>
          Your Name:
          <input
            name="newName"
            value={newName}
            type="text"
            onChange={this.handleChange}
            required
          />
        </label>
        <button type="submit">Post User</button>
      </form>
    );
  }
}

export default AddTopic;
