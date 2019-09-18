import React, { Component } from "react";
import * as api from "../../api";

class AddTopic extends Component {
  state = {
    inputTopic: {
      newSlug: "",
      newDescription: ""
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => console.log(this.state));
  };

  handleSubmit = e => {
    e.preventDefault();
    const { newSlug, newDescription } = this.state.inputTopic;
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
          <input name="slug" type="text" required />
        </label>
        <label>
          Description:
          <input name="description" type="text" required />
        </label>
        <button type="submit">Post Topic</button>
      </form>
    );
  }
}

export default AddTopic;
