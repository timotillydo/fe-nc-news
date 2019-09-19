import React, { Component } from "react";
import * as api from "../../api";
import Header from "../Header";
import UserList from "../Lists/UserList";
import AddUser from "../Forms/AddUser";
import Toggler from "../Toggler";
import Loading from "../Loading";

class UsersPage extends Component {
  state = { users: [], isLoading: true };

  componentDidMount = () => {
    this.fetchUsers();
  };

  fetchUsers = () => {
    api
      .getUsers()
      .then(users => {
        this.setState({ users, isLoading: false });
      })
      .catch(err => console.dir(err));
  };

  insertUser = user => {
    this.setState(currentState => {
      return { users: [...currentState.users, user], isLoading: false };
    });
  };

  render() {
    const { users, isLoading } = this.state;
    return isLoading ? (
      <Loading />
    ) : (
      <div className="users">
        <Header />
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
        <UserList users={users} />
      </div>
    );
  }
}

export default UsersPage;
