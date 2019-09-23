import React, { Component } from "react";
import { navigate } from "@reach/router";
import * as api from "../../api";
import Loading from "../Loading";
import DisplayError from "../DisplayError";

class LoginPage extends Component {
  state = {
    users: [],
    chosenUser: "",
    isloading: true,
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
    navigate("/");
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
    const { users, isLoading, err, chosenUser } = this.state;
    return isLoading ? (
      <Loading />
    ) : err ? (
      <DisplayError err={err} />
    ) : (
      <div>
        <h3>Login</h3>
        <form onSubmit={this.handleSubmit}>
          <label>
            Select User:
            <select onChange={this.handleChange}>
              <option value={chosenUser} selected disabled hidden>
                Choose User
              </option>
              {users.map(({ username }) => {
                return (
                  <option key={username} value={username}>
                    {username}
                  </option>
                );
              })}
            </select>
          </label>
          <input type="submit" disabled={chosenUser ? false : true} />
        </form>
      </div>
    );
  }
}

export default LoginPage;
