import React, { Component } from "react";
import * as api from "../../api";
import UserCard from "../Cards/UserCard";
import AddUser from "../Forms/AddUser";
import Toggler from "../Toggler";
import Loading from "../Loading";
import DisplayError from "./Components/DisplayError";

class UsersPage extends Component {
  state = { users: [], isLoading: true, err: null };

  componentDidMount = () => {
    this.fetchUsers();
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

  insertUser = user => {
    this.setState(currentState => {
      return { users: [user, ...currentState.users], isLoading: false };
    });
  };

  render() {
    const { users, isLoading, err } = this.state;
    return isLoading ? (
      <Loading />
    ) : err ? (
      <DisplayError err={err} />
    ) : (
      <div className="users">
        <Toggler>
          {({ show, toggle }) => {
            return (
              <div>
                <button onClick={toggle}>Sign Up</button>
                {show && <AddUser insertUser={this.insertUser} />}
              </div>
            );
          }}
        </Toggler>
        <div className="user-list">
          {users.map(user => {
            return <UserCard {...user} key={user.username} />;
          })}
        </div>
      </div>
    );
  }
}

export default UsersPage;
