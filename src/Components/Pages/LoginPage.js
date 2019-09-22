import React, { Component } from "react";
import * as api from "../../api";
import Loading from "../Loading";
import { Redirect } from "@reach/router";

class LoginPage extends Component {
  state = { users: [], chosenUser: "", isloading: true, redirectToHome: false };

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
      .catch(err => console.dir(err));
  };
  render() {
    const { users, isLoading, redirectToHome } = this.state;
    return isLoading ? (
      <Loading />
    ) : redirectToHome ? (
      <Redirect from="/login" to="/" />
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
