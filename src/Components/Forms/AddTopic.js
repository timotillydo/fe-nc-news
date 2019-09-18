import React, { Component } from "react";
import * as api from "../../api";

class AddTopic extends Component {
  state = {
    newSlug: "",
    newDescription: ""
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { newSlug, newDescription } = this.state;
    api
      .postTopic(newSlug, newDescription)
      .then(topic => {
        this.props.insertTopic(topic);
      })
      .catch(err => console.dir(err));
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Topic Slug:
          <input
            name="newSlug"
            type="text"
            onChange={this.handleChange}
            required
          />
        </label>
        <label>
          Description:
          <input
            name="newDescription"
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
