import React, { Component } from "react";
import * as api from "../../api";
import DisplayError from "../DisplayError";

class AddTopic extends Component {
  state = {
    newSlug: "",
    newDescription: "",
    err: null
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { newSlug, newDescription } = this.state;
    const { insertTopic } = this.props;
    api
      .postTopic(newSlug, newDescription)
      .then(topic => {
        insertTopic(topic);
      })
      .then(() => {
        this.setState({
          newSlug: "",
          newDescription: ""
        });
      })
      .catch(err => {
        const { errMsg } = err.response.data;
        this.setState({ err: errMsg, isLoading: false });
      });
  };

  render() {
    const { newSlug, newDescription, err } = this.state;
    return err ? (
      <DisplayError err={err} />
    ) : (
      <form onSubmit={this.handleSubmit}>
        <label>
          Topic Slug:
          <input
            name="newSlug"
            value={newSlug}
            type="text"
            onChange={this.handleChange}
            required
          />
        </label>
        <label>
          Description:
          <input
            name="newDescription"
            value={newDescription}
            type="text"
            onChange={this.handleChange}
            required
          />
        </label>
        <button type="submit">Post Topic</button>
      </form>
    );
  }
}

export default AddTopic;
