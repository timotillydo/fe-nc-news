import React, { Component } from "react";
import { Redirect } from "@reach/router";
import * as api from "../../api";
import Loading from "../Loading";
import DisplayError from "./Components/DisplayError";

class LoginPage extends Component {
  state = {
    users: [],
    chosenUser: "",
    isloading: true,
    redirectToHome: false,
    err: null
  };

  componentDidMount = () => {
    this.fetchUsers();
  };

  handleChange = e => {
    const user = e.target.value;
    this.setState({ chosenUser: user });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { chosenUser } = this.state;
    const { changeUser } = this.props;
    changeUser(chosenUser);
    this.setState({ redirectToHome: true });
  };

  fetchUsers = () => {
    api
      .getUsers()
      .then(users => {
        this.setState({ users, isLoading: false });
      })
      .catch(err => {
        const { errMsg } = err.response.data;
        this.setState({ err: errMsg, isLoading: false });
      });
  };
  render() {
    const { users, isLoading, redirectToHome, err } = this.state;
    return isLoading ? (
      <Loading />
    ) : redirectToHome ? (
      <Redirect from="/login" to="/" />
    ) : err ? (
      <DisplayError err={err} />
    ) : (
      <div>
        <h3>Login</h3>
        <form onSubmit={this.handleSubmit}>
          <label>
            Select User:
            <select onChange={this.handleChange}>
              {users.map(({ username }) => {
                return (
                  <option key={username} value={username}>
                    {username}
                  </option>
                );
              })}
            </select>
          </label>
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default LoginPage;
